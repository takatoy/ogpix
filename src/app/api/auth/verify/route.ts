import { NextRequest, NextResponse } from "next/server";
import { verifyToken, sendVerificationEmail } from "@/lib/email";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/auth/verify?token=xxx - Verify email
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(
      new URL("/verify?error=missing_token", req.url)
    );
  }

  const email = await verifyToken(token);

  if (!email) {
    return NextResponse.redirect(
      new URL("/verify?error=invalid_token", req.url)
    );
  }

  return NextResponse.redirect(new URL("/verify?success=true", req.url));
}

// POST /api/auth/verify - Resend verification email
export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (user.emailVerified) {
    return NextResponse.json({ error: "Already verified" }, { status: 400 });
  }

  await sendVerificationEmail(user.email);

  return NextResponse.json({ success: true });
}
