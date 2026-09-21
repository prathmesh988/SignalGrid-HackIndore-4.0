"use client";

import PageHeader from "@/components/layout/PageHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import SignalMatrix from "@/components/signal-grid/SignalMatrix";
import { SIGNALS, CASE_FL1024 } from "@/data/mockCase";
import { Grid3x3, CheckCircle2, XCircle, HelpCircle, ShieldCheck, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { clsxMerge } from "@/lib/utils";

const supporting = SIGNALS.filter((s) => s.impact === "supports");
const conflicting = SIGNALS.filter((s) => s.impact === "conflicts");
const unresolved = SIGNALS.filter((s) => s.impact === "unresolved");

function LegendCard({ label, count, color, bg, border, icon }: { label: string; count: number; color: string; bg: string; border: string; icon: React.ReactNode }) {
  return (
    <Card className={clsxMerge("p-4 flex items-center justify-between border shadow-xs", bg, border)}>
      <div className="flex items-center gap-2.5">
        <div className="p-1.5 rounded-lg bg-card/60">{icon}</div>
        <span className="text-xs font-semibold text-foreground">{label}</span>
      </div>
      <span className={clsxMerge("text-lg font-bold font-mono", color)}>
        {count}
      </span>
    </Card>
  );
}

export default function SignalGridPage() {
  return (
    <div className="space-y-6 animate-fade-in pb-8">
      <PageHeader
        title="Signal Contradiction Grid"
        subtitle="Complete catalog of derived financial signals, supporting evidence, confidence pips, and impact vectors."
        badge={
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/25 font-semibold flex items-center gap-1.5">
              <Building2 className="size-3" />
              FL-1024 · Axiom Manufacturing Pvt. Ltd.
            </span>
            <Badge variant="outline" className="text-[11px] text-muted-foreground border-border">
              9 Total Signals
            </Badge>
          </div>
        }
      />

      {/* Metric Legends in consistent 3-column grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <LegendCard
          label="Substantiating Signals"
          count={supporting.length}
          color="text-emerald-400"
          bg="bg-emerald-500/[0.04]"
          border="border-emerald-500/30"
          icon={<CheckCircle2 className="size-4 text-emerald-400" />}
        />
        <LegendCard
          label="Conflicting Signals"
          count={conflicting.length}
          color="text-red-400"
          bg="bg-red-500/[0.04]"
          border="border-red-500/30"
          icon={<XCircle className="size-4 text-red-400" />}
        />
        <LegendCard
          label="Unresolved Factors"
          count={unresolved.length}
          color="text-amber-400"
          bg="bg-amber-500/[0.04]"
          border="border-amber-500/30"
          icon={<HelpCircle className="size-4 text-amber-400" />}
        />
      </div>

      {/* Matrix Table inside shadcn Card with consistent p-6 padding */}
      <Card className="border-border bg-card p-6 rounded-xl shadow-sm space-y-4">
        <CardHeader className="p-0 pb-4 border-b border-border/70 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-sm font-semibold tracking-tight text-foreground flex items-center gap-2">
              <Grid3x3 className="size-4 text-primary" />
              Signal Evaluation Matrix
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-1">
              Click any row to open the granular evidence drawer with raw statement excerpts and verification logs.
            </CardDescription>
          </div>
          <span className="text-[11px] font-mono text-muted-foreground hidden sm:inline">
            Interactive Drawer Enabled
          </span>
        </CardHeader>

        <CardContent className="p-0 pt-4">
          <SignalMatrix signals={SIGNALS} />
        </CardContent>
      </Card>

      {/* Educational Taxonomy Cards with consistent p-5 padding */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-5 border-border bg-card rounded-xl shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-emerald-400">
            <CheckCircle2 className="size-4" />
            <span className="text-xs font-bold text-foreground">Substantiating Signals</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Quantitative and qualitative metrics demonstrating positive repayment capacity, surplus operating cash flow, and track-record reliability.
          </p>
        </Card>

        <Card className="p-5 border-border bg-card rounded-xl shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-red-400">
            <XCircle className="size-4" />
            <span className="text-xs font-bold text-foreground">Conflicting Signals</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Contradictory observations that challenge positive capacity indicators — including sudden credit line spikes, unverified debt, or volatility surges.
          </p>
        </Card>

        <Card className="p-5 border-border bg-card rounded-xl shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-amber-400">
            <HelpCircle className="size-4" />
            <span className="text-xs font-bold text-foreground">Unresolved Factors</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Essential decision-critical items with missing primary source verification. These mandate human reviewer escalation before credit disbursement.
          </p>
        </Card>
      </div>
    </div>
  );
}
