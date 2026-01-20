import ProductModel from "../../models/productModel";
import { Request, Response } from "express";  

interface AuthRequest extends Request {
  userId?: string;
}

const categoryWiseProducts = async (
  req: AuthRequest,
  res: Response
): Promise<Response> => {
  try {
    const categoryString = req.query.category.toString();

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
  
   return res.status(200).json({
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
