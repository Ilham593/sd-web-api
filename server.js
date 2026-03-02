const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// --- 1. MIDDLEWARE CORS ---
// Tips: Untuk awal deploy, kamu bisa gunakan '*' agar tidak pusing 
// tapi untuk keamanan, daftar domain ini sudah benar.
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://sdn43bkl.vercel.app", // Domain Frontend Vercel kamu
  "https://sdn43-frontend.vercel.app" // Tambahkan alternatif jika ada
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Izinkan request tanpa origin (seperti Postman atau mobile apps)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
        callback(null, true);
      } else {
        callback(new Error("CORS Policy: Origin " + origin + " not allowed"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

app.use(express.json());

// --- 2. DATABASE CONNECTION ---
// Pastikan MONGO_URI sudah di-set di Environment Variables Vercel
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// --- 3. ROUTES ---
const statsRoutes = require("./routes/statsRoutes");
const rombelRoutes = require("./routes/rombelRoutes");
const guruRoutes = require("./routes/guruRoutes");

// Route Testing (Cek apakah BE hidup)
app.get("/", (req, res) => {
  res.json({ message: "SDN 43 API is Running..." });
});

app.use("/api/stats", statsRoutes);
app.use("/api/rombel", rombelRoutes);
app.use("/api/guru", guruRoutes);

// --- 4. EXPORTS & SERVER RUNNING ---
// PENTING: Vercel membutuhkan module.exports dari aplikasi express
// --- 4. EXPORTS & SERVER RUNNING ---
const PORT = process.env.PORT || 5000;

// Ini hanya jalan di laptop (Lokal)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Local Server running on http://localhost:${PORT}`);
  });
}

// WAJIB ADA untuk Vercel
module.exports = app;