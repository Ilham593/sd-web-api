import Gallery from "../models/Gallery.js";

// Get all gallery images
export const getGallery = async (req, res) => {
  try {
    const data = await Gallery.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Create new gallery image (file upload)
export const createGallery = async (req, res) => {
  try {
    const { title, description } = req.body;
    const src = req.file ? `/uploads/${req.file.filename}` : null;
    if (!src) return res.status(400).json({ success: false, message: "Gambar wajib diupload" });

    const gallery = await Gallery.create({ title, description, src });
    res.status(201).json({ success: true, data: gallery });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update gallery item (optional ganti gambar)
export const updateGallery = async (req, res) => {
  try {
    const { title, description } = req.body;
    const updateData = { title, description };
    if (req.file) updateData.src = `/uploads/${req.file.filename}`;

    const gallery = await Gallery.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!gallery) return res.status(404).json({ success: false, message: "Gallery item not found" });

    res.status(200).json({ success: true, data: gallery });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete gallery item
export const deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findByIdAndDelete(req.params.id);
    if (!gallery) return res.status(404).json({ success: false, message: "Gallery item not found" });
    res.status(200).json({ success: true, data: gallery });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};