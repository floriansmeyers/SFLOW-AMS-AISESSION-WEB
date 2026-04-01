"use client";

import { motion } from "framer-motion";

interface QuoteBlockProps {
  quote: string;
  author?: string;
  source?: string;
}

export function QuoteBlock({ quote, author, source }: QuoteBlockProps) {
  return (
    <motion.blockquote
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="relative border-l-4 border-sflow-gold pl-6 py-2 my-8"
    >
      <p className="text-lg italic text-sflow-cream sm:text-xl">
        &ldquo;{quote}&rdquo;
      </p>
      {(author || source) && (
        <footer className="mt-2 text-sm text-sflow-muted">
          {author && <span className="font-medium">&mdash; {author}</span>}
          {source && <span>, {source}</span>}
        </footer>
      )}
    </motion.blockquote>
  );
}
