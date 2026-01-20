import ProductModel from "../../models/productModel";
import { Request, Response } from "express";  

interface AuthRequest extends Request {
  userId?: string;
}

const uploadProductControler =async (
  req: AuthRequest,
  res: Response
): Promise<Response> => {
  try {
    const userId = req.userId;
    const  productDetails = req.body;
    const uploadProduct = new ProductModel({ ...productDetails, userId });
    const saveProduct = await uploadProduct.save();

    return res.status(201).json({
      message: "Product upload successfully",
      error: false,
      success: true,
      data: saveProduct,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

export default uploadProductControler;
