import ProductModel from "../../models/productModel.js";

const categoryWiseProducts = async (req, res) => {
  try {
    const categoryString = req.query.category;

    let categories = [];

    if (categoryString) {
      categories = categoryString.split(",");
    }
    const regexCategories = categories.map(
      (cat) => new RegExp(`^${cat}$`, "i")
    );

    const products = await ProductModel.find({
      category: { $in: regexCategories },
    });

    res.status(200).json({
      data: products,
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

export default categoryWiseProducts;
