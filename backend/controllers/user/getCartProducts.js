import cartModel from "../../models/productCartModel.js";

const getCartProducts = async (req, res) => {
  try {
    const userId = req.userId;

    const cartItems = await cartModel.find({ userId }).populate("productId");

    return res.json({
      data: cartItems,
      success: true,
      error: false,
    });
  } catch (err) {
    return res.json({
      message: err.message,
      success: false,
      error: true,
    });
  }
};

export default getCartProducts;
