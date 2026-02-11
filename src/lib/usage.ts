import { prisma } from "./prisma";

const PLAN_LIMITS: Record<string, number> = {
  free: 100,
  pro: 5000,
  business: Infinity,
};

export function getPlanLimit(plan: string): number {
  return PLAN_LIMITS[plan] ?? 100;
}

function getCurrentMonth(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export async function getUsage(userId: string) {
  const month = getCurrentMonth();
  const usage = await prisma.usage.findUnique({
    where: { userId_month: { userId, month } },
  });
  return usage?.count ?? 0;
}

export async function incrementUsage(userId: string): Promise<number> {
  const month = getCurrentMonth();
  const usage = await prisma.usage.upsert({
    where: { userId_month: { userId, month } },
    create: { userId, month, count: 1 },
    update: { count: { increment: 1 } },
  });
  return usage.count;
}

export async function checkUsageLimit(
  userId: string,
  plan: string
): Promise<{ allowed: boolean; current: number; limit: number }> {
  const current = await getUsage(userId);
  const limit = getPlanLimit(plan);
  return { allowed: current < limit, current, limit };
}
