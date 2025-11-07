import userModel from "../models/userModel.js";

const userDetailsController = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId).select("-password");

    res.status(200).json({
      data: user,
      sucess: true,
      error: false,
      message: "user details"
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

export default userDetailsController;
