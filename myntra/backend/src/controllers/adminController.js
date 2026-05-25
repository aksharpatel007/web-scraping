import fs from "node:fs";
import { Product } from "../models/Product.js";
import { Order } from "../models/Order.js";
import { User } from "../models/User.js";
import { parseProductsCsv } from "../services/csvService.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const slugify = (value) =>
    value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

export const importProductsCsv = asyncHandler(async (req, res) => {
    if (!req.file) return res.status(400).json({ message: "CSV file is required" });

    const rows = await parseProductsCsv(req.file.path);
    const operations = rows.map((row) => {
        const slug = slugify(`${row.title}-${row.brand}`);
        return {
            updateOne: {
                filter: { slug },
                update: { ...row, slug, source: row.source || "csv" },
                upsert: true,
            },
        };
    });

    if (operations.length) {
        await Product.bulkWrite(operations);
    }

    fs.unlink(req.file.path, () => { });

    res.json({
        message: "CSV import completed",
        processed: rows.length,
    });
});

export const getAnalytics = asyncHandler(async (req, res) => {
    const [users, products, orders, revenue] = await Promise.all([
        User.countDocuments(),
        Product.countDocuments(),
        Order.countDocuments(),
        Order.aggregate([{ $group: { _id: null, total: { $sum: "$totalAmount" } } }]),
    ]);

    res.json({
        users,
        products,
        orders,
        revenue: revenue[0]?.total || 0,
    });
});

export const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
});
