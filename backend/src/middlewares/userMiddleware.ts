import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const userMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const header = req.header("Authorization");
    // console.log("Authorization Header:", header); // Debugging log

    if (!header || !header.startsWith("Bearer ")) {
      res.status(403).json({ message: "Missing or invalid token" });
      return;
    }

    const token = header.split(" ")[1]; // Extract token
    // console.log("Extracted Token:", token); // Debugging log

    if (!process.env.JWT_SECRET) {
      res.status(500).json({ message: "JWT Secret is missing" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string };
    // console.log("Decoded Token:", decoded); // Debugging log

    // Attach user ID to request
    // @ts-ignore
    req.userId = decoded.userId;
    next(); // ✅ Call next() and exit function
  } catch (error) {
    console.error("JWT Error:", error);
    res.status(403).json({ message: "Invalid or expired token" });
  }
};






