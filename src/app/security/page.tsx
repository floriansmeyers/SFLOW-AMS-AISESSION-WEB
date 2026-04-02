"use client";

import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { QuoteBlock } from "@/components/content/QuoteBlock";
import { StatGroup } from "@/components/interactive/StatGroup";
import { StoryCard } from "@/components/interactive/StoryCard";
import { ComparisonBars } from "@/components/interactive/ComparisonBars";
import { MCPDiagramAnimation } from "@/components/interactive/MCPDiagramAnimation";
import { PromptInjectionAnimation } from "@/components/interactive/PromptInjectionAnimation";
import { PHASE_META, STORIES } from "@/lib/constants";
import Link from "next/link";

const meta = PHASE_META.security;

const governanceStories = STORIES.filter((s) =>
  ["chevrolet", "air-canada", "meta-inbox"].includes(s.id)
);
const injectionStories = STORIES.filter((s) =>
  ["devin", "microsoft-copilot"].includes(s.id)
);

export default function SecurityPage() {
  return (
    <>
      <PageHero {...meta} />

      {/* MCP Security */}
      <Section>
        <h2 className="text-2xl font-bold mb-4">MCP &amp; Security</h2>
        <p className="text-sflow-cream-muted mb-6 max-w-3xl">
          MCP (Model Context Protocol) gives AI access to real systems - your email, your database, your code.
          If permissions are wrong, damage is real.
        </p>
        <StatGroup
          stats={[
            { value: 8000, suffix: "+", label: "MCP servers exposed online" },
            { value: 43, suffix: "%", label: "Have at least one vulnerability" },
            { value: 30, suffix: "+", label: "CVEs in 6 weeks (Jan–Feb 2026)" },
          ]}
        />
        <div className="mt-8 mb-6">
          <MCPDiagramAnimation />
        </div>
        <p className="mt-6 text-sflow-cream-muted max-w-3xl">
          Auditing: who did what, when, and why? Traceability is non-negotiable.
        </p>
      </Section>

      {/* Governance */}
      <Section>
        <h2 className="text-2xl font-bold mb-2">Governance, Not Agent Failure</h2>
        <QuoteBlock quote="The agent did what it was allowed to do. The question is: who allowed it?" />
        <StatGroup
          stats={[
            { value: 13, suffix: "%", label: "Organizations breached via AI" },
            { value: 97, suffix: "%", label: "Of those lacked access controls" },
            { value: 63, suffix: "%", label: "Have no AI governance policy" },
            { value: 670, prefix: "$", suffix: "K", label: "Extra cost per shadow AI breach" },
          ]}
        />
        <h3 className="text-xl font-bold mt-10 mb-4">Real-World Governance Failures</h3>
        <div className="space-y-4">
          {governanceStories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </Section>

      {/* AI Agents as Attackers */}
      <Section>
        <h2 className="text-2xl font-bold mb-4">AI Agents as Attackers</h2>
        <div className="max-w-3xl space-y-4 text-sflow-cream-muted">
          <p>AI agents are already VERY good at finding security holes. They don&apos;t need to be &ldquo;correct&rdquo; - they just need to find 1 hole. Brute-force intelligence is now cheap.</p>
          <p className="text-lg text-sflow-cream font-semibold">
            Your defense needs to be right 100% of the time. The attacker only needs to be right once.
          </p>
        </div>
      </Section>

      {/* Prompt Injection */}
      <Section>
        <h2 className="text-2xl font-bold mb-6">Prompt Injection</h2>
        <StatGroup
          stats={[
            { value: 1, prefix: "#", label: "OWASP vulnerability for LLMs (2025)" },
            { value: 73, suffix: "%", label: "Production AI deployments affected" },
            { value: 84, suffix: "%", label: "Attack success rate (up to)" },
          ]}
        />
        <div className="mt-6 mb-6">
          <PromptInjectionAnimation />
        </div>
        <p className="mt-6 text-sflow-cream-muted max-w-3xl">
          <strong className="text-sflow-gold">Good news:</strong> Layered defense reduces attack success from 73% to under 9%.
        </p>

        {/* Defense architecture */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
          {[
            { title: "Least Privilege", desc: "AI can only access what it strictly needs." },
            { title: "Input Validation", desc: "Sanitize everything." },
            { title: "Human-in-the-Loop", desc: "For sensitive actions." },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-sflow-glass-border bg-sflow-glass p-4">
              <h4 className="font-semibold text-sflow-cream">{item.title}</h4>
              <p className="mt-1 text-sm text-sflow-cream-muted">{item.desc}</p>
            </div>
          ))}
        </div>

        <QuoteBlock quote="No amount of 'please don't do bad things' in a system prompt protects you." />

        <h3 className="text-xl font-bold mt-8 mb-4">Real Prompt Injection Attacks</h3>
        <div className="space-y-4">
          {injectionStories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </Section>

      {/* Cost Awareness */}
      <Section>
        <h2 className="text-2xl font-bold mb-4">Cost Awareness</h2>
        <p className="text-sflow-cream-muted mb-6 max-w-3xl">The &ldquo;inference cost paradox&rdquo;:</p>

        <div className="grid gap-8 sm:grid-cols-2 max-w-3xl mx-auto">
          <ComparisonBars
            title="Per-token costs"
            bars={[
              { label: "2024", value: "Baseline", width: 100 },
              { label: "2026", value: "280x cheaper", width: 0.4, color: "bg-green-500" },
            ]}
          />
          <ComparisonBars
            title="Enterprise AI bills"
            bars={[
              { label: "2024", value: "$1.2M/yr avg", width: 17 },
              { label: "2026", value: "$7M/yr avg", width: 100, color: "bg-red-400" },
            ]}
          />
        </div>

        <p className="mt-6 text-sflow-cream-muted max-w-3xl">
          Why? Agentic AI uses <strong className="text-sflow-cream">5&ndash;30x more tokens</strong> per task.
        </p>

        <div className="mt-6 overflow-x-auto rounded-xl border border-sflow-glass-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-sflow-glass-border bg-sflow-glass">
                <th className="px-4 py-3 text-left font-medium text-sflow-cream-muted">Scenario</th>
                <th className="px-4 py-3 text-left font-medium text-sflow-cream-muted">Cost/month</th>
              </tr>
            </thead>
            <tbody>
              {[
                { scenario: "AI agent operations", cost: "$3,200–$13,000" },
                { scenario: "50K docs/month WITH caching", cost: "$8,000" },
                { scenario: "50K docs/month WITHOUT caching", cost: "$45,000" },
              ].map((row) => (
                <tr key={row.scenario} className="border-b border-sflow-glass-border last:border-b-0 hover:bg-sflow-glass transition-colors">
                  <td className="px-4 py-3 text-sflow-cream">{row.scenario}</td>
                  <td className="px-4 py-3 text-sflow-gold font-semibold">{row.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-sflow-cream-muted max-w-3xl">
          For every $1 on AI models &rarr; <strong className="text-sflow-cream">$5&ndash;10</strong> making them production-ready.
          Monitor it like any other operational cost.
        </p>
      </Section>

      {/* The Dark Side */}
      <Section>
        <h2 className="text-2xl font-bold mb-4">The Dark Side</h2>
        <div className="max-w-3xl space-y-4 text-sflow-cream-muted">
          <p>AI is a tool. It serves whoever wields it.</p>
          <p>Palantir in the US-Iran conflict: AI for targeting, surveillance, warfare. The same tech that automates your lead pipeline can automate a kill chain.</p>
          <p className="text-lg text-sflow-cream font-semibold">
            This isn&apos;t sci-fi - it&apos;s happening now. The ethics conversation is not optional.
          </p>
        </div>
      </Section>

      <Section>
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sflow-cream-muted mb-6">
            Beyond the threats - where is the technology heading?
          </p>
          <Link
            href="/landscape"
            className="inline-flex items-center gap-2 rounded-full bg-sflow-gold px-6 py-3 font-semibold text-sflow-dark hover:bg-sflow-gold-hover transition-colors"
          >
            See the landscape &rarr;
          </Link>
        </div>
      </Section>
    </>
  );
}
