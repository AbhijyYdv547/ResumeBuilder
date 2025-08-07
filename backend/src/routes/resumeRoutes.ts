import express, { Request, Response } from "express";
import Resume from "@/models/Resume.js";
import { userMiddleware } from "@/middlewares/userMiddleware";
import { generateResume } from "@/controllers/resumeController";
import mongoose from "mongoose";
import { validate } from "@/middlewares/validateMiddleware";
import { resumeSchema } from "@/validators/resumeSchema";

const router = express.Router();

//Generate
router.post("/generate", userMiddleware,validate(resumeSchema), generateResume);

//Get all resumes
router.get("/", userMiddleware, async (req: Request, res: Response) => {
  try {

    const resumes = await Resume.find({ userId: req.userId });
    res.json(resumes);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific resume
router.get("/:id", userMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: "Invalid resume ID" });
      return;
    }
    const resume = await Resume.findOne({ _id: id, userId: req.userId });
    if (!resume) res.status(404).json({ error: "Resume not found" });
    res.json(resume);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

//Delete a resume
router.delete("/:id", userMiddleware, async (req: Request, res: Response) => {
  try {

    const deleted = await Resume.findOneAndDelete({ _id: req.params.id, userId: req.userId });

    if (!deleted) {
      res.status(404).json({ error: "Resume not found" });
      return;
    }
    res.json({ message: "Resume deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
