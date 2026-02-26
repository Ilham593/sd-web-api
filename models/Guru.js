import mongoose from "mongoose"

const guruSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true
  },
  mapel: {
    type: String,
    required: true
  },
  noHp: String,
  alamat: String
}, {
  timestamps: true
})

export default mongoose.model("Guru", guruSchema)