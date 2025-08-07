import express from "express";
import { userMiddleware } from "@/middlewares/userMiddleware";
import { delResController, genResController, getResController, getSpecificController } from "@/controllers/resumeController";
import { validate } from "@/middlewares/validateMiddleware";
import { resumeSchema } from "@/validators/resumeSchema";

const router = express.Router();

//Generate
router.post("/generate", userMiddleware,validate(resumeSchema), genResController);

//Get all resumes
router.get("/", userMiddleware, getResController);

// Get a specific resume
router.get("/:id", userMiddleware, getSpecificController);

//Delete a resume
router.delete("/:id", userMiddleware, delResController);

export default router;
