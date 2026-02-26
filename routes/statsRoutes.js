import express from "express"
import {
  getStats,
  createStats,
  updateStats,
  deleteStats
} from "../controllers/statsController.js"

const router = express.Router()

router.get("/", getStats)
router.post("/", createStats)
router.put("/:id", updateStats)
router.delete("/:id", deleteStats)

export default router