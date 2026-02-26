import express from "express";
import multer from "multer";
import {
  createFacility,
  getFacilities,
  deleteFacility,
} from "../controllers/facilityController.js";

const router = express.Router();

// MULTER CONFIG
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/facilities");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + ".jpg");
  },
});

const upload = multer({ storage });

// ROUTES
router.post("/", upload.single("image"), createFacility);
router.get("/", getFacilities);
router.delete("/:id", deleteFacility);

export default router;