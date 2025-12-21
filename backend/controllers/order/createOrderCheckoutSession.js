import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createOrderCheckoutSession = async (req, res) => {
  try {


    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: { name: item.name },
          unit_amount: item.price * 100, // 10$ -> 1000
        },
        quantity: item.quantity,
      })),
      success_url: "http://localhost:5173/payment/success",
      cancel_url: "http://localhost:5173/payment/fail",
    });
    

    return res.json({
      data: addProduct,
      message: "Product Added in Cart",
      success: true,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

export default createOrderCheckoutSession;
