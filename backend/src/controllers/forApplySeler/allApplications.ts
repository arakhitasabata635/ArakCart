import SellerModel from "../../models/sellorModel";
import userModel from "../../models/userModel";
import { Request, Response } from "express";  

interface AuthRequest extends Request {
  userId?: string;
}
const allApplications = async (
  req: AuthRequest,
  res: Response
): Promise<Response> =>{
  try {
    const sessionUser = await userModel.findById(req.userId);

    if (sessionUser.role === "owner") {
      const requests = await SellerModel.find({ status: "pending" }).sort({
        createdAt: -1,
      });
      return res.status(200).json({
        success: true,
        error: false,
        data: requests,
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

export default allApplications;
