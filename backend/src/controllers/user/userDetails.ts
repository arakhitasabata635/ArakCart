import { Request, Response } from "express";
import userModel from "../../models/userModel";

const userDetailsController = async (
  req: Request,
  res: Response
): Promise<Response> =>  {
  try {
    const user = await userModel.findById(req.userId).select("-password");

    return res.status(200).json({
      data: user,
      success: true,
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
