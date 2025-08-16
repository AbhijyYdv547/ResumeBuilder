import express from "express";
import { userMiddleware } from "@/middlewares/userMiddleware";
import { genScoreController } from "@/controllers/scoreController";
const router = express.Router();


router.post("/generate", userMiddleware, genScoreController);



export default router;
