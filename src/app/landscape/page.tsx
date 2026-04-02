"use client";

import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { PHASE_META } from "@/lib/constants";
import Link from "next/link";

const meta = PHASE_META.landscape;

export default function LandscapePage() {
  return (
    <>
      <PageHero {...meta} />

      <Section>
        <h2 className="text-2xl font-bold mb-6">Local Models Are Coming to Your Laptop</h2>
        <div className="grid gap-4 sm:grid-cols-2 max-w-3xl">
          {[
            { title: "Cheaper Hardware", desc: "Getting cheaper and easier to run on smaller hardware every month." },
            { title: "Apple MLX Chips", desc: "Apple ships dedicated machine learning chips in every laptop." },
            { title: "Privacy Benefit", desc: "Your data never leaves your device. Sensitive documents analyzed locally." },
            { title: "Becoming Normal", desc: "Running models locally is becoming standard, not niche." },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-sflow-glass-border bg-sflow-glass p-5">
              <h3 className="font-semibold text-sflow-cream">{item.title}</h3>
              <p className="mt-1 text-sm text-sflow-cream-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="text-2xl font-bold mb-6">Closed Source vs Open Source</h2>
        <div className="overflow-x-auto rounded-xl border border-sflow-glass-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-sflow-glass-border bg-sflow-glass">
                <th className="px-4 py-3 text-left font-medium text-sflow-cream-muted"></th>
                <th className="px-4 py-3 text-left font-medium text-sflow-cream-muted">Closed Source</th>
                <th className="px-4 py-3 text-left font-medium text-sflow-cream-muted">Open Source</th>
              </tr>
            </thead>
            <tbody>
              {[
                { row: "Examples", closed: "Anthropic (Claude), OpenAI (ChatGPT)", open: "Meta (Llama), DeepSeek, Qwen" },
                { row: "Price", closed: "Subscription / API fees", open: "Free (self-host or cheap API)" },
                { row: "Customization", closed: "Limited to provider's options", open: "Full control, fine-tunable" },
                { row: "Guardrails", closed: "Built-in, polished", open: "Fewer restrictions" },
                { row: "Privacy", closed: "Data goes to provider", open: "Runs on your infrastructure" },
              ].map((item) => (
                <tr key={item.row} className="border-b border-sflow-glass-border last:border-b-0 hover:bg-sflow-glass transition-colors">
                  <td className="px-4 py-3 font-medium text-sflow-cream">{item.row}</td>
                  <td className="px-4 py-3 text-sflow-cream-muted">{item.closed}</td>
                  <td className="px-4 py-3 text-sflow-cream-muted">{item.open}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 max-w-3xl space-y-4 text-sflow-cream-muted">
          <p>Trade-off: <strong className="text-sflow-cream">convenience &amp; safety</strong> vs <strong className="text-sflow-cream">control &amp; cost</strong>.</p>
          <p>
            Geopolitical angle: China open-sourcing powerful models changes the playing field entirely.
            Llama 4 Scout has a <strong className="text-sflow-gold">10M token context window</strong> &mdash; open source, free.
          </p>
        </div>
      </Section>

      <Section>
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sflow-cream-muted mb-6">
            Let&apos;s wrap it up &mdash; what does all of this mean for you?
          </p>
          <Link
            href="/takeaways"
            className="inline-flex items-center gap-2 rounded-full bg-sflow-gold px-6 py-3 font-semibold text-sflow-dark hover:bg-sflow-gold-hover transition-colors"
          >
            Key takeaways &rarr;
          </Link>
        </div>
      </Section>
    </>
  );
}
