import express, { Application } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/auth";

dotenv.config();
const app: Application = express();

// Middleware
app.use(express.json());

app.use("/api/auth", authRoutes);

// Connect DB
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
