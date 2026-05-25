const OrderTrackingPage = () => (
    <section className="page-container py-12">
        <h1 className="font-serif text-4xl">Order Tracking</h1>
        <div className="glass-panel mt-7 max-w-2xl rounded-2xl p-6">
            <p className="text-sm text-mist">Tracking ID</p>
            <p className="mt-1 text-xl">TRK-2026601</p>
            <ol className="mt-6 space-y-3 text-sm">
                <li className="rounded-lg bg-white/10 px-4 py-3">Order Confirmed</li>
                <li className="rounded-lg bg-white/10 px-4 py-3">Packed</li>
                <li className="rounded-lg bg-cyan/20 px-4 py-3">Shipped</li>
            </ol>
        </div>
    </section>
);

export default OrderTrackingPage;
