import {NextFunction, Request,Response} from "express";
import {JWT_SECRET} from "../config"
import jwt from "jsonwebtoken"

export const userMiddleware = async(req:Request,res:Response,next:NextFunction)=>{
    const header = req.header("Authorization");
    const decoded = await jwt.verify(header as string,JWT_SECRET)
    if(decoded){
        //@ts-ignore
        req.userId = decoded.id;
        return next();
    }else{
        res.status(403).json({
            message:"you are not logged in"
        })
    }
}