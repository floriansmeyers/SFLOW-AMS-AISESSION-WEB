"use client";

import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { QuoteBlock } from "@/components/content/QuoteBlock";
import { ExerciseBox } from "@/components/content/ExerciseBox";
import { DemoCallout } from "@/components/content/DemoCallout";
import { StatGroup } from "@/components/interactive/StatGroup";
import { ModelTable } from "@/components/interactive/ModelTable";
import { EmailRaceAnimation } from "@/components/interactive/EmailRaceAnimation";
import { LLMTokenAnimation } from "@/components/interactive/LLMTokenAnimation";
import { LLMPipelineAnimation } from "@/components/interactive/LLMPipelineAnimation";
import { ContextWindowAnimation } from "@/components/interactive/ContextWindowAnimation";
import { PHASE_META, IMAGE_TOOLS } from "@/lib/constants";
import Link from "next/link";

const meta = PHASE_META["phase-1"];

export default function Phase1Page() {
  return (
    <>
      <PageHero {...meta} />

      {/* How LLMs Work */}
      <Section>
        <h2 className="text-2xl font-bold mb-6">How the Machine Works (in 2 minutes)</h2>
        <p className="text-sflow-cream-muted mb-6 max-w-3xl mx-auto">
          A large language model is a <strong className="text-sflow-cream">next-token prediction machine</strong>:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 max-w-3xl mx-auto">
          {[
            { step: "1", title: "Tokenization", desc: `Text is broken into small pieces (\u201ctokens\u201d, roughly 3/4 of a word).` },
            { step: "2", title: "Pattern Recognition", desc: "Trained on massive text, it learned statistical patterns about which tokens follow others." },
            { step: "3", title: "Probability", desc: "Given a sequence, it predicts the most likely next token. Repeats. That's it." },
            { step: "4", title: "Emergent Capabilities", desc: `At scale, surprising abilities arise: reasoning, coding, analysis. It doesn\u2019t \u201cknow\u201d — but the results can be remarkable.` },
          ].map((item) => (
            <div key={item.step} className="rounded-xl border border-sflow-glass-border bg-sflow-glass p-5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sflow-gold/20 text-sm font-bold text-sflow-gold mb-3">
                {item.step}
              </span>
              <h3 className="font-semibold text-sflow-cream">{item.title}</h3>
              <p className="mt-1 text-sm text-sflow-cream-muted">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <LLMTokenAnimation />
        </div>
      </Section>

      {/* Why AI "Forgets" and Can't Go Back */}
      <Section>
        <h2 className="text-2xl font-bold mb-4">Why AI &ldquo;Forgets&rdquo; &amp; Can&apos;t Go Back</h2>
        <div className="grid gap-4 sm:grid-cols-2 max-w-3xl mx-auto mb-8">
          <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5">
            <h3 className="font-semibold text-red-400 mb-2">Stateless</h3>
            <p className="text-sm text-sflow-cream-muted">
              Every conversation starts from zero. The AI has <strong className="text-sflow-cream">no memory</strong> of
              yesterday&apos;s chat. It&apos;s not being difficult &mdash; it literally doesn&apos;t know.
            </p>
          </div>
          <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5">
            <h3 className="font-semibold text-red-400 mb-2">Autoregressive</h3>
            <p className="text-sm text-sflow-cream-muted">
              Tokens are generated left-to-right, one at a time. It <strong className="text-sflow-cream">can&apos;t revise</strong> earlier
              tokens once written. That&apos;s why your feedback matters &mdash; the AI literally can&apos;t go back and fix it on its own.
            </p>
          </div>
        </div>
        <p className="text-sflow-cream-muted max-w-3xl mb-8 mx-auto">
          <strong className="text-sflow-gold">This is not a flaw &mdash; it&apos;s the architecture.</strong>{" "}
          Pattern matching at scale, not reasoning. The results can be brilliant, but
          it&apos;s statistics all the way down.
        </p>
        <LLMPipelineAnimation />
      </Section>

      {/* Model Comparison */}
      <Section>
        <h2 className="text-2xl font-bold mb-2">Not All Models Are Equal</h2>
        <p className="text-sflow-cream-muted mb-6">
          Rule of thumb: bigger &ne; better. Match the model to the task.
        </p>
        <ModelTable />
        <div className="mt-4 rounded-xl border border-sflow-gold/20 bg-sflow-gold/5 p-4 max-w-3xl mx-auto">
          <p className="text-sm text-sflow-cream-muted">
            <strong className="text-sflow-gold">Watch out for thinking overhead:</strong> Reasoning models
            burn tokens on simple tasks &mdash; thinking thinking thinking&hellip; &ldquo;hello.&rdquo;
            An &ldquo;expensive&rdquo; model isn&rsquo;t always better. Match complexity to the task.
          </p>
        </div>
      </Section>

      {/* Context */}
      <Section>
        <h2 className="text-2xl font-bold mb-4">The #1 Rule: Context Is Everything</h2>
        <p className="text-sflow-cream-muted mb-6 max-w-3xl">
          Don&apos;t rely on AI &ldquo;knowing&rdquo; &mdash; it doesn&apos;t.{" "}
          <strong className="text-sflow-cream">Research first. Always. Ground it in reality.</strong>
        </p>
        <div className="grid gap-4 sm:grid-cols-2 max-w-3xl mx-auto">
          <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5">
            <p className="text-xs font-medium text-red-400 uppercase tracking-wide mb-2">Bad</p>
            <p className="text-sm text-sflow-cream-muted italic">&ldquo;Summarize this project&rdquo;</p>
          </div>
          <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-5">
            <p className="text-xs font-medium text-green-400 uppercase tracking-wide mb-2">Good</p>
            <p className="text-sm text-sflow-cream-muted italic">&ldquo;You are reviewing a pharma supply chain audit for a Belgian food producer. Here is the full report: [...]&rdquo;</p>
          </div>
        </div>
        <div className="mt-6 mb-4">
          <ContextWindowAnimation />
        </div>
        <p className="mt-4 text-sflow-cream-muted max-w-3xl">
          The difference between a useless answer and a brilliant one is <strong className="text-sflow-gold">context</strong>.
        </p>
      </Section>

      {/* GitHub Copilot */}
      <Section>
        <h2 className="text-2xl font-bold mb-6">Developer Productivity: GitHub Copilot</h2>
        <StatGroup
          stats={[
            { value: 55, suffix: "%", label: "Faster task completion" },
            { value: 4, suffix: "x", label: "Faster PR cycle" },
            { value: 46, suffix: "%", label: "Code written by AI" },
            { value: 88, suffix: "%", label: "AI code kept in final version" },
          ]}
        />
        <p className="mt-6 text-sm text-sflow-cream-muted max-w-3xl">
          90% of Fortune 100 companies use Copilot. 20 million users by mid-2025.
          <strong className="text-sflow-cream"> Caveat:</strong> AI-assisted code can increase issue counts (~1.7x) if not paired with proper review.
          Speed without governance = faster mistakes.
        </p>
        <DemoCallout
          title="GitHub Copilot in action"
          description="Writing a function with Copilot autocomplete, tab-accepting suggestions, and inline chat to refactor code."
        />
      </Section>

      {/* CoWork & Dispatch */}
      <Section>
        <h2 className="text-2xl font-bold mb-4">Claude in Office Tools (CoWork)</h2>
        <p className="text-sflow-cream-muted mb-6 max-w-3xl">
          <strong className="text-sflow-cream">CoWork</strong> (launched January 2026) &mdash; a persistent agent inside the Claude Desktop app.
          The key differentiator: <strong className="text-sflow-gold">shared context</strong>. Claude sees your Excel, PowerPoint, AND Gmail simultaneously.
        </p>
        <div className="rounded-xl border border-sflow-glass-border bg-sflow-glass p-5 mb-6 max-w-3xl">
          <p className="text-sm text-sflow-cream-muted">
            <strong className="text-sflow-cream">Example:</strong> Claude reads your inbox, pulls a spreadsheet attachment, analyzes it,
            and drafts a reply with the findings. One workflow, three apps, zero copy-paste.
          </p>
        </div>
        <DemoCallout
          title="CoWork cross-app workflow"
          description="Claude reading an email attachment, analyzing it in Excel, and drafting a reply — all in one conversation."
        />
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-2">Dispatch</h3>
          <p className="text-sflow-cream-muted max-w-3xl">
            Send tasks from your <strong className="text-sflow-cream">phone</strong> to your{" "}
            <strong className="text-sflow-cream">desktop</strong> Claude. Scan a QR code, connected in 2 taps.
            All processing happens locally, files never leave your computer.
          </p>
          <DemoCallout
            title="Dispatch from phone"
            description="Scanning the QR code, sending a task from phone, watching Claude execute it on desktop."
          />
        </div>
      </Section>

      {/* Image Generation */}
      <Section>
        <h2 className="text-2xl font-bold mb-6">Generating Images</h2>
        <div className="overflow-x-auto rounded-xl border border-sflow-glass-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-sflow-glass-border bg-sflow-glass">
                <th className="px-4 py-3 text-left font-medium text-sflow-cream-muted">Tool</th>
                <th className="px-4 py-3 text-left font-medium text-sflow-cream-muted">Best For</th>
                <th className="px-4 py-3 text-left font-medium text-sflow-cream-muted">Price</th>
                <th className="px-4 py-3 text-left font-medium text-sflow-cream-muted">Commercial Safe?</th>
              </tr>
            </thead>
            <tbody>
              {IMAGE_TOOLS.map((tool) => (
                <tr key={tool.name} className="border-b border-sflow-glass-border last:border-b-0 hover:bg-sflow-glass transition-colors">
                  <td className="px-4 py-3 font-medium text-sflow-cream">{tool.name}</td>
                  <td className="px-4 py-3 text-sflow-cream-muted">{tool.bestFor}</td>
                  <td className="px-4 py-3 text-sflow-cream-muted">{tool.price}</td>
                  <td className="px-4 py-3 text-sflow-cream-muted">{tool.commercial}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-sflow-cream-muted">
          <strong className="text-sflow-cream">Note:</strong> Claude does NOT generate images &mdash; it excels at image analysis/vision only.
        </p>
        <div className="mt-6 rounded-xl border border-sflow-glass-border bg-sflow-glass p-5 max-w-3xl">
          <h4 className="font-semibold text-sflow-cream mb-2">The Ghibli Story (March 2025)</h4>
          <p className="text-sm text-sflow-cream-muted">
            GPT-4o went viral with Studio Ghibli-style images. Miyazaki had called AI animation &ldquo;an insult to life itself.&rdquo;
            Sam Altman: &ldquo;our GPUs are melting.&rdquo; Major copyright debate &mdash; style is NOT explicitly protected by copyright.
          </p>
        </div>
        <DemoCallout
          title="Image generation"
          description="Generating an image with GPT and/or Midjourney, comparing outputs and styles."
        />
      </Section>

      {/* Gamma */}
      <Section>
        <h2 className="text-2xl font-bold mb-4">Gamma &amp; Presentation Tools</h2>
        <p className="text-sflow-cream-muted mb-6 max-w-3xl">
          <strong className="text-sflow-cream">Gamma.app</strong> &mdash; AI-powered presentations. Agent researches, generates,
          and restyles entire decks via conversation. Good for quick first drafts &mdash; always review and refine.
        </p>
        <DemoCallout
          title="Gamma presentation"
          description="Creating a presentation from a single prompt in Gamma, then restyling it via conversation."
        />
      </Section>

      {/* Markdown */}
      <Section>
        <h2 className="text-2xl font-bold mb-4">Markdown: Why and How</h2>
        <div className="grid gap-4 sm:grid-cols-2 max-w-3xl mx-auto mb-6">
          {[
            { title: "Universal", desc: "Every AI tool reads and writes Markdown natively." },
            { title: "Portable", desc: "Works in any text editor, converts to HTML/PDF/slides." },
            { title: "Structured", desc: "Headings, lists, tables, code blocks — AI understands the structure." },
            { title: "Version-friendly", desc: "Plain text = easy to diff, track changes, collaborate." },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-sflow-glass-border bg-sflow-glass p-4">
              <h4 className="font-semibold text-sflow-cream">{item.title}</h4>
              <p className="mt-1 text-sm text-sflow-cream-muted">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-sflow-glass-border bg-sflow-card p-5 max-w-lg">
          <p className="text-xs font-medium text-sflow-muted uppercase tracking-wide mb-2">Quick syntax</p>
          <pre className="text-sm text-sflow-cream-muted font-mono leading-relaxed">
{`# Heading 1
## Heading 2
- Bullet point
**Bold** and *italic*
| Table | Header |
[Link](url)`}
          </pre>
        </div>
        <a
          href="https://onlinemarkdownedit.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-sflow-glass border border-sflow-glass-border px-4 py-2 text-sm text-sflow-cream hover:bg-sflow-glass-hover transition-colors"
        >
          Try it live: Markdown Editor ↗
        </a>
      </Section>

      {/* Google AI Studio */}
      <Section>
        <h2 className="text-2xl font-bold mb-4">Google AI Studio</h2>
        <div className="grid gap-4 sm:grid-cols-2 max-w-3xl mx-auto mb-6">
          {[
            { label: "Free", detail: "1,000 daily requests across all Gemini models" },
            { label: "Vibe Coding", detail: "Describe an app → get a working app → deploy to Cloud Run" },
{ label: "localStorage", detail: "5–10MB persistence for personal apps, no backend needed" },
            { label: "Context", detail: "2M context window (Gemini 3 Pro) — entire codebases or document sets" },
            { label: "System Instructions", detail: "Persistent context for consistent behavior" },
          ].map((item) => (
            <div key={item.label} className="flex gap-3">
              <span className="text-sflow-gold font-semibold text-sm shrink-0">{item.label}</span>
              <span className="text-sm text-sflow-cream-muted">{item.detail}</span>
            </div>
          ))}
        </div>
        <DemoCallout
          title="Google AI Studio vibe coding"
          description="Describing a simple CRM app → AI generates it → upload a CSV → working app. All free, no code."
        />
      </Section>

      {/* Instruction Documents */}
      <Section>
        <h2 className="text-2xl font-bold mb-4">Instruction Documents &amp; Custom Instructions</h2>
        <QuoteBlock quote="You wouldn't hire someone and explain the job differently every morning." />
        <div className="space-y-2 text-sflow-cream-muted max-w-3xl">
          <p><strong className="text-sflow-cream">Claude:</strong> Projects with custom instructions / system prompts</p>
          <p><strong className="text-sflow-cream">ChatGPT:</strong> Custom GPTs / &ldquo;Customize ChatGPT&rdquo; instructions</p>
          <p><strong className="text-sflow-cream">Google AI Studio:</strong> Persistent system instructions</p>
          <p className="mt-4">Think of it as an onboarding document for your AI. The better the document, the better every interaction.</p>
        </div>
      </Section>

      {/* Live Exercise */}
      <Section>
        <ExerciseBox
          title="Write your first instruction document"
          goal="Everyone leaves with a reusable template they can use tomorrow."
          steps={[
            { text: "Open Claude (claude.ai) or ChatGPT (chatgpt.com) on your laptop/phone" },
            { text: "Pick a task you do repeatedly at work (e.g. meeting summary, email reply, report)" },
            {
              text: "Ask the AI to write you a reusable instruction prompt:",
              copyText: "Write me a reusable instruction prompt for [your task]. Include placeholders for the parts that change each time.",
            },
            { text: "Test it: paste in real (or example) content and run the prompt" },
            { text: "Save it somewhere you'll find it tomorrow" },
          ]}
        />
      </Section>

      {/* Transition */}
      <Section>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">So... is this enough?</h2>
          <p className="text-sflow-cream-muted mb-4">
            We bolted on the motor. Things go faster. But look at the numbers again:
            88% of companies are here. Only 6% are seeing real impact.
          </p>
          <QuoteBlock quote="The factory still has the same belts, the same layout, the same bottlenecks. The email still sits in the mailbox for a day." />
          <div className="mt-8 mb-6">
            <EmailRaceAnimation />
          </div>
          <Link
            href="/phase-2"
            className="inline-flex items-center gap-2 rounded-full bg-sflow-gold px-6 py-3 font-semibold text-sflow-dark hover:bg-sflow-gold-hover transition-colors"
          >
            Let&apos;s rip out the belts &rarr;
          </Link>
        </div>
      </Section>
    </>
  );
}
