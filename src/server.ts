import express, { Application } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";

dotenv.config();
const app: Application = express();

// Middleware
app.use(express.json());

// Routes (example only)
app.get("/", (req, res) => {
  res.send("Courier API running with TypeScript + Mongoose...");
});

// Connect DB
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
