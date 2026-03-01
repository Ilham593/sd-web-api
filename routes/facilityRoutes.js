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

router.post("/", upload.single("image"), createFacility);
router.get("/", getFacilities);
router.get("/:id/image", getFacilityImage);
router.delete("/:id", deleteFacility);

export default router;