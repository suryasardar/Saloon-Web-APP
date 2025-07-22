import Booking from "../models/booking.model.js";
import User from "../models/user.model.js";

export const createBooking = async (req, res) => {
  const { user} = req.body;
  
      // Fetch user by ID
      const userID = await User.findById(user);
       if (!userID) {
        return res.status(404).json({ message: "User not found." });
      }
     
      // Check if role is 'customer'
      if (userID.role !== "customer") {
        return res.status(403).json({ message: "Only User can Book." });
      }
  const booking = await Booking.create(req.body);
  res.status(201).json(booking);
};

export const getBookings = async (req, res) => {
  let filter = {};
  if (req.query.userId) filter.user = req.query.userId;
  if (req.query.salonId) filter.salon = req.query.salonId;
  const bookings = await Booking.find(filter)
    .populate("salon service stylist user");
  res.json(bookings);
};

export const updateBooking = async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!booking) return res.status(404).json({ message: "Booking not found" });
  res.json(booking);
};

export const deleteBooking = async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);
  res.json({ message: "Booking deleted" });
};
