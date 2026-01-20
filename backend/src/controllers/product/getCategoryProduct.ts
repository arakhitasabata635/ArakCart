import ProductModel from "../../models/productModel";
import { Request, Response } from "express";  

interface AuthRequest extends Request {
  userId?: string;
}

const getCategoryProduct = async (
  req: AuthRequest,
  res: Response
): Promise<Response> => {
  try {
    const allCategoryPresent = await ProductModel.distinct("category");
    const allCategoryProduct = [];

    for (const category of allCategoryPresent) {
      const product = await ProductModel.findOne({ category });
      if (product) {
        allCategoryProduct.push(product);
      }
    }
   return res.status(200).json({
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
