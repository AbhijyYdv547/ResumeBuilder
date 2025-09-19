import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User";
import axios from "axios";
import { oauth2client } from "../utils/googleConfig";
dotenv.config();

interface GoogleUser {
  email: string;
  name: string;
}

export const registerController = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }
    const trimmedPassword = password.trim();
    const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/;

    if (!regex.test(trimmedPassword)) {
      res
        .status(400)
        .json({
          message:
            "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
        });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      if (existingUser.authProvider === "google") {
        return res
          .status(409)
          .json({
            error:
              "Email already registered via Google. Please use Google Login.",
          });
      }
      return res.status(409).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: "Email and Password are required" });
      return;
    }
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    if (user.authProvider === "google") {
      res
        .status(400)
        .json({ error: "Account registered via Google. Use Google Login." });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password || "");
    if (!isMatch) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    if (!process.env.JWT_SECRET) {
      res.status(500).json({ error: "JWT secret not set" });
      return;
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const { _id, name } = user;
    res.json({ token, user: { _id, name, email } });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const googleLogin = async (req: Request, res: Response) => {
  try {
    const code = req.query.code as string;
    if (!code) {
      res.status(400).json({ error: "Missing code from Google" });
      return;
    }

    const { tokens } = await oauth2client.getToken(code);
    oauth2client.setCredentials(tokens);

    const userRes = await axios.get<GoogleUser>(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
    );

    const { email, name } = userRes.data;

    if (!email || !name) {
      res.status(400).json({ error: "Email and Password are required" });
      return;
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ name, email, authProvider: "google" });
    } else if (user.authProvider === "local") {
      res
        .status(400)
        .json({
          error:
            "This email is already registered with a password. Please use email/password login.",
        });
      return;
    }

    if (!process.env.JWT_SECRET) {
      res.status(500).json({ error: "JWT secret not set" });
      return;
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).json({
      message: "Success",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
