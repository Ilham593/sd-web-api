const express = require('express');
const router = express.Router();
const GlobalStats = require('../models/GlobalStats');

// GET: Ambil data statistik (Home & Profil)
router.get('/', async (req, res) => {
  try {
    let stats = await GlobalStats.findOne();
    // Jika data belum ada sama sekali di DB, buatkan satu yang default
    if (!stats) {
      stats = await GlobalStats.create({});
    }
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil data statistik" });
  }
});

// PUT: Update data statistik dari Halaman Admin
router.put('/', async (req, res) => {
  try {
    // findOneAndUpdate dengan {} akan mengupdate dokumen pertama yang ditemukan
    const updatedStats = await GlobalStats.findOneAndUpdate({}, req.body, {
      new: true,   // Kembalikan data yang sudah diupdate
      upsert: true // Jika tidak ada, buat baru
    });
    res.json(updatedStats);
  } catch (err) {
    res.status(400).json({ message: "Gagal memperbarui data statistik" });
  }
});

module.exports = router;