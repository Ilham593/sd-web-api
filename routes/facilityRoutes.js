import express from "express";
import multer from "multer";
import {
  createFacility,
  getFacilities,
  deleteFacility,
  getFacilityImage,
} from "../controllers/facilityController.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 }, // max 2MB
});

// CREATE
router.post("/", upload.single("image"), createFacility);

// GET LIST
router.get("/", getFacilities);

// GET IMAGE
router.get("/:id/image", getFacilityImage);

// DELETE
router.delete("/:id", deleteFacility);

export default router;