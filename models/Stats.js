import mongoose from "mongoose"

const statsSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
})

export default mongoose.model("Stats", statsSchema)