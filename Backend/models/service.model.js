import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: Number, required: true }, // in minutes
  price: { type: Number, required: true },
  salonId: { type: mongoose.Schema.Types.ObjectId, ref: "Salon" },
}, { timestamps: true });

export default mongoose.model("Service", serviceSchema);
