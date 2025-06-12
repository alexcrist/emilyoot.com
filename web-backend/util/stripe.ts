import Stripe from "stripe";
import { getEnvVar } from "./getEnvVar";

export const getStripe = () => {
  const STRIPE_SECRET_KEY = getEnvVar("STRIPE_SECRET_KEY");
  return new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2025-05-28.basil" });
};
