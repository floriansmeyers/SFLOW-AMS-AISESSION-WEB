"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { RotateCcw } from "lucide-react";

const CYCLE = 14.5;

const FILES = [
  "Q4 Report.xlsx",
  "Org Chart.pdf",
  "Policies.docx",
  "Meeting Notes",
  "Slack Export",
  "CRM Data.csv",
];

function DownArrow({ color }: { color: "red" | "gold" | "green" }) {
  const stroke =
    color === "red"
      ? "#ef4444"
      : color === "gold"
      ? "#d4af37"
      : "#22c55e";
  return (
    <svg width="24" height="32" viewBox="0 0 24 32" fill="none">
      <line x1="12" y1="0" x2="12" y2="24" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      <polyline points="4,16 12,28 20,16" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export function NewHireContextAnimation() {
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
          <div className="grid grid-cols-2 gap-6">
            {/* LEFT LANE — Bad */}
            <div className="flex flex-col items-center gap-3">
              {/* Label */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="text-[11px] font-bold uppercase tracking-widest text-red-400"
              >
                Dumping everything
              </motion.p>

              {/* File stack */}
              <div className="flex flex-col gap-1.5 w-full">
                {FILES.map((file, i) => (
                  <motion.div
                    key={file}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.35, duration: 0.4, ease: "easeOut" }}
                    className="rounded border border-sflow-glass-border bg-sflow-card px-3 py-1.5 text-xs text-sflow-cream-muted text-center"
                  >
                    {file}
                  </motion.div>
                ))}
              </div>

              {/* Red arrow */}
              <motion.div
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ delay: 2.5, duration: 0.4, ease: "easeOut" }}
                style={{ originY: 0 }}
              >
                <DownArrow color="red" />
              </motion.div>

              {/* Vague output box */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.5, duration: 0.5, ease: "easeOut" }}
                className="w-full rounded-lg border border-red-500/30 bg-red-500/5 px-3 py-3 text-center"
              >
                <p className="text-xs font-semibold text-red-400">Vague, generic output</p>
                <p className="text-[10px] text-sflow-cream-muted mt-1 italic">&ldquo;Here is a summary of the provided documents...&rdquo;</p>
              </motion.div>
            </div>

            {/* RIGHT LANE — Good */}
            <div className="flex flex-col items-center gap-3">
              {/* Label */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 5, duration: 0.4 }}
                className="text-[11px] font-bold uppercase tracking-widest text-green-400"
              >
                Curated instruction
              </motion.p>

              {/* File stack (dimmed) */}
              <div className="flex flex-col gap-1.5 w-full">
                {FILES.map((file, i) => (
                  <motion.div
                    key={file}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ delay: 6 + i * 0.25, duration: 0.4, ease: "easeOut" }}
                    className="rounded border border-sflow-glass-border bg-sflow-card px-3 py-1.5 text-xs text-sflow-cream-muted text-center"
                  >
                    {file}
                  </motion.div>
                ))}
              </div>

              {/* Gold arrow */}
              <motion.div
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ delay: 7.5, duration: 0.4, ease: "easeOut" }}
                style={{ originY: 0 }}
              >
                <DownArrow color="gold" />
              </motion.div>

              {/* Instruction document box */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 8, duration: 0.5, ease: "easeOut" }}
                className="w-full rounded-lg border border-sflow-gold/30 bg-sflow-gold/5 px-3 py-3 text-center"
              >
                <p className="text-xs font-semibold text-sflow-gold">Instruction Document</p>
                <p className="text-[10px] text-sflow-cream-muted mt-1 italic">&ldquo;You are a billing analyst. Use only the Q4 report...&rdquo;</p>
              </motion.div>

              {/* Green arrow */}
              <motion.div
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ delay: 9, duration: 0.4, ease: "easeOut" }}
                style={{ originY: 0 }}
              >
                <DownArrow color="green" />
              </motion.div>

              {/* Precise output box */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 10, duration: 0.5, ease: "easeOut" }}
                className="w-full rounded-lg border border-green-500/30 bg-green-500/5 px-3 py-3 text-center"
              >
                <p className="text-xs font-semibold text-green-400">Precise, actionable output</p>
                <p className="text-[10px] text-sflow-cream-muted mt-1 italic">&ldquo;Invoice #2847: €12,400 due 15 Jan — 3 items flagged...&rdquo;</p>
              </motion.div>
            </div>
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
