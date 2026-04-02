"use client";

import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { QuoteBlock } from "@/components/content/QuoteBlock";
import { DemoCallout } from "@/components/content/DemoCallout";
import { StatGroup } from "@/components/interactive/StatGroup";
import { StoryCard } from "@/components/interactive/StoryCard";
import { Timeline } from "@/components/interactive/Timeline";
import { PipelineAnimation } from "@/components/interactive/PipelineAnimation";
import { AgenticToolSelectionAnimation } from "@/components/interactive/AgenticToolSelectionAnimation";
import { PHASE_META, STORIES } from "@/lib/constants";
import Link from "next/link";

const meta = PHASE_META["phase-3"];
const klarnaStory = STORIES.find((s) => s.id === "klarna")!;

const klarnaTimeline = [
  {
    date: "Early 2024",
    title: "AI Deployed",
    description:
      "2.3M conversations/month. Equivalent to 700 full-time agents. Satisfaction up 47%.",
    highlight: true,
  },
  {
    date: "Mid 2024",
    title: "Full Speed Ahead",
    description:
      "Headcount 5,000 → 3,000. $10M annual savings. Response time: 15 min → under 2 min.",
    highlight: false,
  },
  {
    date: "2025",
    title: "Complex Cases Fail",
    description:
      "Quietly rebuilding human customer service team. Full AI replacement failed for sensitive cases.",
    highlight: false,
  },
  {
    date: "2026",
    title: "Hybrid Model",
    description:
      "Human-on-the-loop stabilized. AI handles volume, humans handle complexity.",
    highlight: true,
  },
];

export default function Phase3Page() {
  return (
    <>
      <PageHero {...meta} />

      <Section>
        <h2 className="text-2xl font-bold mb-6">Agentic AI - Current State</h2>
        <StatGroup
          stats={[
            {
              value: 57,
              suffix: "%",
              label: "Companies with AI agents in production",
              source: { label: "G2, 2025", url: "https://learn.g2.com/g2-2025-ai-agent-insight-report" },
            },
            {
              value: 62,
              suffix: "%",
              label: "Anticipate >100% ROI",
              source: { label: "PagerDuty, 2025", url: "https://www.pagerduty.com/newsroom/agentic-ai-survey-2025/" },
            },
            {
              value: 2000,
              suffix: "%",
              label: "Productivity gains (KYC/AML, banks)",
              prefix: "up to ",
              source: { label: "McKinsey, 2025", url: "https://www.mckinsey.com/capabilities/risk-and-resilience/our-insights/how-agentic-ai-can-change-the-way-banks-fight-financial-crime" },
            },
            {
              value: 21,
              suffix: "%",
              label: "Have mature agent governance",
              source: { label: "Deloitte, 2026", url: "https://www.deloitte.com/us/en/about/press-room/state-of-ai-report-2026.html" },
            },
          ]}
        />
      </Section>

      <Section>
        <h2 className="text-2xl font-bold mb-4">
          Agentic / Agent vs Autonomous AI
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 max-w-3xl mx-auto mb-8">
          <div className="rounded-xl border border-sflow-gold/30 bg-sflow-gold/5 p-5">
            <h3 className="font-semibold text-sflow-gold mb-2">
              Agentic / Agent
            </h3>
            <p className="text-sm text-sflow-cream-muted">
              AI that{" "}
              <strong className="text-sflow-cream">
                chooses its own tools
              </strong>
              , plans steps, and orchestrates workflows. You give it a goal; it
              figures out the how.{" "}
              <strong className="text-sflow-cream">A human starts it.</strong>
            </p>
            <p className="mt-2 text-xs text-sflow-muted italic">
              Example: Claude Code reading your codebase, deciding which files
              to edit, running tests - but you told it what to do.
            </p>
          </div>
          <div className="rounded-xl border border-purple-400/30 bg-purple-400/5 p-5">
            <h3 className="font-semibold text-purple-300 mb-2">
              Autonomous AI
            </h3>
            <p className="text-sm text-sflow-cream-muted">
              Fully autonomous AI that{" "}
              <strong className="text-sflow-cream">
                acts on triggers or schedules
              </strong>{" "}
              without human initiation. It runs in the background, watching for
              events.
            </p>
            <p className="mt-2 text-xs text-sflow-muted italic">
              Example: An agent that polls Azure DevOps every 30s, claims
              tickets tagged &ldquo;CLAUDE,&rdquo; executes work, and closes
              them.
            </p>
          </div>
        </div>
        <p className="text-sflow-cream-muted max-w-3xl mb-8">
          The magic isn&apos;t the agent - it&apos;s the{" "}
          <strong className="text-sflow-gold">process</strong>{" "}it&apos;s
          embedded in.
        </p>
      </Section>

      <Section>
        <h2 className="text-2xl font-bold mb-4">
          Tool Selection Is Still Just Text
        </h2>
        <p className="text-sflow-cream-muted max-w-3xl mb-8">
          The surprising truth: when an agent &ldquo;decides&rdquo; to call a
          tool, it&apos;s not executing code - it&apos;s generating text that
          describes what it wants to do. The system interprets that text and
          runs the tool.
        </p>
        <AgenticToolSelectionAnimation />
      </Section>

      <Section>
        <h2 className="text-2xl font-bold mb-6">
          What &ldquo;Autonomous&rdquo; Looks Like
        </h2>
        <div className="grid gap-6 sm:grid-cols-3 max-w-4xl mx-auto">
          {[
            {
              title: "CoWork Scheduled Tasks",
              items: [
                "Set cadence: hourly, daily, weekly, weekdays, on demand",
                "Each task = its own session with all files + plugins",
                "Desktop app only, paid plans",
              ],
            },
            {
              title: "Dispatch",
              items: [
                "Send tasks from phone → Claude executes on desktop",
                "Scan QR code → connected in 2 taps",
                "Note: tasks are routed through Anthropic\u2019s cloud \u2014 not fully local processing",
              ],
            },
            {
              title: "Claude CLI (Claude Code)",
              items: [
                "Terminal-based agentic coding tool (GA May 2025) - human-driven, not autonomous",
                "Natural language → code, file ops, git, shell, web search",
                "Autonomous only via /loop (recurring tasks) or scheduled triggers",
              ],
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-xl border border-sflow-glass-border bg-sflow-glass p-5"
            >
              <h3 className="font-semibold text-sflow-cream mb-3">
                {card.title}
              </h3>
              <ul className="space-y-2">
                {card.items.map((item, i) => (
                  <li
                    key={i}
                    className="text-sm text-sflow-cream-muted flex gap-2"
                  >
                    <span className="text-sflow-gold shrink-0">&bull;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sflow-cream-muted max-w-3xl">
          These tools don&apos;t just answer questions - they{" "}
          <strong className="text-sflow-cream">DO things</strong>. Browse the
          web. Open files. Write code. Send emails. All autonomously, with
          permission controls.
        </p>
        <DemoCallout
          title="Parallel research with Claude Code"
          description="Running multiple research tasks in parallel from the CLI - real-time autonomous execution."
        />
      </Section>

      <Section>
        <h2 className="text-2xl font-bold mb-4">
          Demo: Automated Lead Research Pipeline
        </h2>
        <DemoCallout
          title="Fully autonomous sales pipeline"
          description="End-to-end: Google Form intake → CSV → CoWork scheduled job picks up new entries → AI researches each company → saves research → second job generates personalized outreach emails. Zero manual work."
        />
        <div className="mt-4">
          <PipelineAnimation
            steps={[
              { num: 1, text: "Google Forms intake" },
              { num: 2, text: "CSV export" },
              { num: 3, text: "CoWork fetches entries" },
              { num: 4, text: "Research company" },
              { num: 5, text: "Save to folder" },
              { num: 6, text: "Draft outreach" },
            ]}
          />
        </div>
        <p className="mt-4 text-sm text-sflow-gold max-w-3xl">
          Result: Lead intake → personalized email draft - human only reviews
          and sends.
        </p>
      </Section>

      <Section>
        <DemoCallout
          title="Google AI Studio App with Database"
          description="Link the CSV from the lead pipeline into Google AI Studio. AI builds a full app to browse leads, view research, edit outreach drafts. Built entirely for free - no code."
        />
      </Section>

      {/* AI for deterministic code */}
      <Section>
        <h2 className="text-2xl font-bold mb-4">
          Don&apos;t Ask AI to DO Finance - Ask It to BUILD the Tool
        </h2>
        <div className="max-w-3xl space-y-4 text-sflow-cream-muted">
          <p>
            AI makes mistakes. Math doesn&apos;t. The solution:{" "}
            <strong className="text-sflow-cream">
              use AI to build a deterministic app
            </strong>{" "}
            that executes reliably every time.
          </p>
          <p>
            Instead of asking Claude to calculate your KPIs, ask it to{" "}
            <strong className="text-sflow-gold">build an app</strong> that pulls
            data from Azure DevOps, calculates the KPIs with exact formulas, and
            shows a dashboard. The app is reviewable, testable, and repeatable.
          </p>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 max-w-3xl mx-auto">
          <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5">
            <p className="text-xs font-medium text-red-400 uppercase tracking-wide mb-2">
              Wrong approach
            </p>
            <p className="text-sm text-sflow-cream-muted italic">
              &ldquo;Calculate our sprint velocity and defect rate from this
              data.&rdquo;
            </p>
            <p className="mt-2 text-[10px] text-red-400">
              AI may hallucinate numbers, round differently, miss edge cases.
            </p>
          </div>
          <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-5">
            <p className="text-xs font-medium text-green-400 uppercase tracking-wide mb-2">
              Right approach
            </p>
            <p className="text-sm text-sflow-cream-muted italic">
              &ldquo;Build me an app that connects to Azure DevOps, fetches work
              items for the last 6 sprints, and calculates velocity and defect
              rate using [these exact formulas].&rdquo;
            </p>
            <p className="mt-2 text-[10px] text-green-400">
              Deterministic. Reviewable. Repeatable.
            </p>
          </div>
        </div>
        <DemoCallout
          title="Azure DevOps KPI automation"
          description="Using Claude Code / AI Studio to build an app that pulls Azure DevOps data and generates KPI dashboards - deterministic code, not AI guesswork."
        />
      </Section>

      <Section>
        <DemoCallout
          title="Connecting Claude to your tools"
          description="MCP servers, connectors, and app integrations - giving Claude access to email, databases, and APIs."
        />
      </Section>

      <Section>
        <DemoCallout
          title="Building a production agent"
          description="Using the Claude Agent SDK to build an autonomous workflow with tool access and human-in-the-loop controls."
        />
      </Section>

      <Section>
        <h2 className="text-2xl font-bold mb-6">The Human as Operator</h2>
        <div className="overflow-x-auto rounded-xl border border-sflow-glass-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-sflow-glass-border bg-sflow-glass">
                <th className="px-4 py-3 text-left font-medium text-sflow-cream-muted">
                  Model
                </th>
                <th className="px-4 py-3 text-left font-medium text-sflow-cream-muted">
                  Human Role
                </th>
                <th className="px-4 py-3 text-left font-medium text-sflow-cream-muted">
                  AI Role
                </th>
                <th className="px-4 py-3 text-left font-medium text-sflow-cream-muted">
                  Analogy
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  model: "Human-in-the-loop",
                  human: "Does the work, AI assists",
                  ai: "Copilot/assistant",
                  analogy: "Worker with power tools",
                },
                {
                  model: "Human-on-the-loop",
                  human: "Monitors, intervenes on exception",
                  ai: "Autonomous executor",
                  analogy: "Factory floor manager",
                },
                {
                  model: "Human-out-of-the-loop",
                  human: "Sets policy, reviews outcomes",
                  ai: "Fully autonomous",
                  analogy: "Business owner reviewing reports",
                },
              ].map((row) => (
                <tr
                  key={row.model}
                  className="border-b border-sflow-glass-border last:border-b-0 hover:bg-sflow-glass transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-sflow-cream">
                    {row.model}
                  </td>
                  <td className="px-4 py-3 text-sflow-cream-muted">
                    {row.human}
                  </td>
                  <td className="px-4 py-3 text-sflow-cream-muted">{row.ai}</td>
                  <td className="px-4 py-3 text-sflow-cream-muted">
                    {row.analogy}
                  </td>
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
          <p>
            <strong className="text-sflow-cream">
              The process guards quality, not the individual.
            </strong>{" "}
            Review gates, validation steps, automated checks.
          </p>
          <p>
            <strong className="text-sflow-cream">
              Real performance gains come from process redesign, NOT AI
              &ldquo;assisting&rdquo; the human.
            </strong>
          </p>
        </div>
      </Section>

      <Section>
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sflow-cream-muted mb-6">
            Every factory has a dark side. Let&apos;s talk about what happens
            when you build without guardrails.
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
