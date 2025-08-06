import { profileSchema } from "@/validators/profileSchema";
import express, { Request,Response } from "express";
import User from "@/models/User";
import { userMiddleware } from "@/middlewares/userMiddleware";


const router = express.Router();

//profile
router.get("/",userMiddleware, async (req:Request, res:Response) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if(!user){
      res.status(404).json({error: "No user exists of this name"})
      return;
    }
    res.json(user);

  } catch (error: any) {
    res.status(500).json({ error: error.message });

  }
});



router.put("/update", userMiddleware, async (req: Request, res: Response) => {
  try {
    const validatedData = profileSchema.parse(req.body);

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      validatedData,
      { new: true }
    ).select("-password");

    res.json(updatedUser);
  } catch (error: any) {
    if (error.name === "ZodError") {
      res.status(400).json({ errors: error.errors });
      return;
    }
    res.status(500).json({ error: error.message });
  }
});



export default router;
