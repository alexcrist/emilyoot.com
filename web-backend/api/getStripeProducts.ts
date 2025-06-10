import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";

const { STRIPE_SECRET_KEY } = process.env;

if (!STRIPE_SECRET_KEY) {
  throw Error("Could not get STRIPE_SECRET_KEY.");
}

const stripe = new Stripe(STRIPE_SECRET_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const products = await stripe.products.list({ active: true });
  res.status(200).json(products);
}
