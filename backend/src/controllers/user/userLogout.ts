import { Request, Response } from "express";

const userLogoutController = async (
  req: Request,
  res: Response
): Promise<Response> =>{
  try {
   res.clearCookie("token")

   return  res.status(200).json({
      data: [],
      success: true,
      error: false,
      message: "Logged out successfully!"
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

export default userLogoutController;
