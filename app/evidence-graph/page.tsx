"use client";
// app/evidence-graph/page.tsx — Evidence Graph with React Flow

import { useState, useCallback, useMemo } from "react";
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  BackgroundVariant,
  NodeProps,
  Handle,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";
import PageHeader from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { GitBranch, TrendingUp, TrendingDown, HelpCircle, X } from "lucide-react";
import { clsxMerge } from "@/lib/utils";

interface NodeData {
  label: string;
  type: "signal" | "intermediate" | "conclusion";
  impact: "supports" | "conflicts" | "unresolved";
  evidence?: string;
  detail?: string;
}

const impactStyles: Record<string, { border: string; bg: string; text: string; glow: string }> = {
  supports: {
    border: "border-emerald-500/40",
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    glow: "shadow-[0_0_12px_rgba(34,197,94,0.2)]",
  },
  conflicts: {
    border: "border-red-500/40",
    bg: "bg-red-500/10",
    text: "text-red-400",
    glow: "shadow-[0_0_12px_rgba(220,38,38,0.2)]",
  },
  unresolved: {
    border: "border-amber-500/40",
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    glow: "shadow-[0_0_12px_rgba(217,119,6,0.2)]",
  },
};

function SignalNode({ data }: NodeProps<NodeData>) {
  const s = impactStyles[data.impact];
  const isConclusion = data.type === "conclusion";
  const isSignal = data.type === "signal";

  return (
    <div
      className={clsxMerge(
        "relative border rounded-lg transition-all cursor-pointer select-none",
        isConclusion ? "px-4 py-3 min-w-[180px] text-center" : "px-3 py-2.5 min-w-[160px]",
        isSignal ? "min-w-[150px]" : "",
        s.border,
        s.bg,
        s.glow
      )}
    >
      <Handle type="target" position={Position.Top} style={{ background: "transparent", border: "none" }} />
      <div className={clsxMerge("text-xs font-semibold leading-snug", s.text, isConclusion && "text-sm font-bold")}>
        {data.label}
      </div>
      {data.evidence && (
        <div className="text-[10px] text-muted-foreground mt-1 leading-tight">{data.evidence}</div>
      )}
      <Handle type="source" position={Position.Bottom} style={{ background: "transparent", border: "none" }} />
    </div>
  );
}

const NODES: Node<NodeData>[] = [
  // === SUPPORTING CHAIN ===
  { id: "s1", type: "signalNode", position: { x: 60, y: 40 }, data: { label: "Stable Verified Income", type: "signal", impact: "supports", evidence: "₹24L annualized, 12-month history" } },
  { id: "s2", type: "signalNode", position: { x: 60, y: 150 }, data: { label: "Repayment Behavior", type: "signal", impact: "supports", evidence: "98% on-time, 36 months" } },
  { id: "s3", type: "signalNode", position: { x: 60, y: 260 }, data: { label: "Account Continuity", type: "signal", impact: "supports", evidence: "8+ year relationship" } },
  { id: "s4", type: "signalNode", position: { x: 60, y: 370 }, data: { label: "Repayment Capacity", type: "intermediate", impact: "supports", evidence: "Income > Expenses + Debt Service" } },
  { id: "s5", type: "signalNode", position: { x: 60, y: 480 }, data: { label: "SUPPORTING EVIDENCE", type: "conclusion", impact: "supports", detail: "4 signals substantiate assessment" } },

  // === CONFLICTING CHAIN ===
  { id: "c1", type: "signalNode", position: { x: 320, y: 40 }, data: { label: "Debt Grew +28%", type: "signal", impact: "conflicts", evidence: "₹14.1L → ₹18L in 6 months" } },
  { id: "c2", type: "signalNode", position: { x: 320, y: 150 }, data: { label: "Credit Utilization 72%", type: "signal", impact: "conflicts", evidence: "Above 70% threshold" } },
  { id: "c3", type: "signalNode", position: { x: 320, y: 260 }, data: { label: "Spending Volatility", type: "signal", impact: "conflicts", evidence: "3 spike months detected" } },
  { id: "c4", type: "signalNode", position: { x: 320, y: 370 }, data: { label: "Liquidity Pressure", type: "intermediate", impact: "conflicts", evidence: "Growing obligations vs. stable income" } },
  { id: "c5", type: "signalNode", position: { x: 320, y: 480 }, data: { label: "CONFLICTING EVIDENCE", type: "conclusion", impact: "conflicts", detail: "3 signals contradict assessment" } },

  // === UNRESOLVED CHAIN ===
  { id: "u1", type: "signalNode", position: { x: 580, y: 40 }, data: { label: "Employment Unverified", type: "signal", impact: "unresolved", evidence: "No independent confirmation" } },
  { id: "u2", type: "signalNode", position: { x: 580, y: 150 }, data: { label: "Liability Statement Missing", type: "signal", impact: "unresolved", evidence: "Last bureau pull: 45 days ago" } },
  { id: "u3", type: "signalNode", position: { x: 580, y: 260 }, data: { label: "Income Continuity Uncertain", type: "intermediate", impact: "unresolved", evidence: "Cannot project future capacity" } },
  { id: "u4", type: "signalNode", position: { x: 580, y: 370 }, data: { label: "True Debt Exposure Unknown", type: "intermediate", impact: "unresolved", evidence: "Potential undisclosed liabilities" } },
  { id: "u5", type: "signalNode", position: { x: 580, y: 480 }, data: { label: "UNRESOLVED FACTORS", type: "conclusion", impact: "unresolved", detail: "2 material gaps — review required" } },
];

const edgeStyle = {
  supports: { stroke: "#16A34A", strokeWidth: 1.5 },
  conflicts: { stroke: "#DC2626", strokeWidth: 1.5 },
  unresolved: { stroke: "#D97706", strokeWidth: 1.5 },
};

const EDGES: Edge[] = [
  { id: "e-s1-s4", source: "s1", target: "s4", style: edgeStyle.supports, animated: true },
  { id: "e-s2-s4", source: "s2", target: "s4", style: edgeStyle.supports, animated: true },
  { id: "e-s3-s4", source: "s3", target: "s4", style: edgeStyle.supports, animated: true },
  { id: "e-s4-s5", source: "s4", target: "s5", style: edgeStyle.supports, animated: true },
  { id: "e-c1-c4", source: "c1", target: "c4", style: edgeStyle.conflicts, animated: true },
  { id: "e-c2-c4", source: "c2", target: "c4", style: edgeStyle.conflicts, animated: true },
  { id: "e-c3-c4", source: "c3", target: "c4", style: edgeStyle.conflicts, animated: true },
  { id: "e-c4-c5", source: "c4", target: "c5", style: edgeStyle.conflicts, animated: true },
  { id: "e-u1-u3", source: "u1", target: "u3", style: edgeStyle.unresolved, animated: true },
  { id: "e-u2-u4", source: "u2", target: "u4", style: edgeStyle.unresolved, animated: true },
  { id: "e-u3-u5", source: "u3", target: "u5", style: edgeStyle.unresolved, animated: true },
  { id: "e-u4-u5", source: "u4", target: "u5", style: edgeStyle.unresolved, animated: true },
];

export default function EvidenceGraphPage() {
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);

  const nodeTypes = useMemo(() => ({ signalNode: SignalNode }), []);

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node<NodeData>) => {
    setSelectedNode(node.data);
  }, []);

  return (
    <div className="space-y-6 animate-fade-in pb-8">
      <PageHeader
        title="Evidence Graph"
        subtitle="Trace how individual signals flow into the assessment. Click any node to inspect its evidence."
        badge={
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
            <GitBranch className="size-3.5 text-primary" />
            <span>FL-1024 · Decision Traceability</span>
          </div>
        }
      />

      {/* Chain Legend Labels */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Supporting Evidence Chain", icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-500/5 border-emerald-500/30" },
          { label: "Conflicting Evidence Chain", icon: TrendingDown, color: "text-red-400", bg: "bg-red-500/5 border-red-500/30" },
          { label: "Unresolved Factor Chain", icon: HelpCircle, color: "text-amber-400", bg: "bg-amber-500/5 border-amber-500/30" },
        ].map(({ label, icon: Icon, color, bg }) => (
          <div key={label} className={clsxMerge("flex items-center gap-2.5 px-4 py-3 rounded-xl border text-xs font-semibold", bg, color)}>
            <Icon className="size-4 shrink-0" />
            {label}
          </div>
        ))}
      </div>

      {/* Graph + Detail Panel */}
      <div className="flex gap-5">
        {/* Graph Canvas */}
        <div className="flex-1 border border-border rounded-xl overflow-hidden" style={{ height: 600 }}>
          <ReactFlow
            nodes={NODES}
            edges={EDGES}
            nodeTypes={nodeTypes}
            onNodeClick={onNodeClick}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            proOptions={{ hideAttribution: true }}
          >
            <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#1E2230" />
            <Controls showInteractive={false} />
          </ReactFlow>
        </div>

        {/* Detail Panel */}
        {selectedNode ? (
          <Card className="w-72 border-border bg-card p-5 rounded-xl flex flex-col flex-shrink-0 animate-fade-in">
            <div className="flex items-start justify-between gap-2 mb-4">
              <div className="text-sm font-bold text-foreground leading-snug">{selectedNode.label}</div>
              <button
                onClick={() => setSelectedNode(null)}
                className="size-6 flex items-center justify-center rounded-md hover:bg-muted text-muted-foreground shrink-0 transition-colors"
              >
                <X className="size-3.5" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Node Type
                </div>
                <div className="text-xs text-foreground/85 capitalize">
                  {selectedNode.type.replace("_", " ")}
                </div>
              </div>
              {selectedNode.evidence && (
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Evidence
                  </div>
                  <div className={clsxMerge(
                    "text-xs text-foreground/85 leading-relaxed p-3 rounded-lg border",
                    impactStyles[selectedNode.impact].bg,
                    impactStyles[selectedNode.impact].border
                  )}>
                    {selectedNode.evidence}
                  </div>
                </div>
              )}
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Signal Impact
                </div>
                <div className={clsxMerge("text-xs font-bold capitalize", impactStyles[selectedNode.impact].text)}>
                  {selectedNode.impact}
                </div>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="w-72 border-border bg-card p-5 rounded-xl flex flex-col items-center justify-center flex-shrink-0 text-center">
            <GitBranch className="size-7 text-muted-foreground mb-3" />
            <div className="text-sm font-semibold text-foreground mb-1">Select a Node</div>
            <div className="text-xs text-muted-foreground leading-relaxed">
              Click any node in the graph to inspect its evidence and signal reasoning.
            </div>
          </Card>
        )}
      </div>

      {/* Explainer Footer */}
      <Card className="p-4 border-border bg-card rounded-xl">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <span className="text-blue-400 font-semibold">Evidence Traceability: </span>
          Each node represents either a raw signal, an intermediate reasoning step, or a final evidence conclusion.
          Connections show how signals flow into higher-level evidence assessments that inform the routing decision.
        </p>
      </Card>
    </div>
  );
}
