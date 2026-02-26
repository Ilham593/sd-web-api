import express from "express";
import multer from "multer";
import path from "path";
import { getGallery, createGallery, updateGallery, deleteGallery } from "../controllers/galleryController.js";

const router = express.Router();

// Setup multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Routes
router.get("/", getGallery);
router.post("/", upload.single("src"), createGallery);
router.put("/:id", upload.single("src"), updateGallery);
router.delete("/:id", deleteGallery);

export default router;