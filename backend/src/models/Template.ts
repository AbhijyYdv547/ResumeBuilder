import mongoose from "mongoose";

const TemplateSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  htmlStructure: { type: String, required: true }, 
  cssStyles: { type: String }, 
});

export default mongoose.model("Template", TemplateSchema);
