import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { mockProducts } from "../lib/mockProducts";

const ProductDetailsPage = () => {
    const { id } = useParams();
    const { addToCart, toggleWishlist, wishlist } = useAuth();

    const product = useMemo(() => mockProducts.find((item) => item.id === id), [id]);

    if (!product) {
        return <div className="page-container py-16">Product not found.</div>;
    }

    const liked = wishlist.some((item) => item.id === product.id);

    return (
        <section className="page-container grid gap-10 py-12 lg:grid-cols-2">
            <img src={product.image} alt={product.title} className="h-[520px] w-full rounded-2xl object-cover" />
            <div>
                <p className="text-sm uppercase tracking-[0.2em] text-cyan">{product.brand}</p>
                <h1 className="mt-3 font-serif text-5xl leading-tight">{product.title}</h1>
                <p className="mt-6 text-mist">
                    Elevated craft with comfort-led construction, curated for a premium ecommerce product experience.
                </p>
                <div className="mt-7 flex items-center gap-4 text-xl">
                    <p>Rs {product.price}</p>
                    {product.originalPrice ? <p className="text-mist line-through">Rs {product.originalPrice}</p> : null}
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                    <button className="rounded-full bg-emerald px-7 py-3 font-semibold" onClick={() => addToCart(product)}>
                        Add to Cart
                    </button>
                    <button
                        className="rounded-full border border-white/25 px-7 py-3"
                        onClick={() => toggleWishlist(product)}
                    >
                        {liked ? "Remove from Wishlist" : "Add to Wishlist"}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ProductDetailsPage;
