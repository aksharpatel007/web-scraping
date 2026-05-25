import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const CartPage = () => {
    const { cart, removeFromCart } = useAuth();
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <section className="page-container py-12">
            <h1 className="font-serif text-4xl">Cart</h1>

            <div className="mt-8 grid gap-7 lg:grid-cols-[1fr_340px]">
                <div className="space-y-4">
                    {cart.length === 0 ? (
                        <p className="text-mist">Your cart is empty.</p>
                    ) : (
                        cart.map((item) => (
                            <article key={item.id} className="glass-panel flex items-center gap-4 rounded-2xl p-4">
                                <img src={item.image} alt={item.title} className="h-24 w-24 rounded-lg object-cover" />
                                <div className="flex-1">
                                    <h3>{item.title}</h3>
                                    <p className="text-sm text-mist">Qty: {item.quantity}</p>
                                </div>
                                <div className="text-right">
                                    <p>Rs {(item.price * item.quantity).toFixed(2)}</p>
                                    <button className="mt-2 text-sm text-cyan" onClick={() => removeFromCart(item.id)}>
                                        Remove
                                    </button>
                                </div>
                            </article>
                        ))
                    )}
                </div>

                <aside className="glass-panel h-fit rounded-2xl p-5">
                    <h2 className="font-serif text-2xl">Summary</h2>
                    <div className="mt-4 flex items-center justify-between text-sm text-mist">
                        <span>Subtotal</span>
                        <span>Rs {total.toFixed(2)}</span>
                    </div>
                    <Link
                        to="/checkout"
                        className="mt-5 inline-block w-full rounded-full bg-emerald px-5 py-3 text-center text-sm font-semibold"
                    >
                        Proceed to Checkout
                    </Link>
                </aside>
            </div>
        </section>
    );
};

export default CartPage;
