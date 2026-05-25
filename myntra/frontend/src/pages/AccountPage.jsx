import { useAuth } from "../context/AuthContext";

const AccountPage = () => {
    const { user } = useAuth();

    return (
        <section className="page-container py-12">
            <h1 className="font-serif text-4xl">Account / Profile</h1>
            <div className="glass-panel mt-7 max-w-2xl rounded-2xl p-6">
                <p className="text-sm text-mist">Name</p>
                <p className="mb-4 mt-1 text-lg">{user?.name || "Guest User"}</p>
                <p className="text-sm text-mist">Email</p>
                <p className="mb-4 mt-1 text-lg">{user?.email || "guest@example.com"}</p>
                <p className="text-sm text-mist">Role</p>
                <p className="mt-1 text-lg capitalize">{user?.role || "user"}</p>
            </div>
        </section>
    );
};

export default AccountPage;
