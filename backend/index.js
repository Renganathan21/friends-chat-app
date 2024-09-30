import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/AuthRoutes.js";
import contactsRoutes from "./routes/ContactRoutes.js";
import channelRoutes from "./routes/ChannelRoutes.js";
import messagesRoutes from "./routes/MessagesRoute.js";
import setupSocket from "./socket.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 3001;

const databaseUrl = "mongodb+srv://sathishsatish2002:3T9ashSQUpm3z5pV@cluster0.r3stg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const allowedOrigins = [
  "http://192.168.1.10:5173", // Vite development server
  "https://friends-123.netlify.app", // Production URL
];

// Configure CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Allow requests from these origins
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies or auth headers
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

// Handle preflight `OPTIONS` requests globally
app.options("*", cors());

// Serve static files
app.use("/uploads/profiles/", express.static("uploads/profiles"));
app.use("/uploads/files", express.static("uploads/files"));

// Parse cookies and JSON requests
app.use(cookieParser());
app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/channel", channelRoutes);
app.use("/api/contacts", contactsRoutes);

// Start the server
const server = app.listen(port, () => {
  console.log("Server is running on port", port);
});

// Initialize WebSocket
setupSocket(server);

// Connect to MongoDB
mongoose.connect(databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB successfully");
}).catch((error) => {
  console.error("MongoDB connection error:", error);
});
