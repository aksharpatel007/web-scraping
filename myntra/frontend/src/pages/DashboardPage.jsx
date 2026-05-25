import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DashboardPage = () => {
    const { user } = useAuth();

    const tiles = [
        { title: "Orders", to: "/orders" },
        { title: "Wishlist", to: "/wishlist" },
        { title: "Notifications", to: "/notifications" },
        { title: "Settings", to: "/settings" },
    ];

    return (
        <section className="page-container py-12">
            <h1 className="font-serif text-4xl">Dashboard</h1>
            <p className="mt-2 text-mist">Welcome back, {user?.name || "Guest"}.</p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {tiles.map((tile) => (
                    <Link key={tile.title} to={tile.to} className="glass-panel rounded-2xl p-5 transition hover:border-cyan/40">
                        <p className="text-sm text-mist">Open</p>
                        <h3 className="mt-2 text-xl">{tile.title}</h3>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default DashboardPage;
