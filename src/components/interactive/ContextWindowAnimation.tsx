"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/**
 * ContextWindowAnimation — Shows the 4 parts of a context window:
 *   1. System Prompt — "You are a helpful assistant that..."
 *   2. Your Documents / Data — company policies, research, etc.
 *   3. Conversation — previous messages
 *   4. Your Message — the current prompt
 *
 * Teaching point: everything the model can "see" must fit in the context
 * window. More context = better output. The quality of AI output is
 * directly proportional to the quality of what you put IN.
 *
 * Blocks appear left-to-right with stagger. Infinite loop ~12s.
 */

const CYCLE = 12.5;

interface Block {
  label: string;
  lines: string[];
  accent: boolean;
}

const BLOCKS: Block[] = [
  {
    label: "System Prompt",
    lines: ['"You are a helpful', 'assistant that..."'],
    accent: true,
  },
  {
    label: "Your Documents / Data",
    lines: ["Company policies,", "product info, research..."],
    accent: false,
  },
  {
    label: "Conversation",
    lines: ["Previous messages", "in this chat"],
    accent: false,
  },
  {
    label: "Your Message",
    lines: ['"Write me an', 'email about..."'],
    accent: true,
  },
];

export function ContextWindowAnimation() {
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
    <div ref={ref} className="w-full max-w-3xl mx-auto">
      {isInView && (
        <motion.div
          key={key}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: CYCLE, times: [0, 0.04, 0.84, 0.92] }}
        >
          {/* Outer container label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-[11px] text-sflow-cream-muted/60 text-center mb-2"
          >
            Context Window (everything the model can &ldquo;see&rdquo;)
          </motion.p>

          {/* Outer border representing the context window */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="rounded-xl border border-sflow-glass-border bg-sflow-glass/50 p-3"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {BLOCKS.map((block, i) => (
                <motion.div
                  key={block.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.8 + i * 0.6,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  className={`rounded-lg border p-3 ${
                    block.accent
                      ? "border-sflow-gold/30 bg-sflow-gold/[0.04]"
                      : "border-sflow-glass-border bg-sflow-card"
                  }`}
                >
                  <p
                    className={`text-[11px] font-bold mb-1.5 ${
                      block.accent ? "text-sflow-gold" : "text-sflow-cream"
                    }`}
                  >
                    {block.label}
                  </p>
                  {block.lines.map((line, j) => (
                    <p
                      key={j}
                      className="text-[10px] text-sflow-cream-muted/70 leading-relaxed"
                    >
                      {line}
                    </p>
                  ))}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Insight label */}
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.8, duration: 0.5 }}
            className="text-xs text-sflow-gold font-semibold text-center mt-3"
          >
            More context in = better output out
          </motion.p>
        </motion.div>
      )}
    </div>
  );
}
