import express from "express";
import {
  createStylistReview,
  getStylistReviews,
  deleteStylistReview
} from "../controllers/stylistReview.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getStylistReviews);            // ?stylist=stylistId (filtering, optional)
router.post("/", protect, createStylistReview);
router.delete("/:id", protect, deleteStylistReview);

export default router;
