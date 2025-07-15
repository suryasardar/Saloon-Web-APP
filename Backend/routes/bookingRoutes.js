// import express from 'express';
// const router = express.Router();
// import Booking from '../models/Booking.js';

// // Create a booking
// router.post('/', async (req, res) => {
//   const booking = new Booking(req.body);
//   await booking.save();
//   res.status(201).json(booking);
// });

// // Get bookings by salon
// router.get('/salon/:salonId', async (req, res) => {
//   const bookings = await Booking.find({ salonId: req.params.salonId });
//   res.json(bookings);
// });

// export default router;
