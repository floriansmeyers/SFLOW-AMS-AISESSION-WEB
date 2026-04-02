"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";

interface AnimatedStatProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  decimals?: number;
  source?: { label: string; url: string };
}

export function AnimatedStat({ value, suffix = "", prefix = "", label, decimals = 0, source }: AnimatedStatProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) =>
    decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString()
  );

  useEffect(() => {
    if (isInView) {
      animate(motionValue, value, { duration: 1.5, ease: "easeOut" });
    }
  }, [isInView, motionValue, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl font-bold text-sflow-gold sm:text-4xl">
        {prefix}
        <motion.span>{rounded}</motion.span>
        {suffix}
      </div>
      <p className="mt-1 text-sm text-sflow-cream-muted">{label}</p>
      {source && (
        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-block text-xs text-sflow-gold/60 underline underline-offset-2 hover:text-sflow-gold"
        >
          {source.label}
        </a>
      )}
    </div>
  );
}
