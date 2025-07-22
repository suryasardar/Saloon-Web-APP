
import dotenv from "dotenv";
dotenv.config();

import { createServer } from "http";
import { Server } from "socket.io";
import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;
connectDB();

const server = createServer(app);

// ---- Map User IDs to Socket IDs ----
const userSockets = {}; // { userId: socketId }
app.set("userSockets", userSockets);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.set("io", io);

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("Socket connected", socket.id);

  // User identifies themselves (send after login)
  socket.on("identify", (userId) => {
    userSockets[userId] = socket.id;
    console.log(`User ${userId} is now on socket ${socket.id}`);
  });

  socket.on("joinSalon", (salonId) => {
    socket.join("salon-" + salonId);
  });

  // Clean up userSockets on disconnect
  socket.on("disconnect", () => {
    for (const [userId, sockId] of Object.entries(userSockets)) {
      if (sockId === socket.id) {
        delete userSockets[userId];
        break;
      }
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

