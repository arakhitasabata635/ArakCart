import ProductModel from "../../models/productModel.js";

const getCategoryWiseProduct = async (req, res) => {
  try {
    const { category } = req?.body;
    const categoryProducts = await ProductModel.find({ category });

    res.status(200).json({
      message: "all products",
      error: false,
      success: true,
      data: categoryProducts,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

export default getCategoryWiseProduct;
