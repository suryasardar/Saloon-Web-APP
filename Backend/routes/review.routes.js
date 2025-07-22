import express from "express";
import { createReview, getReviews } from "../controllers/review.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getReviews);
router.post("/", protect, createReview); // Customers only

export default router;
