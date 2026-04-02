"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { RotateCcw } from "lucide-react";

const HUMAN_STEPS = [
  { text: "> nmap -sV target.com", delay: 0.5 },
  { text: "Scanning ports...", delay: 2.0 },
  { text: "Port 443 open (HTTPS)", delay: 4.0 },
  { text: "> searching exploit-db...", delay: 6.0 },
  { text: "Reading documentation...", delay: 8.0 },
  { text: "> trying CVE-2024-...", delay: 11.0 },
];

const AGENT_STEPS = [
  { text: "> Scanning 2,847 ports simultaneously", delay: 0.5 },
  { text: "> 12 services identified in 0.3s", delay: 1.2 },
  { text: "> Cross-referencing 340K CVEs...", delay: 1.8 },
  { text: "> 7 potential vectors found", delay: 2.4 },
  { text: "> Generating custom payloads...", delay: 2.9 },
  { text: "> Testing all vectors in parallel", delay: 3.4 },
  { text: "> Pivoting to internal network", delay: 3.9 },
  { text: "> Exfiltrating credentials...", delay: 4.4 },
  { text: "> Establishing persistence", delay: 4.9 },
  { text: "> Complete. 12 seconds total.", delay: 5.4 },
];

export function AttackerComparisonAnimation() {
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
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {/* Human attacker */}
          <div className="rounded-xl border border-sflow-glass-border bg-sflow-glass p-4">
            <p className="text-xs font-bold text-sflow-cream-muted uppercase tracking-widest mb-3 text-center">
              Human Attacker
            </p>
            <div className="rounded-lg bg-sflow-darker p-3 font-mono text-[10px] leading-relaxed min-h-[180px]">
              {HUMAN_STEPS.map((step, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: step.delay, duration: 0.3 }}
                  className="text-sflow-cream-muted"
                >
                  {step.text}
                </motion.p>
              ))}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 12.0, duration: 0.3 }}
                className="text-sflow-cream-muted mt-2"
              >
                <span className="text-yellow-400">Still working...</span>
              </motion.p>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 12.5, duration: 0.4 }}
              className="text-xs text-sflow-cream-muted text-center mt-3"
            >
              Hours to days per target
            </motion.p>
          </div>

          {/* AI agent attacker */}
          <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4">
            <p className="text-xs font-bold text-red-400 uppercase tracking-widest mb-3 text-center">
              AI Agent Attacker
            </p>
            <div className="rounded-lg bg-sflow-darker p-3 font-mono text-[10px] leading-relaxed min-h-[180px]">
              {AGENT_STEPS.map((step, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: step.delay, duration: 0.15 }}
                  className="text-red-400/80"
                >
                  {step.text}
                </motion.p>
              ))}
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 6.0, duration: 0.4 }}
              className="text-xs text-red-400 text-center mt-3 font-semibold"
            >
              Seconds. Fully automated. 24/7.
            </motion.p>
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
