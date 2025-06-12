import type { VercelRequest, VercelResponse } from "@vercel/node";
import { setCorsHeaders } from "../util/cors";
import { getEnvVar } from "../util/getEnvVar";

const PRINTS_PASSWORD = getEnvVar("PRINTS_PASSWORD");

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCorsHeaders(req, res);
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  } else if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { password } = req.body;
  const isCorrect = password === PRINTS_PASSWORD;
  res.status(200).json({ isCorrect });
}
