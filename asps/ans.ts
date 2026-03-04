// ═══════════════════════════════════════════════════════════════════════
// Beunec Technologies, Inc. — Agentic Network System™ (ANS™)
// ═══════════════════════════════════════════════════════════════════════
//
// ANS™ is the third and final layer of the ASPS™ pipeline.
// After ASD™ distills and ASR™ reinforces, ANS™ wires the skill into
// a governed network of agents, APIs, databases, and user interfaces.
//
// Key concepts:
//   • Network Nodes — typed connection points (agent, api, db, etc.)
//   • Task Handoffs — typed data contracts between nodes
//   • Orchestration — managed by Beunec ARG™ Framework
//   • Policies — circuit breakers, timeouts, concurrency limits
//
// ANS™ is what transforms a single reinforced skill into a live,
// governed, multi-agent ecosystem — an Aselius Agent network.
// ═══════════════════════════════════════════════════════════════════════

import type {
  NetworkNode,
  TaskHandoff,
  AgenticNetwork,
} from './types'

// ─── Node Builder ───────────────────────────────────────────────────

let _nodeCounter = 0

export function createNode(
  partial: Pick<NetworkNode, 'nodeType' | 'label'> &
    Partial<NetworkNode>,
): NetworkNode {
  _nodeCounter += 1
  return {
    nodeId: partial.nodeId ?? `node-${_nodeCounter}`,
    nodeType: partial.nodeType,
    label: partial.label,
    endpoint: partial.endpoint ?? '',
    authMethod: partial.authMethod ?? 'none',
    capabilities: partial.capabilities ?? [],
    healthCheck: partial.healthCheck,
  }
}

// ─── Handoff Builder ────────────────────────────────────────────────

let _handoffCounter = 0

export function createHandoff(
  partial: Pick<TaskHandoff, 'fromNodeId' | 'toNodeId'> &
    Partial<TaskHandoff>,
): TaskHandoff {
  _handoffCounter += 1
  return {
    id: partial.id ?? `handoff-${_handoffCounter}`,
    fromNodeId: partial.fromNodeId,
    toNodeId: partial.toNodeId,
    payloadSchema: partial.payloadSchema ?? 'JSON',
    priority: partial.priority ?? 'normal',
    timeoutMs: partial.timeoutMs ?? 30_000,
    retryPolicy: partial.retryPolicy ?? {
      maxRetries: 3,
      backoffMs: 1000,
      backoffMultiplier: 2,
    },
  }
}

// ─── Pre-Built Network Topologies ───────────────────────────────────

/**
 * Common ANS™ topology templates. Each returns an array of nodes
 * and an array of handoffs that together form a network.
 */
export const NETWORK_TOPOLOGIES = {

  /**
   * Hub-and-spoke: single orchestrator agent talks to N specialist nodes.
   * Typical for most single-domain skills.
   */
  hubAndSpoke(config: {
    orchestratorLabel: string
    spokes: { label: string; nodeType: NetworkNode['nodeType']; capabilities: string[] }[]
  }) {
    const hub = createNode({
      nodeType: 'agent',
      label: config.orchestratorLabel,
      capabilities: ['orchestration', 'routing', 'aggregation'],
    })

    const spokeNodes = config.spokes.map((s) =>
      createNode({
        nodeType: s.nodeType,
        label: s.label,
        capabilities: s.capabilities,
      }),
    )

    const governance = createNode({
      nodeType: 'governance',
      label: 'Beunec Cicero Governance',
      capabilities: ['audit', 'policy-enforcement', 'rate-limiting'],
    })

    const handoffs: TaskHandoff[] = spokeNodes.flatMap((spoke) => [
      createHandoff({
        fromNodeId: hub.nodeId,
        toNodeId: spoke.nodeId,
        priority: 'normal',
      }),
      createHandoff({
        fromNodeId: spoke.nodeId,
        toNodeId: hub.nodeId,
        priority: 'normal',
      }),
    ])

    // Governance node monitors the hub
    handoffs.push(
      createHandoff({
        fromNodeId: hub.nodeId,
        toNodeId: governance.nodeId,
        priority: 'low',
        payloadSchema: 'AuditLog',
      }),
    )

    return {
      nodes: [hub, ...spokeNodes, governance],
      handoffs,
    }
  },

  /**
   * Pipeline: linear chain of agents, each passing output to the next.
   * Matches the sequential nature of ASD™ heuristic chains.
   */
  pipeline(config: {
    stages: { label: string; nodeType: NetworkNode['nodeType']; capabilities: string[] }[]
  }) {
    const nodes = config.stages.map((s) =>
      createNode({
        nodeType: s.nodeType,
        label: s.label,
        capabilities: s.capabilities,
      }),
    )

    const governance = createNode({
      nodeType: 'governance',
      label: 'Beunec Cicero Governance',
      capabilities: ['audit', 'policy-enforcement'],
    })

    const handoffs: TaskHandoff[] = []
    for (let i = 0; i < nodes.length - 1; i++) {
      handoffs.push(
        createHandoff({
          fromNodeId: nodes[i].nodeId,
          toNodeId: nodes[i + 1].nodeId,
          priority: 'high',
        }),
      )
    }

    // Each stage reports to governance
    for (const node of nodes) {
      handoffs.push(
        createHandoff({
          fromNodeId: node.nodeId,
          toNodeId: governance.nodeId,
          priority: 'low',
          payloadSchema: 'AuditLog',
        }),
      )
    }

    return { nodes: [...nodes, governance], handoffs }
  },

  /**
   * Mesh: every agent can talk to every other agent.
   * For complex multi-domain skills where any node might need any other.
   */
  mesh(config: {
    agents: { label: string; capabilities: string[] }[]
  }) {
    const nodes = config.agents.map((a) =>
      createNode({
        nodeType: 'agent',
        label: a.label,
        capabilities: a.capabilities,
      }),
    )

    const governance = createNode({
      nodeType: 'governance',
      label: 'Beunec Cicero Governance',
      capabilities: ['audit', 'policy-enforcement', 'conflict-resolution'],
    })

    const handoffs: TaskHandoff[] = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        handoffs.push(
          createHandoff({
            fromNodeId: nodes[i].nodeId,
            toNodeId: nodes[j].nodeId,
          }),
          createHandoff({
            fromNodeId: nodes[j].nodeId,
            toNodeId: nodes[i].nodeId,
          }),
        )
      }
      handoffs.push(
        createHandoff({
          fromNodeId: nodes[i].nodeId,
          toNodeId: governance.nodeId,
          priority: 'low',
          payloadSchema: 'AuditLog',
        }),
      )
    }

    return { nodes: [...nodes, governance], handoffs }
  },
}

// ─── Network Builder ────────────────────────────────────────────────

export function buildNetwork(
  reinforcementId: string,
  topology: { nodes: NetworkNode[]; handoffs: TaskHandoff[] },
  options?: {
    orchestrationFramework?: string
    maxConcurrentHandoffs?: number
    globalTimeoutMs?: number
    circuitBreakerThreshold?: number
  },
): AgenticNetwork {
  return {
    networkId: `ans-${reinforcementId.replace('asr-', '')}-${Date.now()}`,
    reinforcementId,
    nodes: topology.nodes,
    handoffs: topology.handoffs,
    orchestrationFramework:
      options?.orchestrationFramework ?? 'Beunec ARG™ Framework',
    policies: {
      maxConcurrentHandoffs: options?.maxConcurrentHandoffs ?? 10,
      globalTimeoutMs: options?.globalTimeoutMs ?? 120_000,
      circuitBreakerThreshold: options?.circuitBreakerThreshold ?? 5,
    },
  }
}

// ─── Network Prompt Contribution ────────────────────────────────────

/**
 * Generates the ANS™ network-awareness block that gets appended
 * to the compiled system prompt. This lets the agent know which
 * tools and connections it has access to at runtime.
 */
export function generateNetworkPromptBlock(network: AgenticNetwork): string {
  const nodeDescriptions = network.nodes
    .filter((n) => n.nodeType !== 'governance')
    .map(
      (n) =>
        `  • [${n.nodeType.toUpperCase()}] ${n.label} — capabilities: ${n.capabilities.join(', ')}`,
    )

  const handoffDescriptions = network.handoffs
    .filter((h) => {
      const target = network.nodes.find((n) => n.nodeId === h.toNodeId)
      return target?.nodeType !== 'governance'
    })
    .slice(0, 10) // Keep prompt manageable
    .map((h) => {
      const from = network.nodes.find((n) => n.nodeId === h.fromNodeId)
      const to = network.nodes.find((n) => n.nodeId === h.toNodeId)
      return `  ${from?.label ?? h.fromNodeId} → ${to?.label ?? h.toNodeId} (${h.priority} priority, ${h.payloadSchema})`
    })

  return [
    ``,
    `[AGENTIC NETWORK]`,
    `Orchestration: ${network.orchestrationFramework}`,
    `Available nodes:`,
    ...nodeDescriptions,
    ``,
    `Available handoffs:`,
    ...handoffDescriptions,
    ``,
    `When a task exceeds your capabilities, delegate to the appropriate node via handoff.`,
    `All actions are audited by the governance node.`,
  ].join('\n')
}
