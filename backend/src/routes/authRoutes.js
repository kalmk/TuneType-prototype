// backend/src/routes/authRoutes.js

import express from "express";
import { signup, login, logout } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// add more later

export default router;
