import Stripe from "stripe";

export const getStripe = () => {
  const { STRIPE_SECRET_KEY } = process.env;
  if (!STRIPE_SECRET_KEY) {
    throw Error("Could not get STRIPE_SECRET_KEY.");
  }
  return new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: "2025-05-28.basil",
  });
};
