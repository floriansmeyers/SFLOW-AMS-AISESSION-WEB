"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Bar {
  label: string;
  value: string;
  width: number;
  color?: string;
}

interface ComparisonBarsProps {
  title?: string;
  bars: Bar[];
}

export function ComparisonBars({ title, bars }: ComparisonBarsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="space-y-4">
      {title && (
        <h4 className="text-sm font-medium text-sflow-cream-muted">{title}</h4>
      )}
      {bars.map((bar, i) => (
        <div key={bar.label} className="space-y-1.5">
          <div className="flex justify-between text-sm">
            <span className="text-sflow-cream-muted">{bar.label}</span>
            <span className="font-semibold text-sflow-cream">{bar.value}</span>
          </div>
          <div className="h-3 w-full rounded-full bg-sflow-glass overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: `${bar.width}%` } : { width: 0 }}
              transition={{ duration: 1, delay: i * 0.2, ease: "easeOut" }}
              className={`h-full rounded-full ${
                bar.color || "bg-sflow-gold"
              }`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
