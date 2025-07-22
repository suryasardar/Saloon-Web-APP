import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  salon: { type: mongoose.Schema.Types.ObjectId, ref: "Salon", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
  stylist: { type: mongoose.Schema.Types.ObjectId, ref: "Stylist" },
  date: { type: String, required: true }, // "YYYY-MM-DD"
  time: { type: String, required: true }, // "HH:mm"
  status: { type: String, enum: ["upcoming", "completed", "cancelled"], default: "upcoming" }
}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);
