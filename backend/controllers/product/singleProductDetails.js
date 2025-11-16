import ProductModel from "../../models/productModel.js";

const singleProductDetails = async () => {
  try {
    const { id } = req.body;
    const details = await ProductModel.findById({ id });
    res.status(200).json({
      message: "Product Details",
      error: false,
      success: true,
      data: details,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

export default singleProductDetails
