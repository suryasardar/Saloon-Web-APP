import express from "express";
import {
  createSalonReview,
  getSalonReviews,
  deleteSalonReview
} from "../controllers/salonReview.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getSalonReviews);           // ?salon=salonId filtering (optional)
router.post("/", protect, createSalonReview);
router.delete("/:id", protect, deleteSalonReview);

export default router;
