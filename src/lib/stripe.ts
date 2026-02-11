import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-01-28.clover",
    });
  }
  return _stripe;
}

export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (getStripe() as any)[prop];
  },
});

export const PLANS = {
  pro: {
    name: "Pro",
    price: 9,
    priceId: process.env.STRIPE_PRO_PRICE_ID || "",
    limit: 5000,
  },
  business: {
    name: "Business",
    price: 29,
    priceId: process.env.STRIPE_BUSINESS_PRICE_ID || "",
    limit: Infinity,
  },
} as const;
