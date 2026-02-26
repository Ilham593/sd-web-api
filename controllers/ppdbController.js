import Ppdb from "../models/Ppdb.js";

// Get all PPDB entries
export const getPpdb = async (req, res) => {
  try {
    const data = await Ppdb.find();
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Create new PPDB entry
export const createPpdb = async (req, res) => {
  try {
    const ppdb = await Ppdb.create(req.body);
    res.status(201).json({ success: true, data: ppdb });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update PPDB by ID
export const updatePpdb = async (req, res) => {
  try {
    const ppdb = await Ppdb.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!ppdb) return res.status(404).json({ success: false, message: "PPDB not found" });
    res.status(200).json({ success: true, data: ppdb });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete PPDB by ID
export const deletePpdb = async (req, res) => {
  try {
    const ppdb = await Ppdb.findByIdAndDelete(req.params.id);
    if (!ppdb) return res.status(404).json({ success: false, message: "PPDB not found" });
    res.status(200).json({ success: true, data: ppdb });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};