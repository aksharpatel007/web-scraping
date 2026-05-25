import { Product } from "../models/Product.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const buildFilters = (query) => {
    const filters = { isActive: true };
    if (query.category) filters.category = query.category;
    if (query.brand) filters.brand = query.brand;
    if (query.deals === "true") filters.isDeal = true;
    if (query.trending === "true") filters.isTrending = true;
    if (query.newArrivals === "true") filters.isNewArrival = true;

    if (query.search) {
        filters.$text = { $search: query.search };
    }

    return filters;
};

export const getProducts = asyncHandler(async (req, res) => {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 12);
    const skip = (page - 1) * limit;

    const filters = buildFilters(req.query);
    const sortMap = {
        latest: { createdAt: -1 },
        priceAsc: { price: 1 },
        priceDesc: { price: -1 },
        trending: { isTrending: -1, createdAt: -1 },
    };

    const sort = sortMap[req.query.sort] || { createdAt: -1 };

    const [products, total] = await Promise.all([
        Product.find(filters).sort(sort).skip(skip).limit(limit),
        Product.countDocuments(filters),
    ]);

    res.json({
        products,
        pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
        },
    });
});

export const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
});

export const createProduct = asyncHandler(async (req, res) => {
    const product = await Product.create(req.body);
    res.status(201).json(product);
});

export const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
});

export const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product removed" });
});
