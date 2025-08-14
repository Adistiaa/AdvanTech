import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      className="fixed bottom-10 right-6 p-2 bg-blue-500 hover:bg-white dark:bg-blue-400 dark:hover:bg-gray-300 text-white hover:text-blue-600 rounded-3xl transition-colors w-15 h-15 flex items-center justify-center shadow-md z-40"
      onClick={scrollToTop}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: isVisible ? 0.8 : 0, scale: isVisible ? 1 : 0 }}
      whileHover={{ opacity: 1, scale: 1.1 }}
      transition={{ duration: 0.3 }}
      aria-label="Back to Top"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
          clipRule="evenodd"
        />
      </svg>
    </motion.button>
  );
}