"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Story } from "@/lib/constants";

export function StoryCard({ story }: { story: Story }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="rounded-xl border border-sflow-glass-border bg-sflow-glass hover:bg-sflow-glass-hover transition-colors cursor-pointer overflow-hidden"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-start justify-between gap-4 p-5">
        <div>
          <h3 className="font-semibold text-sflow-cream">{story.title}</h3>
          <p className="mt-1 text-sm text-sflow-cream-muted">{story.hook}</p>
          {story.imageUrl && (
            <div className="mt-3 rounded-lg overflow-hidden border border-sflow-glass-border">
              <img
                src={story.imageUrl}
                alt={story.title}
                className="w-full h-40 object-cover"
                loading="lazy"
              />
            </div>
          )}
        </div>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="shrink-0 text-sflow-muted mt-1"
        >
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border-t border-sflow-glass-border px-5 py-4 space-y-4 text-sm">
              <div>
                <p className="font-medium text-sflow-gold text-xs uppercase tracking-wide mb-1">
                  Setup
                </p>
                <p className="text-sflow-cream-muted">{story.setup}</p>
              </div>
              <div>
                <p className="font-medium text-sflow-gold text-xs uppercase tracking-wide mb-1">
                  What Happened
                </p>
                <p className="text-sflow-cream-muted">{story.happened}</p>
              </div>
              <div className="rounded-lg bg-sflow-gold/10 border border-sflow-gold/20 p-3">
                <p className="font-medium text-sflow-gold text-xs uppercase tracking-wide mb-1">
                  The Lesson
                </p>
                <p className="text-sflow-cream">{story.lesson}</p>
                {story.sourceUrl && (
                  <a
                    href={story.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-block mt-2 text-xs text-sflow-gold/70 hover:text-sflow-gold transition-colors"
                  >
                    Source ↗
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
