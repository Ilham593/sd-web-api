import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import serverless from "serverless-http";
import connectDB from "./config/db.js";
import guruRoutes from "./routes/guruRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import ppdbRoutes from "./routes/ppdbRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import facilityRoutes from "./routes/facilityRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://sdn43bkl.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
  credentials: true
}));

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

app.use("/api/guru", guruRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/ppdb", ppdbRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/facilities", facilityRoutes);

// ❌ HAPUS app.listen
// ✅ EXPORT handler
export default serverless(app);