import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const WishlistPage = () => {
    const { wishlist } = useAuth();

    return (
        <section className="page-container py-12">
            <h1 className="font-serif text-4xl">Wishlist</h1>
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {wishlist.length === 0 ? (
                    <p className="text-mist">No saved products yet.</p>
                ) : (
                    wishlist.map((item) => (
                        <Link key={item.id} to={`/products/${item.id}`} className="glass-panel rounded-2xl p-4">
                            <img src={item.image} alt={item.title} className="h-52 w-full rounded-lg object-cover" />
                            <h3 className="mt-3 line-clamp-1">{item.title}</h3>
                        </Link>
                    ))
                )}
            </div>
        </section>
    );
};

export default WishlistPage;
