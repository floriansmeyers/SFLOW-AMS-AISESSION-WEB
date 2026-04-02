"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { SlideIndicator } from "./SlideIndicator";

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  showIndicator?: boolean;
}

export function Section({ children, id, className = "", showIndicator = true }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className={`snap-slide relative flex flex-col justify-center mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 ${className}`}
    >
      {children}
      {showIndicator && <SlideIndicator />}
    </motion.section>
  );
}
