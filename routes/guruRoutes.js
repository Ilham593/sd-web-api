import express from "express"
import {
  getGuru,
  createGuru,
  updateGuru,
  deleteGuru
} from "../controllers/guruController.js"

const router = express.Router()

router.get("/", getGuru)
router.post("/", createGuru)
router.put("/:id", updateGuru)
router.delete("/:id", deleteGuru)

export default router