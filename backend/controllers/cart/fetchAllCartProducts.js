import cartModel from "../../models/productCartModel.js";

const fetchAllCartProducts = async (req, res) => {
  try {
    const userId = req.userId;
    let cartProductList ;
    const cartUser = await cartModel
      .findOne({ userId })
      .populate("items.productId");
    if (!cartUser) {
      cartProductList = [];
    } else {
      cartProductList = cartUser.items.map((items) => ({
        product: items.productId,
        quantity: items.quantity,
      }
    ));
    }
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
};

export default fetchAllCartProducts;
