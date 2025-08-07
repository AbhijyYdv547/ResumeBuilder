import Resume from "@/models/Resume";
import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { buildResumePrompt } from "@/utils/buildResumePrompt";
import { formatResumeInput } from "@/utils/formatResumeInput";

dotenv.config();

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export const genResController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, linkedin, experience, skills, education, projects, summary, template } = req.body;

    if (!name || !email || !phone || !linkedin || !skills || !education) {
      res.status(400).json({ error: "Missing required fields" });
      console.log("Missing fields")
      return;
    }

    if (!req.userId) {
      res.status(401).json({ error: "Unauthorized request" });
      return;
    }

    const {formattedExperience,formattedEducation,formattedProjects} = formatResumeInput({experience,education,projects})
      
    const userSummary = summary?.trim()
   
    const prompt = buildResumePrompt({name,email,phone,linkedin,experience:formattedExperience,education:formattedEducation,skills,projects:formattedProjects,summary:userSummary})

    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const resumeContent =
      result.response.candidates?.[0]?.content?.parts?.[0]?.text;

    if(!resumeContent){
      res.status(500).json({error: "Failed to generate Resume"})
      return;
    }

    const newResume = await Resume.create({
      userId: req.userId,
      aiResponse: resumeContent,
      template,
      name,
      email,
      phone,
      linkedin,
      summary: userSummary || "",
      experience: formattedExperience,
      skills,
      education: formattedEducation,
      projects: formattedProjects,
    });

    res.status(200).json({
      id: newResume._id,
      template: newResume.template,
      resumeData: {
        name,
        email,
        phone,
        linkedin,
        summary: newResume.summary,
        experience: formattedExperience,
        skills,
        education: formattedEducation,
        projects: formattedProjects
      }
    });
    return;
  } catch (error: any) {
    console.error("Error generating resume:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
    return;
  }
};


export const getResController = async (req: Request, res: Response) => {
  try {

    const resumes = await Resume.find({ userId: req.userId });
    res.json(resumes);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}


export const getSpecificController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: "Invalid resume ID" });
      return;
    }
    const resume = await Resume.findOne({ _id: id, userId: req.userId });
    if (!resume) {
  res.status(404).json({ error: "Resume not found" });
  return;
}
    res.json(resume);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}


export const delResController = async (req: Request, res: Response) => {
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
}