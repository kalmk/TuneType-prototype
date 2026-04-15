import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePic: {
      type: String,
      default: "neutral.jpeg", // default profile picture
    },
    bio: {
      type: String,
      default: "",
    },
    favoriteSongs: {
      type: [String], // store song IDs
      default: [],
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;