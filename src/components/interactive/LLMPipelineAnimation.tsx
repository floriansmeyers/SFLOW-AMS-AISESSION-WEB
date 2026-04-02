"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { RotateCcw } from "lucide-react";

/**
 * LLMPipelineAnimation — Shows the full LLM request lifecycle:
 *   1. Input tokens appear (your prompt broken into pieces)
 *   2. Context blocks appear (System Prompt, Documents, History)
 *   3. API Call arrow appears
 *   4. Neural Network processes (autoregressive, can't go back)
 *   5. Output tokens stream back in green
 *
 * Teaching point: Stateless + autoregressive architecture.
 * Every token generated left-to-right; no revision possible.
 *
 * ~14.5s cycle, infinite loop, pauses when off-screen.
 */

const CYCLE = 14.5;

const INPUT_TOKENS = ["Write", "me", "a", "summary"];
const OUTPUT_TOKENS = ["Here", "is", "your", "concise", "summary", "..."];
const CONTEXT_BLOCKS = [
  { label: "System Prompt", color: "border-sflow-gold/40 bg-sflow-gold/10 text-sflow-gold" },
  { label: "Documents", color: "border-sflow-cream-muted/30 bg-sflow-glass text-sflow-cream-muted" },
  { label: "History", color: "border-sflow-cream-muted/30 bg-sflow-glass text-sflow-cream-muted" },
];

export function LLMPipelineAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [tick, setTick] = useState(0);

  const key = `cycle-${tick}`;

  return (
    <div ref={ref} className="w-full max-w-4xl mx-auto">
      {isInView && (
        <motion.div
          key={key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* 3-column grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">

            {/* ── Left: Your Input ──────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="rounded-xl border border-sflow-glass-border bg-sflow-glass p-4"
            >
              <p className="text-xs font-bold text-sflow-cream-muted uppercase tracking-widest mb-3 text-center">
                Your Input
              </p>
              <div className="flex flex-wrap gap-1.5 justify-center mb-2">
                {INPUT_TOKENS.map((token, i) => (
                  <motion.span
                    key={token}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.25, duration: 0.3, ease: "easeOut" }}
                    className="inline-block rounded border border-sflow-cream-muted/20 bg-sflow-card px-2.5 py-1 text-xs font-mono text-sflow-cream"
                  >
                    {token}
                  </motion.span>
                ))}
              </div>
              <p className="text-[10px] text-sflow-cream-muted/60 text-center">
                Broken into tokens
              </p>
            </motion.div>

            {/* ── Center: Context + API + Neural Net ────────── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.0, duration: 0.5 }}
              className="rounded-xl border-2 border-sflow-gold/30 bg-sflow-gold/[0.03] p-4 flex flex-col items-center gap-3"
            >
              <p className="text-xs font-bold text-sflow-gold uppercase tracking-widest text-center">
                Context + API Call
              </p>

              {/* Context blocks */}
              <div className="w-full flex flex-col gap-1.5">
                {CONTEXT_BLOCKS.map((block, i) => (
                  <motion.div
                    key={block.label}
                    initial={{ opacity: 0, scaleX: 0.8 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ delay: 2.4 + i * 0.3, duration: 0.3, ease: "easeOut" }}
                    className={`rounded border px-2.5 py-1 text-[11px] font-medium text-center ${block.color}`}
                  >
                    {block.label}
                  </motion.div>
                ))}
              </div>

              {/* Down arrow: API Call */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.6, duration: 0.4 }}
                className="flex flex-col items-center gap-0.5"
              >
                <div className="w-px h-4 bg-sflow-gold/50" />
                <span className="text-[10px] font-semibold text-sflow-gold uppercase tracking-wide">
                  API Call
                </span>
                <div className="w-px h-3 bg-sflow-gold/50" />
                <svg width="10" height="8" viewBox="0 0 10 8" className="text-sflow-gold fill-current">
                  <polygon points="0,0 10,0 5,8" />
                </svg>
              </motion.div>

              {/* Neural network box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 4.2, duration: 0.5 }}
                className="w-full rounded-lg border border-sflow-gold/40 bg-sflow-gold/10 p-3 text-center"
              >
                <p className="text-xs font-bold text-sflow-gold mb-1">Neural Network</p>
                <p className="text-[10px] text-sflow-cream-muted/70">
                  (autoregressive — can&apos;t go back)
                </p>
                <MiniNeuralNet delay={4.7} />
              </motion.div>
            </motion.div>

            {/* ── Right: Response ───────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 6.5, duration: 0.5 }}
              className="rounded-xl border border-green-500/30 bg-green-500/5 p-4"
            >
              <p className="text-xs font-bold text-green-400 uppercase tracking-widest mb-3 text-center">
                Response
              </p>
              <div className="flex flex-wrap gap-1.5 justify-center mb-2">
                {OUTPUT_TOKENS.map((token, i) => (
                  <motion.span
                    key={token}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 7.0 + i * 0.35, duration: 0.3, ease: "easeOut" }}
                    className="inline-block rounded border border-green-500/30 bg-green-500/10 px-2.5 py-1 text-xs font-mono text-green-300"
                  >
                    {token}
                  </motion.span>
                ))}
              </div>
              <p className="text-[10px] text-sflow-cream-muted/60 text-center">
                One token at a time, left to right
              </p>
            </motion.div>
          </div>

          {/* ── Bottom insight box ──────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 9.2, duration: 0.5 }}
            className="mt-5 rounded-xl border border-sflow-gold/20 bg-sflow-gold/5 px-5 py-4 max-w-3xl mx-auto text-center"
          >
            <p className="text-sm text-sflow-cream-muted">
              Each token is generated <strong className="text-sflow-cream">one at a time, left to right</strong>.
              The model can&apos;t revise earlier tokens — that&apos;s why{" "}
              <strong className="text-sflow-gold">feedback and iteration matter</strong>.
            </p>
          </motion.div>
        </motion.div>
      )}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setTick((t) => t + 1)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-sflow-cream/50 hover:text-sflow-cream/80 border border-sflow-cream/20 hover:border-sflow-cream/40 rounded-full transition-colors"
        >
          <RotateCcw size={12} />
          Replay
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */

function MiniNeuralNet({ delay }: { delay: number }) {
  const layers = [
    [20, 50, 80],
    [10, 40, 65, 90],
    [20, 50, 80],
  ];
  const xs = [20, 55, 90];

  const connections: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let l = 0; l < layers.length - 1; l++) {
    for (const y1 of layers[l]) {
      for (const y2 of layers[l + 1]) {
        connections.push({ x1: xs[l], y1, x2: xs[l + 1], y2 });
      }
    }
  }

  return (
    <svg viewBox="0 0 110 100" className="w-full max-w-[160px] mx-auto mt-1">
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.18 }}
        transition={{ delay: delay + 0.5, duration: 0.5 }}
      >
        {connections.map((c, i) => (
          <line
            key={i}
            x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2}
            stroke="#d4a843"
            strokeWidth="0.6"
          />
        ))}
      </motion.g>
      {layers.map((layer, l) =>
        layer.map((y, n) => (
          <motion.circle
            key={`${l}-${n}`}
            cx={xs[l]}
            cy={y}
            r={0}
            initial={{ r: 0, opacity: 0 }}
            animate={{ r: 4.5, opacity: 1 }}
            transition={{ delay: delay + l * 0.25 + n * 0.08, duration: 0.2, ease: "backOut" }}
            fill={l === 1 ? "rgba(212,168,67,0.55)" : "rgba(255,255,255,0.25)"}
          />
        ))
      )}
    </svg>
  );
}
