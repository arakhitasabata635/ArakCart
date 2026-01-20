import SellerModel from "../../models/sellorModel";
import { Request, Response } from "express";  


const reapplySeller = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    await SellerModel.deleteOne({ userId: req.userId });

    return res.status(200).json({
      success: true,
      message: "You can apply again",
    });
  } catch (err) {
    res.status(400).json({
      error: true,
      success: false,
      message: err.message || err,
    });
  }
};

export default reapplySeller;
