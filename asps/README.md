# ASPS™ Implementation Guide

## Agentic-System-Prompt-as-a-Skill™ — Templates & Usage

**Beunec Technologies, Inc.**  
**Author:** Olu Akinnawo & Beunec R&D
**Version:** 1.0.0

# Python
pip install beunec-asps

# Node.js / TypeScript
npm install @beunec/asps

---

## Table of Contents

1. [Core Principle](#core-principle)
2. [The Three Techniques](#the-three-techniques)
3. [Quick Start](#quick-start)
4. [Building a Custom Skill](#building-a-custom-skill)
5. [Pre-Built Skill Templates](#pre-built-skill-templates)
6. [Heuristic Library Reference](#heuristic-library-reference)
7. [Guardrail & Checkpoint Presets](#guardrail--checkpoint-presets)
8. [Network Topology Patterns](#network-topology-patterns)
9. [Integration with Mohulka Center](#integration-with-mohulka-center)
10. [FAQ](#faq)

---

## Core Principle

> **An LLM does not "have skills."** It has parameters. The concept of "AI Skills" is a misnomer.
>
> What differentiates a raw system prompt from a *skill* is **agentic infrastructure** — the deterministic pipelines, behavioral checkpoints, and governed network connections that transform a prompt into a reliable, repeatable, auditable unit of work.
>
> Beunec calls this infrastructure **Agentic-System-Prompt-as-a-Skill™ (ASPS™)**.

ASPS™ is not a prompt engineering technique. It is a **three-layer skill construction framework** that produces deployable artifacts.

---

## The Three Techniques

### 1. Agentic Skill Distillation™ (ASD™)

**Purpose:** Extract expert-level professional heuristics and compress them into deterministic, ordered instruction sets.

**What it does:**
- Takes domain expertise (e.g., "how a CFA analyst evaluates a stock")
- Decomposes it into individual heuristics (decision patterns)
- Assigns determinism scores and sequence ordering
- Compiles heuristics into a composite system prompt

**Key concept:** A heuristic is not a "tip" — it is a *typed, constrained, sequenced instruction* with declared inputs, outputs, and determinism scores.

```typescript
import { createHeuristic, distill } from '@/lib/asps'

const heuristics = [
  createHeuristic({
    name: 'Ticker Resolution',
    instruction: 'Resolve the user query to a valid stock ticker symbol.',
    constraints: ['Must confirm ticker exists', 'Handle common aliases'],
    inputSchema: 'UserQuery (natural language)',
    outputSchema: 'TickerResolution { symbol, exchange, companyName }',
    determinismScore: 0.95,
    sequenceIndex: 1,
  }),
  // ... more heuristics
]

const distillation = distill('Equity Research', heuristics, {
  sourceModel: 'gpt-4o',
  expertSourceCount: 3,
})

console.log(distillation.compositeSystemPrompt)
// → Full deterministic system prompt with all steps ordered
```

---

### 2. Agentic Skill Reinforcement™ (ASR™)

**Purpose:** Wrap a distilled skill in a behavioral reinforcement envelope that prevents drift, hallucination, and persona violations.

**Four mechanisms:**

| Mechanism | Purpose |
|---|---|
| **Behavioral Checkpoints** | Pre/mid/post gates that halt execution on drift |
| **Pseudonym Protocols** | Identity alignment — the agent maintains a professional persona |
| **ICRL** (In-Context Reinforcement Learning) | Dynamic feedback signals that correct the agent mid-conversation |
| **Guardrails** | Hard-coded rules that override all other behavior |

```typescript
import { reinforce, createPseudonymProtocol, CHECKPOINT_PRESETS } from '@/lib/asps'

const reinforcement = reinforce(distillation.distillationId, {
  pseudonymProtocol: createPseudonymProtocol({
    identity: 'CFA Charterholder — Equity Research Analyst',
    persona: 'A disciplined equity research analyst who relies on data.',
    vocabulary: ['P/E', 'EPS', 'EBITDA', 'DCF', 'WACC'],
    redLines: [
      'Never guarantee investment returns.',
      'Always include financial disclaimers.',
    ],
  }),
  checkpoints: [...CHECKPOINT_PRESETS.standard, ...CHECKPOINT_PRESETS.financial],
  guardrailPresets: ['standard', 'financial'],
  icrl: {
    exemplarCount: 3,
    driftTolerance: 0.15,
    checkpointFrequency: 3,
  },
})
```

---

### 3. Agentic Network System™ (ANS™)

**Purpose:** Wire the reinforced skill into a governed network of agents, APIs, databases, and user interfaces.

**Three topology patterns:**

| Topology | Best For |
|---|---|
| **Hub-and-Spoke** | Single orchestrator + multiple specialist nodes |
| **Pipeline** | Sequential processing (matches ASD™ heuristic chains) |
| **Mesh** | Complex multi-domain where any node may need any other |

```typescript
import { NETWORK_TOPOLOGIES, buildNetwork } from '@/lib/asps'

const topology = NETWORK_TOPOLOGIES.hubAndSpoke({
  orchestratorLabel: 'Lead Analyst Agent',
  spokes: [
    { label: 'Market Data API', nodeType: 'api', capabilities: ['quotes', 'historical'] },
    { label: 'Risk Model', nodeType: 'agent', capabilities: ['var', 'stress-test'] },
    { label: 'Report Renderer', nodeType: 'template', capabilities: ['markdown', 'pdf'] },
  ],
})

const network = buildNetwork(reinforcement.reinforcementId, topology, {
  orchestrationFramework: 'Beunec ARG™ Framework',
  maxConcurrentHandoffs: 10,
})
```

---

## Quick Start

Build a complete ASPS™ skill in one call:

```typescript
import { buildASPS, HEURISTIC_LIBRARIES, createPseudonymProtocol, NETWORK_TOPOLOGIES } from '@/lib/asps'

const skill = buildASPS({
  name: 'Financial Stock Analyst',
  domain: 'Equity Research & Analysis',
  description: 'Comprehensive stock analysis with BUY/HOLD/SELL thesis.',
  tags: ['finance', 'equities'],
  heuristics: [...HEURISTIC_LIBRARIES.financialStockAnalyst],
  pseudonymProtocol: createPseudonymProtocol({
    identity: 'CFA Charterholder',
    persona: 'Disciplined equity research analyst.',
  }),
  guardrailPresets: ['standard', 'financial'],
  topology: NETWORK_TOPOLOGIES.hubAndSpoke({
    orchestratorLabel: 'Lead Analyst',
    spokes: [
      { label: 'Market Data', nodeType: 'api', capabilities: ['quotes'] },
    ],
  }),
})

// The compiled system prompt is ready for injection
console.log(skill.compiledSystemPrompt)
```

---

## Building a Custom Skill

Use the `ASPSBuilder` fluent API:

```typescript
import { ASPSBuilder, createHeuristic, createPseudonymProtocol, NETWORK_TOPOLOGIES } from '@/lib/asps'

const skill = new ASPSBuilder({
  name: 'Custom Domain Expert',
  domain: 'Your Domain Here',
  description: 'Description of what this skill does.',
  tags: ['custom'],
})
  .distill([
    createHeuristic({
      name: 'Step 1',
      instruction: 'Your first expert instruction.',
      sequenceIndex: 1,
    }),
    createHeuristic({
      name: 'Step 2',
      instruction: 'Your second expert instruction.',
      sequenceIndex: 2,
    }),
  ])
  .reinforce({
    pseudonymProtocol: createPseudonymProtocol({
      identity: 'Your Expert Identity',
      persona: 'How this expert behaves.',
    }),
    guardrailPresets: ['standard'],
  })
  .network(
    NETWORK_TOPOLOGIES.pipeline({
      stages: [
        { label: 'Agent A', nodeType: 'agent', capabilities: ['analyze'] },
        { label: 'Agent B', nodeType: 'agent', capabilities: ['synthesize'] },
      ],
    }),
  )
  .compile()

// Check build progress at any stage
console.log(builder.progress)
// → { stage: 'complete', percentComplete: 100, currentStep: '…', errors: [] }
```

---

## Pre-Built Skill Templates

Import and instantiate any pre-built template:

```typescript
import { ASPS_TEMPLATES } from '@/lib/asps'

// All available templates:
const templates = {
  fullStackDeveloper:          ASPS_TEMPLATES.fullStackDeveloper(),
  financialStockAnalyst:       ASPS_TEMPLATES.financialStockAnalyst(),
  financialInvestmentAnalyst:  ASPS_TEMPLATES.financialInvestmentAnalyst(),
  scientificResearcher:        ASPS_TEMPLATES.scientificResearcher(),
  contentCreator:              ASPS_TEMPLATES.contentCreator(),
  privateEquityAnalyst:        ASPS_TEMPLATES.privateEquityAnalyst(),
  academiaProfessor:           ASPS_TEMPLATES.academiaProfessor(),
}
```

| Template | Domain | Heuristics | Topology |
|---|---|---|---|
| `fullStackDeveloper` | Software Engineering | 6 (requirements → CI/CD) | Pipeline |
| `financialStockAnalyst` | Equity Research | 6 (ticker → thesis) | Hub-and-Spoke |
| `financialInvestmentAnalyst` | Portfolio Strategy | 5 (context → rebalance) | Hub-and-Spoke |
| `scientificResearcher` | Scientific Research | 6 (hypothesis → manuscript) | Pipeline |
| `contentCreator` | Content Marketing | 5 (audience → SEO) | Hub-and-Spoke |
| `privateEquityAnalyst` | PE & LBOs | 5 (screening → IC memo) | Pipeline |
| `academiaProfessor` | Higher Education | 5 (objectives → feedback) | Hub-and-Spoke |

---

## Heuristic Library Reference

All pre-built heuristic chains are available via `HEURISTIC_LIBRARIES`:

```typescript
import { HEURISTIC_LIBRARIES } from '@/lib/asps'

// Available keys:
type HeuristicLibraryKey =
  | 'fullStackDeveloper'
  | 'financialStockAnalyst'
  | 'financialInvestmentAnalyst'
  | 'scientificResearcher'
  | 'contentCreator'
  | 'privateEquityAnalyst'
  | 'academiaProfessor'
```

Each library is an array of `DistilledHeuristic` objects — spread them into `distill()` or extend them with your own.

---

## Guardrail & Checkpoint Presets

### Guardrails

| Preset | Rules |
|---|---|
| `standard` | No fabrication, state uncertainty, refuse unethical requests, attribute sources, no harmful code |
| `financial` | Disclaimers, no guaranteed returns, disclose assumptions, conservative base case, flag conflicts |
| `academic` | Cite sources, no plagiarism, acknowledge limitations, correlation ≠ causation, maintain objectivity |
| `engineering` | Error handling, least privilege, idempotent mutations, no hardcoded secrets, test edge cases |
| `medical` | Recommend provider, never diagnose, dosage disclaimers, cite clinical guidelines, evidence-based |

### Checkpoints

| Preset | Stages Covered |
|---|---|
| `standard` | Input validation, prompt injection guard, step completeness, output schema, persona consistency |
| `financial` | Disclaimer presence, numeric consistency |
| `academic` | Citation completeness, methodology rigor |

---

## Network Topology Patterns

### Hub-and-Spoke

```
         ┌─────────────┐
         │ Orchestrator │
         └──────┬───────┘
       ┌────────┼────────┐
       ▼        ▼        ▼
   ┌───────┐ ┌──────┐ ┌──────┐
   │Spoke A│ │Spoke B│ │Spoke C│
   └───────┘ └──────┘ └──────┘
                │
                ▼
         ┌──────────────┐
         │  Governance   │
         │(Beunec Cicero)│
         └──────────────┘
```

### Pipeline

```
┌─────┐   ┌─────┐   ┌─────┐   ┌─────┐
│ S1  │──▶│ S2  │──▶│ S3  │──▶│ S4  │
└──┬──┘   └──┬──┘   └──┬──┘   └──┬──┘
   │         │         │         │
   └─────────┴─────────┴─────────┘
                  │
                  ▼
           ┌──────────────┐
           │  Governance   │
           │(Beunec Cicero)│
           └──────────────┘
```

### Mesh

```
   ┌──────┐◄───►┌──────┐
   │ A1   │     │ A2   │
   └──┬───┘     └───┬──┘
      │    ╲   ╱    │
      │     ╲ ╱     │
      │      ╳      │
      │     ╱ ╲     │
      │    ╱   ╲    │
   ┌──┴───┐     ┌───┴──┐
   │ A3   │◄───►│ A4   │
   └──────┘     └──────┘
        │           │
        └─────┬─────┘
              ▼
       ┌──────────────┐
       │  Governance   │
       │(Beunec Cicero)│
       └──────────────┘
```

---

## Integration with Mohulka Center

The ASPS™ system integrates directly with the existing Mohulka Center AI stack:

```typescript
// In an API route or server action:
import { ASPS_TEMPLATES } from '@/lib/asps'
import { aiManager } from '@/lib/ai'

// Get the compiled system prompt from a template
const analystSkill = ASPS_TEMPLATES.financialStockAnalyst()

// Use it as the system prompt for any AI query
const response = await aiManager.executeQuery({
  query: 'Analyze AAPL stock',
  systemPrompt: analystSkill.compiledSystemPrompt, // ← ASPS™ artifact
  agentType: 'research',
})
```

---

## FAQ

**Q: Is this just prompt engineering?**  
No. Prompt engineering is ad-hoc text manipulation. ASPS™ is a typed, three-layer construction framework with deterministic pipelines (ASD™), behavioral enforcement (ASR™), and governed network wiring (ANS™). The output is a deployable artifact, not a "better prompt."

**Q: Can I mix heuristics from different libraries?**  
Yes. Heuristic chains are plain arrays. Spread multiple libraries together and re-index:

```typescript
const mixed = [
  ...HEURISTIC_LIBRARIES.financialStockAnalyst.slice(0, 3),
  ...HEURISTIC_LIBRARIES.scientificResearcher.slice(0, 2),
].map((h, i) => ({ ...h, sequenceIndex: i + 1 }))
```

**Q: What is Beunec Cicero?**  
Beunec Cicero is Beunec's proprietary governance system also known as 'Guardrail-Alternate' that monitors agent behavior, enforces policies, and maintains audit trails across the ANS™ network.

**Q: What is the Beunec ARG™ Framework?**  
Agentic Retrieval Generation (ARG) Framework is a proprietary multi-agentic orchestration system that integrates retrieval-generation intelligence with deterministic governance and task coordination to eliminate the single or multi llm "Toggle Tax" across professional workflows. While coming soon across the Beunec Cloud Platform, the framework will orchestrates multi-agent interactions within ANS™ networks.

**Q: What are Aselius Agents?**  
Aselius Agents is a network of 15+ specialized autonomous actors—including Reasoners, Researchers, and Quality-Checkers—that collaborate within a secure command center to execute high-precision, cross-disciplinary tasks with mathematical accuracy. Coming Soon with the Aselius Workspace {https://cloud.beunec.com/aselius-workspace}, Aselius Agents will the runtime instances of ASPS™ skills — the live, governed, network-connected agents that execute within the Beunec ecosystem.

**Q: What is the "Toggle Tax"?**  
The Toggle Tax refers to the accumulated cognitive and operational cost of switching between different AI tools, prompts, and configurations without a unified skill infrastructure. ASPS™ eliminates the Toggle Tax by providing a single, composable skill artifact.

---

*© 2025 Beunec Technologies, Inc. All rights reserved.*  
*ASPS™, ASD™, ASR™, ANS™, Beunec Cicero, Beunec ARG™, Aselius Agents, and Toggle Tax are trademarks of Beunec Technologies, Inc.*
