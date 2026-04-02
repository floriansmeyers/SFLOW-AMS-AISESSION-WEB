"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/**
 * LLMTokenAnimation — Shows how an LLM works in 3 stages:
 *   1. Input tokens appear one by one (your prompt broken into pieces)
 *   2. Neural network "processes" them (nodes light up, connections glow)
 *   3. Output tokens appear one by one (the response)
 *
 * Teaching point: LLMs are next-token prediction machines. They don't
 * "understand" — they predict the statistically most likely next token,
 * one at a time.
 *
 * Infinite loop with ~14s cycle.
 */

const CYCLE = 14.5;

const INPUT_TOKENS = ["Write", "me", "an", "email", "about..."];
const OUTPUT_TOKENS = ["Dear", "client,", "Thank", "you", "for..."];

export function LLMTokenAnimation() {
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
          transition={{ duration: CYCLE, times: [0, 0.03, 0.86, 0.93] }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1.4fr_auto_1fr] items-center gap-3">
            {/* ── Input: Your Prompt ────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="rounded-xl border border-sflow-glass-border bg-sflow-glass p-4"
            >
              <p className="text-xs font-bold text-sflow-cream-muted uppercase tracking-widest mb-3 text-center">
                Your Prompt
              </p>
              <div className="flex flex-wrap gap-1.5 justify-center">
                {INPUT_TOKENS.map((token, i) => (
                  <motion.span
                    key={token}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.25, duration: 0.3, ease: "backOut" }}
                    className="inline-block rounded border border-sflow-cream-muted/20 bg-sflow-card px-2.5 py-1 text-xs font-mono text-sflow-cream"
                  >
                    {token}
                  </motion.span>
                ))}
              </div>
              <p className="text-[10px] text-sflow-cream-muted/60 text-center mt-2">
                Broken into tokens (word pieces)
              </p>
            </motion.div>

            {/* ── Arrow 1 ──────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.3, duration: 0.4 }}
              className="hidden sm:flex items-center"
            >
              <DashedArrow />
            </motion.div>

            {/* ── The Model (Neural Net) ──────────────────── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.6, duration: 0.6 }}
              className="rounded-xl border-2 border-sflow-gold/30 bg-sflow-gold/[0.03] p-4"
            >
              <p className="text-xs font-bold text-sflow-gold uppercase tracking-widest mb-3 text-center">
                The Model (LLM)
              </p>

              {/* Neural net SVG */}
              <NeuralNetSVG delay={3.0} />

              <p className="text-[10px] text-sflow-cream-muted/60 text-center mt-2">
                Predicts the next most likely token, one at a time
              </p>
            </motion.div>

            {/* ── Arrow 2 ──────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 6.5, duration: 0.4 }}
              className="hidden sm:flex items-center"
            >
              <DashedArrow orange />
            </motion.div>

            {/* ── Output: Response ──────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 6.8, duration: 0.5 }}
              className="rounded-xl border border-sflow-gold/20 bg-sflow-gold/[0.03] p-4"
            >
              <p className="text-xs font-bold text-sflow-gold uppercase tracking-widest mb-3 text-center">
                Response
              </p>
              <div className="flex flex-wrap gap-1.5 justify-center">
                {OUTPUT_TOKENS.map((token, i) => (
                  <motion.span
                    key={token}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 7.2 + i * 0.3, duration: 0.3, ease: "backOut" }}
                    className="inline-block rounded border border-sflow-gold/25 bg-sflow-gold/10 px-2.5 py-1 text-xs font-mono text-sflow-gold"
                  >
                    {token}
                  </motion.span>
                ))}
              </div>
              <p className="text-[10px] text-sflow-cream-muted/60 text-center mt-2">
                Generated token by token
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */

function NeuralNetSVG({ delay }: { delay: number }) {
  // 3 layers of nodes
  const layers = [
    [{ y: 20 }, { y: 50 }, { y: 80 }],        // input
    [{ y: 10 }, { y: 35 }, { y: 60 }, { y: 85 }], // hidden
    [{ y: 20 }, { y: 50 }, { y: 80 }],        // output
  ];
  const xPositions = [25, 60, 95];

  // Build connections
  const connections: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let l = 0; l < layers.length - 1; l++) {
    for (const from of layers[l]) {
      for (const to of layers[l + 1]) {
        connections.push({
          x1: xPositions[l],
          y1: from.y,
          x2: xPositions[l + 1],
          y2: to.y,
        });
      }
    }
  }

  return (
    <svg viewBox="0 0 120 100" className="w-full max-w-[200px] mx-auto">
      {/* Connections */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ delay: delay + 0.8, duration: 0.5 }}
      >
        {connections.map((c, i) => (
          <line
            key={i}
            x1={c.x1}
            y1={c.y1}
            x2={c.x2}
            y2={c.y2}
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-sflow-cream"
          />
        ))}
      </motion.g>

      {/* Nodes */}
      {layers.map((layer, l) =>
        layer.map((node, n) => (
          <motion.circle
            key={`${l}-${n}`}
            cx={xPositions[l]}
            cy={node.y}
            r={0}
            initial={{ r: 0, opacity: 0 }}
            animate={{ r: 5, opacity: 1 }}
            transition={{
              delay: delay + l * 0.3 + n * 0.1,
              duration: 0.25,
              ease: "backOut",
            }}
            className={l === 1 ? "fill-sflow-gold/50" : "fill-sflow-cream/30"}
          />
        ))
      )}
    </svg>
  );
}

function DashedArrow({ orange }: { orange?: boolean }) {
  const color = orange ? "text-sflow-gold" : "text-sflow-cream-muted";
  return (
    <svg width="32" height="16" viewBox="0 0 32 16" fill="none" className={color}>
      <line x1="2" y1="8" x2="24" y2="8" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4,3" />
      <polygon points="22,4 30,8 22,12" fill="currentColor" />
    </svg>
  );
}
