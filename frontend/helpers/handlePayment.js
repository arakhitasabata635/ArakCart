import { loadStripe } from "@stripe/stripe-js";

const handlePayment = async (items) => {
  const stripe = await loadStripe(process.env.STRIPE_PUBLIC_KEY);
  const res = await fetch(apiSummary.createPayCheckoutSession.url, {
    method: apiSummary.createPayCheckoutSession.method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });

  const data = await res.json();
  console.log(data);
  // window.location.href = data.url;
};

export default handlePayment;
