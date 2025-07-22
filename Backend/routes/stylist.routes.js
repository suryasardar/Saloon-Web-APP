import express from "express";
import {
  createStylist,
  getStylists,
  updateStylist,
  deleteStylist
} from "../controllers/stylist.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getStylists);
router.post("/", protect, createStylist);
router.put("/:id", protect, updateStylist);
router.delete("/:id", protect, deleteStylist);

export default router;
