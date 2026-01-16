import userModel from "../../models/userModel.js";

const updateUserDetails = async (req, res) => {
  try {
    const editUser = req.body;
    delete editUser.role;
    const sessionUser = await userModel.findById(req.userId);
    if (sessionUser._id.toString() === editUser._id) {
      const updatedUser = await userModel
        .findByIdAndUpdate(editUser._id, editUser, { new: true })
        .select("-password");

      res.status(200).json({
        message: "User details updated successfully!",
        data: updatedUser,
        error: false,
        success: true,
      });
    } else {
      res.status(400).json({
        message: "Access denied! ",
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

export default updateUserDetails;
