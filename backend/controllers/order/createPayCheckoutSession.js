import Stripe from "stripe";
import userModel from "../../models/userModel.js";
import orderModel from "../../models/orderProductModel.js";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createPayCheckoutSession = async (req, res) => {
  try {
    const { items } = req.body;
    const user = await userModel.findById(req.userId);
    if (user) {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        customer_email: user.email,
        metadata: {
          userId: user._id.toString(),
        },
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
        expires_at: Math.floor(Date.now() / 1000) + 60 * 30,
      });

      const pendingOrder = await orderModel.create({
        sessionId: session.id,
        email: user.email,
        userId: user._id.toString(),
        totalAmount: items.reduce(
          (sum, i) => sum + i.product.sellingPrice * i.quantity,
          0
        ),
      });

      res.json({ url: session.url, error: false, success: true });
    }
  } catch (err) {
    return res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

export default createPayCheckoutSession;
