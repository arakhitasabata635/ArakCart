import cartModel from "../../models/productCartModel";
import { Request, Response } from "express";  

const addToCartControler = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const currentUser = req.userId;
    const { productId } = req.body;

    const exists = await cartModel.findOne({
      userId: currentUser,
      "items.productId": productId,
    });

    if(exists){
      return res.status(400).json({
        message: "Product already exists in cart",
        error: true,
        success: false,
      });
    }

    const addProduct = await cartModel.findOneAndUpdate(
      { userId: currentUser },
      {
        $setOnInsert: { userId: currentUser },
        $addToSet: { items: { productId: productId, quantity: 1 } },
      },
      { upsert: true, new: true }
    );
    return res.json({
      data: addProduct,
      message: "Product Added in Cart",
      success: true,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

export default addToCartControler;
