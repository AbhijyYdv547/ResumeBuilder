
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

export const geminiGeneration = async ( {prompt} : { prompt: string }) => {
    const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const resumeContent =
      result.response.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!resumeContent) {
      throw new Error("No content generated");
    }

    return resumeContent;
}