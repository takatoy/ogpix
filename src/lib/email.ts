import { Resend } from "resend";
import crypto from "crypto";
import { prisma } from "./prisma";

// Lazy-load Resend to avoid crash when API key is missing during build
function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

const APP_URL = process.env.NEXTAUTH_URL || "https://ogpix-red.vercel.app";

export async function sendVerificationEmail(email: string) {
  // Generate a random token
  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  // Clean up any existing tokens for this email
  await prisma.verificationToken.deleteMany({ where: { email } });

  // Store the token
  await prisma.verificationToken.create({
    data: { token, email, expires },
  });

  const verifyUrl = `${APP_URL}/api/auth/verify?token=${token}`;

  await getResend().emails.send({
    from: "ogpix <onboarding@resend.dev>",
    to: email,
    subject: "Verify your email - ogpix",
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="font-size: 24px; font-weight: 700; margin-bottom: 16px; color: #111;">Verify your email</h1>
        <p style="color: #555; font-size: 15px; line-height: 1.6; margin-bottom: 24px;">
          Click the button below to verify your email address and start generating OG images with ogpix.
        </p>
        <a href="${verifyUrl}" style="display: inline-block; background: #7c3aed; color: white; text-decoration: none; padding: 12px 32px; border-radius: 8px; font-weight: 600; font-size: 15px;">
          Verify email
        </a>
        <p style="color: #999; font-size: 13px; margin-top: 32px;">
          This link expires in 24 hours. If you didn't create an ogpix account, you can ignore this email.
        </p>
      </div>
    `,
  });
}

export async function verifyToken(token: string): Promise<string | null> {
  const record = await prisma.verificationToken.findUnique({
    where: { token },
  });

  if (!record) return null;
  if (record.expires < new Date()) {
    await prisma.verificationToken.delete({ where: { id: record.id } });
    return null;
  }

  // Mark user as verified
  await prisma.user.updateMany({
    where: { email: record.email },
    data: { emailVerified: new Date() },
  });

  // Clean up token
  await prisma.verificationToken.delete({ where: { id: record.id } });

  return record.email;
}
