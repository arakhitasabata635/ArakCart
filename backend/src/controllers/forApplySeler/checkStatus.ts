import SellerModel from "../../models/sellorModel";
import { Request, Response } from "express";  

const sellerApplyStatus = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const request  = await SellerModel.findOne({
      userId: req.userId,
    });
     if (!request) {
      return res.status(200).json({
        success: true,
        data: { status: "not_applied" },
      });
    }  
  return res.status(200).json({
      success: true,
      data: request,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

export default sellerApplyStatus;
