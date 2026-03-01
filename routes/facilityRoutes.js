import express from "express";
import multer from "multer";
import {
  createFacility,
  updateFacility,
  getFacilities,
  getFacilityImage,
  deleteFacility,
} from "../controllers/facilityController.js";

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

// Middleware handle error multer
const uploadMiddleware = (req, res, next) => {
  upload.single("image")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        success: false,
        message: "Ukuran file maksimal 2MB",
      });
    } else if (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
    next();
  });
};

router.post("/", uploadMiddleware, createFacility);
router.put("/:id", uploadMiddleware, updateFacility);
router.get("/", getFacilities);
router.get("/:id/image", getFacilityImage);
router.delete("/:id", deleteFacility);

export default router;