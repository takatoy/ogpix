import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateApiKey } from "@/lib/api-key";

async function getUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;
  return prisma.user.findUnique({ where: { email: session.user.email } });
}

export async function GET() {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const keys = await prisma.apiKey.findMany({
    where: { userId: user.id },
    select: { id: true, name: true, key: true, active: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });

  // Mask keys for display (show first 10 chars only)
  const masked = keys.map((k) => ({
    ...k,
    keyPreview: k.key.slice(0, 14) + "..." + k.key.slice(-4),
  }));

  return NextResponse.json(masked);
}

export async function POST(req: Request) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!user.emailVerified) {
    return NextResponse.json(
      { error: "Please verify your email before creating API keys" },
      { status: 403 }
    );
  }

  const { name } = await req.json();

  const keyCount = await prisma.apiKey.count({ where: { userId: user.id } });
  if (keyCount >= 5) {
    return NextResponse.json(
      { error: "Maximum 5 API keys allowed" },
      { status: 400 }
    );
  }

  const key = generateApiKey();
  const apiKey = await prisma.apiKey.create({
    data: { key, name: name || "Default", userId: user.id },
  });

  return NextResponse.json(
    { id: apiKey.id, key: apiKey.key, name: apiKey.name },
    { status: 201 }
  );
}

export async function DELETE(req: Request) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();

  const apiKey = await prisma.apiKey.findUnique({ where: { id } });
  if (!apiKey || apiKey.userId !== user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.apiKey.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
