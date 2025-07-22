import mongoose from "mongoose";

const queueEntrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  salonId: { type: mongoose.Schema.Types.ObjectId, ref: "Salon" },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
  stylistId: { type: mongoose.Schema.Types.ObjectId, ref: "Stylist" },
  status: { type: String, enum: ["waiting", "in_service", "completed", "cancelled"], default: "waiting" },
  joinedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model("QueueEntry", queueEntrySchema);
