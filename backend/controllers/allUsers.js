import userModel from "../models/userModel.js";

const allUsersController = async (req, res) => {
  try {
    console.log("user", req.userId);
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

export default allUsersController;
