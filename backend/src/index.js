import dotenv from 'dotenv';
import { connectDB } from './config/db';
// backend/src/index.js

import express from "express";
import { connectDB } from "./config/db.js";

dotenv.config();
const PORT = process.env.PORT;

app.use(express.json()); // Extract JSON data from the request body (req.body in authController.js)

const app = express();

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  connectDB();
});
