import ProductModel from "../../models/productModel.js";

const searchProduct = async (req, res) => {
  try {
    const { query } = req.query;
    // Logic to search products based on the query
    const products = await ProductModel.find({
      $or: [
        { productName: { $regex: query, $options: "i" } },
        { brandName: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json({
      data: products,
      error:false,
      success:true
    })

  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

export default searchProduct;
