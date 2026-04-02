"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/**
 * PipelineAnimation — Animated step-by-step pipeline flow.
 * Steps appear one by one with arrows between them, showing
 * a complete automated workflow.
 *
 * Reusable for any pipeline visualization. Infinite loop.
 */

const CYCLE = 13.0;

interface PipelineStep {
  num: number;
  text: string;
}

interface PipelineAnimationProps {
  steps: PipelineStep[];
  title?: string;
}

export function PipelineAnimation({ steps, title }: PipelineAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-50px" });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const id = setInterval(() => setTick((t) => t + 1), CYCLE * 1000);
    return () => clearInterval(id);
  }, [isInView]);

  const key = `cycle-${tick}`;

  return (
    <div ref={ref} className="w-full max-w-4xl mx-auto">
      {isInView && (
        <motion.div
          key={key}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: CYCLE, times: [0, 0.03, 0.85, 0.92] }}
        >
          {title && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="text-xs font-medium uppercase tracking-widest text-sflow-cream-muted text-center mb-4"
            >
              {title}
            </motion.p>
          )}

          <div className="flex flex-wrap items-center justify-center gap-2">
            {steps.map((step, i) => (
              <div key={step.num} className="flex items-center gap-2">
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: 0.5 + i * 0.5,
                    duration: 0.4,
                    ease: "backOut",
                  }}
                  className="flex items-center gap-2 rounded-lg border border-sflow-glass-border bg-sflow-glass px-3 py-2"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sflow-gold/20 text-[10px] font-bold text-sflow-gold">
                    {step.num}
                  </span>
                  <span className="text-xs text-sflow-cream whitespace-nowrap">
                    {step.text}
                  </span>
                </motion.div>

                {i < steps.length - 1 && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 + i * 0.5, duration: 0.2 }}
                    className="text-sflow-gold font-bold"
                  >
                    →
                  </motion.span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
