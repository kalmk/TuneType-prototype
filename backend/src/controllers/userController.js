// backend/src/controllers/userController.js

import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// Update profile (profilePic, bio, favoriteSongs)
export const updateProfile = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ message: "Not authorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { profilePic, bio, favoriteSongs } = req.body;

    if (profilePic) user.profilePic = profilePic;
    if (bio !== undefined) user.bio = bio;
    if (favoriteSongs) user.favoriteSongs = favoriteSongs;

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.log("Error updating profile:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get another user's profile by ID
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.log("Error fetching user profile:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    // Get all users but exclude their passwords
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.log("Error fetching users:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
