// backend/src/models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema( // Creating a schema that notes the fields a user will have
  {
    email: {
        type: String,
        required: true,
        unique: true,
     },
    username: {
        type: String,
        required: true,
        unique: true,
     },
    password: {
        type: String,
        required: true,
        minlength: 6,
        },
    profilePicture: {
        type: String,
        default: '',
        },
    },
    { timestamps: true } // Good for noting when the user was created or updated
);

const User = mongoose.model('User', userSchema); // Needed to create the model from the schema

export default User; // Export the model to use it in other parts of our game