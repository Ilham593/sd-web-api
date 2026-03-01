import mongoose from "mongoose";

const facilitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Judul wajib diisi"],
      trim: true,
    },
    desc: {
      type: String,
      default: "",
      trim: true,
    },
    image: {
      data: {
        type: Buffer,
        required: true,
      },
      contentType: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Facility", facilitySchema);