// backend/src/controllers/authController.js
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const user_signup = async (req, res) => {
    const {username, email, password} = req.body;
    try {
        if (!username || !email || !password) {
            return res.status(400).json({message: "Please fill in all fields."});
        }
        
        if (password.length < 6) {
            return res.status(400).json({message: "Password must be at least 6 characters long."});
        }

        const user = await User.findOne({email})
        if (user) return res.status(400).json({message: "Email already exists."});

        // Hash password before saving to the database
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword, // Store the hashed password
        })

        if (newUser) {
            // Generate JWT token
          generateToken(newUser._id, res) // MongoDB convention is "_id"
          await newUser.save();

          res.status(201).json({ // 201 means "Created"
            _id:newUser._id,
            username: newUser.username,
            email: newUser.email,
            profilePicture: newUser.profilePicture,
          });
        } else {
            res.status(400).json({message: "Invalid user data."});
        }
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({message: "Internal server error. Please try again later."});
    }
};

export const user_login = (req, res) => {
    res.send("Login route");
};