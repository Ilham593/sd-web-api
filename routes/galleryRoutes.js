import express from "express";
import multer from "multer";
import { getGallery, createGallery, updateGallery, deleteGallery } from "../controllers/galleryController.js";

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.get("/", getGallery);
router.post("/", upload.single("src"), createGallery);
router.put("/:id", upload.single("src"), updateGallery);
router.delete("/:id", deleteGallery);

export default router;