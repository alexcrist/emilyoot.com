import type { VercelRequest, VercelResponse } from "@vercel/node";
import { setCorsHeaders } from "../util/cors";
import { getStripe } from "../util/stripe";

const stripe = getStripe();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCorsHeaders(req, res);
  const products = await stripe.products.list({
    active: true,
    expand: ["data.default_price"],
  });
  res.status(200).json(products);
}
