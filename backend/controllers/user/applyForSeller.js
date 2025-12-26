import SellerModel from "../../models/sellorModel.js";
import userModel from "../../models/userModel.js";
const applyForSeller = async (req, res) => {
  try {
    const seller = req.body;
    const sessionUser = await userModel.findById(req.userId);
    if (sessionUser._id.toString() === seller.userId) {
      const sellerData = new SellerModel(seller);
      const createReq = await sellerData.save();
      res.status(200).json({
        data: createReq,
        message: "request created successfully",
        error: false,
        success: true,
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
