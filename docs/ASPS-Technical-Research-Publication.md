# Agentic-System-Prompt-as-a-Skill™ (ASPS™)

## A Three-Layer Framework for Deterministic Skill Construction in Agentic Systems

# Project Repo
https://github.com/Beunec/asps

# Python
pip install beunec-asps

# Node.js / TypeScript
npm install @beunec/asps

---

**Authors:** Beunec Technologies, Inc. — Research & Development  
**Research & Development Lead** Akinnawo
**Classification:** Technical Research Publication  
**Version:** 1.0.0  
**Open Source Date:** March 01, 2026

---

## Abstract

Large Language Models (LLMs) are frequently described as "having skills," yet an LLM possesses only parameters — statistical weights learned from data. The attribution of "skills" to a model is a category error that obscures the actual engineering required to produce reliable, repeatable, professionally-grade outputs.

This paper introduces **Agentic-System-Prompt-as-a-Skill™ (ASPS™)**, a proprietary three-layer framework developed by Beunec Technologies, Inc. that transforms system prompts from unstructured text into deployable, governed, network-connected skill artifacts. ASPS™ comprises three techniques:

1. **Agentic Skill Distillation™ (ASD™)** — extraction and compression of expert heuristics into deterministic instruction chains
2. **Agentic Skill Reinforcement™ (ASR™)** — behavioral enforcement through checkpoints, pseudonym protocols, in-context reinforcement learning, and guardrails
3. **Agentic Network System™ (ANS™)** — integration of reinforced skills into governed multi-agent network topologies

We present the theoretical foundations, architectural design, reference implementation, and seven domain-specific skill templates demonstrating ASPS™ across software engineering, financial analysis, scientific research, content creation, private equity, investment management, and higher education.

**Keywords:** agentic systems, system prompt engineering, skill distillation, behavioral reinforcement, multi-agent orchestration, ASPS, ASD, ASR, ANS

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Problem Statement](#2-problem-statement)
3. [Literature & Prior Art](#3-literature--prior-art)
4. [Theoretical Foundations](#4-theoretical-foundations)
5. [The ASPS™ Framework](#5-the-asps-framework)
6. [Technique I — Agentic Skill Distillation™ (ASD™)](#6-technique-i--agentic-skill-distillation-asd)
7. [Technique II — Agentic Skill Reinforcement™ (ASR™)](#7-technique-ii--agentic-skill-reinforcement-asr)
8. [Technique III — Agentic Network System™ (ANS™)](#8-technique-iii--agentic-network-system-ans)
9. [Architectural Synthesis](#9-architectural-synthesis)
10. [Reference Implementation](#10-reference-implementation)
11. [Domain Templates & Case Studies](#11-domain-templates--case-studies)
12. [Evaluation & Comparison](#12-evaluation--comparison)
13. [Governance Model — Beunec Cicero](#13-governance-model--beunec-cicero)
14. [Beunec ARG™ Framework Integration](#14-beunec-arg-framework-integration)
15. [Limitations & Future Work](#15-limitations--future-work)
16. [Conclusion](#16-conclusion)
17. [Glossary](#17-glossary)
18. [References](#18-references)

---

## 1. Introduction

The rapid adoption of LLM-powered applications has created a vocabulary problem. Product teams describe their systems as having "AI skills" — summarization skills, coding skills, analysis skills. This language implies that the model itself possesses domain expertise.

It does not.

An LLM is a function approximator trained on text. Its outputs are statistical completions conditioned on an input distribution. What practitioners call a "skill" is actually the **interaction between a system prompt, a reasoning framework, a data pipeline, and a governance layer**. Remove any of these and the "skill" degrades unpredictably.

Beunec Technologies, Inc. identified this fundamental gap and developed ASPS™ — a framework that:

- **Rejects** the notion of "AI skills" as model-intrinsic properties
- **Defines** skills as the product of agentic infrastructure
- **Provides** a deterministic, typed, three-layer construction pipeline
- **Produces** deployable artifacts that are versioned, auditable, and governable

This document is the comprehensive technical specification.

---

## 2. Problem Statement

### 2.1 The "AI Skills" Misnomer

When organizations say "our AI has financial analysis skills," they typically mean:

1. They wrote a system prompt that instructs the model to analyze stocks
2. They connected the model to a market data API
3. They hope the model follows the prompt reliably

This approach has three critical failures:

| Failure Mode | Description |
|---|---|
| **Prompt Drift** | The model gradually diverges from instructions over long conversations |
| **Hallucination Under Pressure** | When uncertain, the model fabricates data rather than admitting ignorance |
| **Persona Collapse** | The model breaks character, mixing professional analysis with casual speculation |

### 2.2 The Toggle Tax™

Organizations that deploy multiple AI "skills" face the **Toggle Tax** — the accumulated cognitive and operational cost of:

- Maintaining separate, unversioned system prompts per use-case
- Manually testing for persona consistency after each prompt edit
- Lacking a shared governance layer across skills
- Having no audit trail of what the agent actually did vs. what it was told to do

### 2.3 Research Questions

1. Can system prompts be *constructed* rather than *written* — through a deterministic pipeline?
2. Can behavioral drift be *prevented* rather than *detected* — through structural enforcement?
3. Can individual skills be *composed* into governed networks — rather than isolated silos?

ASPS™ answers all three affirmatively.

---

## 3. Literature & Prior Art

### 3.1 System Prompt Engineering

The practice of crafting system prompts has evolved from simple role instructions ("You are a helpful assistant") to complex multi-page specifications. However, the field lacks:

- **Formal typing** — prompts are unstructured strings
- **Composability** — prompts cannot be modularly assembled
- **Versioning** — changes are ad-hoc and untracked
- **Governance** — no mechanism to enforce compliance

### 3.2 Chain-of-Thought & Reasoning Frameworks

Techniques like Chain-of-Thought (CoT), ReAct, Tree-of-Thought (ToT), and CoT-SC (Self-Consistency) improve model reasoning but operate **within** a single prompt. They do not address:

- How to *construct* the prompt itself
- How to *enforce* behavioral boundaries
- How to *connect* the prompt's output to downstream systems

### 3.3 Multi-Agent Systems

Frameworks like AutoGen, CrewAI, BeunecARG™ and LangGraph enable multi-agent orchestration but treat agents as black boxes. They manage *routing* between agents but not the *internal skill construction* of each agent.

### 3.4 ASPS™ Positioning

ASPS™ operates at a **lower level of abstraction** than orchestration frameworks and a **higher level** than raw prompt engineering:

```
┌─────────────────────────────────────────────────┐
│              Orchestration Layer                 │
│         (AutoGen, CrewAI, LangGraph)             │
├─────────────────────────────────────────────────┤
│           ★ ASPS™ LAYER ★                       │
│     Skill Construction & Governance              │
│     (ASD™ → ASR™ → ANS™)                        │
├─────────────────────────────────────────────────┤
│           Prompt Engineering Layer               │
│    (Raw system prompts, CoT, ReAct, ToT)         │
├─────────────────────────────────────────────────┤
│           Foundation Model Layer                 │
│       (GPT-4o, Claude, Gemini, Sonar)            │
└─────────────────────────────────────────────────┘
```

---

## 4. Theoretical Foundations

### 4.1 Skills as Infrastructure, Not Properties

**Definition (Beunec):** A *skill* is not a property of a model. A skill is the complete infrastructure — distillation pipeline, reinforcement envelope, and network topology — that transforms a model's statistical completions into reliable, repeatable, professionally-graded outputs.

**Formal notation:**

```
Skill = ASD(H) ∘ ASR(R) ∘ ANS(N)

where:
  H = { h₁, h₂, ..., hₙ }  — ordered set of distilled heuristics
  R = { C, P, I, G }        — reinforcement envelope
    C = behavioral checkpoints
    P = pseudonym protocol
    I = ICRL configuration
    G = guardrail set
  N = ( V, E, Π )           — network graph
    V = network nodes
    E = task handoff edges
    Π = governance policies
```

### 4.2 Determinism Spectrum

Each heuristic in ASD™ carries a **determinism score** ∈ [0.0, 1.0]:

| Score Range | Interpretation | Example |
|---|---|---|
| 0.9 – 1.0 | **Fully deterministic** — one correct answer | "Compute the P/E ratio" |
| 0.7 – 0.9 | **Mostly deterministic** — constrained space | "Select the architecture pattern" |
| 0.5 – 0.7 | **Semi-deterministic** — judgment required | "Assess macro risks" |
| 0.0 – 0.5 | **Open-ended** — creative latitude | "Write an engaging hook" |

The average determinism across a heuristic chain predicts the skill's reliability. ASPS™ targets ≥ 0.7 average for professional-grade skills.

### 4.3 Behavioral Alignment via ICRL

In-Context Reinforcement Learning (ICRL) operates within the model's context window rather than through fine-tuning:

```
┌─────────────────────────────────────────────┐
│            Context Window                    │
│                                             │
│  [System Prompt]  ← ASPS™ compiled prompt   │
│  [Exemplar 1]     ← Positive signal         │
│  [Exemplar 2]     ← Correction signal       │
│  [Exemplar 3]     ← Positive signal         │
│  [User Query]     ← Current input           │
│  [Model Response] ← Aligned output          │
│                                             │
└─────────────────────────────────────────────┘
```

The correction-to-positive ratio and placement within the context window directly affect drift tolerance.

---

## 5. The ASPS™ Framework

### 5.1 Three-Layer Architecture

```
╔═══════════════════════════════════════════════════════════════╗
║                    ASPS™ SKILL ARTIFACT                       ║
║                                                               ║
║  ┌───────────────────────────────────────────────────────┐    ║
║  │  Layer 3: ANS™ — Agentic Network System               │    ║
║  │  ┌─────────────────────────────────────────────────┐  │    ║
║  │  │  Layer 2: ASR™ — Agentic Skill Reinforcement    │  │    ║
║  │  │  ┌─────────────────────────────────────────┐    │  │    ║
║  │  │  │  Layer 1: ASD™ — Agentic Skill          │    │  │    ║
║  │  │  │              Distillation                │    │  │    ║
║  │  │  │                                         │    │  │    ║
║  │  │  │  h₁ → h₂ → h₃ → ... → hₙ              │    │  │    ║
║  │  │  │  (Deterministic Heuristic Chain)         │    │  │    ║
║  │  │  └─────────────────────────────────────────┘    │  │    ║
║  │  │                                                 │  │    ║
║  │  │  Checkpoints │ Pseudonym │ ICRL │ Guardrails    │  │    ║
║  │  └─────────────────────────────────────────────────┘  │    ║
║  │                                                       │    ║
║  │  Nodes ──── Handoffs ──── Governance ──── Policies    │    ║
║  └───────────────────────────────────────────────────────┘    ║
║                                                               ║
║  Output: compiledSystemPrompt (deployable artifact)           ║
╚═══════════════════════════════════════════════════════════════╝
```

### 5.2 Data Flow

```
Expert Knowledge                    Compiled System Prompt
      │                                      ▲
      ▼                                      │
┌──────────┐    ┌──────────┐    ┌──────────┐ │
│  ASD™    │───▶│  ASR™    │───▶│  ANS™    │─┘
│          │    │          │    │          │
│ Extract  │    │ Enforce  │    │ Connect  │
│ Order    │    │ Align    │    │ Govern   │
│ Compile  │    │ Guard    │    │ Deploy   │
└──────────┘    └──────────┘    └──────────┘
```

### 5.3 Build Pipeline

```
┌─────────────────────────────────────────────────────────────────────┐
│                        ASPS™ Build Pipeline                         │
│                                                                     │
│  ① INIT              ② DISTILL            ③ REINFORCE              │
│  ┌──────────┐        ┌──────────┐         ┌──────────────┐         │
│  │ Builder  │──ASD──▶│ Distill- │──ASR──▶ │ Reinforce-   │         │
│  │ Config   │        │ ation    │         │ ment         │         │
│  └──────────┘        └──────────┘         └──────┬───────┘         │
│                                                  │                  │
│  ④ NETWORK            ⑤ COMPILE                  │                  │
│  ┌──────────┐         ┌──────────┐               │                  │
│  │ Agentic  │──ANS──▶ │ ASPS     │◀──────────────┘                  │
│  │ Network  │         │ Artifact │                                   │
│  └──────────┘         └──────────┘                                   │
│                            │                                         │
│                            ▼                                         │
│                    compiledSystemPrompt                               │
│                    (ready for deployment)                             │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 6. Technique I — Agentic Skill Distillation™ (ASD™)

### 6.1 Definition

**ASD™** is the process of transforming expert-level professional heuristics into deterministic, typed, sequenced instruction sets that form the foundation of every ASPS™ skill.

### 6.2 The Distillation Process

```
┌─────────────────────────────────────────────────────────────┐
│                    ASD™ Distillation Process                 │
│                                                             │
│  ┌──────────────┐                                           │
│  │ Expert Domain │                                           │
│  │ Knowledge     │                                           │
│  └──────┬───────┘                                           │
│         │                                                   │
│         ▼                                                   │
│  ┌──────────────────────────────────────────┐               │
│  │ Step 1: Heuristic Extraction              │               │
│  │                                          │               │
│  │  "How does an expert actually do this?"   │               │
│  │  → Identify individual decision patterns  │               │
│  │  → Name each heuristic                    │               │
│  │  → Define input/output schemas            │               │
│  └──────────────────┬───────────────────────┘               │
│                     │                                       │
│                     ▼                                       │
│  ┌──────────────────────────────────────────┐               │
│  │ Step 2: Determinism Scoring               │               │
│  │                                          │               │
│  │  Each heuristic scored 0.0 → 1.0         │               │
│  │  0.0 = fully open-ended                   │               │
│  │  1.0 = one correct answer                 │               │
│  └──────────────────┬───────────────────────┘               │
│                     │                                       │
│                     ▼                                       │
│  ┌──────────────────────────────────────────┐               │
│  │ Step 3: Sequence Ordering                 │               │
│  │                                          │               │
│  │  Assign sequenceIndex to each heuristic   │               │
│  │  Define execution order                   │               │
│  │  Identify dependencies                    │               │
│  └──────────────────┬───────────────────────┘               │
│                     │                                       │
│                     ▼                                       │
│  ┌──────────────────────────────────────────┐               │
│  │ Step 4: Composite Prompt Compilation      │               │
│  │                                          │               │
│  │  Compile all heuristics into a single,    │               │
│  │  ordered system prompt with constraints   │               │
│  └──────────────────────────────────────────┘               │
│                     │                                       │
│                     ▼                                       │
│              SkillDistillation                               │
│              (typed artifact)                                │
└─────────────────────────────────────────────────────────────┘
```

### 6.3 Heuristic Anatomy

Each `DistilledHeuristic` is a typed record:

| Field | Type | Purpose |
|---|---|---|
| `id` | `string` | Unique identifier |
| `name` | `string` | Human-readable label |
| `instruction` | `string` | The expert reasoning pattern as an instruction |
| `constraints` | `string[]` | Domain-specific scoping rules |
| `inputSchema` | `string` | Expected input format description |
| `outputSchema` | `string` | Expected output format description |
| `determinismScore` | `number` | 0.0 (open) → 1.0 (deterministic) |
| `sequenceIndex` | `number` | Position in the execution chain |

### 6.4 Composite Prompt Compilation

The compiler transforms heuristics into a structured prompt:

```
You are an expert {domain} agent.
Follow these steps IN ORDER. Do NOT skip steps.

Step 1: {heuristic.name}
   {heuristic.instruction}
   Constraints: {heuristic.constraints.join('; ')}
   Input:  {heuristic.inputSchema}
   Output: {heuristic.outputSchema}

Step 2: {heuristic.name}
   ...

Always produce structured, deterministic output.
If any step fails, STOP and report which step failed and why.
```

### 6.5 Distillation Metadata

Each `SkillDistillation` tracks:

| Metric | Computation |
|---|---|
| `totalHeuristics` | Count of heuristics in the chain |
| `averageDeterminism` | Mean of all `determinismScore` values |
| `domainCoveragePercent` | Estimated domain coverage (heuristic count × 12.5, capped at 100) |
| `expertSourceCount` | Number of expert sources used during extraction |

---

## 7. Technique II — Agentic Skill Reinforcement™ (ASR™)

### 7.1 Definition

**ASR™** wraps a distilled skill in a behavioral reinforcement envelope that prevents drift, hallucination, and persona violations. It is the enforcement layer that makes ASPS™ skills *reliable* — not just *capable*.

### 7.2 Four Mechanisms

```
┌─────────────────────────────────────────────────────────────────┐
│                    ASR™ Reinforcement Envelope                   │
│                                                                 │
│  ┌───────────────────┐   ┌───────────────────┐                  │
│  │ 1. BEHAVIORAL     │   │ 2. PSEUDONYM      │                  │
│  │    CHECKPOINTS     │   │    PROTOCOLS      │                  │
│  │                   │   │                   │                  │
│  │ • Pre-execution   │   │ • Identity        │                  │
│  │ • Mid-execution   │   │ • Persona         │                  │
│  │ • Post-execution  │   │ • Communication   │                  │
│  │                   │   │   Style           │                  │
│  │ Actions:          │   │ • Red Lines       │                  │
│  │  halt | retry |   │   │ • Vocabulary      │                  │
│  │  escalate |       │   │                   │                  │
│  │  fallback         │   │                   │                  │
│  └───────────────────┘   └───────────────────┘                  │
│                                                                 │
│  ┌───────────────────┐   ┌───────────────────┐                  │
│  │ 3. ICRL           │   │ 4. GUARDRAILS     │                  │
│  │ (In-Context       │   │                   │                  │
│  │  Reinforcement    │   │ Hard-coded rules   │                  │
│  │  Learning)        │   │ that override ALL  │                  │
│  │                   │   │ other behavior     │                  │
│  │ • Positive signals│   │                   │                  │
│  │ • Correction      │   │ Presets:           │                  │
│  │   signals         │   │ • standard        │                  │
│  │ • Drift tolerance │   │ • financial       │                  │
│  │ • Checkpoint freq │   │ • academic        │                  │
│  │                   │   │ • engineering     │                  │
│  └───────────────────┘   │ • medical         │                  │
│                          └───────────────────┘                  │
│                                                                 │
│  Governance: Beunec Cicero                                      │
│  Audit: configurable (minimal | standard | verbose)             │
└─────────────────────────────────────────────────────────────────┘
```

### 7.3 Behavioral Checkpoints

Checkpoints are typed gates that execute at defined stages:

| Stage | When | Purpose |
|---|---|---|
| `pre-execution` | Before any heuristic runs | Input validation, injection guard |
| `mid-execution` | Between heuristic steps | Step completeness, intermediate quality |
| `post-execution` | After all steps complete | Schema validation, persona consistency, disclaimer check |

**Failure actions:**

| Action | Behavior |
|---|---|
| `halt` | Stop execution entirely, report the violation |
| `retry` | Re-execute the last step with correction prompt |
| `escalate` | Flag for human review |
| `fallback` | Inject a fallback prompt and re-execute |

### 7.4 Pseudonym Protocols

A pseudonym protocol defines the professional identity the agent must maintain:

```
┌────────────────────────────────────────────┐
│         Pseudonym Protocol                  │
│                                            │
│  Identity:    "CFA Charterholder"          │
│  Persona:     "Disciplined, data-driven"    │
│  Style:       "Formal financial prose"      │
│  Red Lines:   [never guarantee returns,     │
│                never personalize advice]    │
│  Vocabulary:  [P/E, EBITDA, DCF, WACC]     │
└────────────────────────────────────────────┘
```

Red lines are absolute boundaries. If the model's output crosses a red line, the post-execution checkpoint triggers a `halt` action.

### 7.5 In-Context Reinforcement Learning (ICRL)

ICRL uses exemplar interactions within the context window to align behavior:

```
Positive Signal Template:
"Excellent. That response correctly followed step {{step}} and
produced valid output."

Correction Signal Template:
"Correction needed: the response deviated at step {{step}}.
Expected: {{expected}}. Received: {{received}}.
Re-execute from step {{step}}."
```

| Parameter | Default | Purpose |
|---|---|---|
| `exemplarCount` | 3 | How many exemplar interactions to maintain |
| `driftTolerance` | 0.15 | Maximum deviation before correction fires |
| `checkpointFrequency` | 3 | Steps between alignment checks |

### 7.6 Prompt Wrapping

ASR™ wraps the ASD™ composite prompt with structural prefixes:

```
[IDENTITY]
You are: {identity}
Persona: {persona}
Communication Style: {style}

RED LINES (never violate):
  • {redLine1}
  • {redLine2}

[GUARDRAILS]
  ✦ {guardrail1}
  ✦ {guardrail2}

[BEHAVIORAL CHECKPOINTS]
  [PRE-EXECUTION] Input Validation: ... → on fail: halt
  [POST-EXECUTION] Persona Consistency: ... → on fail: fallback

[DOMAIN VOCABULARY]
Use these terms precisely: {vocabulary}

[SKILL INSTRUCTIONS]
{ASD™ composite system prompt}
```

---

## 8. Technique III — Agentic Network System™ (ANS™)

### 8.1 Definition

**ANS™** is the integration layer that wires a reinforced skill into a governed network of agents, APIs, databases, templates, and user interfaces. It transforms a single-agent skill into a multi-agent ecosystem.

### 8.2 Network Node Types

| Node Type | Description | Example |
|---|---|---|
| `agent` | An autonomous LLM-powered agent | "Technical Analysis Engine" |
| `api` | An external API endpoint | "Market Data API" |
| `database` | A data store | "Portfolio Holdings DB" |
| `template` | A rendering template | "Report Renderer" |
| `user-interface` | A UI component | "Dashboard Widget" |
| `governance` | A governance node | "Beunec Cicero" |

### 8.3 Task Handoffs

Handoffs are typed, priority-weighted connections between nodes:

```
┌──────────────────────────────────────────────────────────┐
│                    Task Handoff                           │
│                                                          │
│  From:          "Lead Analyst Agent" (node-1)            │
│  To:            "Market Data API" (node-2)               │
│  Payload:       JSON { symbol, dateRange }               │
│  Priority:      high                                     │
│  Timeout:       30,000ms                                 │
│  Retry Policy:  3 retries, 1s backoff, 2x multiplier    │
└──────────────────────────────────────────────────────────┘
```

### 8.4 Network Topologies

#### Hub-and-Spoke

Best for: single-domain skills with one orchestrator and multiple specialist nodes.

```
                        ┌───────────────┐
                        │  Orchestrator │
                        │    Agent      │
                        └───────┬───────┘
                    ┌───────────┼───────────┐
                    │           │           │
                    ▼           ▼           ▼
             ┌──────────┐ ┌──────────┐ ┌──────────┐
             │ Market   │ │ Risk     │ │ Report   │
             │ Data API │ │ Model   │ │ Renderer │
             └──────────┘ └──────────┘ └──────────┘
                    │           │           │
                    └───────────┼───────────┘
                                │
                                ▼
                        ┌───────────────┐
                        │   Governance  │
                        │ (Beunec       │
                        │  Cicero)      │
                        └───────────────┘
```

#### Pipeline

Best for: sequential processing that mirrors ASD™ heuristic chains.

```
┌────────┐    ┌────────┐    ┌────────┐    ┌────────┐    ┌────────┐
│ Screen │───▶│ Model  │───▶│  DD    │───▶│ Value  │───▶│  IC    │
│  Deal  │    │  LBO   │    │ Check  │    │ Create │    │ Memo   │
└────┬───┘    └────┬───┘    └────┬───┘    └────┬───┘    └────┬───┘
     │             │             │             │             │
     └─────────────┴─────────────┴─────────────┴─────────────┘
                                 │
                                 ▼
                         ┌───────────────┐
                         │  Governance   │
                         │ (Beunec       │
                         │  Cicero)      │
                         └───────────────┘
```

#### Mesh

Best for: complex multi-domain where any node might need any other.

```
     ┌──────┐ ◄────────────────────► ┌──────┐
     │ A1   │                        │ A2   │
     └──┬───┘                        └───┬──┘
        │  ╲                          ╱  │
        │    ╲──────────────────────╱    │
        │    ╱──────────────────────╲    │
        │  ╱                          ╲  │
     ┌──┴───┐                        ┌───┴──┐
     │ A3   │ ◄────────────────────► │ A4   │
     └──────┘                        └──────┘
          │                              │
          └──────────────┬───────────────┘
                         │
                         ▼
                  ┌───────────────┐
                  │  Governance   │
                  └───────────────┘
```

### 8.5 Network Policies

| Policy | Default | Purpose |
|---|---|---|
| `maxConcurrentHandoffs` | 10 | Prevent resource exhaustion |
| `globalTimeoutMs` | 120,000 | Kill long-running operations |
| `circuitBreakerThreshold` | 5 | Consecutive failures before circuit opens |

### 8.6 Network Prompt Contribution

ANS™ appends a network-awareness block to the compiled prompt:

```
[AGENTIC NETWORK]
Orchestration: Beunec ARG™ Framework
Available nodes:
  • [AGENT] Technical Analysis Engine — capabilities: indicators, charting
  • [API] Market Data API — capabilities: quotes, historical
  • [TEMPLATE] Report Renderer — capabilities: markdown, pdf

Available handoffs:
  Lead Analyst Agent → Market Data API (high priority, JSON)
  Lead Analyst Agent → Technical Analysis Engine (normal priority, JSON)

When a task exceeds your capabilities, delegate to the appropriate node.
All actions are audited by the governance node.
```

---

## 9. Architectural Synthesis

### 9.1 Complete ASPS™ Composition

The final `compiledSystemPrompt` is composed in this order:

```
┌─────────────────────────────────────────────────────────┐
│                  Compiled System Prompt                   │
│                                                         │
│  ┌───────────────────────────────────────────────┐      │
│  │  [IDENTITY]         ← ASR™ pseudonym protocol │      │
│  │  [GUARDRAILS]       ← ASR™ hard rules         │      │
│  │  [CHECKPOINTS]      ← ASR™ behavioral gates   │      │
│  │  [VOCABULARY]       ← ASR™ domain terms       │      │
│  ├───────────────────────────────────────────────┤      │
│  │  [SKILL INSTRUCTIONS]                         │      │
│  │    Step 1: ...      ← ASD™ heuristic chain    │      │
│  │    Step 2: ...                                │      │
│  │    Step N: ...                                │      │
│  ├───────────────────────────────────────────────┤      │
│  │  [AGENTIC NETWORK]  ← ANS™ network awareness  │      │
│  │    Available nodes                            │      │
│  │    Available handoffs                         │      │
│  │    Delegation rules                           │      │
│  └───────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────┘
```

### 9.2 Artifact Structure

The complete `ASPS` type contains:

```
ASPS {
  skillId:                 unique identifier
  name:                    human-readable name
  version:                 semver
  author:                  creator
  origin:                  'built-in' | 'custom'
  domain:                  professional domain
  description:             what this skill does
  tags:                    discovery tags

  distillation:            SkillDistillation (ASD™)
  reinforcement:           SkillReinforcement (ASR™)
  network:                 AgenticNetwork (ANS™)

  compiledSystemPrompt:    the final deployable string

  createdAt:               ISO timestamp
  updatedAt:               ISO timestamp
}
```

---

## 10. Reference Implementation

### 10.1 Technology Stack

| Component | Technology |
|---|---|
| Language | TypeScript 5 (strict mode) |
| Runtime | Next.js 16 (App Router) |
| AI SDK | OpenAI SDK 6, Vercel AI SDK 6 |
| Models | GPT-4o, GPT-4o-mini, Perplexity Sonar Pro |
| Testing | Jest 30, React Testing Library 16 |
| Build | Turbopack (dev), Webpack (prod) |
| Styling | Tailwind CSS 3 |

### 10.2 File Structure

```
src/lib/asps/
├── types.ts                     # Core ASPS™ type definitions
├── asd.ts                       # ASD™ engine + heuristic libraries
├── asr.ts                       # ASR™ engine + checkpoint/guardrail presets
├── ans.ts                       # ANS™ engine + network topology builders
├── builder.ts                   # ASPSBuilder fluent API + buildASPS factory
├── templates.ts                 # 7 pre-built domain skill templates
├── index.ts                     # Barrel export
└── ASPS_IMPLEMENTATION_GUIDE.md # Usage documentation
```

### 10.3 Builder API

```typescript
const skill = new ASPSBuilder(config)
  .distill(heuristics, options?)    // Layer 1: ASD™
  .reinforce(reinforcementConfig)   // Layer 2: ASR™
  .network(topology, options?)      // Layer 3: ANS™
  .compile()                        // → ASPS artifact

// Progress tracking at any stage:
builder.progress
// → { stage: 'reinforcement', percentComplete: 33, currentStep: '…', errors: [] }
```

### 10.4 Integration Pattern

```typescript
// 1. Get or build the skill
const skill = ASPS_TEMPLATES.financialStockAnalyst()

// 2. Use the compiled prompt in any AI call
const response = await openai.chat.completions.create({
  model: 'gpt-4o',
  messages: [
    { role: 'system', content: skill.compiledSystemPrompt },
    { role: 'user', content: 'Analyze AAPL' },
  ],
})

// 3. The response is governed by all three ASPS™ layers
```

---

## 11. Domain Templates & Case Studies

### 11.1 Template Comparison Matrix

| Template | Domain | Heuristics | Avg. Determinism | Topology | Guardrails | Checkpoints |
|---|---|---|---|---|---|---|
| Full-Stack Developer | Software Eng. | 6 | 0.88 | Pipeline | standard, engineering | standard |
| Financial Stock Analyst | Equity Research | 6 | 0.78 | Hub-Spoke | standard, financial | standard, financial |
| Financial Investment Analyst | Portfolio Mgmt. | 5 | 0.82 | Hub-Spoke | standard, financial | standard, financial |
| Scientific Researcher | Research & Pub. | 6 | 0.73 | Pipeline | standard, academic | standard, academic |
| Content Creator | Content Mktg. | 5 | 0.80 | Hub-Spoke | standard | standard |
| Private Equity Analyst | PE & LBOs | 5 | 0.84 | Pipeline | standard, financial | standard, financial |
| Academia Professor | Higher Ed. | 5 | 0.82 | Hub-Spoke | standard, academic | standard, academic |

### 11.2 Case Study: Financial Stock Analyst

**Scenario:** A user queries "Analyze AAPL for a potential investment."

**ASD™ Execution Chain:**

```
Step 1: Ticker Resolution
  Input:  "Analyze AAPL for a potential investment"
  Output: { symbol: "AAPL", exchange: "NASDAQ", companyName: "Apple Inc." }
  Determinism: 0.95 ✓

Step 2: Fundamental Analysis
  Input:  { symbol: "AAPL" }
  Output: { P/E: 33.2, EPS: 6.42, revenue_growth: 4.9%, ... }
  Determinism: 0.85 ✓

Step 3: Technical Analysis
  Input:  AAPL historical prices
  Output: { RSI: 62, MACD: bullish crossover, ... }
  Determinism: 0.95 ✓

Step 4: Sentiment Scan
  Input:  { symbol: "AAPL" }
  Output: { overall: "cautiously bullish", sources: [...] }
  Determinism: 0.60 ⚠ (open-ended)

Step 5: Risk Assessment
  Input:  all prior outputs
  Output: { score: 4/10, risks: ["AI regulation", "China exposure"] }
  Determinism: 0.70 ✓

Step 6: Investment Thesis
  Input:  all prior outputs
  Output: { recommendation: "BUY", target: { low: 195, mid: 225, high: 260 } }
  Determinism: 0.65 ⚠ (judgment required)
```

**ASR™ Checkpoints Triggered:**

| Checkpoint | Stage | Result |
|---|---|---|
| Input Validation | pre | ✅ Pass |
| Prompt Injection Guard | pre | ✅ Pass |
| Step Completeness | mid | ✅ All 6 steps produced output |
| Disclaimer Presence | post | ✅ "This is not financial advice" present |
| Numeric Consistency | post | ✅ Price targets internally consistent |
| Persona Consistency | post | ✅ Maintained CFA identity throughout |

**ANS™ Network Calls:**

```
Lead Analyst Agent → Market Data API (quotes, fundamentals)
Lead Analyst Agent → News & Sentiment API (7-day scan)
Lead Analyst Agent → Technical Analysis Engine (indicators)
Lead Analyst Agent → Risk Model (composite score)
Lead Analyst Agent → Report Renderer (final markdown)
Lead Analyst Agent → Beunec Cicero (audit log)
```

---

## 12. Evaluation & Comparison

### 12.1 ASPS™ vs. Alternative Approaches

| Dimension | Raw Prompt | Prompt Template | ASPS™ |
|---|---|---|---|
| **Typing** | None | Partial (string interpolation) | Full TypeScript types |
| **Composability** | None | Limited (copy-paste) | Modular (libraries + builder) |
| **Versioning** | Manual | Git (file-level) | Embedded semver + artifact ID |
| **Behavioral Enforcement** | None | Ad-hoc instructions | Structural (checkpoints + ICRL) |
| **Identity Alignment** | "You are a…" | Role prefix | Pseudonym protocol + red lines |
| **Network Integration** | None | None | Full topology + handoff definitions |
| **Governance** | None | None | Beunec Cicero + audit trails |
| **Auditability** | None | None | Full (logged, retained, queryable) |
| **Drift Prevention** | None | Hope-based | ICRL + checkpoint gates |
| **Toggle Tax** | Maximum | High | Eliminated |

### 12.2 ASPS™ vs. Multi-Agent Frameworks

| Dimension | AutoGen / CrewAI | LangGraph | ASPS™ |
|---|---|---|---|
| **Focus** | Agent routing | Graph orchestration | Skill construction |
| **Prompt Construction** | User responsibility | User responsibility | Automated (ASD™) |
| **Behavioral Safety** | External tools | External tools | Built-in (ASR™) |
| **Skill Portability** | None (code-bound) | None (graph-bound) | Artifact-based (JSON/TS) |
| **Layer** | Orchestration | Orchestration | Construction |

**Key insight:** ASPS™ and orchestration frameworks are **complementary**. ASPS™ builds the skills; orchestration frameworks route between them.

---

## 13. Governance Model — Beunec Cicero

### 13.1 Role

Beunec Cicero is the governance system that monitors, enforces, and audits all agent behavior within the ASPS™ ecosystem.

### 13.2 Responsibilities

```
┌──────────────────────────────────────────────────────┐
│                  Beunec Cicero                        │
│                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────┐ │
│  │   Monitor    │  │   Enforce    │  │   Audit    │ │
│  │              │  │              │  │            │ │
│  │ • Drift      │  │ • Guardrails │  │ • Log all  │ │
│  │   detection  │  │ • Red lines  │  │   actions  │ │
│  │ • Anomaly    │  │ • Rate       │  │ • Retain   │ │
│  │   flagging   │  │   limiting   │  │   per      │ │
│  │ • Checkpoint │  │ • Circuit    │  │   policy   │ │
│  │   evaluation │  │   breaking   │  │ • Query    │ │
│  └──────────────┘  └──────────────┘  │   interface│ │
│                                      └────────────┘ │
└──────────────────────────────────────────────────────┘
```

### 13.3 Audit Configuration

Each ASPS™ skill carries an audit config:

| Level | What is logged |
|---|---|
| `minimal` | Skill invocation, final output, errors only |
| `standard` | + checkpoint pass/fail, handoff traces |
| `verbose` | + intermediate step outputs, token usage, latency |

---

## 14. Beunec ARG™ Framework Integration

### 14.1 Role

The **Agentic Retrieval Generation (ARG™) Framework** is Beunec's orchestration layer that manages multi-agentic infrastructures & interactions within ANS™ networks.

### 14.2 Integration Points

```
┌──────────────────────────────────────────────────────────┐
│                  Beunec ARG™ Framework                    │
│                                                          │
│  ASPS™ Skill ──┬──▶ Routing Engine ──▶ Node Selection   │
│                │                                        │
│                ├──▶ Context Manager ──▶ Memory Sharing   │
│                │                                        │
│                ├──▶ Policy Engine ──▶ Cicero Integration │
│                │                                        │
│                └──▶ Handoff Manager ──▶ Data Contracts   │
└──────────────────────────────────────────────────────────┘
```

---

## 15. Limitations & Future Work

### 15.1 Current Limitations

1. **Static heuristic chains** — ASD™ heuristics are defined at build time. Future versions may support runtime heuristic adaptation.

2. **Single-model assumption** — Current implementation assumes one LLM per skill. Future versions may support mixed-model heuristic chains (e.g., GPT-4o for analysis, Claude for writing).

3. **ICRL without fine-tuning** — ICRL operates within the context window, limiting its persistence. Future versions may integrate with model fine-tuning pipelines.

4. **Governance is declarative** — Beunec Cicero defines policies but does not yet have a runtime enforcement engine in the open-source implementation.

### 15.2 Future Work

| Area | Description |
|---|---|
| **Adaptive Distillation** | Runtime heuristic selection based on query complexity |
| **Cross-Skill Composition** | Composing multiple ASPS™ skills into meta-skills |
| **Fine-Tuning Pipeline** | Using ICRL exemplars to fine-tune models for specific skills |
| **Skill Marketplace** | Versioned registry for sharing and discovering ASPS™ skills |
| **Runtime Cicero** | Real-time governance engine with circuit breakers and dashboards |
| **Evaluation Benchmarks** | Standardized benchmarks for measuring skill reliability |

---

## 16. Conclusion

The concept of "AI skills" has been accepted uncritically by the industry. By recognizing that an LLM's capabilities are a function of its infrastructure — not its parameters — Beunec Technologies developed ASPS™ as the formal framework for skill construction.

ASPS™ provides:

- **ASD™** — deterministic extraction and compilation of expert heuristics
- **ASR™** — structural behavioral enforcement through checkpoints, identity protocols, ICRL, and guardrails
- **ANS™** — governed network integration through typed topologies and audited handoffs

Together, these three techniques eliminate the Toggle Tax, prevent prompt drift, ensure persona consistency, and produce versioned, auditable, deployable skill artifacts.

The framework is implemented in TypeScript, ships with seven domain-specific templates, and integrates natively with Beunec Internal App stack.

**An LLM does not have skills. ASPS™ gives it the infrastructure to earn them.**

---

## 17. Glossary

| Term | Definition |
|---|---|
| **ASPS™** | Agentic-System-Prompt-as-a-Skill — the complete three-layer framework |
| **ASD™** | Agentic Skill Distillation — extraction of expert heuristics into deterministic instruction chains |
| **ASR™** | Agentic Skill Reinforcement — behavioral enforcement through checkpoints, pseudonyms, ICRL, and guardrails |
| **ANS™** | Agentic Network System — integration of skills into governed multi-agent network topologies |
| **Aselius™ Agents** | a network of 15+ specialized autonomous actors—including Reasoners, Researchers, and Quality-Checkers—that collaborate within a secure command center to execute high-precision, cross-disciplinary tasks with mathematical accuracy |
| **Beunec Cicero™** | Beunec's proprietary governance system for monitoring, enforcing, and auditing agent behavior |
| **Beunec ARG™** | a proprietary multi-agentic orchestration system that integrates retrieval-generation intelligence with deterministic governance and task coordination to eliminate the single or multi llm "Toggle Tax" across professional workflows. |
| **Toggle Tax™** | The accumulated cost of switching between fragmented AI tools without unified skill infrastructure |
| **ICRL** | In-Context Reinforcement Learning — dynamic behavioral alignment within the context window |
| **Heuristic** | A typed, constrained, sequenced expert instruction with declared I/O schemas and determinism score |
| **Pseudonym Protocol** | The identity alignment specification that defines an agent's professional persona |
| **Checkpoint** | A behavioral gate (pre/mid/post) that validates execution against defined conditions |
| **Guardrail** | A hard-coded rule that overrides all other agent behavior |
| **Determinism Score** | A 0.0–1.0 rating of how constrained a heuristic's output space is |
| **Composite System Prompt** | The output of ASD™ — an ordered, typed system prompt compiled from heuristics |
| **Compiled System Prompt** | The final output of ASPS™ — ASR™ wrapper + ASD™ prompt + ANS™ network block |
| **Network Node** | A typed connection point in an ANS™ network (agent, api, database, etc.) |
| **Task Handoff** | A typed data contract between two ANS™ network nodes |

---

## 18. References

1. Beunec Technologies, Inc. *ASPS™ Internal Research Notes.* 2024–2026.
2. Wei, J., et al. "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models." *NeurIPS*, 2022.
3. Yao, S., et al. "ReAct: Synergizing Reasoning and Acting in Language Models." *ICLR*, 2023.
4. Yao, S., et al. "Tree of Thoughts: Deliberate Problem Solving with Large Language Models." *NeurIPS*, 2023.
5. Wang, X., et al. "Self-Consistency Improves Chain of Thought Reasoning in Language Models." *ICLR*, 2023.
6. Wu, Q., et al. "AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation." 2023.
7. Anthropic. "Constitutional AI: Harmlessness from AI Feedback." 2022.
8. OpenAI. "GPT-4 Technical Report." 2023.
9. Beunec Technologies, Inc. *Beunec ARG™ Framework Specification.* 2024-2025.
10. Beunec Technologies, Inc. *Beunec Cicero Governance Architecture.* 2024-2025.

---

*© 2025 Beunec Technologies, Inc. All rights reserved.*

*ASPS™, ASD™, ASR™, ANS™, Beunec Cicero™, Beunec ARG™ Framework, and Aselius™ Agents, are trademarks of Beunec Technologies, Inc.*

*This document is intended for technical audiences. It is not legal, financial, or medical advice. And Beunec is not responsible for any damages icurred from the implementation of the concepts in this research paper.*
