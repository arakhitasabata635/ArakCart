import SellerModel from "../../models/sellorModel";
import userModel from "../../models/userModel";
import { Request, Response } from "express";  

const applyForSeller = async (
  req: Request,
  res: Response
): Promise<Response> =>{
  try {
    const seller = req.body;
    const sessionUser = await userModel.findById(req.userId);
    if (sessionUser._id.toString() === seller.userId) {
      const sellerData = new SellerModel(seller);
      const createReq = await sellerData.save();
      return res.status(200).json({
        data: createReq,
        message: "request created successfully",
        error: false,
        success: true,
      });
    } else {
      return res.status(403).json({
        message: "Access denied",
        error: true,
        success: false,
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

export default applyForSeller;
