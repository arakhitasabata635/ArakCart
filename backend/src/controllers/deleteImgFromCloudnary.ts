import cloudinary from "../config/cloudinary";
import { Request, Response } from "express";  

interface AuthRequest extends Request {
  userId?: string;
}

const deleteCloudinaryImage = async (
  req: AuthRequest,
  res: Response
): Promise<Response> => {
  try {
    const { public_id } = req.body;

    const result = await cloudinary.uploader.destroy(public_id);

   return res.status(200).json({
      message: "image delete successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message || err, error: true, success: false });
  }
};
export default deleteCloudinaryImage;
