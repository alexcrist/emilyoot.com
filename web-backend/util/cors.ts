import type { VercelRequest, VercelResponse } from "@vercel/node";

const ALLOWED_ORIGINS = [
  "https://www.emilyoot.com",
  "https://emilyoot.com",
  "http://localhost:4321",
  "https://alexcrist.github.io",
  "https://emilyoot-com-astro-frontend-ssr.vercel.app/",
];

export const setCorsHeaders = (req: VercelRequest, res: VercelResponse) => {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    res.setHeader("Access-Control-Allow-Origin", "");
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
};
