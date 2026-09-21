"use client";

import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  AlertTriangle,
  ChevronRight,
  ArrowDown,
  CheckCircle2,
  HelpCircle,
  XCircle,
  FileCheck2,
  ListChecks,
} from "lucide-react";
import { clsxMerge } from "@/lib/utils";

const WORKFLOW_STEPS = [
  { label: "Financial Signals", sub: "9 quantitative signals derived and benchmarked", icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/30" },
  { label: "Evidence Quality", sub: "5 high / 2 medium / 2 low confidence sources", icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/30" },
  { label: "Conflict Detection", sub: "3 material contradictions detected across sources", icon: XCircle, color: "text-red-400", bg: "bg-red-500/10 border-red-500/30" },
  { label: "Information Gaps", sub: "2 unresolved factors (liabilities & employment)", icon: HelpCircle, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/30" },
  { label: "Confidence Assessment", sub: "Medium confidence score — below automated pass mark", icon: HelpCircle, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/30" },
  { label: "Review Routing", sub: "→ Human Review Required (Assigned: Prathmesh Gawade)", icon: Users, color: "text-primary", bg: "bg-primary/10 border-primary/30" },
];

export default function ReviewCenterPage() {
  return (
    <div className="space-y-6 animate-fade-in pb-8">
      <PageHeader
        title="Review Center"
        subtitle="Orchestrate ambiguous cases and route contradictory signals to human expert review."
        badge={
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
            <Users className="size-3.5 text-primary" />
            <span>FL-1024 · Triage & Routing Orchestration</span>
          </div>
        }
      />

      {/* 12-Column Responsive Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left Column: Routing Workflow (8 cols) */}
        <div className="xl:col-span-8 space-y-6">
          <Card className="border-border bg-card p-6 rounded-xl shadow-sm">
            <CardHeader className="p-0 pb-4 border-b border-border/70">
              <CardTitle className="text-sm font-semibold tracking-tight text-foreground flex items-center gap-2">
                <Users className="size-4 text-primary" />
                Underwriting Decision Pipeline
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground mt-1">
                Step-by-step algorithmic triage evaluating evidence reliability, conflict severity, and human escalation thresholds.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-0 pt-4">
              <div className="space-y-3">
                {WORKFLOW_STEPS.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.label} className="relative">
                      <div className="flex items-center gap-3.5 p-4 rounded-xl border border-border/70 bg-muted/20 hover:border-border transition-all">
                        <div className={clsxMerge("size-8 rounded-lg flex items-center justify-center shrink-0 border", step.bg)}>
                          <Icon className={clsxMerge("size-4", step.color)} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-foreground">{step.label}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{step.sub}</div>
                        </div>
                        <div className="text-xs text-muted-foreground font-mono font-semibold">
                          {String(i + 1).padStart(2, "0")}
                        </div>
                      </div>
                      {i < WORKFLOW_STEPS.length - 1 && (
                        <div className="flex justify-center py-1">
                          <ArrowDown className="size-3.5 text-muted-foreground/60" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Routing Output & Case Details (4 cols) */}
        <div className="xl:col-span-4 space-y-6">
          {/* Dominant Routing Output */}
          <Card className="p-6 border-amber-500/30 bg-amber-500/[0.05] rounded-xl shadow-sm space-y-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="size-4 text-amber-400" />
              <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                Consensus Routing
              </span>
            </div>
            <h3 className="text-lg font-bold text-foreground">
              HUMAN REVIEW REQUIRED
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              High conflict severity between revenue and rapid leverage accumulation exceeds automated threshold.
            </p>
          </Card>

          {/* Case Review Details */}
          <Card className="border-border bg-card p-6 rounded-xl shadow-sm space-y-4">
            <div className="text-[11px] font-mono font-bold text-muted-foreground uppercase tracking-wider pb-3 border-b border-border/70">
              Assigned Review Metadata
            </div>
            <div className="space-y-3">
              {[
                { label: "Target Case", value: "FL-1024 (Axiom Mfg.)" },
                { label: "Risk Priority", value: "High", color: "text-red-400 font-semibold" },
                { label: "Assigned Analyst", value: "Prathmesh Gawade", color: "text-primary font-semibold" },
                { label: "Trigger Mechanism", value: "Neural Conflict Gate" },
                { label: "Escalation Reason", value: "3 Conflicts + 2 Information Gaps" },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex justify-between items-start text-xs">
                  <span className="text-muted-foreground">{label}</span>
                  <span className={clsxMerge("text-right font-medium", color || "text-foreground")}>{value}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="border-border bg-card p-6 rounded-xl shadow-sm space-y-4">
            <div className="text-[11px] font-mono font-bold text-muted-foreground uppercase tracking-wider pb-2 border-b border-border/70">
              Recommended Next Action
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Obtain verified current liability statement and third-party employment confirmation before formal sign-off.
            </p>
            <div className="space-y-2 pt-1">
              <Link href="/analyst-review" className="block">
                <Button variant="default" size="sm" className="w-full justify-center gap-1.5 font-semibold text-xs">
                  <FileCheck2 className="size-3.5" />
                  <span>Open Analyst Review Workspace</span>
                </Button>
              </Link>
              <Link href="/what-matters-next" className="block">
                <Button variant="outline" size="sm" className="w-full justify-center gap-1.5 border-border text-xs">
                  <ListChecks className="size-3.5" />
                  <span>Request Missing Information</span>
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

