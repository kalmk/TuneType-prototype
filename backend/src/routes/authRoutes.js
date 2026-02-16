// backend/src/routes/authRoutes.js

import express from "express";
import { signup, login, logout } from "../controllers/authController.js";
import { getMe } from "../controllers/authController.js";
import { getAllUsers } from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/me", getMe);

export default router;
