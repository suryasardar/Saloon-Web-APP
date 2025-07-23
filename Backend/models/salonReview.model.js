import mongoose from "mongoose";

const salonReviewSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  salon: { type: mongoose.Schema.Types.ObjectId, ref: "Salon", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model("SalonReview", salonReviewSchema);
