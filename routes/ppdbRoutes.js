import express from "express";
import { getPpdb, createPpdb, updatePpdb, deletePpdb } from "../controllers/ppdbController.js";

const router = express.Router();

router.get("/", getPpdb);
router.post("/", createPpdb);
router.put("/:id", updatePpdb);
router.delete("/:id", deletePpdb);

export default router;