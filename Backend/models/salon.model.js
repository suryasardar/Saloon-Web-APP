import mongoose from "mongoose";

const salonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: String,
  address: String,
  phone: String,
  email: String,
  latitude: { type: Number },   // ADD THIS
  longitude: { type: Number },  // ADD THIS
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
  stylists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Stylist" }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  currentQueue: [{ type: mongoose.Schema.Types.ObjectId, ref: "QueueEntry" }],
  averageWaitTime: { type: Number, default: 0 }, // minutes
}, { timestamps: true });

export default mongoose.model("Salon", salonSchema);
