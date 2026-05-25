/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            colors: {
                ink: "#0a0d12",
                graphite: "#141a23",
                emerald: "#c99a52",
                cyan: "#8cced8",
                ivory: "#fbf5eb",
                mist: "#b8c0cb",
            },
            fontFamily: {
                sans: ["Sora", "sans-serif"],
                serif: ["Fraunces", "serif"],
            },
            boxShadow: {
                glass: "0 10px 40px rgba(0,0,0,0.25)",
            },
            backgroundImage: {
                "grain-gradient": "radial-gradient(circle at 20% 20%, rgba(62,165,122,0.12), transparent 35%), radial-gradient(circle at 80% 10%, rgba(123,207,214,0.14), transparent 42%), linear-gradient(135deg, #0f1216 0%, #1b222c 60%, #11151a 100%)",
            },
        },
    },
    plugins: [],
};
