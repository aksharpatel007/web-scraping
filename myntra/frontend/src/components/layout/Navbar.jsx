import { useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { brand } from "../../lib/brand";

const primaryLinks = [
    { to: "/", label: "HOME" },
    { to: "/shop", label: "PRODUCTS" },
    { to: "/shop?category=watch", label: "WATCHES" },
    { to: "/shop?category=shoes", label: "SHOES" },
    { to: "/shop?category=tshirt", label: "T-SHIRTS" },
];

const productTypes = [
    { value: "watch", label: "Watch" },
    { value: "shoes", label: "Shoes" },
    { value: "tshirt", label: "T-Shirts" },
    { value: "bag", label: "Bags" },
    { value: "perfume", label: "Perfumes" },
];

const Navbar = () => {
    const [openMobile, setOpenMobile] = useState(false);
    const [openCart, setOpenCart] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const { user, logout, cart, wishlist } = useAuth();

    const [openTypes, setOpenTypes] = useState(false);

    const onSearch = (event) => {
        event.preventDefault();
        if (query.trim()) {
            navigate(`/shop?search=${encodeURIComponent(query)}`);
            setOpenMobile(false);
            setQuery("");
        }
    };

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <motion.header
            className="sticky top-0 z-50 w-full border-b border-white/10 bg-ink/80 backdrop-blur-2xl shadow-glass transition-colors duration-300"
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            onMouseLeave={() => {
                setOpenCart(false);
                setOpenProfile(false);
            }}
        >
            <div className="page-container flex h-16 items-center justify-between gap-4 px-3 sm:h-[68px] sm:px-4 lg:h-[72px] lg:gap-6 lg:px-8">
                {/* Logo Area */}
                <div className="flex items-center">
                    <Link to="/" className="group flex items-center gap-2 sm:gap-3">
                        <motion.div
                            whileHover={{ rotate: 6, scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.35, ease: "easeInOut" }}
                            className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 via-emerald to-cyan text-sm font-bold text-ink shadow-lg shadow-emerald/30 sm:h-10 sm:w-10 sm:text-base"
                        >
                            {brand.shortName}
                        </motion.div>
                        <span className="hidden text-[15px] font-bold tracking-[0.22em] text-ivory transition-colors group-hover:text-emerald sm:block sm:text-lg lg:text-xl">
                            {brand.name}
                        </span>
                    </Link>
                </div>

                {/* Desktop Navigation Links */}
                <nav className="hidden h-full items-center gap-6 lg:flex xl:gap-8">
                    {primaryLinks.map((link) => {
                        const isActive = location.pathname === link.to || location.pathname + location.search === link.to;
                        if (link.label === "PRODUCTS") {
                            return (
                                <div key={link.label} className="relative" onMouseEnter={() => setOpenTypes(true)} onMouseLeave={() => setOpenTypes(false)}>
                                    <Link to={link.to} className={`relative flex h-full items-center text-[13px] font-semibold tracking-[0.18em] transition-colors duration-300 ${isActive ? "text-emerald" : "text-ivory/90 hover:text-emerald"}`}>
                                        {link.label}
                                    </Link>

                                    <AnimatePresence>
                                        {openTypes && (
                                            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.14 }} className="absolute left-0 top-[44px] z-50 w-64 rounded-xl border border-white/10 bg-graphite/95 p-3 shadow-glass backdrop-blur-xl">
                                                <div className="grid gap-2">
                                                    {productTypes.slice(0, 12).map((t) => (
                                                        <Link key={t.value} to={`/shop?category=${encodeURIComponent(t.value)}`} className="rounded-md px-3 py-2 text-sm text-mist hover:bg-white/5 hover:text-ivory">
                                                            {t.label}
                                                        </Link>
                                                    ))}
                                                    <Link to="/shop" className="mt-2 block text-sm text-cyan">View all products</Link>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        }

                        return (
                            <Link
                                key={link.label}
                                to={link.to}
                                className={`relative flex h-full items-center text-[13px] font-semibold tracking-[0.18em] transition-colors duration-300 ${isActive ? "text-emerald" : "text-ivory/90 hover:text-emerald"}`}
                            >
                                {link.label}
                                {link.isNew && (
                                    <sup className="ml-1 font-bold text-pink-500 text-[9px] uppercase">
                                        New
                                    </sup>
                                )}
                                {isActive && (
                                    <motion.span
                                        layoutId="nav-underline"
                                        className="absolute bottom-0 left-0 h-[3px] w-full rounded-t-md bg-gradient-to-r from-amber-300 via-emerald to-cyan"
                                        initial={false}
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Search Bar (Desktop) */}
                <div className="hidden flex-1 max-w-md xl:block">
                    <form onSubmit={onSearch} className="relative w-full group">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Search size={18} className="text-mist group-focus-within:text-emerald transition-colors" />
                        </div>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search for products, brands and more"
                            className="block w-full rounded-full border border-white/10 bg-white/5 py-2 pl-10 pr-10 text-sm text-ivory placeholder-mist focus:border-emerald/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald/20 transition-all duration-300"
                        />
                        {query ? (
                            <button
                                type="button"
                                onClick={() => setQuery("")}
                                aria-label="Clear search"
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-mist transition-colors hover:text-ivory"
                            >
                                <X size={16} />
                            </button>
                        ) : null}
                    </form>
                </div>

                {/* Right Actions */}
                <div className="ml-auto flex shrink-0 items-center gap-3 sm:gap-4 lg:gap-6">
                    {/* Search Icon (Mobile) */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-full p-1.5 text-ivory transition-colors hover:text-emerald xl:hidden"
                        onClick={() => setOpenMobile(!openMobile)}
                    >
                        <Search size={19} />
                    </motion.button>

                    {/* Wishlist */}
                    <Link to="/wishlist" className="relative flex flex-col items-center gap-0.5 text-ivory transition-colors group hover:text-emerald">
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="relative">
                            <Heart size={18} className="transition-colors group-hover:fill-emerald/20 sm:size-5" />
                            {wishlist.length > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-emerald text-[9px] font-bold text-ink shadow-lg shadow-emerald/30"
                                >
                                    {wishlist.length}
                                </motion.span>
                            )}
                        </motion.div>
                        <span className="hidden text-[10px] font-bold sm:block sm:text-[11px] group-hover:text-emerald">Wishlist</span>
                    </Link>

                    {/* Cart / Bag */}
                    <div className="relative flex h-full flex-col justify-center" onMouseEnter={() => setOpenCart(true)}>
                        <Link to="/cart" className="relative flex flex-col items-center gap-0.5 text-ivory transition-colors hover:text-emerald">
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="relative">
                                <ShoppingBag size={18} className="sm:size-5" />
                                {cart.length > 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-emerald text-[9px] font-bold text-ink shadow-lg shadow-emerald/30"
                                    >
                                        {cart.length}
                                    </motion.span>
                                )}
                            </motion.div>
                            <span className="hidden text-[10px] font-bold sm:block sm:text-[11px]">Bag</span>
                        </Link>
                        <AnimatePresence>
                            {openCart ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 top-[56px] w-[92vw] max-w-80 rounded-xl border border-white/10 bg-graphite/95 p-4 shadow-glass backdrop-blur-xl z-50 sm:top-[60px]"
                                >
                                    <p className="mb-3 text-sm font-bold text-ivory">Cart Preview</p>
                                    <div className="max-h-56 space-y-3 overflow-auto pr-1 custom-scrollbar">
                                        {cart.length === 0 ? (
                                            <p className="text-sm text-mist/90">Your bag is empty.</p>
                                        ) : (
                                            cart.map((item) => (
                                                <div key={item.id} className="flex items-center justify-between text-sm group/item">
                                                    <div className="flex items-center gap-3">
                                                        {item.image && (
                                                            <div className="h-12 w-12 overflow-hidden rounded bg-white/5">
                                                                <img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform group-hover/item:scale-110" />
                                                            </div>
                                                        )}
                                                        <p className="line-clamp-2 max-w-[130px] text-xs text-ivory">{item.title}</p>
                                                    </div>
                                                    <p className="text-cyan font-bold text-xs whitespace-nowrap">x{item.quantity}</p>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                    {cart.length > 0 && (
                                        <div className="mt-4 border-t border-white/10 pt-4">
                                            <div className="flex items-center justify-between text-sm font-bold text-ivory mb-4">
                                                <span>Subtotal</span>
                                                <span className="text-cyan">Rs. {subtotal.toFixed(2)}</span>
                                            </div>
                                            <Link to="/cart" className="block w-full rounded-md bg-cyan py-2.5 text-center text-sm font-bold text-ink transition-all hover:bg-cyan/90 shadow-[0_0_15px_rgba(0,255,255,0.2)]">
                                                GO TO BAG
                                            </Link>
                                        </div>
                                    )}
                                </motion.div>
                            ) : null}
                        </AnimatePresence>
                    </div>

                    {/* Profile */}
                    <div className="relative flex h-full flex-col justify-center" onMouseEnter={() => setOpenProfile(true)}>
                        <Link to={user ? "/account" : "/login"}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex flex-col items-center gap-0.5 text-ivory transition-colors hover:text-emerald"
                            >
                                <User size={18} className="sm:size-5" />
                                <span className="hidden text-[10px] font-bold sm:block sm:text-[11px]">Profile</span>
                            </motion.button>
                        </Link>
                        <AnimatePresence>
                            {openProfile ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 top-[56px] w-[88vw] max-w-64 rounded-2xl border border-white/10 bg-graphite/95 p-4 shadow-glass backdrop-blur-2xl z-50 sm:top-[60px]"
                                >
                                    <div className="mb-3 border-b border-white/10 pb-3">
                                        <p className="text-sm font-bold text-ivory">Welcome</p>
                                        <p className="text-xs text-mist">{user ? user.email : "To access account and manage orders"}</p>
                                        {!user && (
                                            <Link to="/login" className="mt-3 block w-full rounded-md border border-emerald/50 py-2 text-center text-sm font-bold text-emerald transition-all hover:bg-emerald hover:text-ink shadow-[0_0_15px_rgba(201,154,82,0.12)]">
                                                LOGIN / SIGNUP
                                            </Link>
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <Link to="/orders" className="block rounded-lg px-3 py-2 text-sm text-mist transition-colors hover:bg-white/10 hover:text-ivory">
                                            Orders
                                        </Link>
                                        <Link to="/wishlist" className="block rounded-lg px-3 py-2 text-sm text-mist transition-colors hover:bg-white/10 hover:text-ivory">
                                            Wishlist
                                        </Link>
                                        <Link to="/account" className="block rounded-lg px-3 py-2 text-sm text-mist transition-colors hover:bg-white/10 hover:text-ivory">
                                            Account Details
                                        </Link>
                                        {user?.role === "admin" && (
                                            <Link to="/admin" className="block rounded-lg px-3 py-2 text-sm font-bold text-emerald hover:bg-white/10">
                                                Admin Panel
                                            </Link>
                                        )}
                                        {user && (
                                            <button onClick={logout} className="mt-2 block w-full rounded-lg px-3 py-2 text-left text-sm text-red-400 transition-colors hover:bg-red-400/10">
                                                Logout
                                            </button>
                                        )}
                                    </div>
                                </motion.div>
                            ) : null}
                        </AnimatePresence>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-lg border border-white/20 bg-white/5 p-1.5 text-ivory transition-colors hover:bg-white/10 lg:hidden"
                        onClick={() => setOpenMobile(!openMobile)}
                        aria-label="Toggle menu"
                    >
                        {openMobile ? <X size={19} /> : <Menu size={19} />}
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {openMobile ? (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border-t border-white/10 bg-graphite/95 backdrop-blur-xl lg:hidden"
                    >
                        <div className="px-3 py-3 sm:px-4 sm:py-4">
                            <form onSubmit={onSearch} className="relative mb-4 w-full xl:hidden sm:mb-6">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Search size={18} className="text-mist" />
                                </div>
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search for products, brands and more"
                                    className="block w-full rounded-full border border-white/10 bg-white/5 py-2.5 pl-10 pr-10 text-sm text-ivory placeholder-mist focus:border-cyan/50 focus:outline-none focus:ring-1 focus:ring-cyan/50 sm:py-3"
                                />
                                {query ? (
                                    <button
                                        type="button"
                                        onClick={() => setQuery("")}
                                        aria-label="Clear search"
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-mist transition-colors hover:text-ivory"
                                    >
                                        <X size={16} />
                                    </button>
                                ) : null}
                            </form>

                            <div className="flex flex-col gap-1">
                                {primaryLinks.map((link) => {
                                    const isActive = location.pathname === link.to || location.pathname + location.search === link.to;
                                    return (
                                        <Link
                                            key={link.label}
                                            to={link.to}

                                            onClick={() => setOpenMobile(false)}
                                            className={`flex items-center justify-between rounded-lg px-4 py-2.5 text-sm font-bold transition-colors sm:py-3 ${isActive ? "bg-white/10 text-cyan" : "text-ivory hover:bg-white/5"
                                                }`}
                                        >
                                            {link.label}
                                            {link.isNew && (
                                                <span className="rounded bg-pink-500 px-2 py-0.5 text-[10px] text-white">NEW</span>
                                            )}
                                        </Link>
                                    );
                                })}
                                <hr className="my-3 border-white/10" />
                                <Link to="/orders" onClick={() => setOpenMobile(false)} className="rounded-lg px-4 py-3 text-sm font-bold text-mist transition-colors hover:bg-white/5 hover:text-ivory">Orders</Link>
                                <Link to="/wishlist" onClick={() => setOpenMobile(false)} className="rounded-lg px-4 py-3 text-sm font-bold text-mist transition-colors hover:bg-white/5 hover:text-ivory">Wishlist</Link>
                                <Link to="/account" onClick={() => setOpenMobile(false)} className="rounded-lg px-4 py-3 text-sm font-bold text-mist transition-colors hover:bg-white/5 hover:text-ivory">Account Details</Link>
                            </div>
                        </div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </motion.header>
    );
};

export default Navbar;