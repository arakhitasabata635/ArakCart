import { loadStripe } from "@stripe/stripe-js";
import apiSummary from "../common";
const key = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const handlePayment = async (items) => {
  const stripe = await loadStripe(key);
  const res = await fetch(apiSummary.createPayCheckoutSession.url, {
    method: apiSummary.createPayCheckoutSession.method,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ items }),
  });

  const data = await res.json();
  window.location.href = data.url;
};

export default handlePayment;
