import Resume from "../models/Resume";
import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export const generateResume = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, linkedin, experience, skills, education, projects, summary } = req.body;

    if (!name || !email || !phone || !linkedin || !skills || !education) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    // @ts-ignore
    if (!req.userId) {
      res.status(401).json({ error: "Unauthorized request" });
      return;
    }

    // 🔹 Format Work Experience Data (Ensures Array is Processed)
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

    // 🔹 Format Education Data
    const formattedEducation = education?.length
      ? education.map((edu: any) => ({
          degree: edu.degree,
          institution: edu.institution,
          graduationYear: edu.graduationYear,
        }))
      : [];

    // 🔹 Format Project Data
    const formattedProjects = projects?.length
      ? projects.map((proj: any) => ({
          name: proj.name,
          description: proj.description,
          technologies: proj.technologies,
        }))
      : [];

    // 🔹 Use User Summary or Generate One
    const userSummary = summary?.trim();
    const aiGeneratedSummary = userSummary
      ? userSummary
      : `Generate a compelling summary for ${name}, highlighting their expertise in ${skills.join(", ")}.`;

    // 📝 Updated AI Prompt
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
${
  formattedExperience.length > 0
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

    // 🔥 Generate AI Response
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    // ✅ Extract AI-generated text
    const resumeContent =
      result.response.candidates?.[0]?.content?.parts?.[0]?.text || "Resume generation failed.";



    // ✅ Save structured data & AI response to database
    const newResume = await Resume.create({
      // @ts-ignore
      userId: req.userId,
      aiResponse: resumeContent,
      template: "classic",
      name,
      email,
      phone,
      linkedin,
      summary: userSummary || "", // Store user-provided summary (if any)
      experience: formattedExperience, // ✅ Ensure structured experience is stored
      skills,
      education: formattedEducation,
      projects: formattedProjects,
    });

    res.status(200).json(newResume);
    return;
  } catch (error: any) {
    console.error("Error generating resume:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
    return;
  }
};
