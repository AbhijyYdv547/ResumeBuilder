import express from "express";
import rateLimit from "express-rate-limit";
import { validate } from "../middlewares/validateMiddleware";
import { loginSchema, registerSchema } from "../validators/authSchema";
import {
  googleLogin,
  loginController,
  registerController,
} from "../controllers/authController";

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: "Too many attempts. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post(
  "/register",
  authLimiter,
  validate(registerSchema),
  registerController,
);

router.post("/login", authLimiter, validate(loginSchema), loginController);

router.post("/google", authLimiter, googleLogin);

export default router;
