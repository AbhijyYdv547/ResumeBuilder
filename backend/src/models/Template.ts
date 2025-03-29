import mongoose from "mongoose";

const TemplateSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  htmlStructure: { type: String, required: true }, // HTML structure of template
  cssStyles: { type: String }, // Optional: Separate CSS styles
});

export default mongoose.model("Template", TemplateSchema);
