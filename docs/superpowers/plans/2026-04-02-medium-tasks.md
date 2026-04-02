# [M] Tasks Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement all 15 medium-effort [M] tasks from TODO.md  - new sections, content moves, new animations, and content additions across all pages.

**Architecture:** Each task creates or modifies one page file and optionally adds new animation components in `src/components/interactive/`. All animations follow the established pattern: `useInView` + `setInterval` looping with a `key` remount, framer-motion for all transitions, `~14.5s` cycle times. Pages are all `"use client"` components using the Section/PageHero layout system.

**Tech Stack:** Next.js 16, React 19, Framer Motion 12, Tailwind CSS 4, TypeScript 5

---

## File Map

| Task | Creates | Modifies |
|------|---------|----------|
| 1 - Process is King theme |  - | `src/app/factory/page.tsx`, `src/app/takeaways/page.tsx` |
| 2 - AI vs Human diagram | `src/components/interactive/HumanAIComparisonDiagram.tsx` | `src/app/factory/page.tsx` |
| 3 - Expand How LLMs Work | `src/components/interactive/LLMPipelineAnimation.tsx` | `src/app/phase-1/page.tsx` |
| 4 - Context "new hire" analogy | `src/components/interactive/NewHireContextAnimation.tsx` | `src/app/phase-1/page.tsx` |
| 5 - Ask AI to help formulate |  - | `src/app/phase-1/page.tsx` |
| 6 - Move CoWork/Dispatch to Phase 2 |  - | `src/app/phase-1/page.tsx`, `src/app/phase-2/page.tsx` |
| 7 - Receive CoWork/Dispatch in Phase 2 |  - | (covered by Task 6) |
| 8 - When More Context Hurts | `src/components/interactive/ContextDilutionAnimation.tsx` | `src/app/phase-2/page.tsx` |
| 9 - Tool Calling diagram | `src/components/interactive/ToolCallingAnimation.tsx` | `src/app/phase-2/page.tsx` |
| 10 - Clarify Agentic vs Agent | `src/components/interactive/AgenticToolSelectionAnimation.tsx` | `src/app/phase-3/page.tsx` |
| 11 - AI for deterministic scripts |  - | `src/app/phase-3/page.tsx` |
| 12 - Security screenshots |  - | `src/app/security/page.tsx`, `src/lib/constants.ts` |
| 13 - Google less RAM article |  - | `src/app/landscape/page.tsx` |
| 14 - Local models outperform original ChatGPT |  - | `src/app/landscape/page.tsx` |

> **Note:** Tasks 6 and 7 are two sides of the same move (remove from Phase 1, add to Phase 2) and are combined into a single task.

---

## Task 1: "Process is King" Theme  - Factory Intro & Takeaways

**Files:**
- Modify: `src/app/factory/page.tsx:36-49` (intro narrative)
- Modify: `src/app/takeaways/page.tsx` (takeaways list references process)

This is a **content-only** task. No new components.

- [ ] **Step 1: Read current factory intro text**

Open `src/app/factory/page.tsx` and locate the introductory narrative inside the first `<Section>` (lines 36–49). This is the block after the Hinton quote.

- [ ] **Step 2: Add "Process is King" framing to factory intro**

In `src/app/factory/page.tsx`, replace the existing intro narrative (the `<div className="mt-8 max-w-3xl space-y-4 text-sflow-cream-muted">` block after the QuoteBlock) with this expanded version:

```tsx
<div className="mt-8 max-w-3xl space-y-4 text-sflow-cream-muted">
  <p>
    In 1879, Edison invented the lightbulb. Electric motors became available.
    You&apos;d think factories would immediately become more productive, right?
  </p>
  <p className="text-xl font-bold text-sflow-cream">
    For 40 years - nothing.
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
    from scratch - single-floor layouts, each machine with its own motor, arranged by
    workflow instead of power source. <strong className="text-sflow-cream">Process redesign, not tool adoption,
    is what doubled productivity.</strong>
  </p>
</div>
```

- [ ] **Step 3: Reinforce in the Adoption Gap section**

In the same file, after the StatGroup in the Adoption Gap section (~line 132), add a reinforcement paragraph. Insert after the closing `</div>` of the StatGroup wrapper and before the closing `</Section>`:

```tsx
<p className="mt-6 text-sflow-cream-muted max-w-3xl">
  <strong className="text-sflow-gold">Process is king.</strong> The 6% who see real impact
  aren&apos;t the ones with the best AI tools - they&apos;re the ones who redesigned
  their workflows around AI. The tool is the motor. The process is the factory.
</p>
```

- [ ] **Step 4: Verify the takeaways page already echoes this**

Read `src/app/takeaways/page.tsx` and `src/lib/constants.ts` (the TAKEAWAYS array). Confirm that the "Process > Tool" takeaway at index 7 already exists:
```ts
{ title: "Process > Tool.", description: "The tool is only as good as the workflow around it." }
```
No changes needed if this entry exists.

- [ ] **Step 5: Build and verify**

Run: `cd /Users/florian/GitHub/ai-session-ams && npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 6: Commit**

```bash
git add src/app/factory/page.tsx
git commit -m "content(factory): weave 'Process is King' theme into intro and adoption gap"
```

---

## Task 2: "Are AI and Humans More Alike Than We Think?"  - Interactive Comparison Diagram

**Files:**
- Create: `src/components/interactive/HumanAIComparisonDiagram.tsx`
- Modify: `src/app/factory/page.tsx` (add new section after Factory Evolution)

- [ ] **Step 1: Create the HumanAIComparisonDiagram component**

Create `src/components/interactive/HumanAIComparisonDiagram.tsx`. This is a side-by-side interactive diagram comparing human cognition with LLM architecture. Each row shows a parallel concept. On hover/tap, a row highlights and shows an explanation.

```tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

interface ComparisonRow {
  human: string;
  ai: string;
  icon: string;
  explanation: string;
}

const COMPARISONS: ComparisonRow[] = [
  {
    human: "Working Memory",
    ai: "Context Window",
    icon: "brain",
    explanation:
      "Humans hold ~7 items in working memory. LLMs have a fixed context window (e.g. 200K tokens). Both lose track when overloaded.",
  },
  {
    human: "Attention Span",
    ai: "Token Limit",
    icon: "focus",
    explanation:
      "Humans lose focus after extended concentration. LLMs degrade as conversations grow long  - early instructions get 'forgotten' as context fills up.",
  },
  {
    human: "Creativity vs Focus",
    ai: "Temperature",
    icon: "dial",
    explanation:
      "Humans brainstorm loosely or concentrate precisely. LLMs use a 'temperature' parameter: low = predictable, high = creative and surprising.",
  },
  {
    human: "No Persistent Memory",
    ai: "Stateless",
    icon: "memory",
    explanation:
      "You forget most conversations after a few days. LLMs forget EVERYTHING between sessions. Every conversation starts completely fresh.",
  },
  {
    human: "Senses (vision, hearing...)",
    ai: "Context (files, data...)",
    icon: "senses",
    explanation:
      "Humans perceive the world through senses. LLMs 'perceive' through whatever you put in the context: text, images, files, tool outputs.",
  },
  {
    human: "Hands, voice, actions",
    ai: "Tools (APIs, code, search)",
    icon: "tools",
    explanation:
      "Humans act on the world physically. LLMs act through tool calls  - running code, searching the web, calling APIs. No tools = just text.",
  },
];

const ICONS: Record<string, React.ReactNode> = {
  brain: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 4v12M6 8c2 2 6 2 8 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  focus: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
    </svg>
  ),
  dial: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 10l3-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  memory: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="4" y="4" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 8h6M7 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  senses: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 8c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6 16h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  tools: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M11 4l5 5-8 8-5-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M14 3l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

export function HumanAIComparisonDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-50px" });
  const [activeRow, setActiveRow] = useState<number | null>(null);

  return (
    <div ref={ref} className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="grid grid-cols-[1fr_40px_1fr] gap-2 mb-4 px-2">
        <p className="text-sm font-bold text-sflow-cream text-center">Human</p>
        <div />
        <p className="text-sm font-bold text-sflow-gold text-center">AI (LLM)</p>
      </div>

      {/* Rows */}
      <div className="space-y-2">
        {COMPARISONS.map((row, i) => (
          <motion.div
            key={row.ai}
            initial={isInView ? { opacity: 0, y: 15 } : false}
            animate={isInView ? { opacity: 1, y: 0 } : false}
            transition={{ delay: 0.2 + i * 0.15, duration: 0.4 }}
          >
            <button
              type="button"
              onClick={() => setActiveRow(activeRow === i ? null : i)}
              className={`w-full grid grid-cols-[1fr_40px_1fr] gap-2 items-center rounded-xl border p-3 transition-all cursor-pointer ${
                activeRow === i
                  ? "border-sflow-gold/50 bg-sflow-gold/10"
                  : "border-sflow-glass-border bg-sflow-glass hover:bg-sflow-glass-hover"
              }`}
            >
              <span className="text-sm text-sflow-cream text-center">{row.human}</span>
              <span className={`flex justify-center ${activeRow === i ? "text-sflow-gold" : "text-sflow-cream-muted"}`}>
                {ICONS[row.icon]}
              </span>
              <span className="text-sm text-sflow-gold text-center">{row.ai}</span>
            </button>

            {activeRow === i && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <p className="text-xs text-sflow-cream-muted bg-sflow-card rounded-b-xl px-4 py-3 border border-t-0 border-sflow-glass-border">
                  {row.explanation}
                </p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      <p className="mt-4 text-xs text-sflow-muted text-center italic">
        Tap a row to see the parallel explained
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Add the new section to the factory page**

In `src/app/factory/page.tsx`, add the import at the top:

```tsx
import { HumanAIComparisonDiagram } from "@/components/interactive/HumanAIComparisonDiagram";
```

Then add a new Section **after** the "From Workshop to Agent System" section (after the `<FactoryEvolutionAnimation />` Section closing tag, before the "Three Versions" Section):

```tsx
<Section>
  <h2 className="text-2xl font-bold mb-4">Are AI and Humans More Alike Than We Think?</h2>
  <p className="text-sflow-cream-muted mb-8 max-w-3xl">
    Understanding how LLMs work starts with a surprising insight: many AI limitations
    mirror human cognition. This isn&apos;t a coincidence - it&apos;s a useful mental model
    for building better workflows. <span className="text-sflow-gold">(Phase 1 goes deeper.)</span>
  </p>
  <HumanAIComparisonDiagram />
</Section>
```

- [ ] **Step 3: Build and verify**

Run: `cd /Users/florian/GitHub/ai-session-ams && npm run build`
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/components/interactive/HumanAIComparisonDiagram.tsx src/app/factory/page.tsx
git commit -m "feat(factory): add interactive Human vs AI comparison diagram"
```

---

## Task 3: Expand "How LLMs Work"  - Phase 1 Combined Deeper Section

**Files:**
- Create: `src/components/interactive/LLMPipelineAnimation.tsx`
- Modify: `src/app/phase-1/page.tsx:23-49` (replace/expand the How LLMs Work section)

- [ ] **Step 1: Create the LLMPipelineAnimation component**

Create `src/components/interactive/LLMPipelineAnimation.tsx`. This shows the full flow: tokens are inputted, context is added, sent to the API, and response tokens come back. ~14.5s cycle.

```tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/**
 * LLMPipelineAnimation  - Shows the full request lifecycle:
 *   1. User types tokens (left)
 *   2. Context wraps around them (system prompt, files, history)
 *   3. Payload sent to API (center arrow)
 *   4. Neural net processes (center)
 *   5. Response tokens stream back (right)
 *
 * Cycle: ~14.5s
 */

const CYCLE = 14.5;

const INPUT_TOKENS = ["Write", "me", "a", "summary"];
const CONTEXT_BLOCKS = ["System Prompt", "Documents", "History"];
const OUTPUT_TOKENS = ["Here", "is", "your", "concise", "summary", "..."];

export function LLMPipelineAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-50px" });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const id = setInterval(() => setTick((t) => t + 1), CYCLE * 1000);
    return () => clearInterval(id);
  }, [isInView]);

  const key = `cycle-${tick}`;

  return (
    <div ref={ref} className="w-full max-w-4xl mx-auto">
      {isInView && (
        <motion.div
          key={key}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: CYCLE, times: [0, 0.03, 0.86, 0.93] }}
        >
          {/* Stage labels */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            {["1. Your Input", "2. Context + API Call", "3. Response"].map((label, i) => (
              <motion.p
                key={label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 2.5, duration: 0.5 }}
                className="text-xs font-bold uppercase tracking-widest text-sflow-cream-muted text-center"
              >
                {label}
              </motion.p>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 items-start">
            {/* ── Left: Input Tokens ──────────────────── */}
            <div className="space-y-2">
              {INPUT_TOKENS.map((token, i) => (
                <motion.div
                  key={token}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.3, duration: 0.3 }}
                  className="rounded-lg border border-sflow-glass-border bg-sflow-glass px-3 py-1.5 text-center"
                >
                  <span className="text-sm font-mono text-sflow-cream">{token}</span>
                </motion.div>
              ))}
            </div>

            {/* ── Center: Context wrapping + API call ── */}
            <div className="space-y-3">
              {/* Context blocks */}
              {CONTEXT_BLOCKS.map((block, i) => (
                <motion.div
                  key={block}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2.5 + i * 0.4, duration: 0.4 }}
                  className="rounded-lg border border-sflow-gold/30 bg-sflow-gold/10 px-3 py-1.5 text-center"
                >
                  <span className="text-[10px] font-bold text-sflow-gold">{block}</span>
                </motion.div>
              ))}

              {/* API call arrow */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4.5, duration: 0.5 }}
                className="flex flex-col items-center gap-1 py-2"
              >
                <svg width="32" height="40" viewBox="0 0 32 40" fill="none">
                  <motion.path
                    d="M16 4v28m0 0l-6-6m6 6l6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-sflow-gold"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 4.5, duration: 0.6 }}
                  />
                </svg>
                <span className="text-[10px] font-bold text-sflow-gold">API Call</span>
              </motion.div>

              {/* Neural net box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: [0, 1, 1, 0.8], scale: [0.9, 1, 1, 1] }}
                transition={{ delay: 5.5, duration: 3, times: [0, 0.2, 0.7, 1] }}
                className="rounded-xl border-2 border-sflow-cream-muted/30 bg-sflow-glass p-3 text-center"
              >
                <p className="text-[10px] font-bold text-sflow-cream mb-1">Neural Network</p>
                <p className="text-[9px] text-sflow-cream-muted">Token-by-token generation</p>
                <p className="text-[9px] text-sflow-cream-muted italic">(autoregressive  - can&apos;t go back)</p>
              </motion.div>
            </div>

            {/* ── Right: Output Tokens ────────────────── */}
            <div className="space-y-2">
              {OUTPUT_TOKENS.map((token, i) => (
                <motion.div
                  key={`${token}-${i}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 8.5 + i * 0.35, duration: 0.3 }}
                  className="rounded-lg border border-green-500/30 bg-green-500/10 px-3 py-1.5 text-center"
                >
                  <span className="text-sm font-mono text-green-300">{token}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom insight */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 11.5, duration: 0.5 }}
            className="mt-6 rounded-xl border border-sflow-gold/20 bg-sflow-gold/5 p-3 text-center max-w-2xl mx-auto"
          >
            <p className="text-xs text-sflow-cream-muted">
              Each token is generated <strong className="text-sflow-gold">one at a time</strong>, left to right.
              The model can&apos;t revise earlier tokens - that&apos;s why feedback and iteration matter.
            </p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Expand the How LLMs Work section in Phase 1**

In `src/app/phase-1/page.tsx`, add the import:

```tsx
import { LLMPipelineAnimation } from "@/components/interactive/LLMPipelineAnimation";
```

Then replace the existing `{/* How LLMs Work */}` Section (lines 23–49) with this expanded version. Keep the existing 4-step grid and LLMTokenAnimation, but add deeper content below:

```tsx
{/* How LLMs Work  - Deeper */}
<Section>
  <h2 className="text-2xl font-bold mb-6">How the Machine Works</h2>
  <p className="text-sflow-cream-muted mb-6 max-w-3xl mx-auto">
    A large language model is a <strong className="text-sflow-cream">next-token prediction machine</strong>:
  </p>
  <div className="grid gap-4 sm:grid-cols-2 max-w-3xl mx-auto">
    {[
      { step: "1", title: "Tokenization", desc: `Text is broken into small pieces (\u201ctokens\u201d, roughly 3/4 of a word).` },
      { step: "2", title: "Pattern Recognition", desc: "Trained on massive text, it learned statistical patterns about which tokens follow others." },
      { step: "3", title: "Probability", desc: "Given a sequence, it predicts the most likely next token. Repeats. That's it." },
      { step: "4", title: "Emergent Capabilities", desc: `At scale, surprising abilities arise: reasoning, coding, analysis. It doesn\u2019t \u201cknow\u201d  - but the results can be remarkable.` },
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
        yesterday&apos;s chat. It&apos;s not being difficult - it literally doesn&apos;t know.
      </p>
    </div>
    <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5">
      <h3 className="font-semibold text-red-400 mb-2">Autoregressive</h3>
      <p className="text-sm text-sflow-cream-muted">
        Tokens are generated left-to-right, one at a time. It <strong className="text-sflow-cream">can&apos;t revise</strong> earlier
        tokens once written. That&apos;s why your feedback matters - the AI literally can&apos;t go back and fix it on its own.
      </p>
    </div>
  </div>
  <p className="text-sflow-cream-muted max-w-3xl mb-8 mx-auto">
    <strong className="text-sflow-gold">This is not a flaw - it&apos;s the architecture.</strong>{" "}
    Pattern matching at scale, not reasoning. The results can be brilliant, but
    it&apos;s statistics all the way down.
  </p>
  <LLMPipelineAnimation />
</Section>
```

- [ ] **Step 3: Build and verify**

Run: `cd /Users/florian/GitHub/ai-session-ams && npm run build`
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/components/interactive/LLMPipelineAnimation.tsx src/app/phase-1/page.tsx
git commit -m "feat(phase-1): expand 'How LLMs Work' with stateless/autoregressive explanations and pipeline animation"
```

---

## Task 4: Context "New Hire on First Day" Analogy + Side-by-Side Animation

**Files:**
- Create: `src/components/interactive/NewHireContextAnimation.tsx`
- Modify: `src/app/phase-1/page.tsx` (expand context section)

- [ ] **Step 1: Create the NewHireContextAnimation component**

Create `src/components/interactive/NewHireContextAnimation.tsx`. Two-lane side-by-side comparison: **Bad** (dump all files → output) vs **Good** (files → instruction document → output). ~14.5s cycle.

```tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/**
 * NewHireContextAnimation  - Side-by-side comparison:
 *   Left (Bad): pile of files → direct arrow → confused output
 *   Right (Good): pile of files → instruction doc → clear output
 *
 * Cycle: ~14.5s
 */

const CYCLE = 14.5;

const FILES = ["Q4 Report.xlsx", "Org Chart.pdf", "Policies.docx", "Meeting Notes", "Slack Export", "CRM Data.csv"];

export function NewHireContextAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-50px" });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const id = setInterval(() => setTick((t) => t + 1), CYCLE * 1000);
    return () => clearInterval(id);
  }, [isInView]);

  const key = `cycle-${tick}`;

  return (
    <div ref={ref} className="w-full max-w-4xl mx-auto">
      {isInView && (
        <motion.div
          key={key}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: CYCLE, times: [0, 0.03, 0.86, 0.93] }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* ── BAD: Files → Output ──────────────── */}
            <div className="space-y-4">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="text-xs font-bold uppercase tracking-widest text-red-400 text-center"
              >
                Dumping everything
              </motion.p>

              {/* File stack */}
              <div className="space-y-1.5">
                {FILES.map((file, i) => (
                  <motion.div
                    key={file}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.25, duration: 0.3 }}
                    className="rounded-lg border border-sflow-glass-border bg-sflow-glass px-3 py-1 text-center"
                  >
                    <span className="text-[11px] font-mono text-sflow-cream-muted">{file}</span>
                  </motion.div>
                ))}
              </div>

              {/* Arrow */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.5, duration: 0.5 }}
                className="flex justify-center"
              >
                <svg width="24" height="32" viewBox="0 0 24 32" fill="none">
                  <path d="M12 4v20m0 0l-6-6m6 6l6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-red-400" />
                </svg>
              </motion.div>

              {/* Confused output */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 4.5, duration: 0.5 }}
                className="rounded-xl border-2 border-red-500/30 bg-red-500/5 p-4 text-center"
              >
                <p className="text-sm text-red-400 font-semibold">Vague, generic output</p>
                <p className="text-[10px] text-sflow-cream-muted mt-1">
                  AI tries to use everything, focuses on nothing
                </p>
              </motion.div>
            </div>

            {/* ── GOOD: Files → Instruction → Output ── */}
            <div className="space-y-4">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 5.5, duration: 0.4 }}
                className="text-xs font-bold uppercase tracking-widest text-green-400 text-center"
              >
                Curated instruction
              </motion.p>

              {/* Same file stack, dimmed */}
              <div className="space-y-1.5">
                {FILES.map((file, i) => (
                  <motion.div
                    key={`good-${file}`}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 0.4, x: 0 }}
                    transition={{ delay: 5.8 + i * 0.15, duration: 0.3 }}
                    className="rounded-lg border border-sflow-glass-border bg-sflow-glass px-3 py-1 text-center"
                  >
                    <span className="text-[11px] font-mono text-sflow-cream-muted">{file}</span>
                  </motion.div>
                ))}
              </div>

              {/* Arrow to instruction */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 7.5, duration: 0.5 }}
                className="flex justify-center"
              >
                <svg width="24" height="32" viewBox="0 0 24 32" fill="none">
                  <path d="M12 4v20m0 0l-6-6m6 6l6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-sflow-gold" />
                </svg>
              </motion.div>

              {/* Instruction document */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 8.0, duration: 0.5 }}
                className="rounded-xl border-2 border-sflow-gold/40 bg-sflow-gold/10 p-3 text-center"
              >
                <p className="text-xs font-bold text-sflow-gold">Instruction Document</p>
                <p className="text-[10px] text-sflow-cream-muted mt-1">
                  Role, context, task, format, constraints
                </p>
              </motion.div>

              {/* Arrow to output */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 9.5, duration: 0.5 }}
                className="flex justify-center"
              >
                <svg width="24" height="32" viewBox="0 0 24 32" fill="none">
                  <path d="M12 4v20m0 0l-6-6m6 6l6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-green-400" />
                </svg>
              </motion.div>

              {/* Clear output */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 10.0, duration: 0.5 }}
                className="rounded-xl border-2 border-green-500/30 bg-green-500/5 p-4 text-center"
              >
                <p className="text-sm text-green-400 font-semibold">Precise, actionable output</p>
                <p className="text-[10px] text-sflow-cream-muted mt-1">
                  AI knows exactly what to do and how
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Add the "new hire" analogy to Phase 1's context section**

In `src/app/phase-1/page.tsx`, add the import:

```tsx
import { NewHireContextAnimation } from "@/components/interactive/NewHireContextAnimation";
```

Then, in the Context section (the one with `"The #1 Rule: Context Is Everything"`), insert the following **after** the existing `<ContextWindowAnimation />` and the "difference between a useless answer..." paragraph (before the Section closing tag):

```tsx
<div className="mt-10">
  <h3 className="text-xl font-bold mb-3">The &ldquo;New Hire on First Day&rdquo; Analogy</h3>
  <p className="text-sflow-cream-muted mb-6 max-w-3xl">
    You wouldn&apos;t dump every company document on a new hire&apos;s desk and say
    &ldquo;make me an invoice.&rdquo; You&apos;d extract the relevant info and write a
    clear brief. <strong className="text-sflow-cream">Treat AI the same way.</strong>{" "}
    This connects directly to the instruction documents section later.
  </p>
  <NewHireContextAnimation />
</div>
```

- [ ] **Step 3: Build and verify**

Run: `cd /Users/florian/GitHub/ai-session-ams && npm run build`
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/components/interactive/NewHireContextAnimation.tsx src/app/phase-1/page.tsx
git commit -m "feat(phase-1): add 'new hire' context analogy with side-by-side animation"
```

---

## Task 5: "Ask AI to Help You Formulate Your Question"  - Phase 1 Teaser

**Files:**
- Modify: `src/app/phase-1/page.tsx` (add new section before Instruction Documents)

Content-only task. No new components  - uses existing DemoCallout.

- [ ] **Step 1: Add new section to Phase 1**

In `src/app/phase-1/page.tsx`, add a new Section **before** the `{/* Instruction Documents */}` section (before `<Section>` containing "Instruction Documents & Custom Instructions"):

```tsx
{/* Ask AI to formulate your question */}
<Section>
  <h2 className="text-2xl font-bold mb-4">Ask AI to Help You Ask Better Questions</h2>
  <div className="max-w-3xl space-y-4 text-sflow-cream-muted">
    <p>
      When you need advice from an expert, you don&apos;t walk in and ask random questions.
      You <strong className="text-sflow-cream">ask someone to help you figure out what to ask</strong>.
    </p>
    <p>
      The same applies to AI. Before asking a complex question, ask the AI:
      &ldquo;What should I ask you to get the best answer about X?&rdquo;
    </p>
  </div>
  <div className="mt-6 grid gap-4 sm:grid-cols-2 max-w-3xl mx-auto">
    <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5">
      <p className="text-xs font-medium text-red-400 uppercase tracking-wide mb-2">Direct (often weak)</p>
      <p className="text-sm text-sflow-cream-muted italic">
        &ldquo;How do I improve my team&apos;s productivity?&rdquo;
      </p>
    </div>
    <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-5">
      <p className="text-xs font-medium text-green-400 uppercase tracking-wide mb-2">Meta-question (better)</p>
      <p className="text-sm text-sflow-cream-muted italic">
        &ldquo;I manage a 12-person finance team. What questions should I ask you
        to get actionable advice on improving our quarterly close process?&rdquo;
      </p>
    </div>
  </div>
  <p className="mt-6 text-sm text-sflow-gold max-w-3xl">
    This is a teaser - in Phase 2, we&apos;ll turn this into a full meta-prompting workflow.
  </p>
  <DemoCallout
    title="Meta-questioning demo"
    description="Asking AI 'what should I ask you?' and comparing the quality of answers to direct questions."
  />
</Section>
```

- [ ] **Step 2: Build and verify**

Run: `cd /Users/florian/GitHub/ai-session-ams && npm run build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/app/phase-1/page.tsx
git commit -m "feat(phase-1): add 'ask AI to help formulate your question' section with demo"
```

---

## Task 6: Move CoWork & Dispatch from Phase 1 to Phase 2

**Files:**
- Modify: `src/app/phase-1/page.tsx` (remove CoWork/Dispatch section)
- Modify: `src/app/phase-2/page.tsx` (add CoWork/Dispatch section)

This task covers both TODO items: "Move CoWork & Dispatch to Phase 2" and "Receive CoWork & Dispatch content."

- [ ] **Step 1: Remove CoWork & Dispatch from Phase 1**

In `src/app/phase-1/page.tsx`, delete the entire `{/* CoWork & Dispatch */}` Section (lines 114–143 approximately  - the Section containing "Claude in Office Tools (CoWork)"). This is the Section starting with `<h2>Claude in Office Tools (CoWork)</h2>` and ending with the Dispatch DemoCallout.

Also remove the `DemoCallout` import if it's no longer used elsewhere on this page. Check: DemoCallout is also used in GitHub Copilot, Image Generation, Gamma, and Google AI Studio sections, **and** the new Task 5 section  - so keep the import.

- [ ] **Step 2: Add CoWork & Dispatch to Phase 2**

In `src/app/phase-2/page.tsx`, add the `DemoCallout` import (it's not currently imported):

```tsx
import { DemoCallout } from "@/components/content/DemoCallout";
```

Wait  - check the existing imports. `DemoCallout` IS already imported on Phase 2 (line 8). Good, no import change needed.

Add a new Section **after** the "AI-to-AI Prompt Chain" section (after the PipelineAnimation/DemoCallout Section, before the "Death of the UI" Section):

```tsx
{/* CoWork & Dispatch  - workflow integration */}
<Section>
  <h2 className="text-2xl font-bold mb-4">Claude in Your Workflow (CoWork &amp; Dispatch)</h2>
  <p className="text-sflow-cream-muted mb-6 max-w-3xl">
    This is Phase 2 in action: AI isn&apos;t a standalone chat - it&apos;s embedded in your daily tools.
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
    description="Claude reading an email attachment, analyzing it in Excel, and drafting a reply  - all in one conversation."
  />
  <div className="mt-8">
    <h3 className="text-xl font-bold mb-2">Dispatch</h3>
    <p className="text-sflow-cream-muted max-w-3xl">
      Send tasks from your <strong className="text-sflow-cream">phone</strong> to your{" "}
      <strong className="text-sflow-cream">desktop</strong> Claude. Scan a QR code, connected in 2 taps.
      Note: tasks are routed through Anthropic&apos;s cloud - not fully local processing.
    </p>
    <DemoCallout
      title="Dispatch from phone"
      description="Scanning the QR code, sending a task from phone, watching Claude execute it on desktop."
    />
  </div>
  <p className="mt-6 text-sm text-sflow-cream-muted max-w-3xl">
    CoWork and Dispatch are about <strong className="text-sflow-gold">ripping out the belts</strong> -
    instead of copy-pasting between apps, AI flows across your entire toolkit.
  </p>
</Section>
```

- [ ] **Step 3: Build and verify**

Run: `cd /Users/florian/GitHub/ai-session-ams && npm run build`
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/app/phase-1/page.tsx src/app/phase-2/page.tsx
git commit -m "refactor: move CoWork & Dispatch section from Phase 1 to Phase 2"
```

---

## Task 7: "When More Context Hurts"  - Phase 2 New Section

**Files:**
- Create: `src/components/interactive/ContextDilutionAnimation.tsx`
- Modify: `src/app/phase-2/page.tsx` (add section)

- [ ] **Step 1: Create the ContextDilutionAnimation component**

Create `src/components/interactive/ContextDilutionAnimation.tsx`. Shows a conversation growing longer  - the initial system prompt shrinks as a percentage of the total context. Animated bar that fills up over time.

```tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/**
 * ContextDilutionAnimation  - Shows how initial instructions get "diluted"
 * as a conversation grows. A vertical bar fills up with messages while
 * the system prompt at the top shrinks proportionally.
 *
 * Cycle: ~14.5s
 */

const CYCLE = 14.5;

const MESSAGES = [
  { role: "user", text: "Analyze this report..." },
  { role: "ai", text: "Here's the analysis..." },
  { role: "user", text: "Now compare with Q3..." },
  { role: "ai", text: "Comparing quarterly..." },
  { role: "user", text: "Add the budget data..." },
  { role: "ai", text: "Incorporating budgets..." },
  { role: "user", text: "What about last year?" },
  { role: "ai", text: "Historical comparison..." },
  { role: "user", text: "Summarize everything" },
];

export function ContextDilutionAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-50px" });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const id = setInterval(() => setTick((t) => t + 1), CYCLE * 1000);
    return () => clearInterval(id);
  }, [isInView]);

  const key = `cycle-${tick}`;

  return (
    <div ref={ref} className="w-full max-w-3xl mx-auto">
      {isInView && (
        <motion.div
          key={key}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: CYCLE, times: [0, 0.03, 0.86, 0.93] }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-6 items-start">
            {/* ── Context Window visualization ──────── */}
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-widest text-sflow-cream-muted text-center mb-3">
                Context Window
              </p>

              {/* System prompt - shrinks proportionally */}
              <motion.div
                animate={{
                  height: ["80px", "80px", "24px"],
                  opacity: [1, 1, 0.4],
                }}
                transition={{ duration: 10, times: [0, 0.3, 1] }}
                className="rounded-lg border-2 border-sflow-gold/40 bg-sflow-gold/10 px-3 flex items-center justify-center overflow-hidden"
              >
                <motion.span
                  animate={{ fontSize: ["12px", "12px", "9px"] }}
                  transition={{ duration: 10, times: [0, 0.3, 1] }}
                  className="font-bold text-sflow-gold whitespace-nowrap"
                >
                  System Prompt &amp; Instructions
                </motion.span>
              </motion.div>

              {/* Messages filling up */}
              {MESSAGES.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ delay: 1.5 + i * 0.8, duration: 0.3 }}
                  className={`rounded-lg px-2 py-1 text-center overflow-hidden ${
                    msg.role === "user"
                      ? "border border-blue-400/30 bg-blue-400/5"
                      : "border border-sflow-glass-border bg-sflow-glass"
                  }`}
                >
                  <span className="text-[10px] text-sflow-cream-muted">{msg.text}</span>
                </motion.div>
              ))}

              {/* Last prompt at the bottom */}
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ delay: 9.0, duration: 0.3 }}
                className="rounded-lg border-2 border-blue-400/50 bg-blue-400/10 px-2 py-1.5 text-center"
              >
                <span className="text-[10px] font-bold text-blue-400">Your latest prompt</span>
              </motion.div>
            </div>

            {/* ── Percentage indicator ──────────────── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.0, duration: 0.5 }}
              className="hidden sm:flex flex-col items-center justify-center gap-4 py-8"
            >
              <div className="space-y-3 text-center">
                <motion.div
                  animate={{
                    color: ["#22c55e", "#eab308", "#ef4444"],
                  }}
                  transition={{ duration: 10, times: [0, 0.5, 1] }}
                >
                  <motion.p
                    className="text-2xl font-bold font-mono"
                    animate={{ opacity: [0, 1] }}
                    transition={{ delay: 3.0, duration: 0.5 }}
                  >
                    <motion.span
                      animate={{
                        // Animate from "45%" to "3%"
                        opacity: [1, 1],
                      }}
                      transition={{ duration: 8 }}
                    >
                      Instructions:
                    </motion.span>
                  </motion.p>
                  <motion.p
                    className="text-3xl font-bold font-mono"
                    animate={{
                      color: ["#22c55e", "#eab308", "#ef4444"],
                    }}
                    transition={{ duration: 10, times: [0, 0.5, 1] }}
                  >
                    {/* We show decreasing percentages as messages fill */}
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 3.0, duration: 0.3 }}
                    >
                      45%
                    </motion.span>
                  </motion.p>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 9.5, duration: 0.5 }}
                  className="text-3xl font-bold font-mono text-red-400"
                >
                  ~3%
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 10.0, duration: 0.5 }}
                  className="text-[10px] text-red-400 font-semibold"
                >
                  of context is your original instructions
                </motion.p>
              </div>
            </motion.div>

            {/* ── Explanation ──────────────────────── */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4.0, duration: 0.5 }}
                className="rounded-xl border border-sflow-gold/20 bg-sflow-gold/5 p-4"
              >
                <p className="text-xs font-bold text-sflow-gold mb-2">What happens:</p>
                <ul className="space-y-2 text-[11px] text-sflow-cream-muted">
                  <li>1. Your instructions start as ~45% of context</li>
                  <li>2. Each exchange adds more tokens</li>
                  <li>3. Instructions shrink to ~3% of attention</li>
                  <li>4. AI &ldquo;forgets&rdquo; your original constraints</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 10.5, duration: 0.5 }}
                className="rounded-xl border border-red-500/30 bg-red-500/5 p-4"
              >
                <p className="text-xs font-bold text-red-400 mb-1">The result:</p>
                <p className="text-[11px] text-sflow-cream-muted">
                  Contradictions, ignored constraints, hallucinations.
                  The AI isn&apos;t broken - it&apos;s drowning in context.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Add the section to Phase 2**

In `src/app/phase-2/page.tsx`, add the import:

```tsx
import { ContextDilutionAnimation } from "@/components/interactive/ContextDilutionAnimation";
```

Add a new Section **after** the CoWork/Dispatch section (from Task 6) and **before** the "Death of the UI" section:

```tsx
{/* When More Context Hurts */}
<Section>
  <h2 className="text-2xl font-bold mb-4">When More Context Hurts</h2>
  <div className="max-w-3xl space-y-4 text-sflow-cream-muted mb-8">
    <p>
      More context isn&apos;t always better. Long conversations <strong className="text-sflow-cream">dilute</strong> your
      original instructions. The AI doesn&apos;t ignore them on purpose - they just become
      a tiny fraction of what it&apos;s paying attention to.
    </p>
    <p>
      <strong className="text-sflow-gold">Practical guidance:</strong> Start fresh conversations for new tasks.
      Re-state critical constraints. Keep system prompts concise. Exclude irrelevant context.
    </p>
  </div>
  <ContextDilutionAnimation />
</Section>
```

- [ ] **Step 3: Build and verify**

Run: `cd /Users/florian/GitHub/ai-session-ams && npm run build`
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/components/interactive/ContextDilutionAnimation.tsx src/app/phase-2/page.tsx
git commit -m "feat(phase-2): add 'When More Context Hurts' section with context dilution animation"
```

---

## Task 8: Tool Calling Diagram  - Phase 2

**Files:**
- Create: `src/components/interactive/ToolCallingAnimation.tsx`
- Modify: `src/app/phase-2/page.tsx` (add section after API call section)

- [ ] **Step 1: Create the ToolCallingAnimation component**

Create `src/components/interactive/ToolCallingAnimation.tsx`. Shows: context contents → AI decides action → tool call → result comes back → AI generates response. ~14.5s cycle.

```tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/**
 * ToolCallingAnimation  - Shows the invisible orchestration layer:
 *   1. Context contents (system prompt, user message, available tools)
 *   2. AI decides which tool to call (text generation!)
 *   3. Tool executes and returns result
 *   4. AI uses result to generate final response
 *
 * Cycle: ~14.5s
 */

const CYCLE = 14.5;

const CONTEXT_ITEMS = [
  { label: "System Prompt", color: "border-sflow-gold/30 bg-sflow-gold/10", textColor: "text-sflow-gold" },
  { label: "User: 'What's the weather in Brussels?'", color: "border-blue-400/30 bg-blue-400/5", textColor: "text-blue-300" },
  { label: "Available tools: [search, weather, calculator]", color: "border-purple-400/30 bg-purple-400/5", textColor: "text-purple-300" },
];

const TOOLS = [
  { name: "search", icon: "magnifying glass" },
  { name: "weather", icon: "cloud" },
  { name: "calculator", icon: "calc" },
];

export function ToolCallingAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-50px" });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const id = setInterval(() => setTick((t) => t + 1), CYCLE * 1000);
    return () => clearInterval(id);
  }, [isInView]);

  const key = `cycle-${tick}`;

  return (
    <div ref={ref} className="w-full max-w-4xl mx-auto">
      {isInView && (
        <motion.div
          key={key}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: CYCLE, times: [0, 0.03, 0.86, 0.93] }}
        >
          {/* Step labels */}
          <div className="grid grid-cols-4 gap-3 mb-4">
            {["1. In the Context", "2. AI Decides", "3. Tool Executes", "4. Final Response"].map((label, i) => (
              <motion.p
                key={label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 2.5, duration: 0.4 }}
                className="text-[10px] font-bold uppercase tracking-widest text-sflow-cream-muted text-center"
              >
                {label}
              </motion.p>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-3 items-start">
            {/* ── Column 1: Context contents ──────── */}
            <div className="space-y-2">
              {CONTEXT_ITEMS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.4, duration: 0.3 }}
                  className={`rounded-lg border ${item.color} px-2 py-1.5`}
                >
                  <span className={`text-[10px] font-medium ${item.textColor}`}>{item.label}</span>
                </motion.div>
              ))}
            </div>

            {/* ── Column 2: AI decision ───────────── */}
            <div className="space-y-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3.0, duration: 0.5 }}
                className="rounded-xl border-2 border-sflow-cream-muted/30 bg-sflow-glass p-3 text-center"
              >
                <p className="text-[10px] font-bold text-sflow-cream mb-2">AI generates text:</p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3.8, duration: 0.5 }}
                  className="text-[10px] font-mono text-sflow-gold"
                >
                  {`{"tool": "weather",`}<br />
                  {`"args": {"city": "Brussels"}}`}
                </motion.p>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4.5, duration: 0.4 }}
                className="text-[9px] text-sflow-cream-muted text-center italic"
              >
                Tool selection is still just text generation!
              </motion.p>
            </div>

            {/* ── Column 3: Tool execution ────────── */}
            <div className="space-y-2">
              {TOOLS.map((tool, i) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    borderColor: tool.name === "weather" ? "rgba(234, 179, 8, 0.5)" : "rgba(255,255,255,0.1)",
                    scale: tool.name === "weather" ? [1, 1.05, 1] : 1,
                  }}
                  transition={{ delay: 5.5 + i * 0.3, duration: 0.5 }}
                  className={`rounded-lg border bg-sflow-glass px-2 py-1.5 text-center ${
                    tool.name === "weather" ? "border-sflow-gold/50" : "border-sflow-glass-border"
                  }`}
                >
                  <span className={`text-[10px] font-medium ${tool.name === "weather" ? "text-sflow-gold" : "text-sflow-cream-muted"}`}>
                    {tool.name}
                  </span>
                </motion.div>
              ))}

              {/* Result */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 7.5, duration: 0.5 }}
                className="rounded-lg border border-green-500/30 bg-green-500/5 px-2 py-1.5"
              >
                <span className="text-[10px] font-mono text-green-300">
                  {`{"temp": "14°C",`}<br />
                  {`"condition": "cloudy"}`}
                </span>
              </motion.div>
            </div>

            {/* ── Column 4: Final response ────────── */}
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 9.0, duration: 0.6 }}
                className="rounded-xl border-2 border-green-500/30 bg-green-500/5 p-3"
              >
                <p className="text-[10px] font-bold text-green-400 mb-1">AI Response:</p>
                <p className="text-[10px] text-sflow-cream-muted">
                  &ldquo;It&apos;s currently 14&deg;C and cloudy in Brussels.&rdquo;
                </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 10.0, duration: 0.4 }}
                className="mt-2 text-[9px] text-sflow-cream-muted text-center"
              >
                The user never sees the tool call - only the final answer.
              </motion.p>
            </div>
          </div>

          {/* Bottom insight */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 11.0, duration: 0.5 }}
            className="mt-6 rounded-xl border border-sflow-gold/20 bg-sflow-gold/5 p-3 text-center"
          >
            <p className="text-xs text-sflow-cream-muted">
              <strong className="text-sflow-gold">The invisible layer:</strong> AI reads context, generates a tool call as text,
              the system executes it, feeds the result back, and AI generates the final response. All hidden from the user.
            </p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Add to Phase 2 page**

In `src/app/phase-2/page.tsx`, add the import:

```tsx
import { ToolCallingAnimation } from "@/components/interactive/ToolCallingAnimation";
```

Add a new Section **after** the "How a Prompt Actually Works" section (after the APICallAnimation Section) and **before** the "AI-to-AI Prompt Chain" section:

```tsx
{/* Tool Calling */}
<Section>
  <h2 className="text-2xl font-bold mb-4">How Tool Calling Works</h2>
  <p className="text-sflow-cream-muted mb-6 max-w-3xl">
    When AI &ldquo;searches the web&rdquo; or &ldquo;reads a file,&rdquo; there&apos;s an invisible orchestration layer
    between the chat and the action. The AI doesn&apos;t execute anything - it generates text that describes
    what it wants to do, and the system carries it out.
  </p>
  <ToolCallingAnimation />
</Section>
```

- [ ] **Step 3: Build and verify**

Run: `cd /Users/florian/GitHub/ai-session-ams && npm run build`
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/components/interactive/ToolCallingAnimation.tsx src/app/phase-2/page.tsx
git commit -m "feat(phase-2): add tool calling diagram with animated orchestration flow"
```

---

## Task 9: Clarify "Agentic" vs "Agent"  - Phase 3

**Files:**
- Create: `src/components/interactive/AgenticToolSelectionAnimation.tsx`
- Modify: `src/app/phase-3/page.tsx` (rewrite "What Is an Agent?" section)

- [ ] **Step 1: Create the AgenticToolSelectionAnimation component**

Create `src/components/interactive/AgenticToolSelectionAnimation.tsx`. Shows an agent receiving a task, selecting tools (which is still text generation), executing them, and getting results.

```tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/**
 * AgenticToolSelectionAnimation  - Shows that "agentic" tool selection
 * is still just text generation. The AI generates a plan as text,
 * tools execute, results feed back.
 *
 * Cycle: ~14.5s
 */

const CYCLE = 14.5;

const TOOLS = [
  { name: "read_file", desc: "Read a document" },
  { name: "web_search", desc: "Search the internet" },
  { name: "run_code", desc: "Execute Python" },
  { name: "send_email", desc: "Send an email" },
];

const PLAN_STEPS = [
  "1. read_file('report.pdf')",
  "2. web_search('Q4 benchmarks')",
  "3. run_code('analysis.py')",
];

export function AgenticToolSelectionAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-50px" });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const id = setInterval(() => setTick((t) => t + 1), CYCLE * 1000);
    return () => clearInterval(id);
  }, [isInView]);

  const key = `cycle-${tick}`;

  return (
    <div ref={ref} className="w-full max-w-3xl mx-auto">
      {isInView && (
        <motion.div
          key={key}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: CYCLE, times: [0, 0.03, 0.86, 0.93] }}
          className="space-y-6"
        >
          {/* Task input */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="rounded-xl border border-blue-400/30 bg-blue-400/5 p-4 text-center"
          >
            <p className="text-xs text-blue-300 font-bold mb-1">Task received:</p>
            <p className="text-sm text-sflow-cream">&ldquo;Analyze last quarter and compare with industry benchmarks&rdquo;</p>
          </motion.div>

          {/* Available tools */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <p className="text-xs font-bold uppercase tracking-widest text-sflow-cream-muted mb-2">Available Tools:</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {TOOLS.map((tool, i) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.8 + i * 0.2, duration: 0.3 }}
                  className="rounded-lg border border-sflow-glass-border bg-sflow-glass p-2 text-center"
                >
                  <span className="text-[10px] font-mono text-sflow-cream">{tool.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* AI generates plan  - THIS IS STILL TEXT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 3.5, duration: 0.5 }}
            className="rounded-xl border-2 border-sflow-gold/40 bg-sflow-gold/10 p-4"
          >
            <p className="text-xs font-bold text-sflow-gold mb-2">AI generates a plan (still just text!):</p>
            <div className="space-y-1">
              {PLAN_STEPS.map((step, i) => (
                <motion.p
                  key={step}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 4.0 + i * 0.5, duration: 0.3 }}
                  className="text-[11px] font-mono text-sflow-cream"
                >
                  {step}
                </motion.p>
              ))}
            </div>
          </motion.div>

          {/* Execution + results */}
          <div className="space-y-2">
            {PLAN_STEPS.map((step, i) => (
              <motion.div
                key={`exec-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 6.5 + i * 1.0, duration: 0.4 }}
                className="flex items-center gap-3"
              >
                <div className="rounded-lg border border-sflow-glass-border bg-sflow-glass px-2 py-1 shrink-0">
                  <span className="text-[10px] font-mono text-sflow-cream-muted">{step.split("'")[0]}...)</span>
                </div>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 6.8 + i * 1.0, duration: 0.6 }}
                  className="h-px bg-sflow-gold/30"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 7.2 + i * 1.0, duration: 0.3 }}
                  className="rounded-lg border border-green-500/30 bg-green-500/5 px-2 py-1 shrink-0"
                >
                  <span className="text-[10px] text-green-300">Result</span>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Key insight */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 10.5, duration: 0.5 }}
            className="rounded-xl border border-sflow-gold/20 bg-sflow-gold/5 p-3 text-center"
          >
            <p className="text-xs text-sflow-cream-muted">
              <strong className="text-sflow-gold">Key insight:</strong> Selecting tools, planning steps, and deciding what to do
              next is <strong className="text-sflow-cream">all still text generation</strong>. The &ldquo;intelligence&rdquo;
              is pattern matching  - the system around it provides the actual capabilities.
            </p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Rewrite the "What Is an Agent?" section in Phase 3**

In `src/app/phase-3/page.tsx`, add the import:

```tsx
import { AgenticToolSelectionAnimation } from "@/components/interactive/AgenticToolSelectionAnimation";
```

Replace the existing "What Is an Agent?" Section (the one starting with `<h2>What Is an &ldquo;Agent&rdquo;?</h2>`) with this expanded version that distinguishes "agentic" from "agent":

```tsx
<Section>
  <h2 className="text-2xl font-bold mb-4">Agentic vs Agent - They&apos;re Not the Same</h2>
  <div className="grid gap-4 sm:grid-cols-2 max-w-3xl mx-auto mb-8">
    <div className="rounded-xl border border-sflow-gold/30 bg-sflow-gold/5 p-5">
      <h3 className="font-semibold text-sflow-gold mb-2">&ldquo;Agentic&rdquo;</h3>
      <p className="text-sm text-sflow-cream-muted">
        AI that <strong className="text-sflow-cream">chooses its own tools</strong>, plans steps, and orchestrates
        workflows. You give it a goal; it figures out the how. Still needs a human to start it.
      </p>
      <p className="mt-2 text-xs text-sflow-muted italic">
        Example: Claude Code reading your codebase, deciding which files to edit, running tests.
      </p>
    </div>
    <div className="rounded-xl border border-purple-400/30 bg-purple-400/5 p-5">
      <h3 className="font-semibold text-purple-300 mb-2">&ldquo;Agent&rdquo;</h3>
      <p className="text-sm text-sflow-cream-muted">
        Fully autonomous AI that <strong className="text-sflow-cream">acts on triggers or schedules</strong>{" "}
        without human initiation. It runs in the background, watching for events.
      </p>
      <p className="mt-2 text-xs text-sflow-muted italic">
        Example: An agent that polls Azure DevOps every 30s, claims tickets tagged &ldquo;CLAUDE,&rdquo; executes work, and closes them.
      </p>
    </div>
  </div>
  <p className="text-sflow-cream-muted max-w-3xl mb-8">
    The magic isn&apos;t the agent - it&apos;s the <strong className="text-sflow-gold">process</strong> it&apos;s embedded in.
    And the surprising truth: tool selection is still just text generation.
  </p>
  <AgenticToolSelectionAnimation />
</Section>
```

- [ ] **Step 3: Build and verify**

Run: `cd /Users/florian/GitHub/ai-session-ams && npm run build`
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/components/interactive/AgenticToolSelectionAnimation.tsx src/app/phase-3/page.tsx
git commit -m "feat(phase-3): clarify Agentic vs Agent distinction with tool selection animation"
```

---

## Task 10: AI for Deterministic Scripts/Code  - Phase 3

**Files:**
- Modify: `src/app/phase-3/page.tsx` (add section)

Content-only task. Uses existing DemoCallout.

- [ ] **Step 1: Add new section to Phase 3**

In `src/app/phase-3/page.tsx`, add a new Section **after** the "Google AI Studio App with Database" DemoCallout Section and **before** the "Human as Operator" Section:

```tsx
{/* AI for deterministic code */}
<Section>
  <h2 className="text-2xl font-bold mb-4">Don&apos;t Ask AI to DO Finance - Ask It to BUILD the Tool</h2>
  <div className="max-w-3xl space-y-4 text-sflow-cream-muted">
    <p>
      AI makes mistakes. Math doesn&apos;t. The solution:{" "}
      <strong className="text-sflow-cream">use AI to write deterministic scripts</strong> that execute
      reliably every time.
    </p>
    <p>
      Instead of asking Claude to calculate your KPIs, ask it to <strong className="text-sflow-gold">build
      a Python script</strong> that pulls data from Azure DevOps, calculates the KPIs with
      exact formulas, and outputs a dashboard. The script is reviewable, testable, and repeatable.
    </p>
  </div>
  <div className="mt-6 grid gap-4 sm:grid-cols-2 max-w-3xl mx-auto">
    <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5">
      <p className="text-xs font-medium text-red-400 uppercase tracking-wide mb-2">Wrong approach</p>
      <p className="text-sm text-sflow-cream-muted italic">
        &ldquo;Calculate our sprint velocity and defect rate from this data.&rdquo;
      </p>
      <p className="mt-2 text-[10px] text-red-400">AI may hallucinate numbers, round differently, miss edge cases.</p>
    </div>
    <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-5">
      <p className="text-xs font-medium text-green-400 uppercase tracking-wide mb-2">Right approach</p>
      <p className="text-sm text-sflow-cream-muted italic">
        &ldquo;Write a Python script that connects to Azure DevOps, fetches work items for the last 6 sprints,
        and calculates velocity and defect rate using [these exact formulas].&rdquo;
      </p>
      <p className="mt-2 text-[10px] text-green-400">Deterministic. Reviewable. Repeatable.</p>
    </div>
  </div>
  <DemoCallout
    title="Azure DevOps KPI automation"
    description="Using Claude Code / AI Studio to build a Python script that pulls Azure DevOps data and generates KPI dashboards  - deterministic code, not AI guesswork."
  />
</Section>
```

- [ ] **Step 2: Build and verify**

Run: `cd /Users/florian/GitHub/ai-session-ams && npm run build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/app/phase-3/page.tsx
git commit -m "feat(phase-3): add 'AI for deterministic scripts' section with Azure DevOps demo"
```

---

## Task 11: Security Page  - Add Story Card Images

**Files:**
- Modify: `src/lib/constants.ts` (add `imageUrl` field to Story interface + stories)
- Modify: `src/components/interactive/StoryCard.tsx` (render optional image)
- Modify: `src/app/security/page.tsx` (no changes needed if StoryCard handles it)

- [ ] **Step 1: Add imageUrl to Story interface**

In `src/lib/constants.ts`, update the `Story` interface to include an optional `imageUrl`:

```ts
export interface Story {
  id: string;
  title: string;
  hook: string;
  setup: string;
  happened: string;
  lesson: string;
  sourceUrl?: string;
  imageUrl?: string;
}
```

- [ ] **Step 2: Add image URLs to the three security stories**

In `src/lib/constants.ts`, add `imageUrl` to the chevrolet, air-canada, and samsung story objects. These should be paths to images in `public/images/stories/`. The actual images need to be sourced by the user  - use placeholder paths for now:

```ts
// In the chevrolet story object, add:
imageUrl: "/images/stories/chevrolet-chatbot.jpg",

// In the air-canada story object, add:
imageUrl: "/images/stories/air-canada-chatbot.jpg",

// In the samsung story object, add:
imageUrl: "/images/stories/samsung-leak.jpg",
```

- [ ] **Step 3: Update StoryCard to render optional image**

Read `src/components/interactive/StoryCard.tsx` first. Then add the image rendering. Add this block inside the StoryCard component, right after the hook paragraph and before the expandable content:

After the existing `<p className="text-sm text-sflow-cream-muted">{story.hook}</p>`, and within the main button area (before the expandable `AnimatePresence` section), add:

```tsx
{story.imageUrl && (
  <div className="mt-3 rounded-lg overflow-hidden border border-sflow-glass-border">
    <img
      src={story.imageUrl}
      alt={story.title}
      className="w-full h-40 object-cover"
      loading="lazy"
    />
  </div>
)}
```

Note: Use a regular `<img>` tag since these are user-sourced images with unknown dimensions. The `h-40 object-cover` ensures consistent height.

- [ ] **Step 4: Create placeholder images directory**

```bash
mkdir -p /Users/florian/GitHub/ai-session-ams/public/images/stories
```

Leave a note: the actual screenshot images need to be sourced and placed in `public/images/stories/`. The StoryCard will gracefully handle missing images (broken image, but no crash).

- [ ] **Step 5: Build and verify**

Run: `cd /Users/florian/GitHub/ai-session-ams && npm run build`
Expected: Build succeeds (images may not render yet without actual files).

- [ ] **Step 6: Commit**

```bash
git add src/lib/constants.ts src/components/interactive/StoryCard.tsx
git commit -m "feat(security): add optional imageUrl to StoryCard for case study screenshots"
```

---

## Task 12: Landscape  - "Google Finds Way to Run with Less RAM"

**Files:**
- Modify: `src/app/landscape/page.tsx` (add content to local models section)

Content-only task. Requires research to find the specific article referenced.

- [ ] **Step 1: Research the article**

Search for "Google finds way to run AI models with less RAM" or similar. The user likely refers to Google's work on model quantization/distillation (e.g., Gemma models optimized for edge devices, or Google's MatFormer/mixed-precision work). Find the specific article and note its URL.

- [ ] **Step 2: Add to the Local Models section**

In `src/app/landscape/page.tsx`, in the "Local Models Are Coming to Your Laptop" section, add a 5th card to the grid:

```tsx
{ title: "Less RAM, Same Quality", desc: "Google researchers demonstrated techniques to run frontier-quality models with significantly less memory  - making local AI more accessible on standard hardware." },
```

Update the grid to include this card. Also add a source link below the grid:

```tsx
<p className="mt-4 text-xs text-sflow-muted">
  <a href="[ARTICLE_URL]" target="_blank" rel="noopener noreferrer" className="underline hover:text-sflow-cream transition-colors">
    Source: Google research on efficient model inference ↗
  </a>
</p>
```

Replace `[ARTICLE_URL]` with the actual URL found in Step 1.

- [ ] **Step 3: Build and verify**

Run: `cd /Users/florian/GitHub/ai-session-ams && npm run build`
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/app/landscape/page.tsx
git commit -m "content(landscape): add Google 'less RAM' research to local models section"
```

---

## Task 13: Landscape  - Local Models Outperform Original ChatGPT

**Files:**
- Modify: `src/app/landscape/page.tsx` (add content)

Content-only task.

- [ ] **Step 1: Add performance reframing to landscape page**

In `src/app/landscape/page.tsx`, add a new paragraph/callout **after** the local models grid and **before** the "Closed Source vs Open Source" section. Insert between the two existing Sections:

In the first Section (after the grid `</div>` closing tag), add:

```tsx
<div className="mt-8 rounded-xl border border-sflow-gold/20 bg-sflow-gold/5 p-5 max-w-3xl">
  <h3 className="font-semibold text-sflow-gold mb-2">Perspective: &ldquo;Local = Worse&rdquo; is Outdated</h3>
  <p className="text-sm text-sflow-cream-muted">
    Today&apos;s local models running on a laptop <strong className="text-sflow-cream">outperform the original
    ChatGPT</strong> (GPT-3.5, November 2022) that started the entire revolution.
    The model that amazed the world 3 years ago is now surpassed by software running
    on your MacBook - offline, private, free. Progress is exponential.
  </p>
</div>
```

- [ ] **Step 2: Build and verify**

Run: `cd /Users/florian/GitHub/ai-session-ams && npm run build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/app/landscape/page.tsx
git commit -m "content(landscape): add local models vs original ChatGPT performance reframing"
```

---

## Execution Order & Dependencies

Tasks can be executed in parallel within groups:

| Group | Tasks | Reason |
|-------|-------|--------|
| A (parallel) | 1, 2 | Both modify factory page in different sections |
| B (parallel) | 3, 4, 5 | All modify phase-1 in different sections, but Task 3 changes line numbers  - execute 3 first, then 4+5 in parallel |
| C (sequential) | 6 first | Move must happen before Task 7/8 add content to Phase 2 |
| D (parallel) | 7, 8 | Both add to phase-2, different sections |
| E (parallel) | 9, 10 | Both modify phase-3, different sections |
| F | 11 | Security page, independent |
| G (parallel) | 12, 13 | Both modify landscape page, different parts of same section  - can be combined |

**Recommended execution order:** A → B → C → D → E → F → G

Each task should be independently buildable and commitable.
