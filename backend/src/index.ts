import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import cookieParser from "cookie-parser";
import webhooks from "./controllers/order/webhooks";
import { errorHandler } from "./middlewares/globalErrorHendler";
import router from "./routes/index";

const app = express();

// Stripe webhook
app.post(
  "/api/webhooks",
  express.raw({ type: "application/json" }),
  webhooks as any // temporary during migration
);

// Middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URL as string,
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.use("/api", router);
// Global Error Handler
app.use(errorHandler);
const PORT = process.env.PORT || 8080;

connectDB()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((err: any) => {
    console.error("Server failed to start", err);
  });
