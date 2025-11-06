import userModel from "../models/userModel.js";

const allUsersController = async (req, res) => {
  try {
    const allUsers = await userModel.find();
     res.status(200).json({
      message: "All users",
      data: allUsers,
      error: true,
      success: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

export default allUsersController;
