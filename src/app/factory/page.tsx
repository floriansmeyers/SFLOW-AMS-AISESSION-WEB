"use client";

import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { QuoteBlock } from "@/components/content/QuoteBlock";
import { StatGroup } from "@/components/interactive/StatGroup";
import { FunnelChart } from "@/components/interactive/FunnelChart";
import { Timeline } from "@/components/interactive/Timeline";
import { FactoryEvolutionAnimation } from "@/components/interactive/FactoryEvolutionAnimation";
import { HumanAIComparisonDiagram } from "@/components/interactive/HumanAIComparisonDiagram";
import { PHASE_META } from "@/lib/constants";
import { Factory } from "lucide-react";
import Link from "next/link";

const meta = PHASE_META.factory;

const electricityTimeline = [
  { date: "1879", title: "Edison invents the lightbulb", description: "Electric motors become available. You'd think factories would immediately become more productive.", highlight: false },
  { date: "1900", title: "5% electric power", description: "Factories simply replaced the steam engine with an electric motor. Same building, same belts, same layout.", highlight: false },
  { date: "1919", title: "50% electric power", description: "Still marginal productivity gains. Productivity growth: just 1.3%/year.", highlight: false },
  { date: "1920s", title: "The breakthrough", description: "Engineers redesigned factories from scratch. Each machine got its own motor. Single-floor layouts. Arranged by flow, not by power source.", highlight: true },
  { date: "1930", title: "80% electric power", description: "Productivity growth jumped to 3.1%/year — more than doubled. It took 40 years.", highlight: true },
];

export default function FactoryPage() {
  return (
    <>
      <PageHero {...meta} />

      <Section>
        <QuoteBlock
          quote="It will be comparable with the Industrial Revolution. But instead of exceeding people in physical strength, it's going to exceed people in intellectual ability."
          author="Geoffrey Hinton"
          source="Nobel Prize 2024"
          url="https://www.nobelprize.org/prizes/physics/2024/hinton/lecture/"
        />

        <div className="mt-8 max-w-3xl space-y-4 text-sflow-cream-muted">
          <p>
            In 1879, Edison invented the lightbulb. Electric motors became available.
            You&apos;d think factories would immediately become more productive, right?
          </p>
          <p className="text-xl font-bold text-sflow-cream">
            For 40 years &mdash; nothing.
          </p>
          <p>
            Factories were designed for steam power: one big steam engine, connected to every machine
            via belts and pulleys. When they &ldquo;adopted&rdquo; electricity, they just replaced the steam
            engine with an electric motor. Same building, same layout, same belts.
          </p>
          <p className="text-lg font-semibold text-sflow-gold">
            The tool changed. The process didn&apos;t. And that&apos;s why nothing improved.
          </p>
          <p>
            The breakthrough came when engineers stopped asking &ldquo;how do we use this motor?&rdquo;
            and started asking &ldquo;how should the factory work?&rdquo; They redesigned the process
            from scratch &mdash; single-floor layouts, each machine with its own motor, arranged by
            workflow instead of power source. <strong className="text-sflow-cream">Process redesign, not tool adoption,
            is what doubled productivity.</strong>
          </p>
        </div>

        <div className="mt-8 rounded-xl border border-sflow-glass-border bg-sflow-glass p-6 max-w-3xl mx-auto text-center">
          <Factory size={56} className="mx-auto mb-4 text-sflow-cream-muted" strokeWidth={1.5} />
          <p className="text-sm text-sflow-cream-muted italic">
            Belt-driven factory floor, circa 1900: one steam engine powers every machine through a maze of belts and pulleys.
            Replace the engine with an electric motor and nothing changes &mdash; same layout, same constraints, same bottlenecks.
          </p>
        </div>
      </Section>

      <Section>
        <h2 className="text-2xl font-bold mb-8">The Electricity Timeline</h2>
        <Timeline events={electricityTimeline} />

        <QuoteBlock
          quote="Managers at first simply overlaid one technical system upon a preexisting stratum."
          author="Paul David"
          source={`\u201cThe Dynamo and the Computer,\u201d 1990`}
          url="https://www.jstor.org/stable/2006600"
        />

        <p className="text-sflow-cream-muted max-w-3xl mt-4">
          Satya Nadella calls AI a &ldquo;compressed Industrial Revolution&rdquo; &mdash; what took
          200 years with electricity could take 20&ndash;25 years with AI.
        </p>
      </Section>

      <Section>
        <h2 className="text-2xl font-bold mb-6">From Workshop to Agent System</h2>
        <p className="text-sflow-cream-muted mb-8 max-w-3xl">
          The pattern repeats every industrial revolution: individual skill gets encoded into process, then process gets automated at scale.
        </p>
        <FactoryEvolutionAnimation />
      </Section>

      <Section>
        <h2 className="text-2xl font-bold mb-4">Are AI and Humans More Alike Than We Think?</h2>
        <p className="text-sflow-cream-muted mb-8 max-w-3xl">
          Understanding how LLMs work starts with a surprising insight: many AI limitations
          mirror human cognition. This isn&apos;t a coincidence &mdash; it&apos;s a useful mental model
          for building better workflows. <span className="text-sflow-gold">(Phase 1 goes deeper.)</span>
        </p>
        <HumanAIComparisonDiagram />
      </Section>

      <Section>
        <h2 className="text-2xl font-bold mb-6">Three Versions of the Same Factory</h2>
        <p className="text-sflow-cream-muted mb-8 max-w-3xl">
          Tonight, I&apos;m going to take you through three versions of the same factory.
          By the end, you&apos;ll know exactly where you are &mdash; and where to go next.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { phase: "Phase 1", title: "It Goes Faster", desc: "ChatGPT, smarter emails, better drafts", analogy: "We bolted an electric motor onto the steam-era belt drive.", href: "/phase-1" },
            { phase: "Phase 2", title: "Retrofitting", desc: "AI becomes a workflow component, not just a tool", analogy: "We ripped out the belts and installed new production lines.", href: "/phase-2" },
            { phase: "Phase 3", title: "The New Factory", desc: "Agentic workflows — systems built for automation from day one", analogy: "We redesigned the factory from the ground up.", href: "/phase-3" },
          ].map((p) => (
            <Link
              key={p.phase}
              href={p.href}
              className="group rounded-xl border border-sflow-glass-border bg-sflow-glass p-6 hover:bg-sflow-glass-hover hover:border-sflow-gold/30 transition-all"
            >
              <span className="inline-block rounded-full bg-sflow-gold/15 px-2.5 py-0.5 text-xs font-medium text-sflow-gold mb-2">
                {p.phase}
              </span>
              <h3 className="text-lg font-semibold text-sflow-cream group-hover:text-sflow-gold transition-colors">
                {p.title}
              </h3>
              <p className="mt-1 text-sm text-sflow-cream-muted">{p.desc}</p>
              <p className="mt-3 text-sm italic text-sflow-muted">&ldquo;{p.analogy}&rdquo;</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="text-2xl font-bold mb-6">The Adoption Gap</h2>
        <p className="text-lg text-sflow-cream mb-2">
          <strong>&ldquo;88% of companies have adopted AI. Only 6% are transforming their business with it.&rdquo;</strong>
        </p>
        <p className="text-sm text-sflow-muted mb-8">&mdash; McKinsey, 2025</p>

        <FunnelChart
          steps={[
            { label: "Using AI at all", value: "88%", width: 100 },
            { label: "Using generative AI", value: "72%", width: 82 },
            { label: "Scaling enterprise-wide", value: "~33%", width: 38 },
            { label: "Significant financial impact (>5% EBIT)", value: "6%", width: 7 },
          ]}
        />

        <div className="mt-8">
          <StatGroup
            stats={[
              { value: 88, suffix: "%", label: "Using AI" },
              { value: 6, suffix: "%", label: "Real impact" },
              { value: 3, suffix: "x", label: "More likely to redesign workflows" },
              { value: 40, label: "Years electricity took", suffix: " yrs" },
            ]}
          />
        </div>

        <p className="mt-6 text-sflow-cream-muted max-w-3xl">
          <strong className="text-sflow-gold">Process is king.</strong> The 6% who see real impact
          aren&apos;t the ones with the best AI tools &mdash; they&apos;re the ones who redesigned
          their workflows around AI. The tool is the motor. The process is the factory.
        </p>
      </Section>

      <Section>
        <h2 className="text-2xl font-bold mb-4">AI Is Like the Early Internet</h2>
        <div className="max-w-3xl space-y-4 text-sflow-cream-muted">
          <p>In 1998, everyone was struggling to find &ldquo;something&rdquo; to do with it. Pet food websites. Digital brochures. Glorified phone books.</p>
          <p>Google was founded in a garage. Amazon sold books.</p>
          <p className="text-lg text-sflow-cream font-semibold">
            The next Google or Amazon of AI probably hasn&apos;t stood up yet.
          </p>
        </div>

        <h3 className="text-xl font-bold mt-10 mb-4">When Production Gets Cheaper...</h3>
        <QuoteBlock quote="If software becomes 10x cheaper to build, do you think companies will build less of it?" />
        <p className="text-sflow-cream-muted max-w-3xl">
          The Industrial Revolution didn&apos;t mean fewer goods &mdash; it meant MORE. Software, images,
          content, code &mdash; costs are dropping fast. We won&apos;t make less. We&apos;ll make{" "}
          <strong className="text-sflow-gold">far more</strong>.
        </p>
      </Section>
    </>
  );
}
