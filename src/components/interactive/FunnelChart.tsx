"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface FunnelStep {
  label: string;
  value: string;
  width: number; // percentage
}

export function FunnelChart({ steps }: { steps: FunnelStep[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="space-y-3">
      {steps.map((step, i) => (
        <motion.div
          key={step.label}
          initial={{ width: 0, opacity: 0 }}
          animate={
            isInView
              ? { width: `${step.width}%`, opacity: 1 }
              : { width: 0, opacity: 0 }
          }
          transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
          className="rounded-lg bg-sflow-gold/20 border border-sflow-gold/30 px-4 py-3"
        >
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-sflow-cream whitespace-nowrap">
              {step.label}
            </span>
            <span className="text-sm font-bold text-sflow-gold whitespace-nowrap">
              {step.value}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
