// ═══════════════════════════════════════════════════════════════════════
// Beunec Technologies, Inc. — ASPS™ Builder
// ═══════════════════════════════════════════════════════════════════════
//
// The Builder composes all three ASPS™ layers — ASD™ → ASR™ → ANS™ —
// into a single, deployable skill artifact.
//
// Usage:
//   const skill = new ASPSBuilder({ name: 'Stock Analyst', domain: '…' })
//     .distill(heuristics)
//     .reinforce({ pseudonymProtocol, guardrailPresets: ['financial'] })
//     .network(NETWORK_TOPOLOGIES.hubAndSpoke({ … }))
//     .compile()
// ═══════════════════════════════════════════════════════════════════════

import type {
  ASPS,
  ASPSBuilderConfig,
  ASPSBuildProgress,
  DistilledHeuristic,
  SkillDistillation,
  SkillReinforcement,
  AgenticNetwork,
  PseudonymProtocol,
  BehavioralCheckpoint,
  ICRLConfig,
  NetworkNode,
  TaskHandoff,
} from './types'
import type { GuardrailPresetKey } from './asr'

import {
  distill as asdDistill,
  compileHeuristicsToPrompt,
} from './asd'
import {
  reinforce as asrReinforce,
  wrapPromptWithReinforcement,
} from './asr'
import {
  buildNetwork as ansBuildNetwork,
  generateNetworkPromptBlock,
} from './ans'

// ─── Builder ────────────────────────────────────────────────────────

export class ASPSBuilder {
  private config: ASPSBuilderConfig
  private _distillation: SkillDistillation | null = null
  private _reinforcement: SkillReinforcement | null = null
  private _network: AgenticNetwork | null = null
  private _progress: ASPSBuildProgress = {
    stage: 'distillation',
    percentComplete: 0,
    currentStep: 'Initialized',
    errors: [],
  }

  constructor(config: ASPSBuilderConfig) {
    this.config = {
      ...config,
      tags: config.tags ?? [],
      author: config.author ?? 'Beunec Technologies, Inc.',
      origin: config.origin ?? 'custom',
    }
  }

  /** Current build progress */
  get progress(): ASPSBuildProgress {
    return { ...this._progress }
  }

  // ── Layer 1: Distillation (ASD™) ──────────────────────────────────

  /**
   * Distill an array of heuristics into the first ASPS™ layer.
   */
  distill(
    heuristics: DistilledHeuristic[],
    options?: {
      version?: string
      sourceModel?: string
      expertSourceCount?: number
    },
  ): this {
    if (heuristics.length === 0) {
      this._progress.errors.push(
        'ASD™: At least one heuristic is required.',
      )
      return this
    }

    this._distillation = asdDistill(
      this.config.domain,
      heuristics,
      options,
    )

    this._progress = {
      stage: 'reinforcement',
      percentComplete: 33,
      currentStep: `ASD™ complete — ${heuristics.length} heuristics distilled`,
      errors: [],
    }
    return this
  }

  // ── Layer 2: Reinforcement (ASR™) ─────────────────────────────────

  /**
   * Wrap the distilled skill in an ASR™ reinforcement envelope.
   */
  reinforce(config: {
    pseudonymProtocol: PseudonymProtocol
    checkpoints?: BehavioralCheckpoint[]
    icrl?: Partial<ICRLConfig>
    guardrails?: string[]
    guardrailPresets?: GuardrailPresetKey[]
    governanceSystem?: string
  }): this {
    if (!this._distillation) {
      this._progress.errors.push(
        'ASR™: Must call .distill() before .reinforce().',
      )
      return this
    }

    this._reinforcement = asrReinforce(
      this._distillation.distillationId,
      config,
    )

    this._progress = {
      stage: 'networking',
      percentComplete: 66,
      currentStep: `ASR™ complete — ${this._reinforcement.checkpoints.length} checkpoints, ${this._reinforcement.guardrails.length} guardrails`,
      errors: [],
    }
    return this
  }

  // ── Layer 3: Network (ANS™) ───────────────────────────────────────

  /**
   * Wire the reinforced skill into an ANS™ network topology.
   */
  network(
    topology: { nodes: NetworkNode[]; handoffs: TaskHandoff[] },
    options?: {
      orchestrationFramework?: string
      maxConcurrentHandoffs?: number
      globalTimeoutMs?: number
      circuitBreakerThreshold?: number
    },
  ): this {
    if (!this._reinforcement) {
      this._progress.errors.push(
        'ANS™: Must call .reinforce() before .network().',
      )
      return this
    }

    this._network = ansBuildNetwork(
      this._reinforcement.reinforcementId,
      topology,
      options,
    )

    this._progress = {
      stage: 'compilation',
      percentComplete: 90,
      currentStep: `ANS™ complete — ${topology.nodes.length} nodes, ${topology.handoffs.length} handoffs`,
      errors: [],
    }
    return this
  }

  // ── Compile ───────────────────────────────────────────────────────

  /**
   * Compile all three layers into a single ASPS™ skill artifact.
   * Returns the complete, deployable skill with its compiled system prompt.
   */
  compile(): ASPS {
    if (!this._distillation) {
      throw new Error('ASPS™ Compile Error: Distillation layer (ASD™) is missing. Call .distill() first.')
    }
    if (!this._reinforcement) {
      throw new Error('ASPS™ Compile Error: Reinforcement layer (ASR™) is missing. Call .reinforce() first.')
    }
    if (!this._network) {
      throw new Error('ASPS™ Compile Error: Network layer (ANS™) is missing. Call .network() first.')
    }

    // Compose the final system prompt: ASR™ wrapper → ASD™ prompt → ANS™ block
    const reinforcedPrompt = wrapPromptWithReinforcement(
      this._distillation.compositeSystemPrompt,
      this._reinforcement,
    )

    const networkBlock = generateNetworkPromptBlock(this._network)

    const compiledSystemPrompt = reinforcedPrompt + networkBlock

    const now = new Date().toISOString()

    const skill: ASPS = {
      skillId: `asps-${this.config.domain.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      name: this.config.name,
      version: this._distillation.version,
      author: this.config.author!,
      origin: this.config.origin!,
      domain: this.config.domain,
      description: this.config.description,
      tags: this.config.tags!,

      distillation: this._distillation,
      reinforcement: this._reinforcement,
      network: this._network,

      compiledSystemPrompt,

      createdAt: now,
      updatedAt: now,
    }

    this._progress = {
      stage: 'complete',
      percentComplete: 100,
      currentStep: `ASPS™ skill "${this.config.name}" compiled — ${compiledSystemPrompt.length} chars`,
      errors: [],
    }

    return skill
  }
}

// ─── Convenience Factory ────────────────────────────────────────────

/**
 * One-shot factory for simple use cases.
 */
export function buildASPS(config: {
  name: string
  domain: string
  description: string
  tags?: string[]
  heuristics: DistilledHeuristic[]
  pseudonymProtocol: PseudonymProtocol
  guardrailPresets?: GuardrailPresetKey[]
  topology: { nodes: NetworkNode[]; handoffs: TaskHandoff[] }
}): ASPS {
  return new ASPSBuilder({
    name: config.name,
    domain: config.domain,
    description: config.description,
    tags: config.tags,
  })
    .distill(config.heuristics)
    .reinforce({
      pseudonymProtocol: config.pseudonymProtocol,
      guardrailPresets: config.guardrailPresets,
    })
    .network(config.topology)
    .compile()
}
