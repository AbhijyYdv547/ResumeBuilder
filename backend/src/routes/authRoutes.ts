import express from "express";
import rateLimit from "express-rate-limit"
import { validate } from "@/middlewares/validateMiddleware";
import { loginSchema, registerSchema } from "@/validators/authSchema";
import { loginController, registerController } from "@/controllers/authController";


const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5, 
  message: { error: "Too many attempts. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

//signup
router.post("/register",authLimiter,validate(registerSchema), registerController );

//login
router.post("/login",authLimiter,validate(loginSchema), loginController);

//google
router.post("/google",authLimiter,)


export default router;
