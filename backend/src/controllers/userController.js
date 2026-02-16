import User from "../models/userModel.js";

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
