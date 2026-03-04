// ═══════════════════════════════════════════════════════════════════════
// Beunec Technologies, Inc. — Agentic-System-Prompt-as-a-Skill™ (ASPS™)
// Core Type Definitions
// ═══════════════════════════════════════════════════════════════════════
//
// These types represent the foundational data contracts for the three
// proprietary techniques discovered by Beunec R&D:
//   1. Agentic Skill Distillation™  (ASD™)
//   2. Agentic Skill Reinforcement™ (ASR™)
//   3. Agentic Network System™      (ANS™)
//
// Together they form the ASPS™ infrastructure — the deterministic
// replacement for the vague concept of "AI Skills."
// ═══════════════════════════════════════════════════════════════════════

// ─── Agentic Skill Distillation™ (ASD™) ─────────────────────────────

/** A single expert heuristic extracted via ASD™ */
export interface DistilledHeuristic {
  id: string
  /** Human-readable label (e.g. "DCF Valuation Step") */
  name: string
  /** The expert reasoning pattern compressed into an instruction */
  instruction: string
  /** Domain-specific constraints that scope the heuristic */
  constraints: string[]
  /** Expected input schema description */
  inputSchema: string
  /** Expected output schema description */
  outputSchema: string
  /** Determinism score — 0.0 (open-ended) → 1.0 (fully deterministic) */
  determinismScore: number
  /** Ordered position within the distillation chain */
  sequenceIndex: number
}

/** The complete ASD™ distillation product for a skill */
export interface SkillDistillation {
  /** Unique identifier for this distillation */
  distillationId: string
  /** Version following semver */
  version: string
  /** The professional domain this distillation targets */
  domain: string
  /** Ordered chain of distilled heuristics */
  heuristics: DistilledHeuristic[]
  /** The composite system prompt generated from heuristics */
  compositeSystemPrompt: string
  /** Source model the distillation was extracted from */
  sourceModel: string
  /** Timestamp of distillation */
  distilledAt: string
  /** Metadata about the distillation process */
  metadata: {
    totalHeuristics: number
    averageDeterminism: number
    domainCoveragePercent: number
    expertSourceCount: number
  }
}

// ─── Agentic Skill Reinforcement™ (ASR™) ─────────────────────────────

/** A behavioral checkpoint used by ASR™ */
export interface BehavioralCheckpoint {
  id: string
  /** Name of this checkpoint gate */
  name: string
  /** The condition that must be true to pass */
  condition: string
  /** Action to take on checkpoint failure */
  failureAction: 'halt' | 'retry' | 'escalate' | 'fallback'
  /** Custom fallback prompt if failureAction is 'fallback' */
  fallbackPrompt?: string
  /** Severity level of this checkpoint */
  severity: 'critical' | 'warning' | 'info'
  /** Position in the execution pipeline */
  stage: 'pre-execution' | 'mid-execution' | 'post-execution'
}

/** Pseudonym protocol for identity alignment (ASR™) */
export interface PseudonymProtocol {
  /** The professional identity the agent must maintain */
  identity: string
  /** Behavioral persona description */
  persona: string
  /** Communication style constraints */
  communicationStyle: string
  /** Hard boundaries the persona must never cross */
  redLines: string[]
  /** Domain-specific vocabulary the persona must use */
  vocabulary: string[]
}

/** In-Context Reinforcement Learning (ICRL) configuration */
export interface ICRLConfig {
  /** Number of exemplar interactions to maintain in-context */
  exemplarCount: number
  /** Template for positive reinforcement signals */
  positiveSignalTemplate: string
  /** Template for correction signals */
  correctionSignalTemplate: string
  /** Maximum drift tolerance before correction triggers (0.0–1.0) */
  driftTolerance: number
  /** How many steps between alignment checks */
  checkpointFrequency: number
}

/** The complete ASR™ reinforcement envelope for a skill */
export interface SkillReinforcement {
  reinforcementId: string
  /** Reference to the distillation this reinforces */
  distillationId: string
  /** Ordered behavioral checkpoints */
  checkpoints: BehavioralCheckpoint[]
  /** The pseudonym protocol for identity alignment */
  pseudonymProtocol: PseudonymProtocol
  /** ICRL configuration */
  icrl: ICRLConfig
  /** Governance system integration (e.g. Beunec Cicero) */
  governanceSystem: string
  /** Guardrails — hard rules that override all other behavior */
  guardrails: string[]
  /** Audit trail configuration */
  auditConfig: {
    enabled: boolean
    logLevel: 'minimal' | 'standard' | 'verbose'
    retentionDays: number
  }
}

// ─── Agentic Network System™ (ANS™) ─────────────────────────────────

/** A connection point in the agentic network */
export interface NetworkNode {
  nodeId: string
  /** Type of node in the network */
  nodeType: 'agent' | 'api' | 'database' | 'template' | 'user-interface' | 'governance'
  /** Human-readable label */
  label: string
  /** Endpoint or resource URI */
  endpoint: string
  /** Authentication method for this node */
  authMethod: 'api-key' | 'oauth' | 'service-account' | 'none'
  /** Capabilities this node exposes */
  capabilities: string[]
  /** Health check configuration */
  healthCheck?: {
    endpoint: string
    intervalMs: number
    timeoutMs: number
  }
}

/** A task handoff between two network nodes */
export interface TaskHandoff {
  id: string
  /** Source node ID */
  fromNodeId: string
  /** Target node ID */
  toNodeId: string
  /** Data contract for the handoff payload */
  payloadSchema: string
  /** Priority level */
  priority: 'critical' | 'high' | 'normal' | 'low'
  /** Timeout in milliseconds */
  timeoutMs: number
  /** Retry policy */
  retryPolicy: {
    maxRetries: number
    backoffMs: number
    backoffMultiplier: number
  }
}

/** The complete ANS™ network topology for a skill deployment */
export interface AgenticNetwork {
  networkId: string
  /** Reference to the reinforced skill this network serves */
  reinforcementId: string
  /** All nodes in the network */
  nodes: NetworkNode[]
  /** All task handoff definitions */
  handoffs: TaskHandoff[]
  /** The orchestration framework (e.g. Beunec ARG™) */
  orchestrationFramework: string
  /** Network-level governance policies */
  policies: {
    maxConcurrentHandoffs: number
    globalTimeoutMs: number
    circuitBreakerThreshold: number
  }
}

// ─── Composite ASPS™ Skill ──────────────────────────────────────────

/** The complete Agentic-System-Prompt-as-a-Skill™ */
export interface ASPS {
  /** Unique skill identifier */
  skillId: string
  /** Skill name (e.g. "Financial Stock Analyst") */
  name: string
  /** Skill version */
  version: string
  /** Skill author / creator */
  author: string
  /** Whether this is a built-in or user-created skill */
  origin: 'built-in' | 'custom'
  /** Professional domain */
  domain: string
  /** Human-readable description */
  description: string
  /** Tags for discovery */
  tags: string[]

  /** Layer 1 — Distillation (ASD™) */
  distillation: SkillDistillation
  /** Layer 2 — Reinforcement (ASR™) */
  reinforcement: SkillReinforcement
  /** Layer 3 — Network (ANS™) */
  network: AgenticNetwork

  /** Composite system prompt — the final artifact */
  compiledSystemPrompt: string

  /** Creation & update timestamps */
  createdAt: string
  updatedAt: string
}

// ─── Skill Builder Types ────────────────────────────────────────────

export interface ASPSBuilderConfig {
  name: string
  domain: string
  description: string
  tags?: string[]
  author?: string
  origin?: 'built-in' | 'custom'
}

export type ASPSBuildStage = 'distillation' | 'reinforcement' | 'networking' | 'compilation' | 'complete'

export interface ASPSBuildProgress {
  stage: ASPSBuildStage
  percentComplete: number
  currentStep: string
  errors: string[]
}
