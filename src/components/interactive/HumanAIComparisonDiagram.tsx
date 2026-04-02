"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

interface ComparisonRow {
  human: string;
  ai: string;
  explanation: string;
  icon: React.ReactNode;
}

const ROWS: ComparisonRow[] = [
  {
    human: "Working Memory",
    ai: "Context Window",
    explanation:
      "Humans hold ~7 items in working memory. LLMs have a fixed context window (e.g. 200K tokens). Both lose track when overloaded.",
    icon: <BrainIcon />,
  },
  {
    human: "Attention Span",
    ai: "Token Limit",
    explanation:
      "Humans lose focus after extended concentration. LLMs degrade as conversations grow long - early instructions get 'forgotten' as context fills up.",
    icon: <FocusIcon />,
  },
  {
    human: "Creativity vs Focus",
    ai: "Temperature",
    explanation:
      "Humans brainstorm loosely or concentrate precisely. LLMs use a 'temperature' parameter: low = predictable, high = creative and surprising.",
    icon: <SliderIcon />,
  },
  {
    human: "No Persistent Memory",
    ai: "Stateless",
    explanation:
      "You forget most conversations after a few days. LLMs forget EVERYTHING between sessions. Every conversation starts completely fresh.",
    icon: <EraseIcon />,
  },
  {
    human: "Senses (vision, hearing...)",
    ai: "Context (files, data...)",
    explanation:
      "Humans perceive the world through senses. LLMs 'perceive' through whatever you put in the context: text, images, files, tool outputs.",
    icon: <EyeIcon />,
  },
  {
    human: "Hands, voice, actions",
    ai: "Tools (APIs, code, search)",
    explanation:
      "Humans act on the world physically. LLMs act through tool calls - running code, searching the web, calling APIs. No tools = just text.",
    icon: <WrenchIcon />,
  },
];

export function HumanAIComparisonDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [activeRow, setActiveRow] = useState<number | null>(null);

  function handleRowClick(index: number) {
    setActiveRow((prev) => (prev === index ? null : index));
  }

  return (
    <div ref={ref} className="w-full max-w-3xl mx-auto space-y-2">
      {/* Header row */}
      <div className="grid grid-cols-[1fr_40px_1fr] gap-2 px-4 pb-2">
        <span className="text-sm font-semibold text-sflow-cream-muted text-center">
          Human
        </span>
        <span />
        <span className="text-sm font-semibold text-sflow-gold text-center">
          AI (LLM)
        </span>
      </div>

      {/* Comparison rows */}
      {ROWS.map((row, i) => {
        const isActive = activeRow === i;
        return (
          <motion.div
            key={row.human}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ delay: i * 0.1, duration: 0.4, ease: "easeOut" }}
          >
            <button
              onClick={() => handleRowClick(i)}
              className={`w-full text-left rounded-xl border transition-all duration-200 ${
                isActive
                  ? "border-sflow-gold/60 bg-sflow-gold/10"
                  : "border-sflow-glass-border bg-sflow-glass hover:bg-sflow-glass-hover hover:border-sflow-gold/30"
              }`}
            >
              <div className="grid grid-cols-[1fr_40px_1fr] gap-2 items-center px-4 py-3">
                {/* Human side */}
                <span
                  className={`text-sm font-medium text-center transition-colors duration-200 ${
                    isActive ? "text-sflow-cream" : "text-sflow-cream-muted"
                  }`}
                >
                  {row.human}
                </span>

                {/* Center icon */}
                <span className="flex items-center justify-center">
                  <span
                    className={`transition-colors duration-200 ${
                      isActive ? "text-sflow-gold" : "text-sflow-cream-muted/50"
                    }`}
                  >
                    {row.icon}
                  </span>
                </span>

                {/* AI side */}
                <span
                  className={`text-sm font-medium text-center transition-colors duration-200 ${
                    isActive ? "text-sflow-gold" : "text-sflow-cream-muted"
                  }`}
                >
                  {row.ai}
                </span>
              </div>

              {/* Expandable explanation */}
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    key="explanation"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-4 pb-4 text-sm text-sflow-cream-muted border-t border-sflow-gold/20 pt-3">
                      {row.explanation}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </motion.div>
        );
      })}

      {/* Bottom hint */}
      <p className="text-center text-xs text-sflow-cream-muted/50 pt-2">
        Tap a row to see the parallel explained
      </p>
    </div>
  );
}

/* ════════════════════════════════════════════
   Small SVG icons (20×20)
   ════════════════════════════════════════════ */

function BrainIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 3C7.2 3 5 5.2 5 8c0 1.2.4 2.3 1.1 3.1C5.4 11.6 5 12.5 5 13.5 5 15.4 6.6 17 8.5 17H10h1.5C13.4 17 15 15.4 15 13.5c0-1-.4-1.9-1.1-2.4C14.6 10.3 15 9.2 15 8c0-2.8-2.2-5-5-5z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M10 3v14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="2 2" />
    </svg>
  );
}

function FocusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="10" cy="10" r="1" fill="currentColor" />
    </svg>
  );
}

function SliderIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <line x1="3" y1="7" x2="17" y2="7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="7" cy="7" r="2.5" fill="currentColor" />
      <line x1="3" y1="13" x2="17" y2="13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="13" cy="13" r="2.5" fill="currentColor" />
    </svg>
  );
}

function EraseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="7" width="14" height="8" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M7 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="8" y1="11" x2="12" y2="11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M2 10s3-5 8-5 8 5 8 5-3 5-8 5-8-5-8-5z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function WrenchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M14.5 3a3.5 3.5 0 00-3.3 4.6L4.5 14.3a1.5 1.5 0 002.1 2.1l6.7-6.7A3.5 3.5 0 0017 6.2l-2 2-1.7-.5-.5-1.7 2-2z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
