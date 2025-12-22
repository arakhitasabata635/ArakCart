import Stripe from "stripe";
import userModel from "../../models/userModel.js";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createPayCheckoutSession = async (req, res) => {
  try {
    const { items } = req.body;
    const user = await userModel.findById(req.userId);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: user.email,
      line_items: items.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.product.productName,
            images: [item.product.productImages[0].imgUrl],
            metadata: {
              productId: item.product._id,
            },
          },
          unit_amount: item.product.sellingPrice * 100,
        },
        quantity: item.quantity,
      })),
      success_url: `${process.env.FRONTEND_URL}/payment/success`,
      cancel_url: `${process.env.FRONTEND_URL}/payment/fail`,
    });
    res.json({ url: session.url, error: false, success: true });
  } catch (err) {
    return res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

export default createPayCheckoutSession;
