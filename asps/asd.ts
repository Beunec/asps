// ═══════════════════════════════════════════════════════════════════════
// Beunec Technologies, Inc. — Agentic Skill Distillation™ (ASD™)
// ═══════════════════════════════════════════════════════════════════════
//
// ASD™ is the first layer of the ASPS™ pipeline.
// It transforms expert-level professional heuristics into deterministic,
// ordered instruction sets that form the foundation of every skill.
//
// The distillation process:
//   1. Define the professional domain and expert context
//   2. Extract individual heuristics (decision patterns)
//   3. Assign determinism scores and sequence ordering
//   4. Compose heuristics into a single composite system prompt
//
// An LLM does NOT "have skills" — it has parameters. ASD™ creates the
// deterministic infrastructure that MAKES an agentic system skillful.
// ═══════════════════════════════════════════════════════════════════════

import type {
  DistilledHeuristic,
  SkillDistillation,
} from './types'

// ─── Heuristic Builder ──────────────────────────────────────────────

let _heuristicCounter = 0

/**
 * Create a single distilled heuristic with sensible defaults.
 */
export function createHeuristic(
  partial: Pick<DistilledHeuristic, 'name' | 'instruction'> &
    Partial<DistilledHeuristic>,
): DistilledHeuristic {
  _heuristicCounter += 1
  return {
    id: partial.id ?? `heuristic-${_heuristicCounter}`,
    name: partial.name,
    instruction: partial.instruction,
    constraints: partial.constraints ?? [],
    inputSchema: partial.inputSchema ?? 'string',
    outputSchema: partial.outputSchema ?? 'string',
    determinismScore: partial.determinismScore ?? 0.8,
    sequenceIndex: partial.sequenceIndex ?? _heuristicCounter,
  }
}

// ─── Composite Prompt Compiler ──────────────────────────────────────

/**
 * Compiles an ordered array of heuristics into a deterministic
 * system prompt. This is the core artifact of ASD™.
 */
export function compileHeuristicsToPrompt(
  domain: string,
  heuristics: DistilledHeuristic[],
): string {
  const sorted = [...heuristics].sort(
    (a, b) => a.sequenceIndex - b.sequenceIndex,
  )

  const sections = sorted.map((h, i) => {
    const constraintBlock =
      h.constraints.length > 0
        ? `\n   Constraints: ${h.constraints.join('; ')}`
        : ''
    return [
      `Step ${i + 1}: ${h.name}`,
      `   ${h.instruction}${constraintBlock}`,
      `   Input:  ${h.inputSchema}`,
      `   Output: ${h.outputSchema}`,
    ].join('\n')
  })

  return [
    `You are an expert ${domain} agent.`,
    `Follow these steps IN ORDER. Do NOT skip steps.`,
    ``,
    ...sections,
    ``,
    `Always produce structured, deterministic output.`,
    `If any step fails, STOP and report which step failed and why.`,
  ].join('\n')
}

// ─── Distillation Factory ───────────────────────────────────────────

/**
 * Build a complete SkillDistillation from domain + heuristics.
 */
export function distill(
  domain: string,
  heuristics: DistilledHeuristic[],
  options?: {
    version?: string
    sourceModel?: string
    expertSourceCount?: number
  },
): SkillDistillation {
  const compositeSystemPrompt = compileHeuristicsToPrompt(domain, heuristics)

  const avgDeterminism =
    heuristics.reduce((sum, h) => sum + h.determinismScore, 0) /
    (heuristics.length || 1)

  return {
    distillationId: `asd-${domain.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
    version: options?.version ?? '1.0.0',
    domain,
    heuristics: [...heuristics].sort(
      (a, b) => a.sequenceIndex - b.sequenceIndex,
    ),
    compositeSystemPrompt,
    sourceModel: options?.sourceModel ?? 'gpt-4o-mini',
    distilledAt: new Date().toISOString(),
    metadata: {
      totalHeuristics: heuristics.length,
      averageDeterminism: Math.round(avgDeterminism * 100) / 100,
      domainCoveragePercent: Math.min(
        100,
        Math.round(heuristics.length * 12.5),
      ),
      expertSourceCount: options?.expertSourceCount ?? 1,
    },
  }
}

// ─── Pre-Built Heuristic Libraries ──────────────────────────────────

/**
 * Pre-built heuristic chains for common professional domains.
 * These are templates — users extend / override for their use-case.
 */

export const HEURISTIC_LIBRARIES = {
  // ── Full-Stack Developer ──────────────────────────────────────────
  fullStackDeveloper: [
    createHeuristic({
      name: 'Requirements Analysis',
      instruction:
        'Parse the user request into functional and non-functional requirements. Identify the tech stack, constraints, and acceptance criteria.',
      constraints: [
        'Must produce a numbered requirements list',
        'Separate functional from non-functional',
      ],
      inputSchema: 'UserRequest (natural language)',
      outputSchema: 'RequirementsList { functional: string[]; nonFunctional: string[] }',
      determinismScore: 0.85,
      sequenceIndex: 1,
    }),
    createHeuristic({
      name: 'Architecture Decision',
      instruction:
        'Select the architecture pattern (monolith, microservice, serverless, etc.) based on requirements. Justify the decision.',
      constraints: [
        'Must reference at least 2 tradeoffs',
        'Must name specific frameworks',
      ],
      inputSchema: 'RequirementsList',
      outputSchema: 'ArchitectureDecision { pattern: string; frameworks: string[]; justification: string }',
      determinismScore: 0.7,
      sequenceIndex: 2,
    }),
    createHeuristic({
      name: 'File Structure Scaffold',
      instruction:
        'Generate the complete directory tree and file list. Every file must have a purpose annotation.',
      constraints: [
        'Follow framework conventions',
        'Include test directories',
      ],
      inputSchema: 'ArchitectureDecision',
      outputSchema: 'DirectoryTree { path: string; purpose: string }[]',
      determinismScore: 0.95,
      sequenceIndex: 3,
    }),
    createHeuristic({
      name: 'Implementation',
      instruction:
        'Write production-quality code for each file. Use TypeScript strict mode. Include JSDoc for public APIs.',
      constraints: [
        'No TODO comments in production files',
        'All functions must have explicit return types',
      ],
      inputSchema: 'DirectoryTree + RequirementsList',
      outputSchema: 'SourceFiles { path: string; content: string }[]',
      determinismScore: 0.9,
      sequenceIndex: 4,
    }),
    createHeuristic({
      name: 'Test Suite Generation',
      instruction:
        'Generate unit tests for all public functions. Target ≥80% branch coverage.',
      constraints: ['Use Jest + RTL for React', 'Mock external APIs'],
      inputSchema: 'SourceFiles',
      outputSchema: 'TestFiles { path: string; content: string }[]',
      determinismScore: 0.9,
      sequenceIndex: 5,
    }),
    createHeuristic({
      name: 'CI/CD Pipeline',
      instruction:
        'Generate GitHub Actions workflow: lint → typecheck → test → build → deploy.',
      constraints: [
        'Must include caching for node_modules',
        'Fail-fast on lint errors',
      ],
      inputSchema: 'ProjectStructure',
      outputSchema: 'WorkflowYAML string',
      determinismScore: 0.95,
      sequenceIndex: 6,
    }),
  ],

  // ── Financial Stock Analyst ───────────────────────────────────────
  financialStockAnalyst: [
    createHeuristic({
      name: 'Ticker Resolution',
      instruction:
        'Resolve the user query to a valid stock ticker symbol. Validate against known exchanges (NYSE, NASDAQ, LSE).',
      constraints: [
        'Must confirm ticker exists',
        'Handle common aliases (e.g. "Google" → GOOGL)',
      ],
      inputSchema: 'UserQuery (natural language)',
      outputSchema: 'TickerResolution { symbol: string; exchange: string; companyName: string }',
      determinismScore: 0.95,
      sequenceIndex: 1,
    }),
    createHeuristic({
      name: 'Fundamental Analysis',
      instruction:
        'Retrieve and analyze P/E ratio, EPS, revenue growth, debt-to-equity, and free cash flow for the resolved ticker.',
      constraints: [
        'Use trailing twelve months (TTM) data',
        'Flag any metric > 2σ from sector median',
      ],
      inputSchema: 'TickerResolution',
      outputSchema: 'FundamentalReport { metrics: Record<string, number>; flags: string[] }',
      determinismScore: 0.85,
      sequenceIndex: 2,
    }),
    createHeuristic({
      name: 'Technical Analysis',
      instruction:
        'Compute 50-day and 200-day moving averages, RSI(14), MACD(12,26,9), and Bollinger Bands(20,2).',
      constraints: [
        'Identify crossover signals',
        'Note overbought/oversold conditions',
      ],
      inputSchema: 'HistoricalPriceData[]',
      outputSchema: 'TechnicalReport { indicators: Record<string, number>; signals: string[] }',
      determinismScore: 0.95,
      sequenceIndex: 3,
    }),
    createHeuristic({
      name: 'Sentiment Scan',
      instruction:
        'Summarize recent news sentiment (bullish / bearish / neutral) from the last 7 days. Cite sources.',
      constraints: [
        'Minimum 3 source citations',
        'Weight institutional reports higher',
      ],
      inputSchema: 'TickerResolution',
      outputSchema: 'SentimentReport { overall: string; sources: { title: string; sentiment: string }[] }',
      determinismScore: 0.6,
      sequenceIndex: 4,
    }),
    createHeuristic({
      name: 'Risk Assessment',
      instruction:
        'Evaluate macro, sector, and company-specific risks. Assign a composite risk score 1-10.',
      constraints: [
        'Must address at least one macro risk',
        'Score must be justified',
      ],
      inputSchema: 'FundamentalReport + TechnicalReport + SentimentReport',
      outputSchema: 'RiskAssessment { score: number; risks: { category: string; description: string }[] }',
      determinismScore: 0.7,
      sequenceIndex: 5,
    }),
    createHeuristic({
      name: 'Investment Thesis',
      instruction:
        'Synthesize all prior analyses into a BUY / HOLD / SELL recommendation with a 12-month price target range.',
      constraints: [
        'Must reference all prior steps',
        'Include confidence interval',
        'Disclaim that this is not financial advice',
      ],
      inputSchema: 'All prior reports',
      outputSchema: 'InvestmentThesis { recommendation: string; priceTarget: { low: number; mid: number; high: number }; confidence: number }',
      determinismScore: 0.65,
      sequenceIndex: 6,
    }),
  ],

  // ── Scientific Researcher ─────────────────────────────────────────
  scientificResearcher: [
    createHeuristic({
      name: 'Research Question Formulation',
      instruction:
        'Transform the user query into a formal research question with defined scope, variables, and hypothesis.',
      constraints: [
        'Must be falsifiable',
        'Define independent and dependent variables',
      ],
      inputSchema: 'UserQuery',
      outputSchema: 'ResearchQuestion { question: string; hypothesis: string; variables: { independent: string[]; dependent: string[] } }',
      determinismScore: 0.75,
      sequenceIndex: 1,
    }),
    createHeuristic({
      name: 'Literature Review',
      instruction:
        'Search for and summarize the 5-10 most relevant prior works. Identify the research gap.',
      constraints: [
        'Prioritize peer-reviewed sources',
        'Must identify the specific gap this research fills',
      ],
      inputSchema: 'ResearchQuestion',
      outputSchema: 'LiteratureReview { papers: { title: string; year: number; finding: string }[]; gap: string }',
      determinismScore: 0.6,
      sequenceIndex: 2,
    }),
    createHeuristic({
      name: 'Methodology Design',
      instruction:
        'Propose a study design (experimental, observational, computational, etc.) with sample size justification and controls.',
      constraints: [
        'Must address confounding variables',
        'Include statistical power analysis rationale',
      ],
      inputSchema: 'ResearchQuestion + LiteratureReview',
      outputSchema: 'Methodology { design: string; sampleSize: number; controls: string[] }',
      determinismScore: 0.7,
      sequenceIndex: 3,
    }),
    createHeuristic({
      name: 'Data Analysis Plan',
      instruction:
        'Specify statistical tests, significance thresholds, and visualization approach.',
      constraints: ['α ≤ 0.05 unless justified', 'Pre-register analysis plan'],
      inputSchema: 'Methodology',
      outputSchema: 'AnalysisPlan { tests: string[]; alpha: number; visualizations: string[] }',
      determinismScore: 0.85,
      sequenceIndex: 4,
    }),
    createHeuristic({
      name: 'Results Interpretation',
      instruction:
        'Interpret findings in context of the hypothesis. Discuss effect sizes, not just p-values.',
      constraints: [
        'Report confidence intervals',
        'Acknowledge limitations',
      ],
      inputSchema: 'RawResults + AnalysisPlan',
      outputSchema: 'Interpretation { supported: boolean; effectSize: number; limitations: string[] }',
      determinismScore: 0.7,
      sequenceIndex: 5,
    }),
    createHeuristic({
      name: 'Publication Draft',
      instruction:
        'Compose an abstract, introduction, methods, results, discussion, and conclusion in standard academic format.',
      constraints: [
        'Follow APA/IEEE format as appropriate',
        'Include all citations',
      ],
      inputSchema: 'All prior outputs',
      outputSchema: 'ManuscriptDraft { sections: Record<string, string> }',
      determinismScore: 0.8,
      sequenceIndex: 6,
    }),
  ],

  // ── Content Creator ───────────────────────────────────────────────
  contentCreator: [
    createHeuristic({
      name: 'Audience & Platform Analysis',
      instruction:
        'Identify the target audience demographics and the platform constraints (character limits, media types, algorithm preferences).',
      constraints: ['Must specify at least one platform', 'Define audience persona'],
      inputSchema: 'ContentBrief',
      outputSchema: 'AudienceProfile { persona: string; platform: string; constraints: string[] }',
      determinismScore: 0.8,
      sequenceIndex: 1,
    }),
    createHeuristic({
      name: 'Content Strategy',
      instruction:
        'Define the content type (article, thread, video script, newsletter), tone, key messages, and call-to-action.',
      constraints: ['Align tone with audience persona', 'Single clear CTA'],
      inputSchema: 'AudienceProfile + ContentBrief',
      outputSchema: 'ContentStrategy { type: string; tone: string; keyMessages: string[]; cta: string }',
      determinismScore: 0.75,
      sequenceIndex: 2,
    }),
    createHeuristic({
      name: 'Outline Generation',
      instruction:
        'Create a structured outline with sections, hooks, and transitions.',
      constraints: ['Hook must appear in first 2 sentences', 'Maximum 7 sections'],
      inputSchema: 'ContentStrategy',
      outputSchema: 'Outline { sections: { heading: string; keyPoints: string[] }[] }',
      determinismScore: 0.85,
      sequenceIndex: 3,
    }),
    createHeuristic({
      name: 'Draft Composition',
      instruction:
        'Write the full draft following the outline. Match the defined tone. Optimize for readability (Flesch-Kincaid ≥ 60).',
      constraints: ['No jargon without definition', 'Active voice preferred'],
      inputSchema: 'Outline',
      outputSchema: 'Draft string',
      determinismScore: 0.7,
      sequenceIndex: 4,
    }),
    createHeuristic({
      name: 'SEO / Discoverability Pass',
      instruction:
        'Inject relevant keywords, optimize title/meta, add internal/external links suggestions.',
      constraints: ['Keyword density 1-2%', 'Title ≤ 60 characters'],
      inputSchema: 'Draft',
      outputSchema: 'SEOReport { keywords: string[]; titleSuggestion: string; metaDescription: string }',
      determinismScore: 0.9,
      sequenceIndex: 5,
    }),
  ],

  // ── Private Equity Analyst ────────────────────────────────────────
  privateEquityAnalyst: [
    createHeuristic({
      name: 'Deal Screening',
      instruction:
        'Evaluate the target company against fund thesis (sector, size, geography, EBITDA margin thresholds).',
      constraints: [
        'Must produce a PASS/FAIL gate decision',
        'Log rejection reason if FAIL',
      ],
      inputSchema: 'CompanyProfile + FundThesis',
      outputSchema: 'ScreeningResult { pass: boolean; reason: string }',
      determinismScore: 0.9,
      sequenceIndex: 1,
    }),
    createHeuristic({
      name: 'Financial Model — LBO',
      instruction:
        'Build a leveraged buyout model: entry multiple, debt structure, revenue projections (5yr), exit multiple, IRR calculation.',
      constraints: [
        'Conservative, base, and optimistic cases',
        'Debt-to-EBITDA ≤ 6x at entry',
      ],
      inputSchema: 'FinancialStatements + DealTerms',
      outputSchema: 'LBOModel { irr: Record<string, number>; moic: Record<string, number> }',
      determinismScore: 0.85,
      sequenceIndex: 2,
    }),
    createHeuristic({
      name: 'Due Diligence Checklist',
      instruction:
        'Generate a comprehensive DD checklist: legal, financial, commercial, operational, IT, HR, ESG.',
      constraints: ['Minimum 5 items per category', 'Flag high-priority items'],
      inputSchema: 'ScreeningResult + LBOModel',
      outputSchema: 'DDChecklist { categories: Record<string, { item: string; priority: string }[]> }',
      determinismScore: 0.9,
      sequenceIndex: 3,
    }),
    createHeuristic({
      name: 'Value Creation Plan',
      instruction:
        'Identify 3-5 value creation levers (revenue growth, margin expansion, add-on acquisitions, working capital optimization).',
      constraints: ['Each lever must have quantified impact', 'Time-bound milestones'],
      inputSchema: 'LBOModel + DDChecklist',
      outputSchema: 'ValueCreationPlan { levers: { name: string; impactPercent: number; timeline: string }[] }',
      determinismScore: 0.75,
      sequenceIndex: 4,
    }),
    createHeuristic({
      name: 'Investment Memo',
      instruction:
        'Synthesize all analyses into a formal IC (Investment Committee) memo: thesis, risks, returns, recommendation.',
      constraints: [
        'Executive summary ≤ 300 words',
        'Must include dissenting view section',
      ],
      inputSchema: 'All prior outputs',
      outputSchema: 'InvestmentMemo { recommendation: string; irr: number; risks: string[] }',
      determinismScore: 0.8,
      sequenceIndex: 5,
    }),
  ],

  // ── Academia Professor ────────────────────────────────────────────
  academiaProfessor: [
    createHeuristic({
      name: 'Course Objective Mapping',
      instruction:
        'Define learning objectives using Bloom\'s Taxonomy. Map each objective to an assessment method.',
      constraints: [
        'Use measurable action verbs',
        'Cover at least 3 Bloom levels',
      ],
      inputSchema: 'CourseDescription + StudentLevel',
      outputSchema: 'ObjectiveMap { objectives: { verb: string; topic: string; assessment: string; bloomLevel: string }[] }',
      determinismScore: 0.85,
      sequenceIndex: 1,
    }),
    createHeuristic({
      name: 'Syllabus Construction',
      instruction:
        'Create a week-by-week syllabus with readings, activities, and deliverables.',
      constraints: [
        'Include academic integrity policy',
        'Balance theory and application weeks',
      ],
      inputSchema: 'ObjectiveMap + SemesterLength',
      outputSchema: 'Syllabus { weeks: { topic: string; readings: string[]; deliverable?: string }[] }',
      determinismScore: 0.9,
      sequenceIndex: 2,
    }),
    createHeuristic({
      name: 'Lecture Design',
      instruction:
        'Design lecture slides outline with key concepts, examples, discussion questions, and active learning activities.',
      constraints: [
        'Maximum 40 slides per lecture',
        'Include at least one active learning activity',
      ],
      inputSchema: 'SyllabusWeek',
      outputSchema: 'LecturePlan { slides: { title: string; content: string; notes: string }[] }',
      determinismScore: 0.8,
      sequenceIndex: 3,
    }),
    createHeuristic({
      name: 'Assessment Generation',
      instruction:
        'Create exam questions, rubrics, and grading criteria aligned with learning objectives.',
      constraints: [
        'Mix question types (MCQ, short answer, essay)',
        'Rubric must be criterion-referenced',
      ],
      inputSchema: 'ObjectiveMap',
      outputSchema: 'Assessment { questions: { type: string; text: string; points: number; rubric: string }[] }',
      determinismScore: 0.85,
      sequenceIndex: 4,
    }),
    createHeuristic({
      name: 'Student Feedback Analysis',
      instruction:
        'Analyze student evaluations, identify themes, and propose course improvements.',
      constraints: [
        'Categorize feedback as structural, content, or pedagogical',
        'Prioritize by frequency',
      ],
      inputSchema: 'EvaluationData[]',
      outputSchema: 'FeedbackAnalysis { themes: { category: string; theme: string; frequency: number; action: string }[] }',
      determinismScore: 0.7,
      sequenceIndex: 5,
    }),
  ],

  // ── Financial Investment Analyst ──────────────────────────────────
  financialInvestmentAnalyst: [
    createHeuristic({
      name: 'Portfolio Context Assessment',
      instruction:
        'Assess the investor\'s current portfolio, risk tolerance, time horizon, and investment goals.',
      constraints: [
        'Must determine risk profile (conservative/moderate/aggressive)',
        'Identify concentration risks',
      ],
      inputSchema: 'InvestorProfile + CurrentHoldings',
      outputSchema: 'PortfolioContext { riskProfile: string; gaps: string[]; concentrationRisks: string[] }',
      determinismScore: 0.8,
      sequenceIndex: 1,
    }),
    createHeuristic({
      name: 'Asset Allocation Strategy',
      instruction:
        'Recommend target allocation across asset classes (equities, fixed income, alternatives, cash) based on risk profile.',
      constraints: [
        'Sum to 100%',
        'Reference Modern Portfolio Theory',
      ],
      inputSchema: 'PortfolioContext',
      outputSchema: 'AllocationStrategy { allocations: Record<string, number>; rationale: string }',
      determinismScore: 0.8,
      sequenceIndex: 2,
    }),
    createHeuristic({
      name: 'Security Selection',
      instruction:
        'Select specific securities (ETFs, stocks, bonds) for each asset class bucket. Include expense ratios for funds.',
      constraints: [
        'Prefer low-cost index funds where appropriate',
        'Diversify across geographies',
      ],
      inputSchema: 'AllocationStrategy',
      outputSchema: 'SecuritySelection { picks: { assetClass: string; ticker: string; weight: number; expenseRatio?: number }[] }',
      determinismScore: 0.75,
      sequenceIndex: 3,
    }),
    createHeuristic({
      name: 'Tax Efficiency Analysis',
      instruction:
        'Evaluate tax implications of proposed trades. Suggest tax-loss harvesting opportunities and account placement.',
      constraints: [
        'Consider short vs long-term capital gains',
        'Account for wash sale rules',
      ],
      inputSchema: 'SecuritySelection + TaxSituation',
      outputSchema: 'TaxAnalysis { harvestingOpportunities: string[]; accountPlacement: Record<string, string> }',
      determinismScore: 0.85,
      sequenceIndex: 4,
    }),
    createHeuristic({
      name: 'Rebalancing Plan',
      instruction:
        'Create a specific trade execution plan to move from current to target allocation with minimal tax drag.',
      constraints: [
        'Minimize number of trades',
        'Respect wash sale windows',
        'Include order types',
      ],
      inputSchema: 'CurrentHoldings + SecuritySelection + TaxAnalysis',
      outputSchema: 'RebalancingPlan { trades: { action: string; ticker: string; shares: number; orderType: string }[] }',
      determinismScore: 0.9,
      sequenceIndex: 5,
    }),
  ],
} as const satisfies Record<string, DistilledHeuristic[]>

export type HeuristicLibraryKey = keyof typeof HEURISTIC_LIBRARIES
