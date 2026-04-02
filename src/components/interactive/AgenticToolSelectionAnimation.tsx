"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { RotateCcw } from "lucide-react";

/**
 * AgenticToolSelectionAnimation - Shows an agent receiving a task, planning steps
 * (still text generation!), executing tools, and getting results.
 *
 * Teaching point: Selecting tools and planning steps is still just text generation.
 * The system around the AI provides the actual capabilities.
 *
 * Infinite loop ~14.5s.
 */

const CYCLE = 14.5;

const TOOLS = ["read_file", "web_search", "run_code", "send_email"];

const PLAN_STEPS = [
  "1. read_file('report.pdf')",
  "2. web_search('Q4 benchmarks')",
  "3. run_code('analysis.py')",
];

const EXEC_ROWS = [
  { tool: "read_file", result: "Result" },
  { tool: "web_search", result: "Result" },
  { tool: "run_code", result: "Result" },
];

export function AgenticToolSelectionAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [tick, setTick] = useState(0);

  const key = `cycle-${tick}`;

  return (
    <div ref={ref} className="w-full max-w-3xl mx-auto">
      {isInView && (
        <motion.div
          key={key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4"
        >
          {/* ── 1. Task input box ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="rounded-xl border border-blue-400/30 bg-blue-400/5 px-4 py-3"
          >
            <p className="text-[10px] font-bold text-blue-300/60 uppercase tracking-widest mb-1">
              Task
            </p>
            <p className="text-sm text-blue-300">
              &ldquo;Analyze last quarter and compare with industry benchmarks&rdquo;
            </p>
          </motion.div>

          {/* ── 2. Available tools grid ───────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.4 }}
          >
            <p className="text-[10px] font-bold text-sflow-cream uppercase tracking-widest mb-2">
              Available Tools
            </p>
            <div className="grid grid-cols-4 gap-2">
              {TOOLS.map((tool, i) => (
                <motion.div
                  key={tool}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5 + i * 0.12, duration: 0.3 }}
                  className="rounded-lg border border-sflow-glass-border bg-sflow-glass px-2 py-2 text-center"
                >
                  <p className="text-[10px] font-mono text-sflow-cream-muted">{tool}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── 3. AI plan box ───────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.5, duration: 0.5 }}
            className="rounded-xl border border-sflow-gold/30 bg-sflow-gold/[0.06] px-4 py-3"
          >
            <p className="text-[10px] font-bold text-sflow-gold uppercase tracking-widest mb-2">
              AI generates a plan (still just text!):
            </p>
            <div className="flex flex-col gap-1.5">
              {PLAN_STEPS.map((step, i) => (
                <motion.p
                  key={step}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 3.9 + i * 0.6, duration: 0.35 }}
                  className="text-xs font-mono text-sflow-gold"
                >
                  {step}
                </motion.p>
              ))}
            </div>
          </motion.div>

          {/* ── 4. Execution rows ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 6.5, duration: 0.3 }}
            className="flex flex-col gap-2"
          >
            <p className="text-[10px] font-bold text-sflow-cream uppercase tracking-widest mb-1">
              Execution
            </p>
            {EXEC_ROWS.map((row, i) => (
              <motion.div
                key={row.tool}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 6.5 + i * 0.7, duration: 0.4 }}
                className="flex items-center gap-2"
              >
                <div className="rounded border border-sflow-glass-border bg-sflow-glass px-2.5 py-1.5 shrink-0">
                  <p className="text-[10px] font-mono text-sflow-cream-muted">{row.tool}</p>
                </div>
                {/* expanding dashed line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 6.9 + i * 0.7, duration: 0.4, ease: "easeOut" }}
                  style={{ originX: 0 }}
                  className="flex-1 border-t border-dashed border-sflow-glass-border"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 7.3 + i * 0.7, duration: 0.3 }}
                  className="rounded border border-green-500/30 bg-green-500/5 px-2.5 py-1.5 shrink-0"
                >
                  <p className="text-[10px] font-mono text-green-300">{row.result}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* ── 5. Key insight box ───────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 10.5, duration: 0.6 }}
            className="rounded-xl border border-sflow-gold/30 bg-sflow-gold/[0.06] px-4 py-3"
          >
            <p className="text-xs text-sflow-gold text-center leading-relaxed">
              Selecting tools, planning steps, and deciding what to do next is all still{" "}
              <strong>text generation</strong>. The &ldquo;intelligence&rdquo; is pattern matching
             - the system around it provides the actual capabilities.
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
