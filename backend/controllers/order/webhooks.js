import stripe from "../../config/stripe.js";
const endPointSecreateKey = process.env.STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY;

const webhooks = (req, res) => {
  const sig = req.headers["stripe-signature"];


  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endPointSecreateKey);
  } catch (err) {
    console.error("Webhook signature verification failed.", err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("Payment success!", session);
    // Save DB logic here
  }
  res.status(200).send();
};

export default webhooks;
