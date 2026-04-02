"use client";

import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { QuoteBlock } from "@/components/content/QuoteBlock";
import { ExerciseBox } from "@/components/content/ExerciseBox";
import { DemoCallout } from "@/components/content/DemoCallout";
import { StoryCard } from "@/components/interactive/StoryCard";
import { DeathOfUIAnimation } from "@/components/interactive/DeathOfUIAnimation";
import { ContextDilutionAnimation } from "@/components/interactive/ContextDilutionAnimation";
import { APICallAnimation } from "@/components/interactive/APICallAnimation";
import { ToolCallingAnimation } from "@/components/interactive/ToolCallingAnimation";
import { PipelineAnimation } from "@/components/interactive/PipelineAnimation";
import { PHASE_META, STORIES } from "@/lib/constants";
import Link from "next/link";

const meta = PHASE_META["phase-2"];
const samsungStory = STORIES.find((s) => s.id === "samsung")!;

export default function Phase2Page() {
  return (
    <>
      <PageHero {...meta} />

      <Section>
        <h2 className="text-2xl font-bold mb-4">Don&apos;t Write Prompts From Scratch</h2>
        <div className="max-w-3xl space-y-4 text-sflow-cream-muted">
          <p>Ask AI to generate a prompt for you. Then iterate on that &mdash; much faster, much better.</p>
          <p>The meta-skill: <strong className="text-sflow-gold">using AI to make AI better</strong>.</p>
        </div>
        <ExerciseBox
          title="Meta-prompting"
          steps={[
            { text: "Think of a task where you've been unhappy with AI output" },
            {
              text: "Ask the AI to write you a detailed prompt:",
              copyText: "Write me a detailed prompt that will help me [do X] consistently. Include role, context, format, and constraints.",
            },
            { text: "Copy the generated prompt, paste it as a new message, and test it" },
            { text: "Compare: is the result better than what you got before?" },
          ]}
        />
      </Section>

      <Section>
        <h2 className="text-2xl font-bold mb-4">Reusable Skills &amp; Instructions</h2>
        <div className="max-w-3xl space-y-4 text-sflow-cream-muted">
          <p>Doing the same thing multiple times? Ask AI to create a skill or instruction document so you can re-use it across sessions and tools.</p>
          <p>Example: a &ldquo;meeting summary&rdquo; instruction that always outputs the same format.</p>
        </div>
        <ExerciseBox
          title="Turn your prompt into a reusable skill"
          steps={[
            { text: "Take the prompt you generated in the meta-prompting exercise" },
            {
              text: "Ask the AI to turn it into a reusable document:",
              copyText: "Turn this into a reusable instruction document I can paste at the start of any conversation. Add sections for: Role, Context, Task, Format, Constraints.",
            },
            { text: `Save the result — this is your first \u201cskill\u201d` },
          ]}
        />
      </Section>

      <Section>
        <h2 className="text-2xl font-bold mb-4">How a Prompt Actually Works</h2>
        <p className="text-sflow-cream-muted mb-6 max-w-3xl">
          Every &ldquo;chat&rdquo; with AI is actually a structured API call. Understanding this removes the magic and gives you control.
        </p>
        <APICallAnimation />
      </Section>

      {/* Tool Calling */}
      <Section>
        <h2 className="text-2xl font-bold mb-4">How Tool Calling Works</h2>
        <p className="text-sflow-cream-muted mb-6 max-w-3xl">
          When AI &ldquo;searches the web&rdquo; or &ldquo;reads a file,&rdquo; there&apos;s an invisible orchestration layer
          between the chat and the action. The AI doesn&apos;t execute anything &mdash; it generates text that describes
          what it wants to do, and the system carries it out.
        </p>
        <ToolCallingAnimation />
      </Section>

      <Section>
        <h2 className="text-2xl font-bold mb-4">AI-to-AI Prompt Chain</h2>
        <p className="text-sflow-cream-muted mb-6 max-w-3xl">
          This is Phase 2 thinking: AI is no longer a standalone tool &mdash; it&apos;s a workflow component.
          The output of one step becomes the input for the next.
        </p>
        <div className="mb-6">
          <PipelineAnimation
            steps={[
              { num: 1, text: "Research with Claude" },
              { num: 2, text: "Generate prompt" },
              { num: 3, text: "Feed to AI Studio" },
              { num: 4, text: "Get tailored app" },
            ]}
          />
        </div>
        <DemoCallout
          title="Claude → Google AI Studio Prompt Chain"
          description="Use Claude to research a topic and generate a structured prompt. Copy that prompt into Google AI Studio. AI Studio builds a full interactive app from it. One AI preparing work for another."
        />
      </Section>

      {/* CoWork — workflow integration */}
      <Section>
        <h2 className="text-2xl font-bold mb-4">Claude in Your Workflow (CoWork)</h2>
        <p className="text-sflow-cream-muted mb-6 max-w-3xl">
          This is Phase 2 in action: AI isn&apos;t a standalone chat &mdash; it&apos;s embedded in your daily tools.
          <strong className="text-sflow-cream"> CoWork</strong> (launched January 2026) is a persistent agent inside the Claude Desktop app.
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
        <p className="mt-6 text-sm text-sflow-cream-muted max-w-3xl">
          CoWork is about <strong className="text-sflow-gold">ripping out the belts</strong> &mdash;
          instead of copy-pasting between apps, AI flows across your entire toolkit.
        </p>
      </Section>

      {/* Dispatch — phone to desktop */}
      <Section>
        <h2 className="text-2xl font-bold mb-4">Dispatch</h2>
        <p className="text-sflow-cream-muted mb-6 max-w-3xl">
          Send tasks from your <strong className="text-sflow-cream">phone</strong> to your{" "}
          <strong className="text-sflow-cream">desktop</strong> Claude. Scan a QR code, connected in 2 taps.
          Note: tasks are routed through Anthropic&apos;s cloud &mdash; not fully local processing.
        </p>
        <DemoCallout
          title="Dispatch from phone"
          description="Scanning the QR code, sending a task from phone, watching Claude execute it on desktop."
        />
      </Section>

      {/* When More Context Hurts */}
      <Section>
        <h2 className="text-2xl font-bold mb-4">When More Context Hurts</h2>
        <div className="max-w-3xl space-y-4 text-sflow-cream-muted mb-8">
          <p>
            More context isn&apos;t always better. Long conversations <strong className="text-sflow-cream">dilute</strong> your
            original instructions. The AI doesn&apos;t ignore them on purpose &mdash; they just become
            a tiny fraction of what it&apos;s paying attention to.
          </p>
          <p>
            <strong className="text-sflow-gold">Practical guidance:</strong> Start fresh conversations for new tasks.
            Re-state critical constraints. Keep system prompts concise. Exclude irrelevant context.
          </p>
        </div>
        <ContextDilutionAnimation />
      </Section>

      <Section>
        <h2 className="text-2xl font-bold mb-4">Death of the UI</h2>
        <div className="max-w-3xl space-y-4 text-sflow-cream-muted">
          <p>Everyone sees data the way THEY want or need. Lower systems enforce integrity, authentication, authorization. The interface becomes a preference, not a constraint.</p>
        </div>

        <div className="my-8">
          <DeathOfUIAnimation />
        </div>

        <QuoteBlock quote="Your UI is only a reference implementation. If your APIs and data structures are clean, customers will generate their own interfaces." />
        <p className="text-sflow-cream-muted max-w-3xl">
          Example: MES/SCADA/ERP enforce data integrity. AI becomes the personalization layer.
          An operator sees different data than a plant manager, without building separate dashboards.
        </p>
      </Section>

      <Section>
        <h2 className="text-2xl font-bold mb-6">A Warning from Samsung</h2>
        <p className="text-sflow-cream-muted mb-4 max-w-3xl">
          When you start connecting systems, the stakes go up.
        </p>
        <StoryCard story={samsungStory} />
        <p className="mt-6 text-sflow-cream-muted max-w-3xl">
          <strong className="text-sflow-cream">&ldquo;Don&apos;t use it&rdquo; and &ldquo;use it freely&rdquo; are both wrong.</strong>{" "}
          Phase 2 requires governance.
        </p>
      </Section>

      <Section>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Ready to redesign the whole factory?</h2>
          <p className="text-sflow-cream-muted mb-6">
            We ripped out the belts. The machines are rearranged. But we&apos;re still in the same building.
            What if we started from scratch?
          </p>
          <Link
            href="/phase-3"
            className="inline-flex items-center gap-2 rounded-full bg-sflow-gold px-6 py-3 font-semibold text-sflow-dark hover:bg-sflow-gold-hover transition-colors"
          >
            Enter the new factory &rarr;
          </Link>
        </div>
      </Section>
    </>
  );
}
