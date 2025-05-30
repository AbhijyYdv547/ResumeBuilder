import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan"
import authRoutes from "./routes/authRoutes";
import resumeRoutes from "./routes/resumeRoutes";
import { connectDB } from "./config/db";

dotenv.config();

const app = express();
app.use(cors({
    origin: 'https://resume-builder-brie4gyb8-abhijay-yadavs-projects.vercel.app',
    credentials: true,
  }));
  
app.use(morgan("dev"));
app.use(express.json());
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/resumes", resumeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
