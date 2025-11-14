import ProductModel from "../../models/productModel.js";
const editProductControler = async (req, res) => {
  try {
    const newproduct = req.body;
    const editProduct = await ProductModel.findByIdAndUpdate(
      newproduct._id,
      { $set: newproduct },
      { new: true, runValidators: true }
    );
    if (!editProduct) {
      return res
        .status(404)
        .json({ message: "Product not found", error: true, success: false });
    }

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
