import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/index.js"


dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/api",router)


const PORT = 8080 || process.env.PORT ;
connectDB().then(()=>{
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
