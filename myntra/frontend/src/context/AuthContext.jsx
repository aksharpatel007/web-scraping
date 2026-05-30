import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authApi, getApiErrorMessage } from "../lib/api";

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
            } catch (error) {
                console.error("Failed to hydrate auth session", error);
                setUser(null);
                setAuthSession(false);
            } finally {
                setLoading(false);
            }
        };

        hydrate();
    }, []);

    const signup = async (payload) => {
        try {
            const { data } = await authApi.signup(payload);
            setUser(data.user);
            setAuthSession(true);
            return data;
        } catch (error) {
            throw new Error(getApiErrorMessage(error, "Unable to sign up. Please try again."));
        }
    };

    const login = async (payload) => {
        try {
            const { data } = await authApi.login(payload);
            setUser(data.user);
            setAuthSession(true);
            return data;
        } catch (error) {
            throw new Error(getApiErrorMessage(error, "Unable to login. Please check your credentials."));
        }
    };

    const logout = async () => {
        try {
            await authApi.logout();
        } catch (error) {
            console.error("Logout request failed", error);
        } finally {
            setUser(null);
            setAuthSession(false);
        }
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
