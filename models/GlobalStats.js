const mongoose = require('mongoose');

const globalStatsSchema = new mongoose.Schema({
  totalSiswa: { type: String, default: "156" },
  tenagaPendidik: { type: String, default: "14" },
  rombelCount: { type: String, default: "7" },
  akreditasi: { type: String, default: "B" },
  siswaLaki: { type: String, default: "80" },
  siswaPerempuan: { type: String, default: "76" },
  usiaDominan: { type: String, default: "6-12 Tahun" },
  ekonomiRendah: { type: String, default: "45" },
  ekonomiMenengah: { type: String, default: "30" },
  ekonomiAtas: { type: String, default: "10" }
});

module.exports = mongoose.model('GlobalStats', globalStatsSchema);