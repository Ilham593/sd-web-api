const mongoose = require('mongoose');

const guruSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  jabatan: { type: String, required: true }, // Contoh: Guru Kelas, Kepala Sekolah, Penjaga
  status: { 
    type: String, 
    enum: ['PNS', 'PPPK', 'Honor'], 
    default: 'Honor' 
  },
  kategori: { 
    type: String, 
    enum: ['Pendidik', 'Kependidikan'], 
    default: 'Pendidik' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Guru', guruSchema);