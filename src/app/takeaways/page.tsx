"use client";

import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { QuoteBlock } from "@/components/content/QuoteBlock";
import { PHASE_META, TAKEAWAYS } from "@/lib/constants";
import { motion } from "framer-motion";

const meta = PHASE_META.takeaways;

export default function TakeawaysPage() {
  return (
    <>
      <PageHero {...meta} />

      <Section>
        <h2 className="text-2xl font-bold mb-6">Remember That Email?</h2>
        <div className="max-w-3xl space-y-6 text-sflow-cream-muted">
          <p>Let&apos;s go back to where we started. A client sends a change request by email.</p>

          <div className="space-y-4">
            {[
              {
                phase: "Phase 1",
                text: "AI drafts the reply in 10 seconds. You review and send. Faster, but the bottleneck is still the mailbox.",
              },
              {
                phase: "Phase 2",
                text: "The email triggers a prompt chain. AI extracts the request, checks it against project data, drafts a response with context. You review a complete package instead of starting from scratch.",
              },
              {
                phase: "Phase 3",
                text: "The email never reaches a human inbox. An agent receives it, classifies the request, pulls the relevant data, drafts the response, routes it for approval if needed, and sends it. You see a dashboard of what was handled overnight.",
              },
            ].map((item) => (
              <div key={item.phase} className="rounded-xl border border-sflow-glass-border bg-sflow-glass p-5">
                <span className="inline-block rounded-full bg-sflow-gold/15 px-2.5 py-0.5 text-xs font-medium text-sflow-gold mb-2">
                  {item.phase}
                </span>
                <p className="text-sflow-cream-muted">{item.text}</p>
              </div>
            ))}
          </div>

          <p className="text-lg text-sflow-cream font-semibold">
            Same email. Three factories. Three completely different outcomes.
          </p>
        </div>
      </Section>

      <Section>
        <h2 className="text-2xl font-bold mb-8">Key Takeaways</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TAKEAWAYS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-xl border border-sflow-glass-border bg-sflow-glass p-5"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sflow-gold/20 text-sm font-bold text-sflow-gold mb-3">
                {i + 1}
              </span>
              <h3 className="font-semibold text-sflow-cream">{item.title}</h3>
              <p className="mt-1 text-sm text-sflow-cream-muted">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section>
        <QuoteBlock quote="The next Google or Amazon of AI probably hasn't stood up yet. Maybe it's in this room." />
      </Section>

      <Section>
        <h2 className="text-2xl font-bold mb-6">Resources &amp; Links</h2>
        <div className="grid gap-4 sm:grid-cols-2 max-w-3xl mx-auto">
          {[
            { label: "Session Form", href: "https://forms.gle/CFTFgaCKJfgZLfVd7" },
            { label: "Claude", href: "https://claude.ai" },
            { label: "ChatGPT", href: "https://chatgpt.com" },
            { label: "Google AI Studio", href: "https://aistudio.google.com" },
            { label: "Gamma", href: "https://gamma.app" },
            { label: "MCP Servers", href: "https://mcp.so" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-xl border border-sflow-glass-border bg-sflow-glass p-4 hover:bg-sflow-glass-hover hover:border-sflow-gold/30 transition-all group"
            >
              <span className="font-medium text-sflow-cream group-hover:text-sflow-gold transition-colors">
                {link.label}
              </span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sflow-muted group-hover:text-sflow-gold transition-colors">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-sflow-gold/30 bg-sflow-gold/5 p-6 max-w-3xl mx-auto">
          <h3 className="text-lg font-semibold text-sflow-gold mb-2">Get in touch</h3>
          <p className="text-sflow-cream-muted">
            <a href="mailto:florian@sflow.be" className="text-sflow-cream hover:text-sflow-gold transition-colors">
              florian@sflow.be
            </a>
            {" "}-{" "}
            <a href="https://sflow.be" target="_blank" className="text-sflow-cream hover:text-sflow-gold transition-colors">
              sflow.be
            </a>
          </p>
        </div>
      </Section>
    </>
  );
}
