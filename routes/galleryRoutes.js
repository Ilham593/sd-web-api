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

router.get("/", getGallery);
router.post("/", upload.single("image"), createGallery);
router.get("/:id/image", getGalleryImage);
router.put("/:id", upload.single("image"), updateGallery);
router.delete("/:id", deleteGallery);

export default router;