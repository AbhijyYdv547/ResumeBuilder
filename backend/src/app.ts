import 'module-alias/register'; 
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan"
import authRoutes from "./routes/authRoutes";
import resumeRoutes from "./routes/resumeRoutes";
import { connectDB } from "./config/db";
import profileRoutes from "./routes/profileRoutes";
import scoreRoutes from './routes/scoreRoutes';


dotenv.config();

const app = express();
app.use(cors({
    origin: process.env.REACT_APP_URL,
    credentials: true,
  }));
  
app.use(morgan("dev"));
app.use(express.json());
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/resumes", resumeRoutes);
app.use("/api/profile",profileRoutes);
app.use("/api/score",scoreRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
