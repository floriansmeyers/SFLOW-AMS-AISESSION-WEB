"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/**
 * ToolCallingAnimation — Shows the invisible orchestration layer when AI uses tools:
 *   Context → AI Decides (generates tool call as text) → Tool Executes → Final Response
 *
 * Teaching point: AI doesn't "execute" anything — it generates text describing what
 * it wants to do, and the system carries it out. All hidden from the user.
 *
 * Infinite loop ~14.5s.
 */

const CYCLE = 14.5;

export function ToolCallingAnimation() {
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
    <div ref={ref} className="w-full max-w-5xl mx-auto">
      {isInView && (
        <motion.div
          key={key}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: CYCLE, times: [0, 0.03, 0.86, 0.93] }}
        >
          {/* 4-column grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* ── Column 1: In the Context ────────────────────── */}
            <div className="flex flex-col gap-2">
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="text-[10px] font-bold text-sflow-cream uppercase tracking-widest text-center mb-1"
              >
                Step 1: In the Context
              </motion.p>
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="rounded border border-sflow-gold/30 bg-sflow-gold/[0.06] px-2.5 py-2"
              >
                <p className="text-[10px] font-mono text-sflow-gold">System Prompt</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.4 }}
                className="rounded border border-blue-400/30 bg-blue-400/5 px-2.5 py-2"
              >
                <p className="text-[10px] font-mono text-blue-300">
                  User: &ldquo;What&rsquo;s the weather in Brussels?&rdquo;
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3, duration: 0.4 }}
                className="rounded border border-purple-400/30 bg-purple-400/5 px-2.5 py-2"
              >
                <p className="text-[10px] font-mono text-purple-300">
                  Available tools: [search, weather, calculator]
                </p>
              </motion.div>
            </div>

            {/* ── Column 2: AI Decides ────────────────────────── */}
            <div className="flex flex-col gap-2">
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="text-[10px] font-bold text-sflow-cream uppercase tracking-widest text-center mb-1"
              >
                Step 2: AI Decides
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.0, duration: 0.5 }}
                className="rounded-xl border border-sflow-glass-border bg-sflow-glass p-3 flex-1"
              >
                <p className="text-[10px] text-sflow-cream-muted mb-2">AI generates text:</p>
                <div className="rounded border border-sflow-gold/20 bg-sflow-gold/[0.04] px-2 py-1.5">
                  <p className="text-[10px] font-mono text-sflow-gold leading-relaxed">
                    {`{"tool": "weather",`}
                    <br />
                    {` "args": {"city":`}
                    <br />
                    {`  "Brussels"}}`}
                  </p>
                </div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3.0, duration: 0.4 }}
                  className="mt-2 text-[9px] italic text-sflow-cream-muted/70"
                >
                  Tool selection is still just text generation!
                </motion.p>
              </motion.div>
            </div>

            {/* ── Column 3: Tool Executes ─────────────────────── */}
            <div className="flex flex-col gap-2">
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="text-[10px] font-bold text-sflow-cream uppercase tracking-widest text-center mb-1"
              >
                Step 3: Tool Executes
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.5, duration: 0.4 }}
                className="flex flex-col gap-1.5"
              >
                {/* search — dimmed */}
                <div className="rounded border border-sflow-glass-border bg-sflow-glass px-2.5 py-1.5 opacity-40">
                  <p className="text-[10px] font-mono text-sflow-cream-muted">search</p>
                </div>
                {/* weather — highlighted with pulse */}
                <motion.div
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ delay: 4.2, duration: 0.6, repeat: 2, repeatType: "mirror" }}
                  className="rounded border-2 border-sflow-gold/50 bg-sflow-gold/[0.08] px-2.5 py-1.5"
                >
                  <p className="text-[10px] font-mono text-sflow-gold font-bold">weather ✓</p>
                </motion.div>
                {/* calculator — dimmed */}
                <div className="rounded border border-sflow-glass-border bg-sflow-glass px-2.5 py-1.5 opacity-40">
                  <p className="text-[10px] font-mono text-sflow-cream-muted">calculator</p>
                </div>
              </motion.div>
              {/* result box */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 5.5, duration: 0.5 }}
                className="rounded border border-green-500/30 bg-green-500/5 px-2.5 py-2"
              >
                <p className="text-[9px] text-green-300/60 mb-1">Result:</p>
                <p className="text-[10px] font-mono text-green-300 leading-relaxed">
                  {`{"temp": "14°C",`}
                  <br />
                  {` "condition":`}
                  <br />
                  {`  "cloudy"}`}
                </p>
              </motion.div>
            </div>

            {/* ── Column 4: Final Response ────────────────────── */}
            <div className="flex flex-col gap-2">
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="text-[10px] font-bold text-sflow-cream uppercase tracking-widest text-center mb-1"
              >
                Step 4: Final Response
              </motion.p>
              <motion.div
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 6.5, duration: 0.5 }}
                className="rounded-xl border border-green-500/30 bg-green-500/5 p-3 flex-1"
              >
                <p className="text-[11px] text-green-300 leading-relaxed">
                  &ldquo;It&rsquo;s currently 14&deg;C and cloudy in Brussels.&rdquo;
                </p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 7.5, duration: 0.4 }}
                  className="mt-3 text-[9px] italic text-sflow-cream-muted/60"
                >
                  The user never sees the tool call &mdash; only the final answer.
                </motion.p>
              </motion.div>
            </div>
          </div>

          {/* ── Bottom insight ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 8.5, duration: 0.6 }}
            className="mt-5 rounded-xl border border-sflow-gold/30 bg-sflow-gold/[0.06] px-4 py-3 max-w-3xl mx-auto"
          >
            <p className="text-xs text-sflow-gold text-center leading-relaxed">
              <strong>The invisible layer:</strong> AI reads context, generates a tool call as text,
              the system executes it, feeds the result back, and AI generates the final response.
              All hidden from the user.
            </p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
