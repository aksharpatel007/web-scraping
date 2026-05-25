import { useState } from "react";
import { authApi } from "../lib/api";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const submit = async (event) => {
        event.preventDefault();
        const { data } = await authApi.forgotPassword({ email });
        setMessage(data.message);
    };

    return (
        <section className="page-container py-14">
            <form onSubmit={submit} className="glass-panel mx-auto max-w-md rounded-2xl p-7">
                <h1 className="font-serif text-4xl">Forgot Password</h1>
                <p className="mt-2 text-sm text-mist">Submit your email to start reset flow.</p>
                <input
                    className="mt-5 w-full rounded-lg bg-white/10 p-3 text-sm"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <button className="mt-4 w-full rounded-full bg-emerald px-4 py-3 text-sm font-semibold">Send Reset Link</button>
                {message ? <p className="mt-4 text-sm text-cyan">{message}</p> : null}
            </form>
        </section>
    );
};

export default ForgotPasswordPage;
