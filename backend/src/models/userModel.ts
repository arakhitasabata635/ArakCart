import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  name?: string;
  email: string;
  password?: string;
  profilePic?: {
    imgUrl?: string;
    publicId?: string;
  };
  role: "owner" | "admin" | "user";
}

const userSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true, // fixed spelling
    },
    password: {
      type: String,
    },
    profilePic: {
      imgUrl: {
        type: String,
        default: "",
      },
      publicId: {
        type: String,
        default: "",
      },
    },
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

const userModel: Model<IUser> = mongoose.model<IUser>(
  "user",
  userSchema
);

export default userModel;
