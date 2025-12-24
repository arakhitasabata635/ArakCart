import stripe from "../../config/stripe.js";
import orderModel from "../../models/orderProductModel.js";
import sendOrderMail from "../../utils/sendOrderMail.js";
const endPointSecreateKey = process.env.STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY;

const getProductDetails = async (lineItems) => {
  const allProducts = [];

  if (lineItems?.data?.length)
    for (const item of lineItems.data) {
      const product = await stripe.products.retrieve(item.price.product);

      const productData = {
        productId: product.metadata.productId,
        name: product.name,
        price: item.price.unit_amount / 100,
        quantity: item.quantity,
        image: product.images,
      };
      allProducts.push(productData);
    }
  return allProducts;
};

const webhooks = async (req, res) => {
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
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

    const productDetails = await getProductDetails(lineItems);

    const orderDetails = {
      productDetails: productDetails,
      email: session.customer_email,
      userId: session.metadata.userId,
      paymentDetails: {
        paymentId: session.payment_intent,
        payment_method_type: session.payment_method_types,
        payment_status: session.payment_status,
      },
      totalAmount: session.amount_total / 100,
    };

    const order = new orderModel(orderDetails);
    const saveOrder = await order.save();
    // 📧 SEND EMAIL
    await sendOrderMail({
      email: saveOrder.email,
      orderId: saveOrder._id,
      totalAmount: saveOrder.totalAmount,
    });
  }
  res.status(200).send();
};

export default webhooks;
