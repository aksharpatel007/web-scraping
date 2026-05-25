import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignupPage = () => {
    const { signup } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");

    const submit = async (event) => {
        event.preventDefault();
        try {
            await signup(form);
            navigate("/dashboard");
        } catch {
            setError("Unable to sign up. Check backend availability.");
        }
    };

    return (
        <section className="page-container py-14">
            <form onSubmit={submit} className="glass-panel mx-auto max-w-md rounded-2xl p-7">
                <h1 className="font-serif text-4xl">Signup</h1>
                {error ? <p className="mt-3 text-sm text-rose-300">{error}</p> : null}
                <div className="mt-6 space-y-3">
                    <input
                        className="w-full rounded-lg bg-white/10 p-3 text-sm"
                        placeholder="Name"
                        value={form.name}
                        onChange={(event) => setForm((state) => ({ ...state, name: event.target.value }))}
                    />
                    <input
                        className="w-full rounded-lg bg-white/10 p-3 text-sm"
                        placeholder="Email"
                        value={form.email}
                        onChange={(event) => setForm((state) => ({ ...state, email: event.target.value }))}
                    />
                    <input
                        className="w-full rounded-lg bg-white/10 p-3 text-sm"
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={(event) => setForm((state) => ({ ...state, password: event.target.value }))}
                    />
                </div>
                <button className="mt-5 w-full rounded-full bg-emerald px-4 py-3 text-sm font-semibold">Create Account</button>
                <p className="mt-4 text-sm text-mist">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </form>
        </section>
    );
};

export default SignupPage;
