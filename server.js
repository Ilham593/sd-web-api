import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import guruRoutes from "./routes/guruRoutes.js"
import statsRoutes from "./routes/statsRoutes.js"
import ppdbRoutes from "./routes/ppdbRoutes.js"
import galleryRoutes from "./routes/galleryRoutes.js"
import path from "path"
import facilityRoutes from "./routes/facilityRoutes.js"
dotenv.config()
connectDB()

const app = express()

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://sdn43bkl.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
  credentials: true
}));

app.use(express.json())
app.use("/uploads", express.static("uploads"));
app.use("/api/guru", guruRoutes)
app.use("/api/stats", statsRoutes)
app.use("/api/ppdb", ppdbRoutes)
app.use("/api/gallery", galleryRoutes)
app.use("/api/facilities", facilityRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})