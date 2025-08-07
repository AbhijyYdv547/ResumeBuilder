import { Request,Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "@/models/User";
dotenv.config();

export const registerController = async (req:Request, res:Response) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({email});
    if(existingUser){
      res.status(409).json({error: "Email already in use"});
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
}


export const loginController = async (req:Request, res:Response) => {
  try {
    const { email, password } = req.body;
    if(!email || !password){
      res.status(400).json({error: "Email and Password are required"});
      return;
    }
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ error: "Invalid credentials" });
      return; 
    }

    if(!process.env.JWT_SECRET){
      res.status(500).json({error: "JWT secret not set"})
      return;
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    const { _id, name } = user;
    res.json({ token, user: { _id, name, email } });


  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}