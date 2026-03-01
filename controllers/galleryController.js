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

    const gallery = new Gallery({
      title,
      description,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });

    await gallery.save();

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

// GET ALL (tanpa kirim buffer)
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
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery || !gallery.image?.data) {
      return res.status(404).json({
        success: false,
        message: "Gambar tidak ditemukan",
      });
    }

    res.set("Content-Type", gallery.image.contentType);
    res.send(gallery.image.data);
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
    const { title, description } = req.body;

    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;

    if (req.file) {
      updateData.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    const gallery = await Gallery.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      data: gallery,
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
    const gallery = await Gallery.findByIdAndDelete(req.params.id);

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