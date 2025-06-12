import type { VercelRequest, VercelResponse } from "@vercel/node";
import { buffer } from "micro";
import Stripe from "stripe";
import { setCorsHeaders } from "../util/cors";
import { getEnvVar } from "../util/getEnvVar";
import { getStripe } from "../util/stripe";

const STRIPE_WEBHOOK_SECRET = getEnvVar("STRIPE_WEBHOOK_SECRET");

export const config = { api: { bodyParser: false } };

const stripe = getStripe();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCorsHeaders(req, res);
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  } else if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Get stripe event
  const sig = req.headers["stripe-signature"]!;
  const rawBody = await buffer(req);
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${(err as Error).message}`);
  }

  // Ignore irrelevant events
  if (event.type !== "checkout.session.completed") {
    res.status(200).end();
    return;
  }

  // Get purchased prodcuts
  const session = event.data.object as Stripe.Checkout.Session;
  const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
    expand: ["data.price.product"],
  });

  // Decrement available inventory of products
  for (const item of lineItems.data) {
    if (item.price === null) {
      throw Error("Could not get item price.");
    }
    if (item.quantity === null) {
      throw Error("Could not get item quantity.");
    }
    const product = item.price.product as Stripe.Product;
    const oldQty = parseInt(product.metadata.quantity || "0", 10);
    const newQty = oldQty - item.quantity;
    await stripe.products.update(product.id, {
      metadata: { quantity: String(Math.max(newQty, 0)) },
    });
    console.info(`Updated ${product.name} quantity: ${oldQty} → ${newQty}`);
  }

  res.status(200).end();
}
