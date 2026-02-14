// backend/src/index.js

import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use("/api/auth", authRoutes)
// add more apis later

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  connectDB();
});
