import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
    {
        id: 1,
        title: "Classic Elegance",
        subtitle: "Step into style with our meticulously designed luxury watches.",
        cta: "Explore Watches",
        category: "watch",
        label: "HD Watch Collection",
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1800&q=80",
    },
    {
        id: 2,
        title: "Premium Footwear",
        subtitle: "Elevate your stride with our top-tier selection of athletic and casual shoes.",
        cta: "Shop Shoes",
        category: "shoes",
        label: "Footwear Collection",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1800&q=80",
    },
    {
        id: 3,
        title: "Trending Apparel",
        subtitle: "Upgrade your everyday look with comfortable and stylish modern wear.",
        cta: "Shop Apparel",
        category: "tshirt",
        label: "Apparel Collection",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1800&q=80",
    },
    {
        id: 4,
        title: "Designer Bags",
        subtitle: "Carry your world in style with our exclusive collection of premium bags.",
        cta: "Shop Bags",
        category: "bag",
        label: "Bag Collection",
        image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=1800&q=80",
    },
    {
        id: 5,
        title: "Signature Fragrances",
        subtitle: "Leave a lasting impression with our curated selection of fine perfumes.",
        cta: "Shop Perfumes",
        category: "perfume",
        label: "Fragrance Collection",
        image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1800&q=80",
    },
];

const HeroCarousel = () => {
    const navigate = useNavigate();
    const [active, setActive] = useState(0);

    const nextSlide = () => {
        setActive((state) => (state + 1) % slides.length);
    };

    const prevSlide = () => {
        setActive((state) => (state - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 6500);

        return () => clearInterval(timer);
    }, []);

    const current = slides[active];

    const handleShopClick = () => {
        navigate(`/shop?search=${current.category}`);
    };

    return (
        <section className="relative h-[78vh] overflow-hidden bg-ink group sm:h-[86vh] lg:h-[92vh]">
            <AnimatePresence mode="wait">
                <motion.img
                    key={current.id}
                    src={current.image}
                    alt={current.title}
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    className="absolute inset-0 h-full w-full object-cover object-center opacity-80 sm:object-[center_30%] lg:opacity-70"
                    initial={{ scale: 1.05, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.02, opacity: 0 }}
                    transition={{ duration: 1.3, ease: "easeInOut" }}
                />
            </AnimatePresence>

            <div className="hero-overlay absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/55 to-ink/90 sm:bg-gradient-to-r sm:from-ink/90 sm:via-ink/55 sm:to-transparent" />

            <div className="page-container relative z-10 flex h-full items-end pb-8 sm:items-center sm:pb-0">
                <motion.div
                    key={current.id}
                    className="hero-copy max-w-xl sm:max-w-2xl"
                    initial={{ y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 12, opacity: 0 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                >
                    <p className="mb-3 inline-block rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-cyan sm:mb-4 sm:px-4 sm:text-xs">
                        {current.label}
                    </p>
                    <h1 className="max-w-[12ch] font-serif text-[2.35rem] leading-[0.98] text-ivory sm:max-w-none sm:text-5xl sm:leading-tight lg:text-7xl">
                        {current.title}
                    </h1>
                    <p className="mt-4 max-w-md text-sm leading-6 text-mist sm:mt-6 sm:text-base lg:text-lg">
                        {current.subtitle}
                    </p>
                    <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
                        <motion.button
                            onClick={handleShopClick}
                            whileHover={{ y: -3, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full rounded-full bg-emerald px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-emerald/30 sm:w-auto sm:px-7"
                        >
                            {current.cta}
                        </motion.button>
                        <motion.button
                            onClick={handleShopClick}
                            whileHover={{ y: -3, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full rounded-full border border-white/30 bg-transparent px-6 py-3 text-sm uppercase tracking-wide text-ivory backdrop-blur-sm transition-colors hover:bg-white/10 sm:w-auto sm:px-7"
                        >
                            Discover More
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute inset-y-0 left-0 z-20 hidden items-center px-4 sm:flex opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={prevSlide}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md transition-colors hover:bg-black/50 border border-white/20 shadow-lg"
                >
                    <ChevronLeft size={28} />
                </motion.button>
            </div>
            <div className="absolute inset-y-0 right-0 z-20 hidden items-center px-4 sm:flex opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={nextSlide}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md transition-colors hover:bg-black/50 border border-white/20 shadow-lg"
                >
                    <ChevronRight size={28} />
                </motion.button>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2.5 sm:bottom-8 sm:gap-3">
                {slides.map((slide, index) => (
                    <button
                        key={slide.id}
                        onClick={() => setActive(index)}
                        className={`h-1.5 rounded-full transition-all ${index === active ? "w-8 bg-cyan sm:w-10" : "w-4 bg-white/40 hover:bg-white/60 sm:w-5"}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default HeroCarousel;