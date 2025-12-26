import SellerModel from "../../models/sellorModel.js";
const sellerApplyStatus = async (req, res) => {
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
   res.status(200).json({
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
