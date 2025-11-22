import cartModel from "../../models/productCartModel.js";

const addToCartControler = async (req,res) => {
  try {
    const currentUser = req.userId;
    const {productId} = req.body;

    const isProductAvailable = await cartModel.findOne({
      productId,
      userId: currentUser,
    });

    if (isProductAvailable) {
      return res.json({
        message: "Already Added",
        success: false,
        error: true,
      });
    }

    const payload = {
      productId,
      userId: currentUser,
    };

    const newAddToCart = new cartModel(payload);
    const saveProduct = await newAddToCart.save();

    return res.json({
      data: saveProduct,
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

export default addToCartControler;
