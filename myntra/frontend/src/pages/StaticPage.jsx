const StaticPage = ({ title, description }) => (
    <section className="page-container py-12">
        <div className="max-w-4xl">
            <p className="mb-3 text-xs uppercase tracking-[0.35em] text-cyan/80">ScrapShop</p>
            <h1 className="font-serif text-4xl text-ivory sm:text-5xl">{title}</h1>
            <div className="glass-panel mt-6 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-glass sm:p-8">
                <p className="max-w-2xl text-sm leading-7 text-mist sm:text-base">
                    {description ||
                        "This section is ready for live API content, CMS integration, and reusable UI blocks."}
                </p>
            </div>
        </div>
    </section>
);

export default StaticPage;
