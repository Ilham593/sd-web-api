import express from "express";
import multer from "multer";
import {
  createGallery,
  getGallery,
  getGalleryImage,
  updateGallery,
  deleteGallery,
} from "../controllers/galleryController.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// GET LIST
router.get("/", getGallery);

// CREATE
router.post("/", upload.single("image"), createGallery);

// GET IMAGE
router.get("/:id/image", getGalleryImage);

// UPDATE
router.put("/:id", upload.single("image"), updateGallery);

// DELETE
router.delete("/:id", deleteGallery);

export default router;