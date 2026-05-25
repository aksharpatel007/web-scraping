import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
    {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        title: String,
        image: String,
        quantity: { type: Number, required: true, min: 1 },
        unitPrice: { type: Number, required: true, min: 0 },
    },
    { _id: false }
);

const orderSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
        items: [orderItemSchema],
        status: {
            type: String,
            enum: ["pending", "confirmed", "packed", "shipped", "delivered", "cancelled"],
            default: "pending",
            index: true,
        },
        trackingId: { type: String, index: true },
        totalAmount: { type: Number, required: true },
        shippingAddress: {
            fullName: String,
            phone: String,
            line1: String,
            line2: String,
            city: String,
            state: String,
            zip: String,
            country: String,
        },
    },
    { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
