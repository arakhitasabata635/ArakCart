import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(` MongoDB Connected`);
  } catch (error) {
    console.error(" MongoDB Connection Failed", error.message);
  }
};

export default connectDB;
