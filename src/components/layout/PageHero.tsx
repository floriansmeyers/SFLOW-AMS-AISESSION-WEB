"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { SlideIndicator } from "@/components/ui/SlideIndicator";

interface PageHeroProps {
  badge: string;
  title: string;
  subtitle: string;
}

export function PageHero({ badge, title, subtitle }: PageHeroProps) {
  return (
    <section className="snap-slide relative flex items-center overflow-hidden border-b border-sflow-glass-border bg-sflow-darker">
      <div className="absolute inset-0 bg-gradient-to-br from-sflow-gold/5 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge>{badge}</Badge>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-sflow-cream-muted sm:text-xl">
            {subtitle}
          </p>
        </motion.div>
      </div>

      <SlideIndicator />
    </section>
  );
}
