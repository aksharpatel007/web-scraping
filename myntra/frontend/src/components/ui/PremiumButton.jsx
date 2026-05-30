import { motion } from "framer-motion";

const PremiumButton = ({ children, className = "", onClick, ...props }) => {
    return (
        <motion.button
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            onClick={onClick}
            className={`cta-premium inline-flex items-center gap-2 justify-center text-sm font-semibold shadow-lg ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default PremiumButton;
