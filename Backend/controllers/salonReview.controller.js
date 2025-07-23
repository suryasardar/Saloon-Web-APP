import SalonReview from "../models/salonReview.model.js";
import User from "../models/user.model.js";

// ✅ Create Review — Only customer allowed
export const createSalonReview = async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  if (user.role !== "customer") {
    return res.status(403).json({ message: "Only customers can give reviews." });
  }

  const { salon, rating, comment } = req.body;
  const customerName = user.name;

  try {
    // Check if a review already exists from this user for the same salon
    const existingReview = await SalonReview.findOne({ userId, salon });
       
    if (existingReview) {
      // Update existing review
      existingReview.rating = rating;
      existingReview.comment = comment;
      existingReview.customerName = customerName;
      await existingReview.save();

      return res.status(200).json({ message: "Review updated", review: existingReview });
    } else {
      // Create a new review
      const newReview = await SalonReview.create({
        customerName,
        userId,
        salon,
        rating,
        comment
      });

      return res.status(201).json({ message: "Review created", review: newReview });
    }
  } catch (error) {
    return res.status(500).json({ message: "Failed to create or update review", error });
  }
};

// ✅ Get Reviews (Public or restricted by query)
export const getSalonReviews = async (req, res) => {
  const filter = {};
  if (req.query.salon) filter.salon = req.query.salon;

  try {
    const reviews = await SalonReview.find(filter).sort({ date: -1 });
     let averageRating = 0;
    if (reviews.length > 0) {
      const total = reviews.reduce((acc, review) => acc + review.rating, 0);
      averageRating = total / reviews.length;
      // Optionally limit to 1 decimal place:
      averageRating = Math.round(averageRating * 10) / 10;
    }
    res.json({
      reviews,
      averageRating, // average out of 5
      maxRating: 5,
      reviewCount: reviews.length
    });
    
  } catch (error) {
    res.status(500).json({ message: "Failed to get reviews", error });
  }
};

// ✅ Delete Review — Only customer can delete own review
export const deleteSalonReview = async (req, res) => {
  if (req.user.role !== "customer") {
    return res.status(403).json({ message: "Only customers can delete reviews" });
  }

  try {
    const review = await SalonReview.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only delete your own reviews" });
    }

    await SalonReview.findByIdAndDelete(req.params.id);
    res.json({ message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete review", error });
  }
};
