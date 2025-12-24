import userModel from "../../models/userModel.js";

const updateUserRole = async (req, res) => {
  try {
    const user = req.body;
    const sessionUser = await userModel.findById(req.userId);
    if (sessionUser.role === "owner") {
      const updatedUser = await userModel.findByIdAndUpdate(
        user._id,
        { role: user.role },
        { new: true }
      ).select("-password");

      res.status(200).json({
        message: "User role updated successfully!",
        data: updatedUser,
        error: false,
        success: true,
      });
    }
    else{
        res.status(400).json({
      message: "Access denied! Owner only",
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

export default updateUserRole;
