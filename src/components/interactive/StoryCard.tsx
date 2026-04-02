"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import type { Story } from "@/lib/constants";

export function StoryCard({ story, modal }: { story: Story; modal?: boolean }) {
  const [open, setOpen] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (modal && open) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [modal, open]);

  const details = (
    <div className="space-y-4 text-sm">
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
            <span className="inline-flex items-center gap-1">Source <ExternalLink size={10} /></span>
          </a>
        )}
      </div>
    </div>
  );

  if (modal) {
    return (
      <>
        <div
          className="rounded-xl border border-sflow-glass-border bg-sflow-glass hover:bg-sflow-glass-hover transition-colors cursor-pointer overflow-hidden h-full flex flex-col"
          onClick={() => setOpen(true)}
        >
          <div className="p-5 flex-1">
            <h3 className="font-semibold text-sflow-cream">{story.title}</h3>
            <p className="mt-1 text-sm text-sflow-cream-muted">{story.hook}</p>
          </div>
          <div className="px-5 pb-4">
            <span className="text-xs text-sflow-gold">Click to read more</span>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.2 }}
                className="relative w-full max-w-lg max-h-[80vh] overflow-y-auto rounded-2xl border border-sflow-glass-border bg-sflow-dark p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-4 right-4 text-sflow-cream-muted hover:text-sflow-cream transition-colors"
                >
                  <X size={20} />
                </button>
                <h3 className="font-bold text-lg text-sflow-cream mb-4 pr-8">{story.title}</h3>
                {details}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Default inline expand behavior
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
            <div className="border-t border-sflow-glass-border px-5 py-4">
              {details}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
