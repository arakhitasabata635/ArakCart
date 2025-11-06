import userModel from "../models/userModel.js";

const updateUseController = async (req, res) => {
  try {
    const user = req.body;
    const sessionUser = await userModel.findById(req.userid);
    if (sessionUser.role === "admin") {
      const updatedUser = await userModel.findByIdAndUpdate(
        user._id,
        { role: user.newRole },
        { new: true }
      ).select("-password");

      res.status(200).json({
        message: "role update is sucessfully",
        data: updatedUser,
        error: false,
        success: true,
      });
    }
    else{
        res.status(400).json({
      message: "Access denied! Admin only",
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

export default updateUseController;
