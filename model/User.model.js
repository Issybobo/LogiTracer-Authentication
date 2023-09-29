import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide a first name"],
  },
  lastName: {
    type: String,
    required: [true, "Please provide a last name"],
  },
  email: {
    type: String,
    required: [true, "Please provide a unique email"],
    unique: true,
  },
  mobile: {
    type: Number,
    required: [true, "Please provide a mobile number"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  confirmedpassword: {
    type: String,
    required: [true, "Please provide a password confirmation"],
  },
  
});

export default mongoose.model("User", UserSchema);
