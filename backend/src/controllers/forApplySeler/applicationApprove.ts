import SellerModel from "../../models/sellorModel";
import userModel from "../../models/userModel";
import approveReqMail from "../../utils/approveReqMail";
import { Request, Response } from "express";  

const applicationApprove = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const selReq = req.body;

    const sellerRequest = await SellerModel.findById(id);
    if (!sellerRequest) {
      return res.status(404).json({
        success: false,
        message: "Seller request not found",
      });
    }
    const sessionUser = await userModel.findById(req.userId);

    if (sessionUser.role === "owner") {
      sellerRequest.status = "approved";
      await sellerRequest.save();

      const user = await userModel.findById(sellerRequest.userId);
      user.role = "admin";

      await user.save();
     return res.status(200).json({
        message: "application is approved",
        error: false,
        success: true,
      });

      await approveReqMail({
        email: sellerRequest.ShopMail,
        ownerName: sellerRequest.ownerName,
        shopName: sellerRequest.shopName,
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

export default applicationApprove;
