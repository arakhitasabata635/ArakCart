import userModel from "../../models/userModel.js";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";

interface AuthRequest extends Request {
  userId?: string;
}

interface LoginBody {
  email: string;
  password: string;
}

const userLoginController = async (
  req: AuthRequest,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body as LoginBody;

    if (!email) throw new Error("please provide email");
    if (!password) throw new Error("please enter password");

    const user = await userModel.findOne({ email });
    if (!user) throw new Error("invalid user");

    const checkPassword = await bcrypt.compare(
      password,
      user.password as string
    );

    if (!checkPassword) {
      throw new Error("invalid email and password");
    }

    // 🔐 JWT
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT secret missing");
    }

    const signOptions: SignOptions = {
      expiresIn: "1d", 
    };

    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET, 
      signOptions
    );

    const tokenOption = {
      httpOnly: true,
      secure: true,
      sameSite: "none" as const,
      maxAge: 24 * 60 * 60 * 1000,
    };

    return res
      .cookie("token", token, tokenOption)
      .status(200)
      .json({
        message: "Login Successfully",
        data: token,
        success: true,
        error: false,
      });
  } catch (err: any) {
    return res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

export default userLoginController;
