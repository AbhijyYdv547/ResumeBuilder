import express from "express";
import Resume from "../models/Resume.js";
import {userMiddleware} from "../middlewares/userMiddleware";
import { generateResume } from "../controllers/resumeController.js";

const router = express.Router();

//Generate
router.post("/generate", userMiddleware, generateResume);

//Get all resumes
router.get("/", userMiddleware, async (req, res) => {
    try {
      // @ts-ignore
    const resumes = await Resume.find({ userId: req.userId });
    res.json(resumes);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific resume
router.get("/:id", userMiddleware, async (req, res) => {
  try {
    // @ts-ignore
    const resume = await Resume.findOne({ _id: req.params.id, userId: req.user.userId });
    if (!resume) res.status(404).json({ error: "Resume not found" });
    res.json(resume);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
});

//Delete a resume
router.delete("/:id", userMiddleware, async (req, res) => {
  try {
    // @ts-ignore
    await Resume.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    res.json({ message: "Resume deleted successfully" });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
