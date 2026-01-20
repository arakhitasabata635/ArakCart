import cartModel from "../../models/productCartModel";
import { Request, Response } from "express";  

interface AuthRequest extends Request {
  userId?: string;
}

const removeFromCart = async (
  req: AuthRequest,
  res: Response
): Promise<Response> => {
  try {
    const currentUser = req.userId;
    const { productId } = req.body;

    const result = await cartModel.updateOne(
      { userId: currentUser },
      { $pull: { items: { productId } } }
    );
    if (result.modifiedCount > 0) {
      return res.json({
        data: result,
        message: "Product Removed from Cart",
        success: true,
        error: false,
      });
    } else {
      return res.status(400).json({
        message: "Product not found in cart",
        error: true,
        success: false,
      });
    }
  } catch (err) {
    return res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

export default removeFromCart;
