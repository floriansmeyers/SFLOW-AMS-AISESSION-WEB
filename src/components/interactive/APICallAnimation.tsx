"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { RotateCcw } from "lucide-react";

/**
 * APICallAnimation — Shows how a prompt/API call actually works:
 *   You (or your app) → builds a request (system, context, user, tools)
 *   → API Call (POST /messages) →
 *   AI Provider API (reads context, generates token by token, charges per token)
 *   → Response (stream/JSON) →
 *   Output (generated text, tool calls)
 *
 * Teaching point: every "chat" with AI is actually a structured API call.
 * Understanding this removes the magic and gives you control.
 *
 * Infinite loop ~14s.
 */

const CYCLE = 14.5;

const REQUEST_PARTS = [
  { key: "system", label: 'system: "You are..."', accent: true },
  { key: "context", label: "context: [documents]", accent: false },
  { key: "user", label: 'user: "Write me..."', accent: false },
  { key: "tools", label: "tools: [available]", accent: false },
];

export function APICallAnimation() {
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
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1.2fr_auto_1fr] items-center gap-3">
            {/* ── You (or your app) ──────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="rounded-xl border border-sflow-glass-border bg-sflow-glass p-4"
            >
              <p className="text-xs font-bold text-sflow-cream uppercase tracking-widest mb-3 text-center">
                You (or your app)
              </p>
              <p className="text-[10px] text-sflow-cream-muted/60 text-center mb-2">
                Builds a request:
              </p>
              <div className="space-y-1.5">
                {REQUEST_PARTS.map((part, i) => (
                  <motion.div
                    key={part.key}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.3, duration: 0.3 }}
                    className={`rounded border px-2.5 py-1.5 text-[10px] font-mono ${
                      part.accent
                        ? "border-sflow-gold/25 bg-sflow-gold/[0.06] text-sflow-gold"
                        : "border-sflow-glass-border bg-sflow-card text-sflow-cream-muted"
                    }`}
                  >
                    {part.label}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* ── Arrow: API Call ────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 0.4 }}
              className="hidden sm:flex flex-col items-center gap-1"
            >
              <span className="text-[10px] font-medium text-sflow-cream-muted">
                API Call
              </span>
              <ArrowSVG />
              <span className="text-[9px] font-mono text-sflow-cream-muted/60">
                POST /messages
              </span>
            </motion.div>

            {/* ── AI Provider API ────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 3.0, duration: 0.6 }}
              className="rounded-xl border-2 border-sflow-glass-border bg-sflow-glass p-4"
            >
              <p className="text-xs font-bold text-sflow-cream uppercase tracking-widest mb-3 text-center">
                AI Provider API
              </p>
              <div className="space-y-2 text-center">
                {[
                  { text: "Reads entire context", delay: 3.5 },
                  { text: "Generates response", delay: 4.0 },
                  { text: "token by token", delay: 4.3 },
                ].map((item) => (
                  <motion.p
                    key={item.text}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: item.delay, duration: 0.3 }}
                    className="text-xs text-sflow-cream-muted"
                  >
                    {item.text}
                  </motion.p>
                ))}
              </div>
              <div className="mt-3 space-y-1.5">
                {[
                  { text: "Charges per token", delay: 5.0 },
                  { text: "Your data sent to cloud", delay: 5.4 },
                ].map((item) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: item.delay, duration: 0.3 }}
                    className="rounded border border-sflow-gold/20 bg-sflow-gold/[0.06] px-2.5 py-1 text-[10px] font-mono text-sflow-gold text-center"
                  >
                    {item.text}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* ── Arrow: Response ────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 6.0, duration: 0.4 }}
              className="hidden sm:flex flex-col items-center gap-1"
            >
              <span className="text-[10px] font-medium text-sflow-gold">
                Response
              </span>
              <ArrowSVG orange />
              <span className="text-[9px] font-mono text-sflow-cream-muted/60">
                stream / JSON
              </span>
            </motion.div>

            {/* ── Output ─────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 6.5, duration: 0.5 }}
              className="rounded-xl border border-sflow-gold/20 bg-sflow-gold/[0.03] p-4"
            >
              <p className="text-xs font-bold text-sflow-gold uppercase tracking-widest mb-3 text-center">
                Output
              </p>
              <div className="space-y-2 text-center">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 7.0, duration: 0.3 }}
                  className="text-xs text-sflow-cream-muted"
                >
                  Generated text
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 7.4, duration: 0.3 }}
                  className="text-xs text-sflow-cream-muted"
                >
                  Tool calls (if tools provided)
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 7.8, duration: 0.4 }}
                className="mt-3 rounded border border-sflow-gold/20 bg-sflow-gold/[0.06] px-2.5 py-2 text-center"
              >
                <p className="text-[10px] font-mono text-sflow-gold">
                  &quot;Dear client,
                </p>
                <p className="text-[10px] font-mono text-sflow-gold">
                  Thank you for...&quot;
                </p>
              </motion.div>
            </motion.div>
          </div>
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

function ArrowSVG({ orange }: { orange?: boolean }) {
  const color = orange ? "text-sflow-gold" : "text-sflow-cream-muted";
  return (
    <svg width="32" height="16" viewBox="0 0 32 16" fill="none" className={color}>
      <line x1="2" y1="8" x2="24" y2="8" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4,3" />
      <polygon points="22,4 30,8 22,12" fill="currentColor" />
    </svg>
  );
}
