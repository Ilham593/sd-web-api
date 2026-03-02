const express = require('express');
const router = express.Router();
const Rombel = require('../models/Rombel');

// READ ALL
router.get('/', async (req, res) => {
  const data = await Rombel.find().sort({ nama: 1 });
  res.json(data);
});

// CREATE
router.post('/', async (req, res) => {
  const baru = new Rombel(req.body);
  await baru.save();
  res.json({ message: "Rombel berhasil ditambah!" });
});

// UPDATE
router.put('/:id', async (req, res) => {
  await Rombel.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Rombel berhasil diupdate!" });
});

// DELETE
router.delete('/:id', async (req, res) => {
  await Rombel.findByIdAndDelete(req.params.id);
  res.json({ message: "Rombel dihapus" });
});

module.exports = router;