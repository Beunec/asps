// ═══════════════════════════════════════════════════════════════════════
// Beunec Technologies, Inc. — ASPS™ Barrel Export
// ═══════════════════════════════════════════════════════════════════════

// Core types
export type {
  DistilledHeuristic,
  SkillDistillation,
  BehavioralCheckpoint,
  PseudonymProtocol,
  ICRLConfig,
  SkillReinforcement,
  NetworkNode,
  TaskHandoff,
  AgenticNetwork,
  ASPS,
  ASPSBuilderConfig,
  ASPSBuildStage,
  ASPSBuildProgress,
} from './types'

// ASD™ — Agentic Skill Distillation
export {
  createHeuristic,
  compileHeuristicsToPrompt,
  distill,
  HEURISTIC_LIBRARIES,
} from './asd'
export type { HeuristicLibraryKey } from './asd'

// ASR™ — Agentic Skill Reinforcement
export {
  createCheckpoint,
  createPseudonymProtocol,
  createICRLConfig,
  reinforce,
  wrapPromptWithReinforcement,
  GUARDRAIL_PRESETS,
  CHECKPOINT_PRESETS,
} from './asr'
export type { GuardrailPresetKey } from './asr'

// ANS™ — Agentic Network System
export {
  createNode,
  createHandoff,
  buildNetwork,
  generateNetworkPromptBlock,
  NETWORK_TOPOLOGIES,
} from './ans'

// Builder
export { ASPSBuilder, buildASPS } from './builder'

// Pre-built templates
export {
  createFullStackDeveloperSkill,
  createFinancialStockAnalystSkill,
  createFinancialInvestmentAnalystSkill,
  createScientificResearcherSkill,
  createContentCreatorSkill,
  createPrivateEquityAnalystSkill,
  createAcademiaProfessorSkill,
  ASPS_TEMPLATES,
} from './templates'
export type { ASPSTemplateKey } from './templates'
