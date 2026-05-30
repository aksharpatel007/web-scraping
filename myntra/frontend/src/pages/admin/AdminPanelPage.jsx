import { useMemo, useState } from "react";
import { adminApi, getApiErrorMessage } from "../../lib/api";
import { mockProducts } from "../../lib/mockProducts";

const AdminPanelPage = () => {
    const [analytics, setAnalytics] = useState(null);
    const [csvStatus, setCsvStatus] = useState("");
    const [uploadedProducts, setUploadedProducts] = useState([]);

    const loadAnalytics = async () => {
        try {
            const { data } = await adminApi.analytics();
            setAnalytics(data);
        } catch (error) {
            console.error("Failed to load analytics", error);
            setAnalytics({ users: 0, products: mockProducts.length, orders: 0, revenue: 0 });
        }
    };

    const handleCsvUpload = async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const { data } = await adminApi.importCsv(formData);
            setCsvStatus(`${data.message}. Processed: ${data.processed}`);
        } catch (error) {
            const text = await file.text();
            const rows = text.split("\n").filter(Boolean);
            const mapped = rows.slice(1).map((line, index) => {
                const [title, brand, category, price] = line.split(",");
                return { id: `csv-${index}`, title, brand, category, price };
            });
            setUploadedProducts(mapped);
            setCsvStatus(`${getApiErrorMessage(error, "Upload failed")} Parsed locally. Loaded ${mapped.length} products.`);
        }
    };

    const productsList = useMemo(() => {
        if (uploadedProducts.length) return uploadedProducts;
        return mockProducts;
    }, [uploadedProducts]);

    return (
        <section className="page-container py-12">
            <h1 className="font-serif text-4xl">Admin Panel</h1>
            <p className="mt-2 text-mist">Product management, CSV imports, order/user controls, and analytics view.</p>

            <div className="mt-8 grid gap-5 lg:grid-cols-2">
                <div className="glass-panel rounded-2xl p-5">
                    <h2 className="text-2xl">Analytics Dashboard</h2>
                    <button className="mt-4 rounded-full bg-cyan px-4 py-2 text-sm text-ink" onClick={loadAnalytics}>
                        Refresh Analytics
                    </button>
                    {analytics ? (
                        <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                            <div className="rounded-lg bg-white/10 p-3">Users: {analytics.users}</div>
                            <div className="rounded-lg bg-white/10 p-3">Products: {analytics.products}</div>
                            <div className="rounded-lg bg-white/10 p-3">Orders: {analytics.orders}</div>
                            <div className="rounded-lg bg-white/10 p-3">Revenue: Rs {analytics.revenue}</div>
                        </div>
                    ) : null}
                </div>

                <div className="glass-panel rounded-2xl p-5">
                    <h2 className="text-2xl">CSV Product Import</h2>
                    <p className="mt-2 text-sm text-mist">Import scraped ecommerce CSV and render dynamic products in real-time.</p>
                    <input type="file" accept=".csv" onChange={handleCsvUpload} className="mt-4 block w-full text-sm" />
                    {csvStatus ? <p className="mt-4 text-sm text-cyan">{csvStatus}</p> : null}
                </div>
            </div>

            <div className="glass-panel mt-8 rounded-2xl p-5">
                <h2 className="text-2xl">Scraped Product Management</h2>
                <div className="mt-4 overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead className="text-mist">
                            <tr>
                                <th className="pb-2">Title</th>
                                <th className="pb-2">Brand</th>
                                <th className="pb-2">Category</th>
                                <th className="pb-2">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productsList.map((item) => (
                                <tr key={item.id} className="border-t border-white/10">
                                    <td className="py-2">{item.title}</td>
                                    <td className="py-2">{item.brand || "-"}</td>
                                    <td className="py-2">{item.category || "-"}</td>
                                    <td className="py-2">Rs {item.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default AdminPanelPage;
