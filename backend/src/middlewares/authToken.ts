import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface CustomRequest extends Request {
  userId?: string;
}

const authToken = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(404).json({
        message: "please Login first...",
        success: false,
        error: true,
      });
    }

    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      (err, decoded) => {
        if (err) {
          return res.status(401).json({
            message: "Invalid token",
            success: false,
            error: true,
          });
        }

        const payload = decoded as JwtPayload;
        req.userId = payload._id as string;

        next();
      }
    );
  } catch (err: any) {
    res.status(400).json({
      message: err.message || err,
      data: [],
      error: true,
      success: false,
    });
  }
};

export default authToken;
