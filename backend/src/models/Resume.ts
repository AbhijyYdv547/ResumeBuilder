import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  aiResponse: { type: String, required: true }, // AI-generated resume text
  template: { type: String, enum: ["classic", "modern", "creative"], required: true },
  pdfUrl: { type: String }, // Optional: Link to generated PDF if stored externally
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Resume", ResumeSchema);
