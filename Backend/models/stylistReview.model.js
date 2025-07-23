import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
   customerName: { type: String, required: true },
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  stylist: { type: mongoose.Schema.Types.ObjectId, ref: "Stylist", required: true },
  salon: { type: mongoose.Schema.Types.ObjectId, ref: "Salon" },          // for context/filtering
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model("Review", reviewSchema);
