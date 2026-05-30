import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const submit = async (event) => {
        event.preventDefault();
        try {
            await login(form);
            navigate("/dashboard");
        } catch (error) {
            setError(error.message || "Unable to login. Use backend credentials or sign up first.");
        }
    };

    return (
        <section className="page-container py-14">
            <form onSubmit={submit} className="glass-panel mx-auto max-w-md rounded-2xl p-7">
                <h1 className="font-serif text-4xl">Login</h1>
                {error ? <p className="mt-3 text-sm text-rose-300">{error}</p> : null}
                <div className="mt-6 space-y-3">
                    <input
                        className="w-full rounded-lg bg-white/10 p-3 text-sm"
                        placeholder="Email"
                        value={form.email}
                        onChange={(event) => setForm((state) => ({ ...state, email: event.target.value }))}
                    />
                    <input
                        className="w-full rounded-lg bg-white/10 p-3 text-sm"
                        placeholder="Password"
                        type="password"
                        value={form.password}
                        onChange={(event) => setForm((state) => ({ ...state, password: event.target.value }))}
                    />
                </div>
                <button className="mt-5 w-full rounded-full bg-emerald px-4 py-3 text-sm font-semibold">Sign In</button>
                <div className="mt-4 flex justify-between text-sm text-mist">
                    <Link to="/signup">Create account</Link>
                    <Link to="/forgot-password">Forgot password</Link>
                </div>
            </form>
        </section>
    );
};

export default LoginPage;
