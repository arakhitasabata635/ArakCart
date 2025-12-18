const updateCartItemCount = async (req, res) => {
  try {
    const { productId, action } = req.body;
    const userId = req.userId;

    const cart = await cartModel.findOne({ userId });

    if (!cart) return res.json({ success: false, message: "Cart not found" });

    const item = cart.items.find((i) => i.product._id.toString() === productId);

    if (!item)
      return res.json({ success: false, message: "Product not found" });

    if (action === "inc") item.quantity += 1;
    if (action === "dec" && item.quantity > 1) item.quantity -= 1;

    await cart.save();

    return res.json({
      success: true,
      message: "Quantity updated",
      quantity: item.quantity,
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

export default updateCartItemCount;
