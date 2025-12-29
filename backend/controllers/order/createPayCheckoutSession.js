import userModel from "../../models/userModel.js";
import orderModel from "../../models/orderProductModel.js";
import stripe from "../../config/stripe.js";

const createPayCheckoutSession = async (req, res) => {
  try {
    const { cartItems, receiver } = req.body;

    if (
      !receiver ||
      !receiver.receiverName ||
      !receiver.phone ||
      !receiver.address ||
      !receiver.city ||
      !receiver.pincode
    ) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Delivery details are required",
      });
    }

    const user = await userModel.findById(req.userId);
    if (user) {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        customer_email: user.email,
        metadata: {
          userId: user._id.toString(),
          receiver: JSON.stringify(receiver),
        },
        line_items: cartItems.map((item) => ({
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
        success_url: `${process.env.FRONTEND_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/payment/fail`,
        expires_at: Math.floor(Date.now() / 1000) + 60 * 30,
      });

      const pendingOrder = await orderModel.create({
        sessionId: session.id,
        email: user.email,
        userId: user._id.toString(),
        totalAmount: cartItems.reduce(
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
