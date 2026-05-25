import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/shop/ProductCard";

// Simple CSV parser that handles quoted fields and newlines inside quotes
function parseCSV(text) {
    const rows = [];
    let cur = "";
    let row = [];
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
        const ch = text[i];

        if (ch === '"') {
            if (inQuotes && text[i + 1] === '"') {
                // escaped quote
                cur += '"';
                i += 1;
            } else {
                inQuotes = !inQuotes;
            }
            continue;
        }

        if (ch === ',' && !inQuotes) {
            row.push(cur);
            cur = "";
            continue;
        }

        if ((ch === '\n' || ch === '\r') && !inQuotes) {
            // handle CRLF
            if (ch === '\r' && text[i + 1] === '\n') {
                // skip, will handle as newline
            }
            row.push(cur);
            rows.push(row);
            row = [];
            cur = "";
            // skip following LF in CRLF
            if (ch === '\r' && text[i + 1] === '\n') i++;
            continue;
        }

        cur += ch;
    }

    // push last
    if (cur !== "" || row.length) {
        row.push(cur);
        rows.push(row);
    }

    // normalize rows: first row is headers
    if (!rows.length) return [];
    const headers = rows[0].map((h) => h.trim());
    const data = rows.slice(1).map((r) => {
        const obj = {};
        for (let i = 0; i < headers.length; i++) {
            obj[headers[i]] = (r[i] || "").trim();
        }
        return obj;
    });
    return data;
}

const mapRowToProduct = (row) => ({
    category: row["Category"] || row["category"] || "",
    id: row["Product ID"] || row["id"] || row["ProductId"] || String(Math.random()).slice(2, 10),
    title: row["Product Name"] || row["title"] || "",
    brand: row["Brand"] || row["brand"] || "",
    price: Number(row["Price"] || row["price"] || 0),
    rating: parseFloat(row["Rating"] || row["rating"] || 0) || 0,
    ratingCount: parseInt(row["Rating Count"] || row["ratingCount"] || 0, 10) || 0,
    url: row["Product URL"] || row["url"] || "",
    image: row["Image URL"] || row["Image"] || row["image"] || "",
});

const categoryLabels = {
    watch: "Watches",
    tshirt: "T-Shirts",
    shirt: "T-Shirts",
    shoes: "Shoes",
    shoe: "Shoes",
    bag: "Bags",
    perfume: "Perfumes",
};

const normalizeValue = (value) =>
    String(value || "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "")
        .trim();

const normalizeCategory = (value) => {
    const normalized = normalizeValue(value);
    return (
        {
            tshirts: "tshirt",
            tshirt: "tshirt",
            shirts: "tshirt",
            shirt: "tshirt",
            shoes: "shoes",
            shoe: "shoes",
            watches: "watch",
            watch: "watch",
            bags: "bag",
            bag: "bag",
            perfumes: "perfume",
            perfume: "perfume",
        }[normalized] || normalized
    );
};

const formatCategoryLabel = (value) => {
    const normalized = normalizeCategory(value);
    if (categoryLabels[normalized]) return categoryLabels[normalized];

    return String(value || "")
        .replace(/[-_]+/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
};

    const categoryOrder = ["watch", "shoes", "tshirt", "bag", "perfume"];

const ProductListingPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();

    const filters = useMemo(() => {
        const params = new URLSearchParams(location.search);
        return {
            category: normalizeCategory(params.get("category") || ""),
            search: normalizeValue(params.get("search") || ""),
        };
    }, [location.search]);

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const productCategory = normalizeCategory(product.category);

            if (filters.category && productCategory !== filters.category) {
                return false;
            }

            if (filters.search) {
                const haystack = [product.title, product.brand, product.category]
                    .map(normalizeValue)
                    .join(" ");

                if (!haystack.includes(filters.search)) {
                    return false;
                }
            }

            return true;
        });
    }, [filters.category, filters.search, products]);

    const groupedProducts = useMemo(() => {
        return filteredProducts.reduce((groups, product) => {
            const categoryKey = normalizeCategory(product.category) || "other";
            if (!groups[categoryKey]) {
                groups[categoryKey] = [];
            }
            groups[categoryKey].push(product);
            return groups;
        }, {});
    }, [filteredProducts]);

    const orderedCategories = useMemo(() => {
        const present = Object.keys(groupedProducts).filter((key) => groupedProducts[key].length > 0);
        return [
            ...categoryOrder.filter((key) => present.includes(key)),
            ...present.filter((key) => !categoryOrder.includes(key)),
        ];
    }, [groupedProducts]);

    const heading = filters.category
        ? formatCategoryLabel(filters.category)
        : filters.search
            ? `Search results for "${filters.search}"`
            : "All Products";

    const description = filters.category
        ? `Showing ${formatCategoryLabel(filters.category).toLowerCase()} from data.csv`
        : filters.search
            ? `Searching data.csv for "${filters.search}"`
            : "Displaying items from data.csv";

    useEffect(() => {
        let mounted = true;

        fetch('/data.csv')
            .then((res) => {
                if (!res.ok) throw new Error('Failed to load CSV');
                return res.text();
            })
            .then((text) => {
                const rows = parseCSV(text);
                const mapped = rows.map(mapRowToProduct);
                if (mounted) {
                    setProducts(mapped);
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.error('CSV load error', err);
                if (mounted) {
                    setError(err.message || String(err));
                    setLoading(false);
                }
            });

        return () => {
            mounted = false;
        };
    }, []);

    return (
        <section className="page-container py-12">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="font-serif text-4xl">{heading}</h1>
                    <p className="mt-2 text-sm text-mist">{description}</p>
                </div>
                <div className="text-sm text-mist">{loading ? 'Loading...' : `${filteredProducts.length} products`}</div>
            </div>

            {error ? (
                <div className="rounded-md border border-red-500 bg-red-500/10 p-4 text-sm text-red-200">Error loading products: {error}</div>
            ) : filters.category || filters.search ? (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredProducts.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            ) : (
                <div className="space-y-12">
                    {orderedCategories.map((categoryKey) => (
                        <section key={categoryKey}>
                            <div className="mb-5 flex items-end justify-between gap-4">
                                <div>
                                    <h2 className="font-serif text-2xl text-ivory">{formatCategoryLabel(categoryKey)}</h2>
                                    <p className="mt-1 text-sm text-mist">{groupedProducts[categoryKey].length} products</p>
                                </div>
                            </div>
                            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {groupedProducts[categoryKey].map((p) => (
                                    <ProductCard key={p.id} product={p} />
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            )}
        </section>
    );
};

export default ProductListingPage;
