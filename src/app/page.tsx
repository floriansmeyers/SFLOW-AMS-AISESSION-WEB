"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { QuoteBlock } from "@/components/content/QuoteBlock";

const SECTIONS = [
  {
    href: "/factory",
    badge: "Introduction",
    title: "The Factory Paradigm",
    description: "Why AI adoption mirrors the Industrial Revolution \u2014 and what the 6% who succeed do differently.",
  },
  {
    href: "/phase-1",
    badge: "Phase 1",
    title: "The Factory with a New Motor",
    description: "ChatGPT, Copilot, image generation, Google AI Studio \u2014 tools you can use today.",
  },
  {
    href: "/phase-2",
    badge: "Phase 2",
    title: "Ripping Out the Belts",
    description: "Meta-prompting, reusable skills, prompt chains \u2014 AI as a workflow component.",
  },
  {
    href: "/phase-3",
    badge: "Phase 3",
    title: "The New Factory",
    description: "Agentic AI, autonomous pipelines, and the human as operator.",
  },
  {
    href: "/security",
    badge: "Warning",
    title: "The Shadow Factory",
    description: "MCP security, governance failures, prompt injection, and the cost paradox.",
  },
  {
    href: "/landscape",
    badge: "Overview",
    title: "The AI Landscape",
    description: "Local models, open vs closed source, and geopolitics.",
  },
  {
    href: "/takeaways",
    badge: "Closing",
    title: "Key Takeaways",
    description: "9 principles to take home \u2014 and remember that email.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-sflow-darker">
        <div className="absolute inset-0 bg-gradient-to-br from-sflow-gold/8 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-block rounded-full bg-sflow-gold/15 px-3 py-1 text-sm font-medium text-sflow-gold mb-6">
              AMS &mdash; April 2, 2026
            </span>
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              AI Session
            </h1>
            <p className="mt-4 text-xl text-sflow-cream-muted sm:text-2xl">
              From ChatGPT basics to agentic workflows &mdash; practical tools you can use{" "}
              <span className="text-sflow-gold">tomorrow</span>.
            </p>
            <p className="mt-2 text-sflow-muted">
              By Florian Smeyers &mdash; Antwerp Management School
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Email Hook */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold sm:text-3xl">
            The Email That Started Everything
          </h2>
          <div className="mt-6 space-y-4 text-sflow-cream-muted max-w-3xl">
            <p>A client sends a change request by email.</p>
            <p>AI drafts the reply in 10 seconds &mdash; great.</p>
            <p>But it still sits in a mailbox for a day.</p>
            <p className="text-sflow-cream font-semibold text-lg">
              So what did we actually gain?
            </p>
          </div>
          <QuoteBlock
            quote="The bottleneck was never the typing."
          />
          <p className="text-sflow-cream-muted max-w-3xl">
            McKinsey found: AI saves <strong className="text-sflow-cream">5.7 hours per week</strong> per employee &mdash;
            but only <strong className="text-sflow-gold">1.7 of those</strong> go to high-value work.
            The rest is lost to the same old bottlenecks.
          </p>
        </motion.div>
      </section>

      {/* Section Cards */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <h2 className="text-2xl font-bold sm:text-3xl mb-8">
          Explore the Session
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.map((section, i) => (
            <motion.div
              key={section.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link
                href={section.href}
                className="group block h-full rounded-xl border border-sflow-glass-border bg-sflow-glass p-6 hover:bg-sflow-glass-hover hover:border-sflow-gold/30 transition-all"
              >
                <span className="inline-block rounded-full bg-sflow-gold/15 px-2.5 py-0.5 text-xs font-medium text-sflow-gold mb-3">
                  {section.badge}
                </span>
                <h3 className="text-lg font-semibold text-sflow-cream group-hover:text-sflow-gold transition-colors">
                  {section.title}
                </h3>
                <p className="mt-2 text-sm text-sflow-cream-muted">
                  {section.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
