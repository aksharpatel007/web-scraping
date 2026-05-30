import { motion } from "framer-motion";
import PremiumButton from "../ui/PremiumButton";

const CinematicHero = () => {
    return (
        <section className="premium-hero page-container relative z-20">
            <div className="hero-ambient">
                <div className="ambient-radial a1" />
                <div className="ambient-radial a2" />
                <div className="noise-overlay" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.9, ease: "easeOut" }}
                className="relative z-10 grid w-full grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center"
            >
                <div className="max-w-xl">
                    <p className="mb-3 inline-block rounded-full border border-white/20 bg-white/6 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-cyan">Curated Collection</p>
                    <h1 className="mt-4 font-serif text-5xl leading-tight text-ivory sm:text-6xl lg:text-7xl">A Cinematic Edit of Modern Essentials</h1>
                    <p className="mt-6 text-mist max-w-xl">Discover objects designed with restraint — thoughtful silhouettes, rich materials, and a lasting sense of calm. Shop the capsule collection.</p>

                    <div className="mt-8 flex gap-4">
                        <PremiumButton>Shop the Edit</PremiumButton>
                        <motion.button whileHover={{ y: -3 }} className="rounded-full border border-white/20 px-5 py-2 text-sm text-ivory">Learn More</motion.button>
                    </div>
                </div>

                <div className="relative">
                    <div className="glass-card floating-panel p-6">
                        <div className="h-64 w-full overflow-hidden rounded-lg bg-black/20">
                            <img src="/public/data.csv" alt="placeholder" className="h-full w-full object-cover" />
                        </div>
                        <div className="mt-4">
                            <p className="text-sm text-mist">Featured</p>
                            <h3 className="mt-1 text-lg font-semibold text-ivory">The Arc Strap</h3>
                            <p className="mt-2 text-sm text-mist">Timeless hardware. Modern fit.</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default CinematicHero;
