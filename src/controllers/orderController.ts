import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import Order from "../models/Order";

// Create new order (Customer)
export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { pickup, dropoff } = req.body;

    if (!pickup || !dropoff) {
      return res.status(400).json({ message: "Pickup and dropoff are required" });
    }

    const order = await Order.create({
      pickup,
      dropoff,
      customer: req.user?.id,
      status: "pending",
      details: "Order created",
    });

    return res.status(201).json({ message: "Order created", order });
  } catch (error) {
    console.error("Create order error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// List orders (role-based)
export const listOrders = async (req: AuthRequest, res: Response) => {
  try {
    let orders;

    if (req.user?.role === "admin") {
      orders = await Order.find().populate("customer courier", "name phone role");
    } else if (req.user?.role === "courier") {
      orders = await Order.find({ courier: req.user?.id }).populate("customer", "name phone");
    } else {
      orders = await Order.find({ customer: req.user?.id }).populate("courier", "name phone");
    }

    return res.json({ orders });
  } catch (error) {
    console.error("List orders error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
