import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const mongoUrl = process.env.MONGODB_URL as string;

    await mongoose.connect(mongoUrl);

    console.log("MongoDB Connected");
  } catch (error: any) {
    console.error("Database connection failed", error.message);
    process.exit(1);
  }
};

export default connectDB;
