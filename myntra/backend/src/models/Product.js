import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true, index: true },
        slug: { type: String, unique: true, index: true },
        brand: { type: String, default: "Curated" },
        category: { type: String, default: "General", index: true },
        price: { type: Number, required: true, min: 0 },
        originalPrice: { type: Number, min: 0 },
        images: [{ type: String }],
        description: { type: String, default: "" },
        stock: { type: Number, default: 0 },
        rating: { type: Number, default: 4.2, min: 0, max: 5 },
        tags: [{ type: String }],
        isNewArrival: { type: Boolean, default: false, index: true },
        isTrending: { type: Boolean, default: false, index: true },
        isDeal: { type: Boolean, default: false, index: true },
        source: {
            type: String,
            enum: ["manual", "csv", "scraped"],
            default: "manual",
            index: true,
        },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

productSchema.index({ title: "text", brand: "text", category: "text", tags: "text" });

export const Product = mongoose.model("Product", productSchema);
