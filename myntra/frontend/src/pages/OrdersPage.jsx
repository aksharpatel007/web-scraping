import { useEffect, useState } from "react";
import { orderApi } from "../lib/api";

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const load = async () => {
            try {
                const { data } = await orderApi.mine();
                setOrders(data);
            } catch {
                setOrders([
                    { _id: "demo-1", trackingId: "TRK-2026601", status: "shipped", totalAmount: 5999 },
                    { _id: "demo-2", trackingId: "TRK-2026602", status: "delivered", totalAmount: 3299 },
                ]);
            }
        };

        load();
    }, []);

    return (
        <section className="page-container py-12">
            <h1 className="font-serif text-4xl">Orders</h1>
            <div className="mt-7 space-y-3">
                {orders.map((order) => (
                    <article key={order._id} className="glass-panel flex flex-wrap items-center justify-between gap-3 rounded-xl p-4">
                        <div>
                            <p className="text-sm text-mist">Tracking</p>
                            <p>{order.trackingId}</p>
                        </div>
                        <p className="text-sm capitalize text-cyan">{order.status}</p>
                        <p>Rs {order.totalAmount}</p>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default OrdersPage;
