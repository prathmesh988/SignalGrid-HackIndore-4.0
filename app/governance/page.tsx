"use client";

import PageHeader from "@/components/layout/PageHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, KpiCard } from "@/components/ui/card";
import { ShieldCheck, Database, GitBranch, User, ClipboardList, CheckCircle2, AlertCircle, HelpCircle } from "lucide-react";
import { clsxMerge } from "@/lib/utils";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

const coverageData = [
  { name: "Coverage", value: 87, fill: "#16A34A" },
];

interface GovernanceLine {
  label: string;
  value: string;
  status: "green" | "amber" | "red" | "blue";
  icon: typeof CheckCircle2;
}

const lines: GovernanceLine[] = [
  { label: "Evidence Coverage", value: "87% of required data points present and verified", status: "green", icon: Database },
  { label: "Signal Confidence", value: "Medium (5 high, 2 medium, 2 low confidence signals)", status: "amber", icon: GitBranch },
  { label: "Material Conflicts", value: "3 conflicts detected and logged for analyst review", status: "red", icon: AlertCircle },
  { label: "Unresolved Factors", value: "2 open information gaps requiring third-party verification", status: "amber", icon: HelpCircle },
  { label: "Audit Attributability", value: "All algorithmic derivations trace to timestamped raw documents", status: "green", icon: ShieldCheck },
  { label: "Analyst Decision", value: "Pending human-in-the-loop review by Prathmesh Gawade", status: "blue", icon: User },
];

const statusStyle = {
  green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  amber: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  red: "bg-red-500/10 text-red-400 border-red-500/30",
  blue: "bg-blue-500/10 text-blue-400 border-blue-500/30",
};

const statusDot = {
  green: "bg-emerald-500",
  amber: "bg-amber-500",
  red: "bg-red-500",
  blue: "bg-blue-500",
};

export default function GovernancePage() {
  return (
    <div className="space-y-6 animate-fade-in pb-8">
      <PageHeader
        title="Model Governance"
        subtitle="Evidence quality, audit completeness, and decision integrity tracking for FL-1024."
        badge={
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
            <ShieldCheck className="size-3.5 text-primary" />
            <span>Algorithmic Compliance & Provenance</span>
          </div>
        }
      />

      {/* 1. Consistent KPI Metrics */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
        <KpiCard label="Evidence Coverage" value="87%" sub="Of required data points verified" accent="support" />
        <KpiCard label="Signal Confidence" value="Medium" sub="Aggregate multi-source score" accent="unresolved" />
        <KpiCard label="Material Conflicts" value={3} sub="Detected and logged in matrix" accent="conflict" />
        <KpiCard label="Unresolved Factors" value={2} sub="Open third-party gaps" accent="info" />
      </div>

      {/* 2. 12-Column Responsive Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left: Governance Checklist (8 cols) */}
        <div className="xl:col-span-8 space-y-6">
          <Card className="border-border bg-card p-6 rounded-xl shadow-sm">
            <CardHeader className="p-0 pb-4 border-b border-border/70">
              <CardTitle className="text-sm font-semibold tracking-tight text-foreground flex items-center gap-2">
                <ShieldCheck className="size-4 text-primary" />
                Compliance & Quality Checklist
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground mt-1">
                Automated validation of regulatory evidence standards, provenance traces, and model guardrails.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-0 pt-4">
              <div className="divide-y divide-border/60">
                {lines.map((line) => {
                  const Icon = line.icon;
                  return (
                    <div key={line.label} className="flex items-start gap-3.5 py-4 first:pt-2 last:pb-2">
                      <div
                        className={clsxMerge(
                          "size-8 rounded-lg border flex items-center justify-center shrink-0 mt-0.5",
                          statusStyle[line.status]
                        )}
                      >
                        <Icon className="size-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-foreground mb-0.5">{line.label}</div>
                        <div className="text-xs text-muted-foreground">{line.value}</div>
                      </div>
                      <div className={clsxMerge("size-2 rounded-full mt-2 shrink-0", statusDot[line.status])} />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Data Completeness & Overall Status (4 cols) */}
        <div className="xl:col-span-4 space-y-6">
          <Card className="border-border bg-card p-6 rounded-xl shadow-sm text-center">
            <div className="text-[11px] font-mono font-bold text-muted-foreground uppercase tracking-wider mb-2">
              Data Completeness Meter
            </div>
            <div className="h-40 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  innerRadius="65%"
                  outerRadius="95%"
                  data={coverageData}
                  startAngle={90}
                  endAngle={-270}
                >
                  <RadialBar
                    dataKey="value"
                    cornerRadius={8}
                    background={{ fill: "#14181F" }}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
            <div className="-mt-14">
              <div className="text-3xl font-extrabold font-mono text-emerald-400">87%</div>
              <div className="text-xs text-muted-foreground mt-0.5">Evidence Coverage</div>
            </div>
          </Card>

          <Card className="border-border bg-card p-6 rounded-xl shadow-sm space-y-4">
            <div className="text-[11px] font-mono font-bold text-muted-foreground uppercase tracking-wider pb-3 border-b border-border/70">
              Audit & Governance Trace
            </div>
            <div className="space-y-3">
              {[
                { label: "Data Completeness", status: "Partial (87%)", color: "text-amber-400" },
                { label: "Evidence Provenance", status: "Complete", color: "text-emerald-400" },
                { label: "Human Override Count", status: "0", color: "text-foreground" },
                { label: "Lead Reviewer", status: "Prathmesh Gawade", color: "text-primary font-semibold" },
                { label: "Audit Trail Signature", status: "SHA-256 Verified", color: "text-emerald-400 font-mono text-[10px]" },
              ].map(({ label, status, color }) => (
                <div key={label} className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">{label}</span>
                  <span className={clsxMerge("font-medium", color)}>{status}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

