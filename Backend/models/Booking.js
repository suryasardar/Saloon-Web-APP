import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  salonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Salon' },
  userName: String,
  date: String,
  time: String,
  service: String,
  stylist: String,
  status: {
    type: String,
    enum: ['booked', 'checked-in', 'completed'],
    default: 'booked',
  }
});

export default mongoose.model('Booking', bookingSchema);