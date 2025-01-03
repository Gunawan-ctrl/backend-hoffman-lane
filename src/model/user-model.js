import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  id: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: Number,
    default: 2
  }
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
