// backend/src/utils/generateToken.js
import jwt from 'jsonwebtoken';
export const generateToken = (userID, res) => {

    const token = jwt.sign({userID}, process.env.JWT_SECRET, { // Generate token
        expiresIn: '7d' // Token expires in 7 days
    }) 

    res.cookie("jwt", token, { // Send token to user in a cookie
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        httpOnly: true, // Cookie is only accessible via HTTP(s), not JS
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    })

    return token;
}