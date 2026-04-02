# AI Session AMS — TODO

Effort: [S] ~15 min | [M] ~30-60 min | [L] 1hr+

---

## Cross-page

- [~] [S] Add reference links to all quotes (QuoteBlock component supports `url` prop; only 2/10 quotes have URLs — most lack author/source attribution)
- [x] [M] "Process is King" — weave this theme into Factory intro (process redesign > tool adoption) and reinforce in Takeaways

---

## Factory (`/factory`)

- [~] [S] Add a picture/illustration of a belt-driven factory (visual anchor for the steam-era metaphor) — currently only a Lucide icon + descriptive text, no actual image
- [x] [M] New section: "Are AI and Humans More Alike Than We Think?" — practical teaching aid using parallels: context window = working memory, token limit = attention span, temperature = creativity vs focus, forgetting = no persistent memory. Frame it as motivation for understanding how LLMs work (Phase 1 goes deeper) - Show a side by side interactive diagram comparing them with eachother. Memory, context (vision, hearing, ... for humans), tools, ... etc

---

## Phase 1 (`/phase-1`)

### Content additions
- [x] [M] Expand "How LLMs Work" into a combined deeper section covering:
  - Neural network basics (pattern matching, not reasoning)
  - Why AI "forgets" (stateless — each conversation starts fresh)
  - Why feedback matters / AI can't "go back" (autoregressive generation, token-by-token)
  - Keep existing token animation, enhance with neural net visual if time allows
  - Show this as a nice interactive animation where the tokens are inputted, context added and then send to the API and then coming back
- [x] [S] Model comparison: add note about thinking overhead — "expensive" models aren't always better (thinking thinking thinking... "hello"). Reasoning models burn tokens on simple tasks
- [x] [M] Context section: add "new hire on first day" analogy — you wouldn't throw all company info at a new hire and ask them to make an invoice. Extract the useful info, make a clear instruction document. Connects to the instruction documents section later. Show a side by side comparison of a lot of files with a direct arrow to output, compared with, a lot of files => Instruction => Output
- [x] [M] Add "ask AI to help you formulate your question" concept — when asking a someone for advice, you first ask what you should ask the expert, not ask dumb questions directly. Teaser for Phase 2 meta-prompting. I have a short demo to show here.

### Fixes
- [x] [M] **Move CoWork & Dispatch section to Phase 2** — it's workflow integration, not basic tool usage. Phase 1 should stay focused on individual tools (ChatGPT, Copilot, image gen, AI Studio)
- [x] [S] Email animation: add the "assignment" framing (send in an assignment, wait for it, send it back) and fix both bars to equal animation length
- [x] [S] Add MarkdownEdit link in the Markdown section (currently no link to an editor): https://onlinemarkdownedit.netlify.app/
- [x] [S] Remove CSV upload mention from Google AI Studio section

---

## Phase 2 (`/phase-2`)

- [x] [M] Receive CoWork & Dispatch content (moved from Phase 1) — fits the "ripping out the belts" theme of integrating AI into workflows across tools
- [x] [M] New section: "When More Context Hurts" — how too much context can pollute answers, dilute focus, or introduce contradictions. Practical guidance on what to include vs exclude. Add a diagram/comparison why; show the huge context after a lengthy conversation with the intial prompt on top and then their last prompt at the button; make it an animation where you show it starts in % (starting prompt) and as it goes further and further, the starting instrcutions become like 1%.
- [x] [M] Tool calling diagram — visual showing: what's in the context, what the AI decides to do, what tools get called, what comes back. Clarifies the invisible orchestration layer - add a cool animation for this.

---

## Phase 3 (`/phase-3`)

- [x] [M] **Clarify Agentic vs Agent** — currently conflated. Add clear distinction:
  - "Agentic" = AI that chooses its own tools, plans steps, orchestrates workflows
  - "Agent" = fully autonomous AI that acts on triggers/schedules without human initiation
  - Current text throws both on the same pile
  - Add an animation showing an agent "calling tools" and getting the result from a system. Add an animation that shows how this works: selecting tools is STILL just text generation.
- [x] [S] Dispatch cloud note — add clarification that Dispatch still sends data to the cloud (not local processing)
- [x] [M] Add section or reference about using AI to write deterministic scripts/code for finance (don't ask AI to DO finance, ask it to BUILD the tool that does finance). E.g. using AI studio, Claude Code, ... etc - I have a demo example to show about this using azure devops KPI's.

---

## Security (`/security`)

- [x] [S] Add "next" navigation button to Landscape page (navigation chain currently breaks: Phase 3 → Security → ???)
- [~] [M] Add screenshots/images for Chevrolet, Air Canada, Samsung story cards (currently text-only) — imageUrl support added to StoryCard, paths configured, actual images still need to be sourced and placed in `public/images/stories/`
- [x] [S] Add source URLs to case study StoryCards

---

## Landscape (`/landscape`)

- [x] [M] Local models section: add "Google finds way to run with less RAM" development (research the article)
- [x] [M] Local model performance note: today's local models outperform the original ChatGPT (2022) — reframe the "local = worse" assumption and also emhpasizes the progress that is being made.
- [x] [S] Add "next" navigation button to Takeaways (if missing)

---

## Demos (live — speaker checklist, not website features)

1. [x] Parallel research using Claude Code CLI
2. [x] Building easy apps using Lovable + Google AI Studio - Idea is to show that you better ask AI studio to write an app to process a CSV, Excel, ... etc instead of just throwing it into claude.
3. [x] Automating with Claude CoWork and Dispatch
4. [x] Writing Python scripts / deterministic code with AI
5. [x] Connecting stuff to Claude (Connectors, apps, MCP)
6. [x] Building agents for production (Agentic SDK)

====

New
- The email animation should almost be the same lenght to make it more clear on what I mean.
-
