import Resume from "../models/Resume";
import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export const generateResume = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, linkedin, experience, skills, education, projects } = req.body;

    if (!name || !experience || !skills || !education || !email || !phone || !linkedin || !projects) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    // @ts-ignore
    if (!req.userId) {
      res.status(401).json({ error: "Unauthorized request" });
      return;
    }

    const prompt = `Generate a professional resume in a structured format (Markdown format) for a person named ${name} with the following details:
        ### **Contact Information**
        - **Name:** ${name}
        - **Email:** ${email}
        - **Phone:** ${phone}
        - **LinkedIn:** ${linkedin}

        ### **Summary**
        Write a concise and compelling summary for ${name} based on their skills and experience. For example, a summary that highlights their experience in software development with proficiency in JavaScript, React, Node.js, and related technologies.

        ### **Skills**
        List the person's skills clearly in bullet points based on ${skills}.

         ### **Experience**
  If work experience data is provided, list it in detail. Otherwise, **create a relevant internship, open-source contribution, or freelance project**. The format should be:
  - **Job Title:** Software Developer / Open Source Contributor / Intern
  - **Company:** [Insert Company Name]
  - **Location:** [Insert City, State]
  - **Start Date - End Date:** [Insert Dates]
  - **Key Responsibilities & Achievements:**  
    - Developed and maintained web applications using React and Node.js.  
    - Implemented RESTful APIs for efficient backend communication.  
    - Optimized database queries to improve performance by 20%.  

        ### **Education**
        List education details in the following format:
        - **Degree:** ${education}
        - **Institution:** [Insert Institution Name]
        - **Year of Graduation:** [Insert Year]

        ### **Projects (Optional if provided)**
        If any projects are mentioned, include them with a brief description and technologies used:
        For example:
        - **Project Name:** ${projects[0].name}
        - **Description:** ${projects[0].description}
        - **Technologies Used:** ${projects[0].technologies}

        ### **Additional Notes:**
        - Make sure the response is **properly formatted** so it can be displayed correctly on a frontend dashboard.
        - Use **Markdown** for bold headers, bullet points, and structured formatting.
      `;

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
    console.log("Generated AI Resume:", resumeContent);
    res.status(200).json(newResume);
    return;
  } catch (error: any) {
    console.error("Error generating resume:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
    return;
  }
};
