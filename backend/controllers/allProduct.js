import ProductModel from "../models/productModel.js";

const allProductlistControler = async (req, res) => {
  try {
    const allProducts = await ProductModel.find().sort({ createdAt : -1 });

    res.status(200).json({
      message: "All products",
      data: allUsers,
      error: false,
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

export default allProductlistControler;
