import { genAdvicePrompt, genScorePrompt } from "@/utils/scorePrompts";
import { Request, Response } from "express";


export const genScoreController = async (req:Request,res:Response)=>{
    const url = req.body.url;
    try{
        const scorePrompt = genScorePrompt({ url });
    const advicePrompt = genAdvicePrompt({url});
    const score = Number(scorePrompt);
    const result = {
        score: score,
        advice:advicePrompt
    }
    return result;
    
    }catch(error){
        res.status(500).json({
            message:"Some error occured while generating score"
        })
    }
}