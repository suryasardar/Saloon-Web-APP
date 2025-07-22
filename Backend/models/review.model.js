import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: String,
  stylist: { type: mongoose.Schema.Types.ObjectId, ref: "Stylist", default: null },
  salon: { type: mongoose.Schema.Types.ObjectId, ref: "Salon" },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model("Review", reviewSchema);
