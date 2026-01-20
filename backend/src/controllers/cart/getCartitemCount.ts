import cartModel from "../../models/productCartModel";
import { Request, Response } from "express";

const getCartitemCount = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const userId = req.userId;

    const [cartUser] = await cartModel.find({ userId });
    const cartCount = cartUser.items.length;
    return res.json({
      data: cartCount,
      success: true,
      error: false,
    });
  } catch (err) {
    return res.json({
      message: err.message,
      success: false,
      error: true,
    });
  }
};

export default getCartitemCount;
