import SellerModel from "../../models/sellorModel";
import userModel from "../../models/userModel";
import { Request, Response } from "express";  

const rejectSellerApplication =async (
  req: Request,
  res: Response
): Promise<Response> =>{
  try {
    const { reqiId, ownerNote } = req.body;
    const sessionUser = await userModel.findById(req.userId);

    if (sessionUser.role === "owner") {
      const rejected = await SellerModel.findOneAndUpdate(
        { _id: reqiId },
        { ownerNote, status: "rejected" },
        {
          new: true,
        }
      );
      return res.status(200).json({
        message: "application is rejected",
        success: true,
        error: false,
        data: rejected,
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

export default rejectSellerApplication;
