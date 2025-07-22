import Review from "../models/review.model.js";
import Salon from "../models/salon.model.js";
import Stylist from "../models/stylist.model.js";

export const createReview = async (req, res) => {
  const review = await Review.create(req.body);
  // Optionally add to salon or stylist reviews
  if (review.salon) {
    await Salon.findByIdAndUpdate(review.salon, { $push: { reviews: review._id } });
  }
  res.status(201).json(review);
};

export const getReviews = async (req, res) => {
  const reviews = await Review.find().sort({ date: -1 });
  res.json(reviews);
};
