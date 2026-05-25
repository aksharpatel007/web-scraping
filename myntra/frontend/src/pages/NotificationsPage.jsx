import { useAuth } from "../context/AuthContext";

const NotificationsPage = () => {
    const { notifications } = useAuth();

    return (
        <section className="page-container py-12">
            <h1 className="font-serif text-4xl">Notifications</h1>
            <div className="mt-7 space-y-3">
                {notifications.map((note, index) => (
                    <article key={index} className="glass-panel rounded-xl p-4 text-sm">
                        {note}
                    </article>
                ))}
            </div>
        </section>
    );
};

export default NotificationsPage;
