import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";
import { brand } from "../../lib/brand";

const Footer = () => {
    return (
        <footer className="relative z-10 mt-20 border-t border-white/10 bg-ink/60 pt-16 pb-8 backdrop-blur-sm">
            <div className="page-container">
                <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Brand Section */}
                    <div className="flex flex-col gap-4">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 font-bold text-white shadow-lg">
                                {brand.shortName}
                            </div>
                            <span className="text-xl font-bold tracking-widest text-ivory">{brand.name}</span>
                        </Link>
                        <p className="text-sm leading-relaxed text-mist">
                            {brand.tagline}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="mb-6 font-serif text-lg text-ivory">Quick Links</h4>
                        <ul className="space-y-3 text-sm text-mist">
                            <li><Link to="/shop" className="hover:text-cyan transition-colors">Products</Link></li>
                            <li><Link to="/about" className="hover:text-cyan transition-colors">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-cyan transition-colors">Contact</Link></li>
                            <li><Link to="/faq" className="hover:text-cyan transition-colors">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h4 className="mb-6 font-serif text-lg text-ivory">Customer Service</h4>
                        <ul className="space-y-3 text-sm text-mist">
                            <li><Link to="/track-order" className="hover:text-cyan transition-colors">Track Order</Link></li>
                            <li><Link to="/returns" className="hover:text-cyan transition-colors">Returns & Exchanges</Link></li>
                            <li><Link to="/shipping" className="hover:text-cyan transition-colors">Shipping Info</Link></li>
                            <li><Link to="/support-center" className="hover:text-cyan transition-colors">Support Center</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="mb-6 font-serif text-lg text-ivory">Stay Connected</h4>
                        <p className="mb-4 text-sm text-mist">Subscribe to receive updates, access to exclusive deals, and more.</p>
                        <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-mist" size={16} />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full rounded-md border border-white/10 bg-white/5 py-2 pl-9 pr-3 text-sm text-ivory placeholder-mist focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan transition-all"
                                />
                            </div>
                            <button className="rounded-md bg-cyan py-2 text-sm font-bold text-ink hover:bg-cyan/90 transition-colors">
                                SUBSCRIBE
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
                    <div className="text-center sm:text-left">
                        <p className="text-xs text-mist">
                            &copy; {new Date().getFullYear()} {brand.name}. All rights reserved.
                        </p>
                        <p className="mt-1 text-[11px] uppercase tracking-[0.35em] text-cyan/80">
                            Made by Akshar Patel
                        </p>
                    </div>
                    <div className="flex gap-4 text-mist">
                        <a
                            href="https://www.linkedin.com/in/akshar-patel-a83611344/"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-cyan transition-colors"
                            aria-label="LinkedIn"
                        >
                            <Linkedin size={18} />
                        </a>
                        <a
                            href="http://github.com/aksharpatel007/"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-cyan transition-colors"
                            aria-label="GitHub"
                        >
                            <Github size={18} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;