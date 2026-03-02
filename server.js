const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// --- 1. MIDDLEWARE ---
// Sesuaikan origin dengan URL Frontend kamu nanti agar tidak kena block CORS
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://sdn43bkl.vercel.app", // Tambahkan domain aslimu di sini
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("CORS Policy: Origin not allowed"));
      }
    },
  }),
);
app.use(express.json());

// --- 2. DATABASE CONNECTION (MONGODB ATLAS) ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to SDN 43 Database (MongoDB Atlas)"))
  .catch((err) => console.log("❌ Connection Error:", err));

// --- 3. IMPORT ROUTES ---
const statsRoutes = require("./routes/statsRoutes");
const rombelRoutes = require("./routes/rombelRoutes");
const guruRoutes = require("./routes/guruRoutes");

// --- 4. REGISTER ROUTES ---
app.use("/api/stats", statsRoutes);
app.use("/api/rombel", rombelRoutes);
app.use("/api/guru", guruRoutes);

// --- 5. SERVER RUNNING ---
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}