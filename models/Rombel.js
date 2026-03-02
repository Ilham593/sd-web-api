const mongoose = require('mongoose');

const rombelSchema = new mongoose.Schema({
  nama: String,
  kurikulum: { type: String, default: "Merdeka" },
  laki: Number,
  perempuan: Number,
  total: Number,
  wali: String
});

module.exports = mongoose.model('Rombel', rombelSchema);