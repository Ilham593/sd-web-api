import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  src: { type: String, required: true }, // path file di server
  description: { type: String },
}, { timestamps: true });

export default mongoose.model("Gallery", gallerySchema);