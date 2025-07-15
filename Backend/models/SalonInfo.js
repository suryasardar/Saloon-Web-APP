import mongoose from 'mongoose';

const salonInfoSchema = new mongoose.Schema({
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  images: [String], // Store image URLs
  address: String,
  contact: String,
  services: [
    {
      name: String,
      duration: Number,
      price: Number,
    },
  ],
stylists: [String],
  seats: Number
});

export default mongoose.model('SalonInfo', salonInfoSchema);