import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import webhooks from "./controllers/order/webhooks.js";

const app = express();
// stripe webhook
app.post("/api/webhooks", express.raw({ type: "application/json" }), webhooks);

// Middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.use("/api", router);

const PORT = process.env.PORT || 8080;
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error(" Server failed to start", err);
  });
