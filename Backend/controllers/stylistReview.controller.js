import StylistReview from "../models/stylistReview.model.js";
import Stylist from "../models/stylist.model.js";
import User from "../models/user.model.js";
 

// ✅ Create Stylist Review — Only customer allowed
export const createStylistReview = async (req, res) => {
 const userId = req.user._id; // 👈 use authenticated user's ID only

  const user = await User.findById(userId);
  
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  if (user.role !== "customer") {
    return res.status(403).json({ message: "Only customers can give reviews." });
  }

  const { customerName, stylist, salon, rating, comment } = req.body;

  try {
    const review = await StylistReview.create({
      customerName,
      userId: req.user._id,
      stylist,
      salon,
      rating,
      comment
    });

    

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: "Failed to create review", error });
  }
};

// ✅ Read stylist reviews (public)
export const getStylistReviews = async (req, res) => {
  const filter = {};
  if (req.query.stylist) filter.stylist = req.query.stylist;

  try {
    const reviews = await StylistReview.find(filter).sort({ date: -1 });
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

// ✅ Delete Stylist Review — Only customer can delete own review
export const deleteStylistReview = async (req, res) => {
  // if (!req.user || req.user.role !== "customer") {
  //   return res.status(403).json({ message: "Only customers can delete reviews" });
  // }

  try {
    const review = await StylistReview.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only delete your own reviews" });
    }

    await StylistReview.findByIdAndDelete(req.params.id);
   
    res.json({ message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete review", error });
  }
};
