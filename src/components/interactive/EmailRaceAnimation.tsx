"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { RotateCcw } from "lucide-react";

/**
 * EmailRaceAnimation - Looping Gantt-chart comparing email workflows
 * with and without AI.
 *
 * The key insight this teaches: AI speeds up the WRITING, but the real
 * bottleneck (waiting for a reply) stays exactly the same. The time you
 * "save" is hollow unless you redesign the process.
 *
 * Animation cycle (~12s):
 *   0.0s – 1.0s : "Received" blocks appear
 *   1.0s – 4.0s : Writing phases grow (long without AI, tiny with AI)
 *   4.0s – 4.5s : "Sent" markers appear
 *   4.5s – 8.5s : Waiting phases grow (identical length on both lanes)
 *   8.5s – 9.0s : "Done" markers appear
 *   9.0s – 9.8s : Orange "Same bottleneck" brackets fade in
 *   9.8s – 10.5s: Dashed "Time saved... doing what?" box fades in
 *  10.5s – 12.5s: Hold everything visible
 *  12.5s – 13.0s: Fade out entire diagram
 *  13.0s – 14.5s: Pause (blank), then restart
 */

// ── Timing constants (seconds) ─────────────────────────────────────
const CYCLE = 14.5;

// Phase durations on the Gantt (as % of total bar width)
const WITHOUT_AI = { write: 35, wait: 50 }; // 35% writing, 50% waiting
const WITH_AI = { write: 8, wait: 50 };     // 8% writing, same 50% waiting

export function EmailRaceAnimation() {
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
          className="space-y-6"
        >
          {/* ── Header ──────────────────────────────────────────── */}
          <p className="text-xs font-medium uppercase tracking-widest text-sflow-cream-muted text-center">
            The Email Problem - Send the assignment, wait for it, send it back
          </p>

          {/* ── Lane: Without AI ────────────────────────────────── */}
          <Lane
            label="Without AI"
            writeWidth={WITHOUT_AI.write}
            waitWidth={WITHOUT_AI.wait}
            writeDelay={1.0}
            writeDuration={3.0}
          />

          {/* ── Lane: With AI ───────────────────────────────────── */}
          <Lane
            label="With AI"
            writeWidth={WITH_AI.write}
            waitWidth={WITH_AI.wait}
            writeDelay={1.0}
            writeDuration={0.6}
            fast
          />

          {/* ── "Same bottleneck" bracket ───────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 9.0, duration: 0.6 }}
            className="flex justify-end pr-[2%]"
            style={{ width: "100%" }}
          >
            <div
              className="flex flex-col items-center"
              style={{ width: `${WITHOUT_AI.wait + 2}%` }}
            >
              {/* Top bracket line */}
              <div className="w-full flex items-center gap-1">
                <div className="h-3 w-px bg-sflow-gold" />
                <div className="flex-1 h-px bg-sflow-gold" />
                <div className="h-3 w-px bg-sflow-gold" />
              </div>
              <span className="text-xs font-bold text-sflow-gold mt-1">
                Same bottleneck
              </span>
            </div>
          </motion.div>

          {/* ── "Time saved… doing what?" callout ───────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 9.8, duration: 0.5 }}
            className="mx-auto w-fit rounded-lg border-2 border-dashed border-sflow-gold/50 bg-sflow-gold/5 px-5 py-2.5"
          >
            <span className="text-sm font-semibold text-sflow-gold">
              Time saved… doing what?
            </span>
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

/* ═══════════════════════════════════════════════════════════════════
   Lane - one horizontal Gantt row
   ═══════════════════════════════════════════════════════════════════ */

interface LaneProps {
  label: string;
  writeWidth: number;   // % of total bar
  waitWidth: number;    // % of total bar
  writeDelay: number;   // seconds before writing phase starts growing
  writeDuration: number; // how long the grow animation takes
  fast?: boolean;       // visual emphasis for the AI lane
}

function Lane({
  label,
  writeWidth,
  waitWidth,
  writeDelay,
  writeDuration,
  fast,
}: LaneProps) {
  // Timing offsets (absolute seconds into the cycle)
  const sentDelay = writeDelay + writeDuration + 0.3;
  const waitDelay = 4.5; // fixed absolute time - both lanes start waiting together
  const doneDelay = waitDelay + 3.5;

  return (
    <div className="space-y-2">
      {/* Row label */}
      <div className="flex items-center gap-2">
        <span className={`text-sm font-semibold ${fast ? "text-sflow-gold" : "text-sflow-cream"}`}>
          {label}
        </span>
        {fast && (
          <span className="rounded-full bg-sflow-gold/15 px-2 py-0.5 text-[10px] font-bold text-sflow-gold uppercase tracking-wide">
            10 sec
          </span>
        )}
      </div>

      {/* Gantt bar */}
      <div className="relative flex h-9 w-full items-center rounded-lg bg-sflow-glass overflow-hidden">
        {/* Received marker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="absolute left-1.5 top-1/2 -translate-y-1/2 z-10"
        >
          <span className="text-[10px] font-medium text-sflow-cream-muted">
            Received
          </span>
        </motion.div>

        {/* Writing phase (grows from left edge) */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${writeWidth}%` }}
          transition={{
            delay: writeDelay,
            duration: writeDuration,
            ease: "easeInOut",
          }}
          className={`h-full shrink-0 ${
            fast ? "bg-sflow-gold/40" : "bg-sflow-cream-muted/20"
          }`}
        />

        {/* Sent marker (appears after writing) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: sentDelay, duration: 0.3 }}
          className="relative z-10 flex h-full items-center"
        >
          <div className="h-full w-px bg-sflow-gold/60" />
          <span className="absolute left-1.5 text-[10px] font-medium text-sflow-gold whitespace-nowrap">
            Sent
          </span>
        </motion.div>

        {/* Waiting phase */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${waitWidth}%` }}
          transition={{
            delay: waitDelay,
            duration: 3.5,
            ease: "easeInOut",
          }}
          className="h-full shrink-0 bg-red-500/15 border-l border-red-500/20"
        />

        {/* Done marker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: doneDelay, duration: 0.3 }}
          className="relative z-10 flex h-full items-center"
        >
          <div className="h-full w-px bg-green-500/60" />
          <span className="absolute left-1.5 text-[10px] font-medium text-green-400 whitespace-nowrap">
            Done
          </span>
        </motion.div>
      </div>

      {/* Phase legend below bar */}
      <div className="flex text-[10px] text-sflow-cream-muted/60">
        <span style={{ width: `${writeWidth}%` }} className="text-center truncate">
          {fast ? "Writing (10s)" : "Writing (slow)"}
        </span>
        <span style={{ width: `${waitWidth}%` }} className="text-center truncate text-red-400/60">
          Waiting for reply…
        </span>
      </div>
    </div>
  );
}
