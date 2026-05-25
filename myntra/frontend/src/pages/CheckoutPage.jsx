import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const CheckoutPage = () => {
    const { cart, setCart } = useAuth();
    const navigate = useNavigate();

    const placeOrder = () => {
        setCart([]);
        navigate("/order-tracking");
    };

    return (
        <section className="page-container py-12">
            <h1 className="font-serif text-4xl">Checkout</h1>
            <p className="mt-2 text-sm text-mist">Secure checkout with JWT session and cookie-backed auth ready.</p>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <div className="glass-panel rounded-2xl p-5">
                    <h2 className="mb-4 text-xl">Shipping Details</h2>
                    <div className="grid gap-3 sm:grid-cols-2">
                        <input className="rounded-lg bg-white/10 p-3 text-sm" placeholder="First Name" />
                        <input className="rounded-lg bg-white/10 p-3 text-sm" placeholder="Last Name" />
                        <input className="rounded-lg bg-white/10 p-3 text-sm sm:col-span-2" placeholder="Address" />
                        <input className="rounded-lg bg-white/10 p-3 text-sm" placeholder="City" />
                        <input className="rounded-lg bg-white/10 p-3 text-sm" placeholder="ZIP" />
                    </div>
                </div>

                <div className="glass-panel rounded-2xl p-5">
                    <h2 className="mb-4 text-xl">Order Review</h2>
                    <p className="text-sm text-mist">Items: {cart.length}</p>
                    <button className="mt-6 rounded-full bg-emerald px-6 py-3 text-sm font-semibold" onClick={placeOrder}>
                        Place Order
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CheckoutPage;
