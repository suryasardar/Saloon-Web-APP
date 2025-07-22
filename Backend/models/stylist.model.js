import mongoose from "mongoose";

const stylistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: String,
  rating: { type: Number, default: 0 },
  salonId: { type: mongoose.Schema.Types.ObjectId, ref: "Salon" },
  profile: String,
}, { timestamps: true });

export default mongoose.model("Stylist", stylistSchema);
