import ProductModel from "../../models/productModel.js";
const editProductControler = async (req, res) => {
  try {
    const userId = req.userId;
    const newproduct = req.body;
    const product = await ProductModel.findById(newproduct._id);
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found", error: true, success: false });
    }
    if (product.userId.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized", error: true, success: false });
    }
    const editProduct = await ProductModel.findByIdAndUpdate(
      { _id: newproduct._id },
      { ...newproduct, userId },
      { new: true }
    );
    res.status(200).json({
      message: "Product updated successfully",
      data: editProduct,
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

export default editProductControler;
