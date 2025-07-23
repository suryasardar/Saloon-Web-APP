import express from "express";
import cors from "cors";
import morgan from "morgan";

// Route imports
import authRoutes from "./routes/auth.routes.js";
import salonRoutes from "./routes/salon.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import stylistRoutes from "./routes/stylist.routes.js";
import stylistReviewRoutes from "./routes/stylistReview.routes.js";
import queueRoutes from "./routes/queue.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import salonReviewRoutes from "./routes/salonReview.route.js";
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Register Routes
app.use("/api/auth", authRoutes);
app.use("/api/salons", salonRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/stylists", stylistRoutes);
app.use("/api/reviews", stylistReviewRoutes);
app.use("/api/queue", queueRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/salonReview",salonReviewRoutes);

// Optionally, add a basic test route
app.get("/", (req, res) => {
  res.send("Salon backend API is running!");
});

export default app;
