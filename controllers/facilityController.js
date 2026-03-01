import Facility from "../models/Facility.js";

// CREATE
export const createFacility = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Gambar wajib diupload",
      });
    }

    const facility = new Facility({
      title: req.body.title,
      desc: req.body.desc || "",
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });

    await facility.save();

    res.status(201).json({
      success: true,
      message: "Facility berhasil dibuat",
    });
  } catch (error) {
    console.error("CREATE ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE
export const updateFacility = async (req, res) => {
  try {
    const facility = await Facility.findById(req.params.id);

    if (!facility) {
      return res.status(404).json({
        success: false,
        message: "Data tidak ditemukan",
      });
    }

    facility.title = req.body.title || facility.title;
    facility.desc = req.body.desc ?? facility.desc;

    if (req.file) {
      facility.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    await facility.save();

    res.json({
      success: true,
      message: "Facility berhasil diupdate",
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL (tanpa kirim buffer)
export const getFacilities = async (req, res) => {
  try {
    const facilities = await Facility.find()
      .select("-image.data")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: facilities,
    });
  } catch (error) {
    console.error("GET ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET IMAGE
export const getFacilityImage = async (req, res) => {
  try {
    const facility = await Facility.findById(req.params.id);

    if (!facility || !facility.image?.data) {
      return res.status(404).json({
        success: false,
        message: "Gambar tidak ditemukan",
      });
    }

    res.set("Content-Type", facility.image.contentType);
    res.send(facility.image.data);
  } catch (error) {
    console.error("IMAGE ERROR:", error);
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

    await facility.deleteOne();

    res.json({
      success: true,
      message: "Facility berhasil dihapus",
    });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};