import fs from "node:fs";
import csv from "csv-parser";

export const parseProductsCsv = (filePath) =>
    new Promise((resolve, reject) => {
        const rows = [];

        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (raw) => {
                const title = raw.title || raw.name || raw.product || "Untitled Product";
                const price = Number(raw.price || raw.current_price || raw.selling_price || 0);
                const originalPrice = Number(raw.originalPrice || raw.mrp || raw.original_price || 0) || undefined;

                rows.push({
                    title,
                    brand: raw.brand || "Curated",
                    category: raw.category || "General",
                    price,
                    originalPrice,
                    description: raw.description || "",
                    images: [raw.image || raw.image_url || ""].filter(Boolean),
                    stock: Number(raw.stock || 10),
                    source: raw.source || "csv",
                    isTrending: String(raw.trending || "false").toLowerCase() === "true",
                    isNewArrival: String(raw.new_arrival || "false").toLowerCase() === "true",
                    isDeal: String(raw.deal || "false").toLowerCase() === "true",
                });
            })
            .on("end", () => resolve(rows))
            .on("error", reject);
    });
