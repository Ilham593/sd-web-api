import Facility from "../models/Facility.js";
import fs from "fs";

// CREATE
export const createFacility = async (req, res) => {
  try {
    const { title, desc } = req.body;

    if (!title || !req.file) {
      return res.status(400).json({
        success: false,
        message: "Title dan Image wajib diisi",
      });
    }

    const newFacility = new Facility({
      title,
      desc: desc || "",
      image: req.file.filename,
    });

    await newFacility.save();

    res.status(201).json({
      success: true,
      data: newFacility,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL
export const getFacilities = async (req, res) => {
  try {
    const facilities = await Facility.find().sort({ createdAt: -1 });

    res.json({
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

// DELETE
export const deleteFacility = async (req, res) => {
  try {
    const facility = await Facility.findById(req.params.id);

    if (!facility) {
      return res.status(404).json({
        success: false,
        message: "Data tidak ditemukan",
      });
    }

    const filePath = `uploads/facilities/${facility.image}`;
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await facility.deleteOne();

    res.json({
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