import Resume from "../models/Resume";
import {NextFunction, Request,Response} from "express";
import axios from "axios";

export const generateResume = async (req:Request, res:Response) => {
  try {
    const { name, experience, skills, education } = req.body;

    const prompt = `Generate a professional resume for a person named ${name} with the following details:
    - Experience: ${experience}
    - Skills: ${skills}
    - Education: ${education}`;

    // 📌 Using Google Gemini API for AI-generated resume
    const aiResponse = await axios.post(
      "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateText",
      { prompt },
      { headers: { Authorization: `Bearer ${process.env.GEMINI_API_KEY}` } }
    );
// @ts-ignore
const resumeContent = aiResponse.data.candidates[0]?.output || "Resume generation failed.";

// 📌 Save the generated resume
const newResume = await Resume.create({
  // @ts-ignore
      userId: req.user.userId,
      aiResponse: resumeContent,
      template: "classic",
    });

    res.json(newResume);
  } catch (error) {
    //@ts-ignore
    res.status(500).json({ error: error.message });
  }
};
