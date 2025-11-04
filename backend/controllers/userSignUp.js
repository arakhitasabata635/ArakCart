import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";

const userSignUpController = async (req, res) => {
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
    const saveUser = userData.save();
    res.status(201).json({
      data: saveUser,
      sucess: true,
      error: false,
      message: "user created sucessfully!",
    });
  } catch (err) {
    res.json({
      message: err,
      error: true,
      success: false,
    });
  }
};

export default userSignUpController ;
