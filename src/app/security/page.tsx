"use client";

import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { QuoteBlock } from "@/components/content/QuoteBlock";
import { StatGroup } from "@/components/interactive/StatGroup";
import { StoryCard } from "@/components/interactive/StoryCard";
import { ComparisonBars } from "@/components/interactive/ComparisonBars";
import { MCPDiagramAnimation } from "@/components/interactive/MCPDiagramAnimation";
import { PromptInjectionAnimation } from "@/components/interactive/PromptInjectionAnimation";
import { AttackerComparisonAnimation } from "@/components/interactive/AttackerComparisonAnimation";
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
            { value: 492, suffix: "", label: "MCP servers without auth", source: { label: "Trend Micro", url: "https://www.trendmicro.com/vinfo/us/security/news/cybercrime-and-digital-threats/mcp-security-network-exposed-servers-are-backdoors-to-your-private-data" } },
            { value: 34, suffix: "%", label: "Susceptible to command injection", source: { label: "Endor Labs", url: "https://www.endorlabs.com/learn/classic-vulnerabilities-meet-ai-infrastructure-why-mcp-needs-appsec" } },
            { value: 50, suffix: "", label: "Vulnerabilities catalogued", source: { label: "vulnerablemcp.info", url: "https://vulnerablemcp.info/" } },
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
        <p className="mt-4 text-xs text-sflow-muted max-w-3xl">
          Source:{" "}
          <a href="https://www.ibm.com/reports/data-breach" target="_blank" rel="noopener noreferrer" className="underline hover:text-sflow-cream transition-colors">
            IBM Cost of a Data Breach Report 2025
          </a>{" "}
          (IBM &amp; Ponemon Institute, July 2025 — 3,470 interviews across 600 breached organizations)
        </p>
        <h3 className="text-xl font-bold mt-10 mb-4">Real-World Governance Failures</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {governanceStories.map((story) => (
            <StoryCard key={story.id} story={story} modal />
          ))}
        </div>
      </Section>

      {/* AI Agents as Attackers */}
      <Section>
        <h2 className="text-2xl font-bold mb-4">AI Agents as Attackers</h2>
        <div className="max-w-3xl space-y-4 text-sflow-cream-muted mb-8">
          <p>AI agents are already VERY good at finding security holes. They don&apos;t need to be &ldquo;correct&rdquo; - they just need to find 1 hole. Brute-force intelligence is now cheap.</p>
          <p className="text-lg text-sflow-cream font-semibold">
            Your defense needs to be right 100% of the time. The attacker only needs to be right once.
          </p>
        </div>
        <AttackerComparisonAnimation />
      </Section>

      {/* Prompt Injection */}
      <Section>
        <h2 className="text-2xl font-bold mb-6">Prompt Injection</h2>
        <StatGroup
          stats={[
            { value: 1, prefix: "#", label: "OWASP vulnerability for LLMs (2025)" },
            { value: 84, suffix: "%", label: "Attack success rate on unprotected agents" },
            { value: 1.4, suffix: "%", label: "With layered defenses (Anthropic)" },
          ]}
        />
        <p className="mt-2 text-xs text-sflow-muted max-w-3xl">
          Sources:{" "}
          <a href="https://genai.owasp.org/llmrisk/llm01-prompt-injection/" target="_blank" rel="noopener noreferrer" className="underline hover:text-sflow-cream transition-colors">
            OWASP Top 10 for LLMs
          </a>{", "}
          <a href="https://arxiv.org/abs/2601.17548" target="_blank" rel="noopener noreferrer" className="underline hover:text-sflow-cream transition-colors">
            arXiv:2601.17548
          </a>{" "}(prompt injection on agentic coding assistants){", "}
          <a href="https://venturebeat.com/security/prompt-injection-measurable-security-metric-one-ai-developer-publishes-numbers" target="_blank" rel="noopener noreferrer" className="underline hover:text-sflow-cream transition-colors">
            Anthropic via VentureBeat
          </a>
        </p>
        <div className="mt-6 mb-6">
          <PromptInjectionAnimation />
        </div>
        <p className="mt-6 text-sflow-cream-muted max-w-3xl">
          <strong className="text-sflow-gold">Good news:</strong> Layered defense drops attack success from 84% to under 2%.
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

      </Section>

      {/* Prompt Injection - real attacks */}
      <Section>
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

        <div className="grid gap-8 sm:grid-cols-2 max-w-4xl mx-auto">
          <ComparisonBars
            title="Per-token costs (GPT-3.5-level)"
            bars={[
              { label: "2022", value: "$20 / 1M tokens", width: 100 },
              { label: "2024", value: "$0.07 / 1M tokens", width: 0.4, color: "bg-green-500" },
            ]}
          />
          <ComparisonBars
            title="Enterprise GenAI market"
            bars={[
              { label: "2024", value: "$13.8B total", width: 37 },
              { label: "2025", value: "$37B total", width: 100, color: "bg-red-400" },
            ]}
          />
        </div>
        <p className="mt-2 text-xs text-sflow-cream-muted max-w-4xl">
          Sources: <a href="https://epoch.ai/data-insights/llm-inference-price-trends" target="_blank" rel="noopener noreferrer" className="underline hover:text-sflow-cream">Epoch AI</a> (280x cost drop for GPT-3.5-level performance, Nov 2022 &ndash; Oct 2024) &bull; <a href="https://menlovc.com/perspective/2025-the-state-of-generative-ai-in-the-enterprise/" target="_blank" rel="noopener noreferrer" className="underline hover:text-sflow-cream">Menlo Ventures</a> (enterprise market size)
        </p>

        <p className="mt-8 text-sflow-cream-muted max-w-3xl">
          Yet costs keep rising. Agentic AI uses <strong className="text-sflow-cream">5&ndash;30x more tokens</strong> per task,
          triggering 10&ndash;20 LLM calls per user action.
        </p>
        <p className="mt-2 text-xs text-sflow-cream-muted max-w-3xl">
          Source: <a href="https://www.gartner.com/en/newsroom/press-releases/2026-03-25-gartner-predicts-that-by-2030-performing-inference-on-an-llm-with-1-trillion-parameters-will-cost-genai-providers-over-90-percent-less-than-in-2025" target="_blank" rel="noopener noreferrer" className="underline hover:text-sflow-cream">Gartner, March 2026</a>
        </p>

        <p className="mt-6 text-sm text-sflow-cream-muted max-w-3xl">
          Monitor AI spend like any other operational cost.
        </p>
        <div className="mt-6 rounded-xl border border-sflow-gold/20 bg-sflow-gold/5 p-4 max-w-3xl">
          <p className="text-sm text-sflow-cream-muted">
            <strong className="text-sflow-gold">Track everything.</strong>{" "}Running AI experiments without
            tracking costs is just playing around. Noting down what you spend, what works, and what
            doesn&apos;t - that&apos;s what turns experimentation into science.
          </p>
        </div>
      </Section>

      {/* Auditing, Tracking & Governance */}
      <Section>
        <h2 className="text-2xl font-bold mb-4">Auditing, Tracking &amp; Governance</h2>
        <p className="text-sflow-cream-muted mb-6 max-w-3xl">
          If you can&apos;t answer &ldquo;who did what, when, and why?&rdquo; - you don&apos;t have governance.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 max-w-3xl mx-auto">
          {[
            { title: "Audit Trails", desc: "Log every AI action: what was requested, what was executed, what data was accessed. Non-negotiable for compliance." },
            { title: "Cost Budgets", desc: "Set spending limits per team, project, or agent. Alert before you hit them, not after." },
            { title: "Access Policies", desc: "Define who can deploy AI agents, what data they can touch, and what actions require human approval." },
            { title: "Review Cadence", desc: "Regular reviews of AI outputs, costs, and incidents. Treat AI like any other operational system." },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-sflow-glass-border bg-sflow-glass p-5">
              <h4 className="font-semibold text-sflow-cream">{item.title}</h4>
              <p className="mt-1 text-sm text-sflow-cream-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* The Dark Side */}
      <Section>
        <h2 className="text-2xl font-bold mb-4">The Dark Side</h2>
        <div className="max-w-3xl space-y-4 text-sflow-cream-muted">
          <p>AI is a tool. It serves whoever wields it.</p>
          <p>
            Palantir&apos;s Maven Smart System is now a core Pentagon AI platform across all military branches -
            AI for targeting, surveillance, battlefield intelligence. The same tech that automates your
            lead pipeline can automate a kill chain.
          </p>
          <p className="text-lg text-sflow-cream font-semibold">
            This isn&apos;t sci-fi - it&apos;s happening now. The ethics conversation is not optional.
          </p>
          <p className="text-xs text-sflow-muted mt-4">
            <a href="https://www.defensenews.com/land/2025/03/07/palantir-delivers-first-2-next-gen-targeting-systems-to-army/" target="_blank" rel="noopener noreferrer" className="underline hover:text-sflow-cream transition-colors">
              Source: Defense News - Palantir delivers next-gen targeting systems
            </a>
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
