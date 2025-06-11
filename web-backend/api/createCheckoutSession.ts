import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";
import { getStripe } from "../util/stripe";

interface Item {
  priceId: string;
  quantity: string;
}

const stripe = getStripe();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  let items: Item[];
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    items = body.items;
  } catch (err) {
    console.error(err);
    console.error("req.body", req.body);
    return res.status(400).json({ error: "Invalid JSON" });
  }

  // Verify that there is enough inventory of each product being purchased
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  for (const { priceId, quantity: rawQuantity } of items) {
    const quantity = parseInt(rawQuantity);
    const price = await stripe.prices.retrieve(priceId, {
      expand: ["product"],
    });
    const product = price.product as Stripe.Product;
    const stock = parseInt(product.metadata.quantity || "0", 10);
    if (stock < quantity) {
      return res
        .status(400)
        .json({ error: `Not enough stock for ${product.name}` });
    }
    lineItems.push({ price: priceId, quantity });
  }

  // Create checkout session
  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: "https://emilyoot.com/thankyou",
    cancel_url: "https://emilyoot.com/shop",
  });
  res.status(200).json({ sessionId: session.id });
}
