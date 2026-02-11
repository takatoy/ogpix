import { randomBytes } from "crypto";
import { prisma } from "./prisma";

export function generateApiKey(): string {
  return `ogpix_${randomBytes(24).toString("hex")}`;
}

export async function validateApiKey(key: string) {
  const apiKey = await prisma.apiKey.findUnique({
    where: { key },
    include: { user: true },
  });

  if (!apiKey || !apiKey.active) return null;

  return {
    key: apiKey,
    user: apiKey.user,
  };
}
