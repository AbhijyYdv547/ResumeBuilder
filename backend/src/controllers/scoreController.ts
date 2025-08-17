import { getUserGithub } from "@/utils/getUserGithub";
import { genAdvicePrompt, genScorePrompt } from "@/utils/scorePrompts";
import { Request, Response } from "express";


export const genScoreController = async (req:Request,res:Response)=>{
    const username = req.body.username;
    try{
        const profileData = await getUserGithub(username);

      if(!profileData){
        res.status(404).json({
          message: "Some problem occured"
        })
        return;
      }

      const score = genScorePrompt({profileData});
      const advice =  genAdvicePrompt({profileData});
    const result = {
        score: score,
        advice:advice
    }
    return result;
    
    }catch(error){
        res.status(500).json({
            message:"Some error occured while generating score"
        })
    }
}