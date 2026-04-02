"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  highlight?: boolean;
  source?: string;
}

export function Timeline({ events }: { events: TimelineEvent[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-px bg-sflow-glass-border sm:left-1/2" />

      <div className="space-y-8">
        {events.map((event, i) => (
          <motion.div
            key={event.date}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            animate={
              isInView
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: i % 2 === 0 ? -30 : 30 }
            }
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className={`relative flex flex-col sm:flex-row ${
              i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
            }`}
          >
            {/* Dot */}
            <div className="absolute left-4 top-5 z-10 h-3 w-3 -translate-x-1/2 rounded-full sm:left-1/2">
              <div
                className={`h-full w-full rounded-full ${
                  event.highlight ? "bg-sflow-gold" : "bg-sflow-muted"
                }`}
              />
            </div>

            {/* Content */}
            <div
              className={`ml-10 sm:ml-0 sm:w-1/2 ${
                i % 2 === 0 ? "sm:pr-12 sm:text-right" : "sm:pl-12"
              }`}
            >
              <span className="text-xs font-medium text-sflow-gold">
                {event.date}
              </span>
              <h4 className="mt-1 font-semibold text-sflow-cream">
                {event.title}
              </h4>
              <p className="mt-1 text-sm text-sflow-cream-muted">
                {event.description}
              </p>
              {event.source && (
                <a
                  href={event.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-xs text-sflow-gold/60 hover:text-sflow-gold hover:underline transition-colors"
                >
                  [source]
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
