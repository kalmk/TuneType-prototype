import dotenv from 'dotenv';
import { connectDB } from './config/db';
// backend/src/index.js

dotenv.config()

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)});
    connectDB()

console.log("Hello world")