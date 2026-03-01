import mongoose from "mongoose";
import Gallery from "../models/Gallery.js";

// CREATE
export const createGallery = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title wajib diisi",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Gambar wajib diupload",
      });
    }

    const gallery = await Gallery.create({
      title,
      description,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });

    res.status(201).json({
      success: true,
      data: gallery._id,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// GET ALL (tanpa buffer)
export const getGallery = async (req, res) => {
  try {
    const data = await Gallery.find()
      .select("-image.data")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// GET IMAGE BY ID
export const getGalleryImage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "ID tidak valid",
      });
    }

    const gallery = await Gallery.findById(id).select("image");

    if (!gallery || !gallery.image?.data) {
      return res.status(404).json({
        success: false,
        message: "Gambar tidak ditemukan",
      });
    }

    res.set("Content-Type", gallery.image.contentType);
    res.set("Cache-Control", "public, max-age=31536000");

    res.status(200).send(gallery.image.data);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// UPDATE
export const updateGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "ID tidak valid",
      });
    }

    const gallery = await Gallery.findById(id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery tidak ditemukan",
      });
    }

    if (title) gallery.title = title;
    if (description) gallery.description = description;

    if (req.file) {
      gallery.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    await gallery.save();

    res.status(200).json({
      success: true,
      data: gallery._id,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// DELETE
export const deleteGallery = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "ID tidak valid",
      });
    }

    const gallery = await Gallery.findByIdAndDelete(id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Gallery berhasil dihapus",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};