import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HeroCarousel from "../components/home/HeroCarousel";
import ProductCard from "../components/shop/ProductCard";
import { mockProducts } from "../lib/mockProducts";

const HomePage = () => {
    // Top Rated: sorted by rating
    const topRated = [...mockProducts]
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 4);

    // Popular: sorted by ratingCount
    const popular = [...mockProducts]
        .sort((a, b) => (b.ratingCount || 0) - (a.ratingCount || 0))
        .slice(0, 4);

    // Sales: mix category, e.g. sort by price ascending
    const sales = [...mockProducts]
        .sort((a, b) => (a.price || 0) - (b.price || 0))
        .slice(0, 4);

    const Section = ({ title, subtitle, products, linkTo }) => (
        <section className="page-container py-12">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
                <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-cyan">{subtitle}</p>
                    <h2 className="mt-2 font-serif text-3xl sm:text-4xl">{title}</h2>
                </div>
                <Link to={linkTo} className="rounded-full border border-white/20 px-4 py-2 text-sm text-mist hover:text-ivory">
                    More {title}
                </Link>
            </div>

            <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: 0.08 } },
                }}
                className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            >
                {products.map((product) => (
                    <motion.div key={product.id} variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
                        <ProductCard product={product} />
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );

    return (
        <>
            <HeroCarousel />
            <div className="py-8">
                <Section title="Top Rated" subtitle="Highest Quality" products={topRated} linkTo="/shop?type=top-rated" />
                <Section title="Popular Picks" subtitle="Customer Favorites" products={popular} linkTo="/shop?type=popular" />
                <Section title="Top Sales" subtitle="Best Value" products={sales} linkTo="/shop?type=sales" />
            </div>
        </>
    );
};

export default HomePage;
