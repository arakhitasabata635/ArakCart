import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running ✅");
});


const PORT = process.env.PORT || 8080;
connectDB().then(()=>{
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
