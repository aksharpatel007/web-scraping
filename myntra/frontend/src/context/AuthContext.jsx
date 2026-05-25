import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authApi } from "../lib/api";

const AuthContext = createContext(null);

const persistedCart = JSON.parse(localStorage.getItem("cart") || "[]");
const persistedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
const authSessionKey = "authSession";

const hasAuthSession = () => localStorage.getItem(authSessionKey) === "true";
const setAuthSession = (isActive) => {
    if (isActive) {
        localStorage.setItem(authSessionKey, "true");
        return;
    }

    localStorage.removeItem(authSessionKey);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState(persistedCart);
    const [wishlist, setWishlist] = useState(persistedWishlist);
    const [notifications, setNotifications] = useState([
        "Your order #TRK-2026601 is packed and ready.",
        "New drop: Emerald capsule collection just landed.",
    ]);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    useEffect(() => {
        const hydrate = async () => {
            if (!hasAuthSession()) {
                setLoading(false);
                return;
            }

            try {
                const { data } = await authApi.me();
                setUser(data.user);
            } catch {
                setUser(null);
                setAuthSession(false);
            } finally {
                setLoading(false);
            }
        };

        hydrate();
    }, []);

    const signup = async (payload) => {
        const { data } = await authApi.signup(payload);
        setUser(data.user);
        setAuthSession(true);
        return data;
    };

    const login = async (payload) => {
        const { data } = await authApi.login(payload);
        setUser(data.user);
        setAuthSession(true);
        return data;
    };

    const logout = async () => {
        await authApi.logout();
        setUser(null);
        setAuthSession(false);
    };

    const addToCart = (product) => {
        setCart((prev) => {
            const exists = prev.find((item) => item.id === product.id);
            if (exists) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const toggleWishlist = (product) => {
        setWishlist((prev) => {
            if (prev.some((item) => item.id === product.id)) {
                return prev.filter((item) => item.id !== product.id);
            }
            return [...prev, product];
        });
    };

    const value = useMemo(
        () => ({
            user,
            loading,
            cart,
            wishlist,
            notifications,
            setNotifications,
            signup,
            login,
            logout,
            addToCart,
            removeFromCart,
            toggleWishlist,
            setCart,
        }),
        [user, loading, cart, wishlist, notifications]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
