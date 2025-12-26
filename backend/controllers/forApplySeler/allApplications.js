import SellerModel from "../../models/sellorModel.js";
import userModel from "../../models/userModel.js";
const allApplications = async (req, res) => {
  try {
    const sessionUser = await userModel.findById(req.userId);

    if (sessionUser.role === "owner") {
      const requests = await SellerModel.find({ status: "pending" }).sort({
        createdAt: -1,
      });
      res.status(200).json({
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
