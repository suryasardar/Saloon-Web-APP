import express from "express";
import {
  getQueueForSalon,
  joinQueue,
  updateQueueStatus,
  leaveQueue
} from "../controllers/queue.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/:salonId", getQueueForSalon);
router.post("/", protect, joinQueue);
router.put("/:id", protect, updateQueueStatus);
router.delete("/:entryId", protect, leaveQueue);

export default router;
