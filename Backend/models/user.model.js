import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed password
  role: { type: String, enum: ["customer", "admin"], default: "customer" },
}, { timestamps: true });

export default mongoose.model("User", userSchema);
