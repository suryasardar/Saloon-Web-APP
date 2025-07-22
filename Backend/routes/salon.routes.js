import express from "express";
import {
  getSalons,
  getSalonById,
  createSalon,
  updateSalon,
  deleteSalon
} from "../controllers/salon.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getSalons);
router.get("/:id", getSalonById);
// Admin routes
router.post("/", protect, createSalon);
router.put("/:id", protect, updateSalon);
router.delete("/:id", protect, deleteSalon);

export default router;
