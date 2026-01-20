import ProductModel from "../../models/productModel";
import { Request, Response } from "express";  

interface AuthRequest extends Request {
  userId?: string;
}

const getCategoryWiseProduct =async (
  req: AuthRequest,
  res: Response
): Promise<Response> => {
  try {
    const { category } = req?.body;
    const categoryProducts = await ProductModel.find({ category });
    return res.status(200).json({
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
