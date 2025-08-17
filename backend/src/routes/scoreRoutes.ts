import express from "express";
import { userMiddleware } from "@/middlewares/userMiddleware";
import { genScoreController } from "@/controllers/scoreController";
const router = express.Router();


router.post("/", userMiddleware, genScoreController);
router.get("/test", (req, res) => {
  res.status(200).json({ message: "Score route is working" });
});



export default router;
