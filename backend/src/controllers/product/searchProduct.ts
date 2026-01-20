import ProductModel from "../../models/productModel";
import { Request, Response } from "express";  

interface AuthRequest extends Request {
  userId?: string;
}

const searchProduct = async (
  req: AuthRequest,
  res: Response
): Promise<Response> => {
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

   return res.status(200).json({
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
