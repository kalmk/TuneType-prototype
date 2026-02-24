// backend/src/routes/userRoutes.js
import express from "express";
import { getAllUsers, updateProfile, getUserProfile } from "../controllers/userController.js";

const router = express.Router();

router.get("/all", getAllUsers);
router.put("/update", updateProfile); // update logged-in user's profile
router.get("/:userId", getUserProfile); // get another user's profile by ID

export default router;