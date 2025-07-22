import express from "express";
import {
  createBooking,
  getBookings,
  updateBooking,
  deleteBooking
} from "../controllers/booking.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protect, getBookings); // Optionally customer/admin only
router.post("/", protect, createBooking);
router.put("/:id", protect, updateBooking);
router.delete("/:id", protect, deleteBooking);

export default router;
