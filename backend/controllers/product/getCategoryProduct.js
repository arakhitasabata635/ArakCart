import ProductModel from "../../models/productModel.js";

const getCategoryProduct = async (req, res) => {
  try {
    const allCategoryPresent = await ProductModel.distinct("category");
    const allCategoryProduct = [];

    for (const category of allCategoryPresent) {
      const product = await ProductModel.findOne({category});
      if (product) {
        allCategoryProduct.push(product);
      }
    }
    res.status(200).json({
      message: "all categoryes",
      error: false,
      success: true,
      data: allCategoryProduct,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

export default getCategoryProduct;
