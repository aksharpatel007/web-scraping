import { memo } from "react";
import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

const ProductCard = ({ product }) => {
    const { addToCart, toggleWishlist, wishlist } = useAuth();
    const liked = wishlist.some((item) => item.id === product.id);
    const rating = typeof product.rating === "number" ? product.rating.toFixed(1) : null;
    const ratingCount = Number.isFinite(product.ratingCount) ? product.ratingCount : null;
    const typeLabel = product.category
        ? product.category
              .split("-")
              .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
              .join(" ")
        : "Product";

    return (
        <motion.article
            layout
            whileHover={{ y: -10, scale: 1.015 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-graphite/70 shadow-glass"
        >
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-emerald/10" />
                <div className="absolute -left-10 -top-10 h-24 w-24 rounded-full bg-emerald/20 blur-3xl" />
                <div className="absolute -bottom-10 right-0 h-28 w-28 rounded-full bg-cyan/10 blur-3xl" />
            </div>
            <div className="absolute left-4 top-4 z-10 flex flex-col gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="w-fit rounded-full border border-white/15 bg-ink/80 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-cyan backdrop-blur-md">
                    {typeLabel}
                </span>
                <Link
                    to={`/shop?category=${encodeURIComponent(product.category || "")}`}
                    className="w-fit rounded-full border border-emerald/30 bg-emerald/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald backdrop-blur-md transition hover:bg-emerald/25"
                >
                    View type
                </Link>
            </div>
            <Link to={`/products/${product.id}`}>
                <img
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                    className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </Link>
            <div className="space-y-3 p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <p className="text-xs uppercase tracking-[0.28em] text-emerald">{product.brand}</p>
                        <h3 className="line-clamp-1 text-base font-semibold text-ivory transition-colors group-hover:text-white">{product.title}</h3>
                    </div>
                    <button onClick={() => toggleWishlist(product)} className="rounded-full border border-white/10 bg-white/5 p-2 transition-transform duration-300 hover:scale-110 hover:border-emerald/40">
                        <Heart size={18} className={liked ? "fill-emerald text-emerald" : "text-mist transition-colors group-hover:text-emerald"} />
                    </button>
                </div>

                <div className="flex items-center gap-3 text-sm">
                    <span className="font-semibold text-ivory">Rs {product.price}</span>
                    {product.originalPrice ? (
                        <span className="text-mist line-through">Rs {product.originalPrice}</span>
                    ) : null}
                </div>

                {rating ? (
                    <div className="flex items-center gap-2 text-xs font-medium text-mist">
                        <span className="inline-flex items-center gap-1 rounded-full border border-emerald/20 bg-emerald/10 px-2.5 py-1 text-emerald">
                            <Star size={12} className="fill-emerald text-emerald" />
                            {rating}
                        </span>
                        {ratingCount !== null ? <span>({ratingCount.toLocaleString()} reviews)</span> : null}
                    </div>
                ) : null}

                <button
                    className="w-full rounded-full bg-gradient-to-r from-emerald via-cyan to-emerald px-4 py-2 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(201,154,82,0.25)]"
                    onClick={() => addToCart(product)}
                >
                    Add to Cart
                </button>
            </div>
        </motion.article>
    );
};

export default memo(ProductCard);
