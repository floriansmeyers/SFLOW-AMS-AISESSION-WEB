"use client";

import { motion } from "framer-motion";

export function SlideIndicator() {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const slide = (e.currentTarget as HTMLElement).closest(".snap-slide");
    const next = slide?.nextElementSibling;
    if (!next) return;

    const container = next.closest(".snap-container");
    if (container instanceof HTMLElement) {
      container.style.scrollSnapType = "none";
      next.scrollIntoView({ behavior: "smooth" });
      container.addEventListener(
        "scrollend",
        () => { container.style.scrollSnapType = ""; },
        { once: true },
      );
    } else {
      next.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.5 }}
      whileHover={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="slide-indicator absolute bottom-6 left-1/2 -translate-x-1/2 p-2 text-sflow-cream-muted hover:text-sflow-gold transition-colors cursor-pointer"
      aria-label="Scroll to next section"
    >
      <motion.svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ y: [0, 3, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M6 9l6 6 6-6" />
      </motion.svg>
    </motion.button>
  );
}
