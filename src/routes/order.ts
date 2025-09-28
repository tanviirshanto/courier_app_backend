import express from "express";
import { createOrder, listOrders } from "../controllers/orderController";
import { protect } from "../middleware/auth";

const router = express.Router();

// Customer: create order
router.post("/create", protect, createOrder);

// All roles: list orders (filtered by role)
router.get("/list", protect, listOrders);

export default router;
