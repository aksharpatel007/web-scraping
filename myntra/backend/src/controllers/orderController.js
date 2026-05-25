import { Order } from "../models/Order.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createOrder = asyncHandler(async (req, res) => {
    const payload = {
        ...req.body,
        user: req.user._id,
        trackingId: `TRK-${Date.now()}`,
    };

    const order = await Order.create(payload);
    res.status(201).json(order);
});

export const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
});

export const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find().populate("user", "name email").sort({ createdAt: -1 });
    res.json(orders);
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
    const order = await Order.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status, trackingId: req.body.trackingId },
        { new: true }
    );

    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
});
