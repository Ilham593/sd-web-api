import mongoose from "mongoose";

const ppdbSchema = new mongoose.Schema({
  tahunAjaran: { type: String, required: true },
  tanggalPendaftaran: { type: String, required: true },
  kuota: { type: Number, required: true },
  syarat: [{ type: String }],
  alur: [{ type: String }],
}, { timestamps: true });

export default mongoose.model("Ppdb", ppdbSchema);