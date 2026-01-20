import ProductModel from "../../models/productModel";
import { Request, Response } from "express";  

const allProductlistControler = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const userId = req.userId;
    
    const allProducts = await ProductModel.find({ userId }).sort({ createdAt: -1 });

   return res.status(200).json({
      message: "All products",
      data: allProducts,
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

export default allProductlistControler;
