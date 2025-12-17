import cartModel from "../../models/productCartModel.js";

const fetchAllCartProducts = async (req, res) => {
 try {
    const userId = req.userId;

    const cartUser = await cartModel.findOne({ userId }).populate("items.productId");
    console.log(cartUser);
    const cartProductList = cartUser.items;
    return res.json({
      data: cartProductList,
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
}

export default fetchAllCartProducts