import { NextResponse } from "next/server";

export async function GET() {
  const info: Record<string, unknown> = {
    TURSO_DATABASE_URL: process.env.TURSO_DATABASE_URL
      ? process.env.TURSO_DATABASE_URL.substring(0, 30) + "..."
      : "NOT_SET",
    TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN ? "SET" : "NOT_SET",
    DATABASE_URL: process.env.DATABASE_URL
      ? process.env.DATABASE_URL.substring(0, 30) + "..."
      : "NOT_SET",
    NODE_ENV: process.env.NODE_ENV,
  };

  try {
    const { PrismaLibSql } = await import("@prisma/adapter-libsql");
    info.adapterImport = "OK";

    const adapter = new PrismaLibSql({
      url: process.env.TURSO_DATABASE_URL!,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
    info.adapterCreate = "OK";

    const { PrismaClient } = await import("@/generated/prisma/client");
    info.prismaImport = "OK";

    const prisma = new PrismaClient({ adapter });
    info.prismaCreate = "OK";

    const count = await prisma.user.count();
    info.userCount = count;
    info.dbConnection = "OK";

    await prisma.$disconnect();
  } catch (e) {
    info.error = e instanceof Error ? e.message : String(e);
    info.stack = e instanceof Error ? e.stack?.split("\n").slice(0, 5) : undefined;
  }

  return NextResponse.json(info);
}
