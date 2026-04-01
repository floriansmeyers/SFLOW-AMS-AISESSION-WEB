"use client";

import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { QuoteBlock } from "@/components/content/QuoteBlock";
import { DemoCallout } from "@/components/content/DemoCallout";
import { StatGroup } from "@/components/interactive/StatGroup";
import { StoryCard } from "@/components/interactive/StoryCard";
import { Timeline } from "@/components/interactive/Timeline";
import { PHASE_META, STORIES } from "@/lib/constants";
import Link from "next/link";

const meta = PHASE_META["phase-3"];
const klarnaStory = STORIES.find((s) => s.id === "klarna")!;

const klarnaTimeline = [
  { date: "Early 2024", title: "AI Deployed", description: "2.3M conversations/month. Equivalent to 700 full-time agents. Satisfaction up 47%.", highlight: true },
  { date: "Mid 2024", title: "Full Speed Ahead", description: "Headcount 5,000 \u2192 3,000. $10M annual savings. Response time: 15 min \u2192 under 2 min.", highlight: false },
  { date: "2025", title: "Complex Cases Fail", description: "Quietly rebuilding human customer service team. Full AI replacement failed for sensitive cases.", highlight: false },
  { date: "2026", title: "Hybrid Model", description: "Human-on-the-loop stabilized. AI handles volume, humans handle complexity.", highlight: true },
];

export default function Phase3Page() {
  return (
    <>
      <PageHero {...meta} />

      <Section>
        <h2 className="text-2xl font-bold mb-6">Agentic AI &mdash; Current State</h2>
        <StatGroup
          stats={[
            { value: 57, suffix: "%", label: "Companies with AI agents in production" },
            { value: 62, suffix: "%", label: "Anticipate >100% ROI" },
            { value: 2000, suffix: "%", label: "Productivity gains (KYC/AML, banks)", prefix: "up to " },
            { value: 21, suffix: "%", label: "Have mature agent governance" },
          ]}
        />
      </Section>

      <Section>
        <h2 className="text-2xl font-bold mb-4">What Is an &ldquo;Agent&rdquo;?</h2>
        <div className="max-w-3xl space-y-4 text-sflow-cream-muted">
          <p>A prompt that runs triggered by an event or a set time. Nothing more, nothing less.</p>
          <p>The magic isn&apos;t the agent &mdash; it&apos;s the <strong className="text-sflow-gold">process</strong> it&apos;s embedded in.</p>
        </div>
        <div className="mt-6 rounded-xl border border-sflow-glass-border bg-sflow-glass p-5 max-w-3xl">
          <p className="text-sm text-sflow-cream-muted">
            <strong className="text-sflow-cream">Real example:</strong> An agent polls Azure DevOps every 30 seconds for tickets
            tagged &ldquo;CLAUDE.&rdquo; It claims the ticket, reads the description, executes the work,
            posts a comment with findings, and closes the ticket. No human intervention.
          </p>
        </div>
      </Section>

      <Section>
        <h2 className="text-2xl font-bold mb-6">What &ldquo;Autonomous&rdquo; Looks Like</h2>
        <div className="grid gap-6 sm:grid-cols-3 max-w-4xl">
          {[
            {
              title: "CoWork Scheduled Tasks",
              items: ["Set cadence: hourly, daily, weekly, weekdays, on demand", "Each task = its own session with all files + plugins", "Desktop app only, paid plans"],
            },
            {
              title: "Dispatch",
              items: ["Send tasks from phone \u2192 Claude executes on desktop", "Scan QR code \u2192 connected in 2 taps", "All processing local, files never leave your computer"],
            },
            {
              title: "Claude CLI (Claude Code)",
              items: ["Terminal-based agentic coding tool (GA May 2025)", "Natural language \u2192 code, file ops, git, shell, web search", "Extensible: skills, hooks, subagents, MCP servers"],
            },
          ].map((card) => (
            <div key={card.title} className="rounded-xl border border-sflow-glass-border bg-sflow-glass p-5">
              <h3 className="font-semibold text-sflow-cream mb-3">{card.title}</h3>
              <ul className="space-y-2">
                {card.items.map((item, i) => (
                  <li key={i} className="text-sm text-sflow-cream-muted flex gap-2">
                    <span className="text-sflow-gold shrink-0">&bull;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sflow-cream-muted max-w-3xl">
          These tools don&apos;t just answer questions &mdash; they <strong className="text-sflow-cream">DO things</strong>.
          Browse the web. Open files. Write code. Send emails. All autonomously, with permission controls.
        </p>
      </Section>

      <Section>
        <h2 className="text-2xl font-bold mb-4">Demo: Automated Lead Research Pipeline</h2>
        <DemoCallout
          title="Fully autonomous sales pipeline"
          description="End-to-end: Google Form intake \u2192 CSV \u2192 CoWork scheduled job picks up new entries \u2192 AI researches each company \u2192 saves research \u2192 second job generates personalized outreach emails. Zero manual work."
        />
        <div className="mt-4 rounded-xl border border-sflow-glass-border bg-sflow-glass p-5 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            {["Google Form", "\u2192", "CSV Export", "\u2192", "CoWork Job #1 (research)", "\u2192", "Research Folder", "\u2192", "CoWork Job #2 (outreach)", "\u2192", "Draft Emails"].map((step, i) => (
              <span key={i} className={step === "\u2192" ? "text-sflow-gold" : "rounded-md bg-sflow-card px-2.5 py-1 text-sflow-cream"}>
                {step}
              </span>
            ))}
          </div>
          <p className="mt-3 text-sm text-sflow-gold">
            Result: Lead intake &rarr; personalized email draft &mdash; human only reviews and sends.
          </p>
        </div>
      </Section>

      <Section>
        <DemoCallout
          title="Google AI Studio App with Database"
          description="Link the CSV from the lead pipeline into Google AI Studio. AI builds a full app to browse leads, view research, edit outreach drafts. Built entirely for free \u2014 no code."
        />
      </Section>

      <Section>
        <h2 className="text-2xl font-bold mb-6">The Human as Operator</h2>
        <div className="overflow-x-auto rounded-xl border border-sflow-glass-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-sflow-glass-border bg-sflow-glass">
                <th className="px-4 py-3 text-left font-medium text-sflow-cream-muted">Model</th>
                <th className="px-4 py-3 text-left font-medium text-sflow-cream-muted">Human Role</th>
                <th className="px-4 py-3 text-left font-medium text-sflow-cream-muted">AI Role</th>
                <th className="px-4 py-3 text-left font-medium text-sflow-cream-muted">Analogy</th>
              </tr>
            </thead>
            <tbody>
              {[
                { model: "Human-in-the-loop", human: "Does the work, AI assists", ai: "Copilot/assistant", analogy: "Worker with power tools" },
                { model: "Human-on-the-loop", human: "Monitors, intervenes on exception", ai: "Autonomous executor", analogy: "Factory floor manager" },
                { model: "Human-out-of-the-loop", human: "Sets policy, reviews outcomes", ai: "Fully autonomous", analogy: "Business owner reviewing reports" },
              ].map((row) => (
                <tr key={row.model} className="border-b border-sflow-glass-border last:border-b-0 hover:bg-sflow-glass transition-colors">
                  <td className="px-4 py-3 font-medium text-sflow-cream">{row.model}</td>
                  <td className="px-4 py-3 text-sflow-cream-muted">{row.human}</td>
                  <td className="px-4 py-3 text-sflow-cream-muted">{row.ai}</td>
                  <td className="px-4 py-3 text-sflow-cream-muted">{row.analogy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section>
        <h2 className="text-2xl font-bold mb-6">The Klarna Rollercoaster</h2>
        <Timeline events={klarnaTimeline} />
        <div className="mt-8">
          <StoryCard story={klarnaStory} />
        </div>
        <div className="mt-8 max-w-3xl space-y-4 text-sflow-cream-muted">
          <p><strong className="text-sflow-cream">The process guards quality, not the individual.</strong> Review gates, validation steps, automated checks.</p>
          <p><strong className="text-sflow-cream">Real performance gains come from process redesign, NOT AI &ldquo;assisting&rdquo; the human.</strong></p>
        </div>
      </Section>

      <Section>
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sflow-cream-muted mb-6">
            Every factory has a dark side. Let&apos;s talk about what happens when you build without guardrails.
          </p>
          <Link
            href="/security"
            className="inline-flex items-center gap-2 rounded-full bg-sflow-gold px-6 py-3 font-semibold text-sflow-dark hover:bg-sflow-gold-hover transition-colors"
          >
            Enter the shadow factory &rarr;
          </Link>
        </div>
      </Section>
    </>
  );
}
