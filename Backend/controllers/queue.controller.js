
import QueueEntry from "../models/queue.model.js";
import Salon from "../models/salon.model.js";
import User from "../models/user.model.js";

// Utility to update queue and notify users in real-time
async function broadcastQueueUpdate(salonId, io, userSockets) {
  // Find ordered queue (waiting & in_service)
  const queue = await QueueEntry.find({ salonId, status: { $in: ["waiting", "in_service"] } })
    .sort({ joinedAt: 1 })
    .populate("userId serviceId");

  let cumulative = 0;
  const queueUpdates = queue.map((entry, idx) => {
    const estimatedWait = cumulative;
    cumulative += entry.serviceId.duration;
    return {
      userId: entry.userId._id.toString(),
      queueEntryId: entry._id.toString(),
      estimatedWaitTime: estimatedWait,
      position: idx + 1
    }
  });

  // Send queue update to everyone in salon
  io.to(`salon-${salonId}`).emit("queueUpdate", queueUpdates);

  // Notify the next user if any (first in queue)
  if (queue.length > 0) {
    const nextUserId = queue[0].userId._id.toString();
    const socketId = userSockets[nextUserId];
    if (socketId) {
      io.to(socketId).emit("yourTurn", { message: "It's your turn!", queueEntryId: queue[0]._id.toString() });
    }
  }
}

// ---- Queue Controllers ----

export const getQueueForSalon = async (req, res) => {
  const queue = await QueueEntry.find({
      salonId: req.params.salonId,
      status: { $in: ["waiting", "in_service"] }
    })
    .sort({ joinedAt: 1 })
    .populate("userId serviceId stylistId");
  res.json(queue);
};

export const joinQueue = async (req, res) => {
  try {
    const { userId } = req.body;

    // Fetch user by ID
    const user = await User.findById(userId);
    const alreadyInQueue = await QueueEntry.findOne({ userId: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (alreadyInQueue) {
      return res.status(400).json({ message: "User is already in queue." });
    }

    // Check if role is 'customer'
    if (user.role !== "customer") {
      return res.status(403).json({ message: "Only customers can join the queue." });
    }

    // Create queue entry
    const queueEntry = await QueueEntry.create(req.body);

    // Add to salon's current queue
    await Salon.findByIdAndUpdate(queueEntry.salonId, {
      $push: { currentQueue: queueEntry._id }
    });

    // Real-time queue update
    const io = req.app.get("io");
    const userSockets = req.app.get("userSockets") || {};
    await broadcastQueueUpdate(queueEntry.salonId, io, userSockets);

    res.status(201).json(queueEntry);

  } catch (err) {
    console.error("Error in joinQueue:", err);
    res.status(500).json({ message: "Failed to join queue." });
  }
};

export const updateQueueStatus = async (req, res) => {
  const entry = await QueueEntry.findByIdAndUpdate(req.params.id, req.body, { new: true });

  // Real-time update!
  const io = req.app.get("io");
  const userSockets = req.app.get("userSockets") || {};
  if (entry) await broadcastQueueUpdate(entry.salonId, io, userSockets);

  res.json(entry);
};

// ADMIN ONLY (protect with admin middleware in routing)
export const leaveQueue = async (req, res) => {
  const { entryId } = req.params;

  // First, find the entry so you know which salon to update
  const queueEntry = await QueueEntry.findById(entryId);
  if (!queueEntry) return res.status(404).json({ message: "Queue entry not found" });

  // Delete the QueueEntry
  await QueueEntry.findByIdAndDelete(entryId);

  // Remove the reference from the salon's currentQueue array
  await Salon.findByIdAndUpdate(queueEntry.salonId, {
    $pull: { currentQueue: entryId }
  });

  // Real-time update!
  const io = req.app.get("io");
  const userSockets = req.app.get("userSockets") || {};
  await broadcastQueueUpdate(queueEntry.salonId, io, userSockets);

  res.json({ message: "Removed from queue" });
};
