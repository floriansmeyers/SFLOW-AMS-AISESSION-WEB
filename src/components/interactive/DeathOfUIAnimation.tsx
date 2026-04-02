"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { User, RotateCcw } from "lucide-react";

/**
 * DeathOfUIAnimation - Two-state transition showing the shift from
 * monolithic "one UI for everyone" to personalized AI-driven interfaces.
 *
 * Teaching point: when AI becomes the interface layer, you don't build
 * ONE dashboard that tries to please everyone. You build clean APIs and
 * data structures, and let AI generate the right view for each user.
 *
 * Animation cycle (~14s):
 *   0.0s – 1.0s : "TODAY" label + monolithic UI box fades in
 *   1.0s – 3.5s : User dots appear inside the box (all identical)
 *   3.5s – 4.5s : Small "DATA" layer appears below
 *   4.5s – 6.0s : Hold the "today" state
 *   6.0s – 6.8s : Orange "AI layer" arrow sweeps across
 *   6.8s – 7.5s : Old world dims to 50%
 *   7.5s – 9.5s : New world slides in from right - three personalized UIs
 *   9.5s – 10.2s: AI Personalization Layer label appears
 *  10.2s – 10.8s: Large SECURE DATA LAYER appears at bottom
 *  10.8s – 12.5s: Hold
 *  12.5s – 13.5s: Fade out
 *  13.5s – 15.0s: Pause
 */

const CYCLE = 15.0;

const PERSONALIZED_UIS = [
  { label: "Dashboard", role: "Manager", color: "border-blue-400/50 bg-blue-400/10", textColor: "text-blue-400" },
  { label: "Mobile", role: "Operator", color: "border-green-400/50 bg-green-400/10", textColor: "text-green-400" },
  { label: "Chat", role: "Developer", color: "border-purple-400/50 bg-purple-400/10", textColor: "text-purple-400" },
];

export function DeathOfUIAnimation() {
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
          className="space-y-8"
        >
          {/* ── Side by side: Today → Tomorrow ────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1.2fr] gap-4 items-center">

            {/* ── TODAY column ───────────────────────────────────── */}
            <motion.div
              animate={{ opacity: [1, 1, 0.4] }}
              transition={{ duration: 8, times: [0, 0.85, 1] }}
              className="space-y-3"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-xs font-bold uppercase tracking-widest text-sflow-cream-muted text-center"
              >
                Today
              </motion.p>

              {/* Big monolithic box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="rounded-xl border-2 border-sflow-cream-muted/30 bg-sflow-glass p-5 text-center"
              >
                <p className="text-sm font-bold text-sflow-cream mb-3">ONE UI</p>
                <p className="text-[10px] text-sflow-cream-muted mb-3">
                  Same screen for everyone
                </p>

                {/* Identical user dots */}
                <div className="flex justify-center gap-2">
                  {[0, 1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.5 + i * 0.3, duration: 0.3, ease: "backOut" }}
                      className="h-6 w-6 rounded-full bg-sflow-cream-muted/20 border border-sflow-cream-muted/40 flex items-center justify-center"
                    >
                      <User size={10} className="text-sflow-cream-muted" strokeWidth={2} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Small data layer */}
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.5, duration: 0.5 }}
                className="rounded-lg border border-sflow-cream-muted/20 bg-sflow-card px-3 py-1.5 text-center"
              >
                <span className="text-[10px] font-medium text-sflow-cream-muted">
                  data layer
                </span>
              </motion.div>
            </motion.div>

            {/* ── Transition arrow ───────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 6.0, duration: 0.6 }}
              className="hidden sm:flex flex-col items-center gap-1 px-2"
            >
              <svg width="48" height="24" viewBox="0 0 48 24" fill="none">
                <motion.path
                  d="M4 12h36m0 0l-8-7m8 7l-8 7"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-sflow-gold"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 6.0, duration: 0.8 }}
                />
              </svg>
              <span className="text-[10px] font-bold text-sflow-gold whitespace-nowrap">
                AI layer
              </span>
            </motion.div>

            {/* Mobile arrow (vertical) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 6.0, duration: 0.5 }}
              className="flex sm:hidden justify-center"
            >
              <div className="flex flex-col items-center gap-1">
                <svg width="24" height="32" viewBox="0 0 24 32" fill="none">
                  <path d="M12 4v20m0 0l-6-6m6 6l6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-sflow-gold" />
                </svg>
                <span className="text-[10px] font-bold text-sflow-gold">AI layer</span>
              </div>
            </motion.div>

            {/* ── TOMORROW column ────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 7.5, duration: 0.8, ease: "easeOut" }}
              className="space-y-3"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-sflow-gold text-center">
                Tomorrow
              </p>

              {/* Three personalized UIs */}
              <div className="grid grid-cols-3 gap-2">
                {PERSONALIZED_UIS.map((ui, i) => (
                  <motion.div
                    key={ui.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 7.8 + i * 0.3, duration: 0.5, ease: "easeOut" }}
                    className={`rounded-lg border ${ui.color} p-2.5 text-center`}
                  >
                    <p className={`text-[10px] font-bold ${ui.textColor}`}>
                      {ui.label}
                    </p>
                    <p className="text-[9px] text-sflow-cream-muted mt-0.5">
                      {ui.role}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* AI Personalization Layer */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 9.5, duration: 0.5, ease: "easeOut" }}
                className="rounded-lg border border-sflow-gold/40 bg-sflow-gold/10 px-3 py-2 text-center origin-left"
              >
                <span className="text-[10px] font-bold text-sflow-gold">
                  AI Personalization Layer
                </span>
              </motion.div>

              {/* Secure Data Layer */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 10.2, duration: 0.5 }}
                className="rounded-lg border-2 border-sflow-cream/30 bg-sflow-card px-3 py-2.5 text-center"
              >
                <span className="text-xs font-bold text-sflow-cream tracking-wide">
                  SECURE DATA LAYER
                </span>
                <p className="text-[9px] text-sflow-cream-muted mt-0.5">
                  MES · SCADA · ERP · Auth
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
