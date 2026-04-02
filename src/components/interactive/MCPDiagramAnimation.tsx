"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { RotateCcw } from "lucide-react";

/**
 * MCPDiagramAnimation — Shows how MCP connects AI to real systems:
 *   AI Agent → (tool_call) → MCP Server (with tools: read_file, query_db,
 *   send_msg, create_pr) → External Systems (File System, Database, Slack/GitHub)
 *   + danger warning: "If permissions are wrong..."
 *
 * Teaching point: MCP is the standardized protocol that lets AI agents
 * interact with your real infrastructure. It's powerful — and dangerous
 * if permissions aren't scoped correctly.
 *
 * Infinite loop ~14s.
 */

const CYCLE = 14.5;

const TOOLS = ["read_file", "query_db", "send_msg", "create_pr"];
const SYSTEMS = [
  { name: "File System", desc: "Local files, docs" },
  { name: "Database", desc: "PostgreSQL, APIs" },
  { name: "External Services", desc: "Slack, GitHub, Email" },
];

export function MCPDiagramAnimation() {
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
          className="space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1.3fr_auto_1fr] items-center gap-3">
            {/* ── AI Agent ───────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="rounded-xl border border-sflow-glass-border bg-sflow-glass p-4"
            >
              <p className="text-xs font-bold text-sflow-cream uppercase tracking-widest mb-3 text-center">
                AI Agent
              </p>
              <div className="space-y-1.5 text-xs text-sflow-cream-muted text-center">
                <p>Has a prompt</p>
                <p>Has instructions</p>
                <p className="text-sflow-cream font-medium">
                  Decides what tool to call
                </p>
              </div>
            </motion.div>

            {/* ── Arrow: tool_call ────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.3 }}
              className="hidden sm:flex flex-col items-center gap-1"
            >
              <span className="text-[10px] font-mono text-sflow-cream-muted">
                tool_call
              </span>
              <ArrowSVG />
            </motion.div>

            {/* ── MCP Server ─────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.0, duration: 0.6 }}
              className="rounded-xl border-2 border-sflow-gold/30 bg-sflow-gold/[0.03] p-4"
            >
              <p className="text-xs font-bold text-sflow-gold uppercase tracking-widest mb-1 text-center">
                MCP Server
              </p>
              <p className="text-[10px] text-sflow-cream-muted/60 text-center mb-3">
                Protocol layer (standardized interface)
              </p>

              {/* Tool grid */}
              <div className="grid grid-cols-2 gap-1.5">
                {TOOLS.map((tool, i) => (
                  <motion.div
                    key={tool}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 2.8 + i * 0.2,
                      duration: 0.25,
                      ease: "backOut",
                    }}
                    className="rounded border border-sflow-glass-border bg-sflow-card px-2 py-1.5 text-center"
                  >
                    <span className="text-[10px] font-mono text-sflow-cream-muted">
                      {tool}
                    </span>
                  </motion.div>
                ))}
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.8, duration: 0.3 }}
                className="text-[10px] text-sflow-cream-muted/50 text-center mt-2"
              >
                Defines available tools + permissions
              </motion.p>
            </motion.div>

            {/* ── Arrows to systems ──────────────────────────── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4.5, duration: 0.4 }}
              className="hidden sm:flex flex-col items-center gap-1"
            >
              <ArrowSVG />
            </motion.div>

            {/* ── External Systems ────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 5.0, duration: 0.5 }}
              className="space-y-2"
            >
              {SYSTEMS.map((sys, i) => (
                <motion.div
                  key={sys.name}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 5.2 + i * 0.3, duration: 0.4 }}
                  className="rounded-lg border border-sflow-glass-border bg-sflow-glass p-2.5"
                >
                  <p className="text-[11px] font-semibold text-sflow-cream">
                    {sys.name}
                  </p>
                  <p className="text-[9px] text-sflow-cream-muted/60">
                    {sys.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── Danger warning ────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 6.5, duration: 0.5 }}
            className="mx-auto w-fit rounded-lg border border-sflow-gold/40 bg-sflow-gold/10 px-4 py-2"
          >
            <span className="text-xs font-semibold text-sflow-gold">
              If permissions are wrong...
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

function ArrowSVG() {
  return (
    <svg width="32" height="16" viewBox="0 0 32 16" fill="none" className="text-sflow-cream-muted">
      <line x1="2" y1="8" x2="24" y2="8" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4,3" />
      <polygon points="22,4 30,8 22,12" fill="currentColor" />
    </svg>
  );
}
