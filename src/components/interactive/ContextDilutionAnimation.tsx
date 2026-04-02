"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { RotateCcw } from "lucide-react";

const CYCLE = 14.5;

const MESSAGES = [
  { role: "user", text: "Analyze this report..." },
  { role: "ai", text: "Here's the analysis..." },
  { role: "user", text: "Summarize the key risks" },
  { role: "ai", text: "The main risks are..." },
  { role: "user", text: "Compare to last quarter" },
  { role: "ai", text: "Compared to Q3..." },
  { role: "user", text: "Draft an executive summary" },
  { role: "ai", text: "Executive Summary:..." },
];

export function ContextDilutionAnimation() {
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
          className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 sm:gap-6"
        >
          {/* LEFT — Context Window */}
          <div className="flex flex-col gap-2">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-[11px] font-bold uppercase tracking-widest text-sflow-cream-muted/60 text-center"
            >
              Context Window
            </motion.p>

            <div className="rounded-xl border border-sflow-glass-border bg-sflow-glass/50 p-3 flex flex-col gap-2">
              {/* System Prompt — shrinks over 10s */}
              <motion.div
                initial={{ height: 80, opacity: 1 }}
                animate={{ height: 24, opacity: 0.4 }}
                transition={{ delay: 1, duration: 9, ease: "easeInOut" }}
                className="rounded-lg border border-sflow-gold/40 bg-sflow-gold/[0.07] px-3 overflow-hidden flex items-start pt-2"
              >
                <p className="text-[10px] font-bold text-sflow-gold whitespace-nowrap">
                  System Prompt &amp; Instructions
                </p>
              </motion.div>

              {/* Messages appearing staggered */}
              {MESSAGES.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 1.2 + i * 0.8,
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                  className={`rounded border px-2 py-1.5 text-[10px] text-sflow-cream-muted ${
                    msg.role === "user"
                      ? "border-blue-400/30 bg-blue-400/[0.05]"
                      : "border-sflow-glass-border bg-sflow-card"
                  }`}
                >
                  {msg.text}
                </motion.div>
              ))}

              {/* Final user prompt */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + MESSAGES.length * 0.8, duration: 0.4 }}
                className="rounded border border-blue-400/50 bg-blue-400/10 px-2 py-1.5 text-[10px] font-bold text-blue-400"
              >
                Your latest prompt
              </motion.div>
            </div>
          </div>

          {/* CENTER — Percentage indicator (hidden on mobile) */}
          <div className="hidden sm:flex flex-col items-center justify-center gap-2 min-w-[80px]">
            <p className="text-[10px] text-sflow-cream-muted/60 text-center">Instructions:</p>
            <motion.p
              initial={{ color: "#22c55e", fontSize: "1.5rem" }}
              animate={{ color: "#ef4444", fontSize: "1.1rem" }}
              transition={{ delay: 1, duration: 9, ease: "easeInOut" }}
              className="font-black leading-none tabular-nums"
            >
              <motion.span
                initial={false}
                animate={{ opacity: [1, 1, 0] }}
                transition={{ delay: 1, duration: 4.5, times: [0, 0.9, 1] }}
                className="absolute"
              >
                45%
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0, 1] }}
                transition={{ delay: 1, duration: 9, times: [0, 0.8, 1] }}
              >
                ~3%
              </motion.span>
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 8, duration: 0.5 }}
              className="text-[9px] text-red-500 text-center leading-tight max-w-[80px]"
            >
              of context is your original instructions
            </motion.p>
          </div>

          {/* RIGHT — Explanation */}
          <div className="flex flex-col gap-3">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-[11px] font-bold uppercase tracking-widest text-sflow-cream-muted/60 text-center"
            >
              What&apos;s happening
            </motion.p>

            {/* What happens box */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="rounded-xl border border-sflow-gold/30 bg-sflow-gold/[0.04] p-4"
            >
              <p className="text-xs font-bold text-sflow-gold mb-3">What happens:</p>
              <ol className="space-y-2">
                {[
                  "You set detailed instructions",
                  "Conversation grows with messages",
                  "Instructions shrink as a % of context",
                  "Model weighs recent messages more",
                ].map((step, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + i * 0.7, duration: 0.4 }}
                    className="flex gap-2 text-[10px] text-sflow-cream-muted"
                  >
                    <span className="text-sflow-gold font-bold shrink-0">{i + 1}.</span>
                    {step}
                  </motion.li>
                ))}
              </ol>
            </motion.div>

            {/* The result box — appears late */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 9.5, duration: 0.6 }}
              className="rounded-xl border border-red-500/30 bg-red-500/[0.04] p-4"
            >
              <p className="text-xs font-bold text-red-400 mb-2">The result:</p>
              <p className="text-[10px] text-sflow-cream-muted leading-relaxed">
                Contradictions, ignored constraints, and subtle hallucinations &mdash;
                not because the AI forgot, but because your instructions became a whisper.
              </p>
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
