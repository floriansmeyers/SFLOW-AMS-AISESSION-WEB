"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { RotateCcw } from "lucide-react";

/**
 * FactoryEvolutionAnimation — Three-column diagram showing the evolution
 * from artisanal workshop → industrial factory → AI agent system.
 *
 * Teaching point: the pattern of how technology adoption evolves is always
 * the same — individual skill → standardized process → scalable system.
 * AI agents are NOT replacing people; they're the next evolution of process.
 *
 * Animation cycle (~14s):
 *   0.0s – 2.0s : Column 1 (Artisanal Workshop) fades + slides in from left
 *   2.0s – 2.8s : Arrow 1 draws in
 *   2.8s – 4.8s : Column 2 (Industrial Factory) fades + slides in
 *   4.8s – 5.6s : Arrow 2 draws in
 *   5.6s – 7.6s : Column 3 (AI Agent System) fades + slides in
 *   7.6s – 8.5s : Bottom label appears
 *   8.5s – 12.0s: Hold
 *  12.0s – 13.0s: Fade out
 *  13.0s – 14.5s: Pause
 */

const CYCLE = 14.5;

interface ColumnData {
  title: string;
  icon: React.ReactNode;
  color: string;
  bullets: string[];
  caption: string;
}

const COLUMNS: ColumnData[] = [
  {
    title: "Artisanal Workshop",
    color: "border-sflow-cream-muted/30",
    icon: <ExpertCircle />,
    bullets: [
      "One expert does everything",
      "Quality = individual skill",
      "If that person leaves, the workshop stops",
    ],
    caption: "Individual skill",
  },
  {
    title: "Industrial Factory",
    color: "border-blue-400/40",
    icon: <FactoryCircles />,
    bullets: [
      "Specialized roles (QA, Ops, Mgr)",
      "Documented procedures",
      "Process guards quality",
    ],
    caption: "Process",
  },
  {
    title: "AI Agent System",
    color: "border-sflow-gold/40",
    icon: <AgentBoxes />,
    bullets: [
      "Agent boxes replace manual steps",
      "Prompts = procedures",
      "Human = quality controller",
    ],
    caption: "Scale",
  },
];

export function FactoryEvolutionAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-50px" });
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
          {/* ── Three columns with arrows ─────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr_auto_1fr] items-start gap-3">
            {COLUMNS.map((col, i) => (
              <ColumnWithArrow key={col.title} col={col} index={i} />
            ))}
          </div>

          {/* ── Bottom progression label ──────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 7.6, duration: 0.6 }}
            className="mt-6 flex items-center justify-center gap-3 text-sm font-semibold"
          >
            <span className="text-sflow-cream-muted">Individual skill</span>
            <ArrowRight className="text-sflow-gold" />
            <span className="text-blue-400">Process</span>
            <ArrowRight className="text-sflow-gold" />
            <span className="text-sflow-gold">Scale</span>
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
   ColumnWithArrow — a single column + the arrow AFTER it (if any)
   ═══════════════════════════════════════════════════════════════════ */

function ColumnWithArrow({ col, index }: { col: ColumnData; index: number }) {
  // Stagger: each column appears 2.8s after the previous
  const colDelay = index * 2.8;
  const arrowDelay = colDelay + 1.8;

  return (
    <>
      {/* Column card */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: colDelay, duration: 0.8, ease: "easeOut" }}
        className={`rounded-xl border ${col.color} bg-sflow-glass p-4 sm:p-5`}
      >
        {/* Icon area */}
        <div className="flex justify-center mb-4">{col.icon}</div>

        {/* Title */}
        <h4 className="text-sm font-bold text-sflow-cream text-center mb-3">
          {col.title}
        </h4>

        {/* Bullets */}
        <ul className="space-y-1.5">
          {col.bullets.map((b, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: colDelay + 0.8 + i * 0.2, duration: 0.4 }}
              className="text-xs text-sflow-cream-muted flex gap-1.5"
            >
              <span className="text-sflow-gold shrink-0">•</span>
              {b}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Arrow between columns (not after last) */}
      {index < 2 && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: arrowDelay, duration: 0.4, ease: "backOut" }}
          className="hidden sm:flex items-center justify-center self-center"
        >
          <svg width="36" height="24" viewBox="0 0 36 24" fill="none">
            <motion.path
              d="M2 12h28m0 0l-7-6m7 6l-7 6"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-sflow-gold"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: arrowDelay, duration: 0.5 }}
            />
          </svg>
        </motion.div>
      )}

      {/* Mobile arrow (vertical) */}
      {index < 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: arrowDelay, duration: 0.3 }}
          className="flex sm:hidden justify-center py-1"
        >
          <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
            <path
              d="M12 2v20m0 0l-6-6m6 6l6-6"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-sflow-gold"
            />
          </svg>
        </motion.div>
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SVG Icons for each column
   ═══════════════════════════════════════════════════════════════════ */

/** Single expert circle — represents the lone craftsman */
function ExpertCircle() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      {/* Person silhouette circle */}
      <circle cx="32" cy="24" r="10" stroke="currentColor" strokeWidth="1.5" className="text-sflow-cream-muted" />
      <path d="M16 54c0-8.8 7.2-16 16-16s16 7.2 16 16" stroke="currentColor" strokeWidth="1.5" className="text-sflow-cream-muted" strokeLinecap="round" />
      {/* Small star (skill) */}
      <circle cx="48" cy="14" r="5" className="fill-sflow-cream-muted/20 stroke-sflow-cream-muted" strokeWidth="1" />
      <path d="M48 10.5l1.4 2.8 3.1.5-2.2 2.2.5 3.1L48 17.5l-2.8 1.6.5-3.1-2.2-2.2 3.1-.5z" className="fill-sflow-cream-muted" />
    </svg>
  );
}

/** Three role circles — QA, Ops, Mgr */
function FactoryCircles() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      {/* Three connected circles */}
      <circle cx="18" cy="28" r="10" className="fill-blue-400/10 stroke-blue-400/60" strokeWidth="1.5" />
      <text x="18" y="32" textAnchor="middle" className="fill-blue-400" fontSize="7" fontWeight="600">QA</text>

      <circle cx="46" cy="28" r="10" className="fill-blue-400/10 stroke-blue-400/60" strokeWidth="1.5" />
      <text x="46" y="32" textAnchor="middle" className="fill-blue-400" fontSize="7" fontWeight="600">Ops</text>

      <circle cx="32" cy="48" r="10" className="fill-blue-400/10 stroke-blue-400/60" strokeWidth="1.5" />
      <text x="32" y="52" textAnchor="middle" className="fill-blue-400" fontSize="7" fontWeight="600">Mgr</text>

      {/* Connecting lines */}
      <line x1="26" y1="33" x2="38" y2="43" className="stroke-blue-400/30" strokeWidth="1" />
      <line x1="38" y1="33" x2="26" y2="43" className="stroke-blue-400/30" strokeWidth="1" />
      <line x1="28" y1="28" x2="36" y2="28" className="stroke-blue-400/30" strokeWidth="1" />
    </svg>
  );
}

/** Agent boxes — represents AI system components */
function AgentBoxes() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      {/* Agent boxes */}
      <rect x="6" y="10" width="20" height="14" rx="3" className="fill-sflow-gold/10 stroke-sflow-gold/60" strokeWidth="1.5" />
      <text x="16" y="20" textAnchor="middle" className="fill-sflow-gold" fontSize="7" fontWeight="600">A1</text>

      <rect x="38" y="10" width="20" height="14" rx="3" className="fill-sflow-gold/10 stroke-sflow-gold/60" strokeWidth="1.5" />
      <text x="48" y="20" textAnchor="middle" className="fill-sflow-gold" fontSize="7" fontWeight="600">A2</text>

      <rect x="22" y="34" width="20" height="14" rx="3" className="fill-sflow-gold/10 stroke-sflow-gold/60" strokeWidth="1.5" />
      <text x="32" y="44" textAnchor="middle" className="fill-sflow-gold" fontSize="7" fontWeight="600">A3</text>

      {/* Flow arrows */}
      <path d="M26 20h12" className="stroke-sflow-gold/40" strokeWidth="1" markerEnd="url(#arrowGold)" />
      <path d="M20 24l8 10" className="stroke-sflow-gold/40" strokeWidth="1" />
      <path d="M44 24l-8 10" className="stroke-sflow-gold/40" strokeWidth="1" />

      {/* Human controller icon (eye) */}
      <ellipse cx="32" cy="56" rx="8" ry="4" className="stroke-sflow-cream-muted/60" strokeWidth="1" fill="none" />
      <circle cx="32" cy="56" r="2" className="fill-sflow-cream-muted/60" />
    </svg>
  );
}

/** Simple right arrow for the bottom label */
function ArrowRight({ className }: { className?: string }) {
  return (
    <svg width="20" height="12" viewBox="0 0 20 12" fill="none" className={className}>
      <path d="M2 6h14m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
