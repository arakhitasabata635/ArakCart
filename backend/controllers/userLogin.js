import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";

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
    const checkPassword = await bcrypt.compare(password, user.password);
    if (user.email !== email || !checkPassword) {
      throw new Error("invalid email and password");
    }else{
      console.log("home");
    }
  
  
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

export default userLoginController;
