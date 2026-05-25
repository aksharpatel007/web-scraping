import Navbar from "./Navbar";
import Footer from "./Footer";

const PageLayout = ({ children }) => (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-grain-gradient text-ivory">
        <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-28 top-24 h-72 w-72 rounded-full bg-cyan/10 blur-3xl" />
            <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-pink-500/10 blur-3xl" />
            <div className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-orange-400/10 blur-3xl" />
        </div>
        <Navbar />
        <main className="relative z-10 flex-1">{children}</main>
        <Footer />
    </div>
);

export default PageLayout;
