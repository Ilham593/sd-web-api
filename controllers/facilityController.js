import mongoose from "mongoose";
import Facility from "../models/Facility.js";

// CREATE
export const createFacility = async (req, res) => {
  try {
    const { title, desc } = req.body;

    if (!title || !desc) {
      return res.status(400).json({
        success: false,
        message: "Title dan deskripsi wajib diisi",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Gambar wajib diupload",
      });
    }

    const facility = await Facility.create({
      title,
      desc,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });

    res.status(201).json({
      success: true,
      data: facility._id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL (tanpa buffer)
export const getFacilities = async (req, res) => {
  try {
    const facilities = await Facility.find()
      .select("-image.data")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: facilities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET IMAGE BY ID
export const getFacilityImage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "ID tidak valid",
      });
    }

    const facility = await Facility.findById(id).select("image");

    if (!facility || !facility.image?.data) {
      return res.status(404).json({
        success: false,
        message: "Gambar tidak ditemukan",
      });
    }

    res.set("Content-Type", facility.image.contentType);
    res.set("Cache-Control", "public, max-age=31536000");

    res.status(200).send(facility.image.data);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE
export const deleteFacility = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "ID tidak valid",
      });
    }

    const facility = await Facility.findByIdAndDelete(id);

    if (!facility) {
      return res.status(404).json({
        success: false,
        message: "Data tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Facility berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};