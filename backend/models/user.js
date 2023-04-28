// If you plan to implement user authentication and user-specific functionality such 
// as saved places, you may want to create a User model to store user information.
import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true},
    lastName: String,
    dob: Date,
    savedPlaces: [String]
});

const User = new mongoose.Model("User", UserSchema);
export default User;