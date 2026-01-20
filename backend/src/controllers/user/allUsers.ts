import userModel from "../../models/userModel";
import { Request, Response } from "express";  

interface AuthRequest extends Request {
  userId?: string;
}

const allUsersController = async (
  req: AuthRequest,
  res: Response
): Promise<Response> => {
  try {
    const userId = req.userId;

    const allUsers = await userModel
      .find({ role: { $ne: "owner" }, _id: { $ne: userId } })
      .select("-password");

    return res.status(200).json({
      message: "All users",
      data: allUsers,
      error: false,
      success: true,
    });
  } catch (err: any) {
    return res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

export default allUsersController;
