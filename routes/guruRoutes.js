const express = require('express');
const router = express.Router();
const Guru = require('../models/Guru');

// GET: Ambil semua data guru
router.get('/', async (req, res) => {
  try {
    const gurus = await Guru.find().sort({ kategori: 1, nama: 1 });
    res.json(gurus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST: Tambah guru baru
router.post('/', async (req, res) => {
  const guru = new Guru(req.body);
  try {
    const newGuru = await guru.save();
    res.status(201).json(newGuru);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT: Update data guru
router.put('/:id', async (req, res) => {
  try {
    const updatedGuru = await Guru.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedGuru);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE: Hapus guru
router.delete('/:id', async (req, res) => {
  try {
    await Guru.findByIdAndDelete(req.params.id);
    res.json({ message: "Data guru berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;