import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      require: true,
    },
    password: String,
    profilePic: {},
    role: {
      type: String,
      enum: ["owner", "admin", "user"],
      default: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", userSchema);

export default userModel;
