import Resume from "../models/Resume";
import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export const generateResume = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, experience, skills, education } = req.body;

    if (!name || !experience || !skills || !education) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    // @ts-ignore
    if (!req.userId) {
      res.status(401).json({ error: "Unauthorized request" });
      return;
    }

    const prompt = `Generate a professional resume for a person named ${name} with the following details:
    - Experience: ${experience}
    - Skills: ${skills}
    - Education: ${education}`;

    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    // ✅ Correct way to extract text response
    const resumeContent =
      result.response.candidates?.[0]?.content?.parts?.[0]?.text || "Resume generation failed.";

    // ✅ Save resume to DB
    const newResume = await Resume.create({
      // @ts-ignore
      userId: req.userId,
      aiResponse: resumeContent,
      template: "classic",
    });

    res.status(200).json(newResume);
    return;
  } catch (error: any) {
    console.error("Error generating resume:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
    return;
  }
};
