import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userLoginController = async (req, res) => {
  try {
    //veryfing user gave the data or not
    const { email, password } = req.body;
    if (!email) {
      throw new Error("please provide email");
    }
    if (!password) {
      throw new Error("please enter password");
    }

    const user = await userModel.findOne({ email });
   
    if (!user) {
      throw new Error("invalid user");
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (user.email !== email || !checkPassword) {
      throw new Error("invalid email and password");
    }
    const tokenData = {
      _id: user._id,
      email: user.email,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    const tokenOption = {
      httpOnly: true,
      secure: true,
    };
    res.cookie("token", token, tokenOption).status(200).json({
      message: "Login Sucessfully",
      data: token,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

export default userLoginController;
