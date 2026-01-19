import userModel from "../../models/userModel.js";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
interface AuthRequest extends Request {
  userId?: string;
}
const userSignUpController = async (
  req: AuthRequest,
  res: Response
): Promise<Response> => {
  try {
    //veryfing user gave the data or not
    const { email, password, name } = req.body;
    if (!email) {
      throw new Error("please provide email");
    }
    if (!password) {
      throw new Error("please enter password");
    }
    if (!name) {
      throw new Error("please enter name");
    }
    //duplicate user check
    const user = await userModel.findOne({ email });
    if (user) {
      throw new Error("user already exist.");
    }
    //hashed password creation
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    if (!hashedPassword) {
      throw new Error("Something is wrong");
    }

    // save user in db and send res
    const payload = {
      ...req.body,
      password: hashedPassword,
    };
    const userData = new userModel(payload);
    const saveUser = await userData.save();
   return res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "user created sucessfully!",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

export default userSignUpController;
