import Resume from "@/models/Resume";
import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import mongoose from "mongoose";

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

    const formattedExperience = Array.isArray(experience) && experience.length > 0
      ? experience
        .filter((exp: any) => exp.jobTitle && exp.company) // Ensure it's not empty
        .map((exp: any) => ({
          jobTitle: exp.jobTitle.trim(),
          company: exp.company.trim(),
          location: exp.location?.trim() || "N/A",
          startDate: exp.startDate,
          endDate: exp.endDate,
          responsibilities: Array.isArray(exp.responsibilities) ? exp.responsibilities : [],
        }))
      : [];

    const formattedEducation = education?.length
      ? education.map((edu: any) => ({
        degree: edu.degree,
        institution: edu.institution,
        graduationYear: edu.graduationYear,
      }))
      : [];


    const formattedProjects = projects?.length
      ? projects.map((proj: any) => ({
        name: proj.name,
        description: proj.description,
        technologies: proj.technologies,
      }))
      : [];

    const userSummary = summary?.trim();
    const aiGeneratedSummary = userSummary
      ? userSummary
      : `Generate a compelling summary for ${name}, highlighting their expertise in ${skills.join(", ")}.`;

    const prompt = `Generate a professional resume in Markdown format for ${name} with these details:
  
        ### **📞 Contact Information**
        - **Name:** ${name}
        - **Email:** ${email}
        - **Phone:** ${phone}
        - **LinkedIn:** ${linkedin}

        ### **📝 Summary**
        ${aiGeneratedSummary}

        ### **💻 Skills**
        ${skills.map((skill: string) => `- ${skill}`).join("\n")}

        ### **💼 Work Experience**
        ${formattedExperience.length > 0
                ? formattedExperience
                  .map(
                    (exp) => `- **Job Title:** ${exp.jobTitle}  
          - **Company:** ${exp.company}  
          - **Location:** ${exp.location}  
          - **Start Date - End Date:** ${exp.startDate} - ${exp.endDate}  
          - **Key Responsibilities:**  
            ${exp.responsibilities.map((resp: any) => `  - ${resp}`).join("\n    ")}`
                  )
                  .join("\n\n")
                : "No prior work experience, but eager to learn and contribute."
              }
        ### **💡 Projects**
        ${formattedProjects
                .map(
                  (proj: any) => `
        - **Project Name:** ${proj.name}  
          - **Description:** ${proj.description}  
          - **Technologies Used:** ${proj.technologies}`
                )
                .join("\n\n") || "No projects listed, but actively seeking new challenges."}
              
        ### **📌 Additional Notes**
        - The response should be structured properly for frontend display.
        - Use Markdown formatting for headers, bullet points, and clarity.
        `;

    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const resumeContent =
      result.response.candidates?.[0]?.content?.parts?.[0]?.text || "Resume generation failed.";



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