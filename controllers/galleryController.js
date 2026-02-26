import Gallery from "../models/Gallery.js";
import cloudinary from "../config/cloudinary.js";

// Get all gallery images
export const getGallery = async (req, res) => {
  try {
    const data = await Gallery.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Create new gallery image
export const createGallery = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Gambar wajib diupload" });
    }

    // Upload ke Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "sdn43" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    const gallery = await Gallery.create({
      title,
      description,
      src: result.secure_url,
    });

    res.status(201).json({ success: true, data: gallery });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update gallery
export const updateGallery = async (req, res) => {
  try {
    const { title, description } = req.body;

    const updateData = { title, description };

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "sdn43" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      updateData.src = result.secure_url;
    }

    const gallery = await Gallery.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!gallery) {
      return res.status(404).json({ success: false, message: "Gallery item not found" });
    }

    res.status(200).json({ success: true, data: gallery });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete gallery
export const deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findByIdAndDelete(req.params.id);

    if (!gallery) {
      return res.status(404).json({ success: false, message: "Gallery item not found" });
    }

    res.status(200).json({ success: true, data: gallery });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};