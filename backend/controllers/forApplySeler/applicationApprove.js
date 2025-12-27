import SellerModel from "../../models/sellorModel.js";
import userModel from "../../models/userModel.js";
import approveReqMail from "../../utils/approveReqmail.js";
const applicationApprove = async (req, res) => {
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

      await approveReqMail({
        email: sellerRequest.ShopMail,
        ownerName: sellerRequest.ownerName,
        shopName: sellerRequest.shopName,
      });

      res.status(200).json({
        message: "application is approved",
        error: false,
        success: true,
      });
    } else {
      res.status(403).json({
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
