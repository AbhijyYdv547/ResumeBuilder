import { geminiGeneration } from "../utils/geminiGeneration";
import { getUserGithub } from "../utils/getUserGithub";
import { genAdvicePrompt, genScorePrompt } from "../utils/scorePrompts";
import { Request, Response } from "express";

export const genScoreController = async (req: Request, res: Response) => {
  const { username } = req.body;
  try {
    const isTestEnv = process.env.NODE_ENV === "test";
    if (isTestEnv) {
      const data = {
        score: 10,
        advice: "Good job",
      };

      res.status(200).json(data);
    }

    const profileData = await getUserGithub(username);

    if (!profileData) {
      res.status(404).json({
        message: "Some problem occured",
      });
      return;
    }

    const scorePrompt = genScorePrompt({ profileData });
    const score = await geminiGeneration({ prompt: scorePrompt });

    const advicePrompt = genAdvicePrompt({ profileData });
    const advice = await geminiGeneration({ prompt: advicePrompt });

    const result = {
      score,
      advice,
    };

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Some error occured while generating score",
    });
  }
};
