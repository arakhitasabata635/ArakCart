import ProductModel from "../../models/productModel";
import { Request, Response } from "express";  

interface AuthRequest extends Request {
  userId?: string;
}

const singleProductDetails = async (
  req: AuthRequest,
  res: Response
): Promise<Response> =>{
  try {
    const { id } = req.body;
    const details = await ProductModel.findById({ _id: id });
    return res.status(200).json({
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

export default singleProductDetails;
