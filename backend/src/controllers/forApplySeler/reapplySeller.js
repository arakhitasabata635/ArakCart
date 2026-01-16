import SellerModel from "../../models/sellorModel.js";

const reapplySeller = async (req, res) => {
  try {
    await SellerModel.deleteOne({ userId: req.userId });

    res.status(200).json({
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
