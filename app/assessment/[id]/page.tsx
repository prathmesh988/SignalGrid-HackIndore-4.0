"use client";

import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { AssessmentBadge, ConfidenceBadge, ConflictBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SignalMatrix from "@/components/signal-grid/SignalMatrix";
import { CASE_FL1024, SIGNALS } from "@/data/mockCase";
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Users,
  ArrowRight,
  GitBranch,
  SlidersHorizontal,
  FileText,
  ClipboardList,
  Building2,
  AlertTriangle,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { clsxMerge } from "@/lib/utils";

const supporting = SIGNALS.filter((s) => s.impact === "supports");
const conflicting = SIGNALS.filter((s) => s.impact === "conflicts");
const unresolved = SIGNALS.filter((s) => s.impact === "unresolved");

interface SummaryCardProps {
  title: string;
  count: number;
  items: string[];
  variant: "support" | "conflict" | "unresolved" | "routing";
  icon: React.ReactNode;
  routingContent?: React.ReactNode;
}

function SummaryCard({ title, count, items, variant, icon, routingContent }: SummaryCardProps) {
  const badgeConfig = {
    support: {
      badgeBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      dot: "bg-emerald-500",
      countColor: "text-emerald-400",
    },
    conflict: {
      badgeBg: "bg-red-500/10 text-red-400 border-red-500/30",
      dot: "bg-red-500",
      countColor: "text-red-400",
    },
    unresolved: {
      badgeBg: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      dot: "bg-amber-500",
      countColor: "text-amber-400",
    },
    routing: {
      badgeBg: "bg-blue-500/10 text-blue-400 border-blue-500/30",
      dot: "bg-blue-500",
      countColor: "text-blue-400",
    },
  }[variant];

  return (
    <Card className="p-5 flex flex-col justify-between hover:border-border transition-all">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            {title}
          </span>
          <span className={clsxMerge("p-1.5 rounded-lg border", badgeConfig.badgeBg)}>
            {icon}
          </span>
        </div>

        {routingContent ? (
          routingContent
        ) : (
          <>
            <div className={clsxMerge("text-2xl font-bold font-mono tracking-tight mb-3", badgeConfig.countColor)}>
              {count} <span className="text-xs font-normal text-muted-foreground">Signals</span>
            </div>
            <ul className="space-y-2">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs">
                  <div className={clsxMerge("size-1.5 rounded-full mt-1.5 shrink-0", badgeConfig.dot)} />
                  <span className="text-muted-foreground leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </Card>
  );
}

export default function AssessmentPage() {
  return (
    <div className="space-y-6 animate-fade-in pb-8">
      {/* 1. Header with Case Context & Navigation Actions */}
      <PageHeader
        title={CASE_FL1024.applicant}
        subtitle="Multi-signal explainable financial decision intelligence assessment."
        badge={
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/25 font-semibold flex items-center gap-1.5">
              <Building2 className="size-3" />
              {CASE_FL1024.id} · {CASE_FL1024.industry}
            </span>
            <Badge variant="outline" className="text-[11px] text-muted-foreground border-border">
              Facility: ₹14.2 Cr
            </Badge>
          </div>
        }
        actions={
          <div className="flex items-center gap-2 flex-wrap">
            <Link href="/evidence-graph">
              <Button variant="outline" size="sm" icon={<GitBranch className="size-3.5" />}>
                Evidence Graph
              </Button>
            </Link>
            <Link href="/decision-sensitivity">
              <Button variant="outline" size="sm" icon={<SlidersHorizontal className="size-3.5" />}>
                Sensitivity
              </Button>
            </Link>
            <Link href="/decision-brief">
              <Button variant="outline" size="sm" icon={<FileText className="size-3.5" />}>
                Decision Brief
              </Button>
            </Link>
            <Link href="/review-center">
              <Button variant="default" size="sm" icon={<Users className="size-3.5" />}>
                Review Center
              </Button>
            </Link>
          </div>
        }
      />

      {/* 2. Dominant Consensus Status Card */}
      <Card className="p-6 border-amber-500/30 bg-amber-500/[0.04] rounded-xl shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 shrink-0 mt-0.5">
              <AlertTriangle className="size-6 text-amber-400" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-semibold mb-1">
                Triage Consensus Status
              </div>
              <h2 className="text-xl font-extrabold text-foreground tracking-tight">
                REVIEW REQUIRED
              </h2>
              <p className="text-xs text-muted-foreground mt-1 max-w-2xl leading-relaxed">
                Materially conflicting financial signals detected between stable historic cashflows and sudden credit line acceleration. Automated approval threshold breached.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-border/60">
            <div className="p-3 rounded-lg bg-card border border-border/80 text-center min-w-[120px]">
              <span className="text-[10px] uppercase font-semibold text-muted-foreground block mb-1">
                Confidence
              </span>
              <ConfidenceBadge level="medium" size="md" />
            </div>
            <div className="p-3 rounded-lg bg-card border border-border/80 text-center min-w-[120px]">
              <span className="text-[10px] uppercase font-semibold text-muted-foreground block mb-1">
                Conflict Severity
              </span>
              <ConflictBadge level="high" size="md" />
            </div>
          </div>
        </div>
      </Card>

      {/* 3. Four Consistent Summary Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
        <SummaryCard
          title="Substantiating"
          count={supporting.length}
          items={[
            "Stable verified operating income",
            "36-month on-time debt repayment",
            "Positive net operating cash flow",
            "8+ years continuous banking relation",
          ]}
          variant="support"
          icon={<CheckCircle2 className="size-4 text-emerald-400" />}
        />
        <SummaryCard
          title="Conflicting"
          count={conflicting.length}
          items={[
            "Rapid debt accumulation (+28% in 6 mo)",
            "Elevated spending variance (σ = 1.8)",
            "Credit card utilization peaked at 72%",
          ]}
          variant="conflict"
          icon={<XCircle className="size-4 text-red-400" />}
        />
        <SummaryCard
          title="Unresolved"
          count={unresolved.length}
          items={[
            "Employment continuity not verified",
            "Current liability statement unavailable",
          ]}
          variant="unresolved"
          icon={<HelpCircle className="size-4 text-amber-400" />}
        />
        <SummaryCard
          title="Consensus Routing"
          count={0}
          items={[]}
          variant="routing"
          icon={<Users className="size-4 text-blue-400" />}
          routingContent={
            <div className="space-y-3">
              <div>
                <div className="text-lg font-bold text-foreground">Human Review</div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  Assigned: <strong>Prathmesh Gawade</strong>
                </div>
              </div>
              <div className="text-[11px] text-muted-foreground bg-muted/40 p-2 rounded border border-border/60">
                High conflict severity + 2 material information gaps require analyst override or sign-off.
              </div>
              <Link href="/review-center" className="block">
                <Button variant="default" size="xs" className="w-full justify-center gap-1.5 text-xs py-1.5">
                  <span>Open Review Center</span>
                  <ArrowRight className="size-3" />
                </Button>
              </Link>
            </div>
          }
        />
      </div>

      {/* 4. Executive Summary Card with Consistent p-6 Padding */}
      <Card className="border-border bg-card p-6 rounded-xl shadow-sm">
        <CardHeader className="p-0 pb-4 border-b border-border/70">
          <CardTitle className="text-sm font-semibold tracking-tight text-foreground flex items-center gap-2">
            <FileText className="size-4 text-primary" />
            Executive Synthesis & Causality Brief
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground mt-1">
            Automated multi-signal reconciliation synthesized across verified banking, bureau, and behavioural sources.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 pt-4">
          <p className="text-xs text-foreground/90 leading-relaxed font-sans">
            {CASE_FL1024.executiveSummary}
          </p>
        </CardContent>
      </Card>

      {/* 5. Signal Matrix Table Card with Consistent p-6 Padding */}
      <Card className="border-border bg-card p-6 rounded-xl shadow-sm">
        <CardHeader className="p-0 pb-4 border-b border-border/70 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-sm font-semibold tracking-tight text-foreground flex items-center gap-2">
              <ShieldCheck className="size-4 text-primary" />
              Underlying Signal Matrix (9 Derived Signals)
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-1">
              Click any signal row to inspect supporting evidence, audit confidence, and counterfactual sensitivity.
            </CardDescription>
          </div>
          <Link href="/signal-grid">
            <Button variant="ghost" size="sm" className="text-xs gap-1 text-primary hover:text-primary">
              <span>Full Signal Grid</span>
              <ArrowRight className="size-3.5" />
            </Button>
          </Link>
        </CardHeader>

        <CardContent className="p-0 pt-5">
          <SignalMatrix signals={SIGNALS} />
        </CardContent>
      </Card>

      {/* 6. Quick Deep-Dive Navigation Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
        {[
          { label: "Evidence Graph", href: "/evidence-graph", icon: GitBranch, desc: "Trace causal dependencies" },
          { label: "Decision Sensitivity", href: "/decision-sensitivity", icon: SlidersHorizontal, desc: "Interactive what-if engine" },
          { label: "What Matters Next", href: "/what-matters-next", icon: ClipboardList, desc: "Priority gap resolution" },
          { label: "Audit Trail", href: "/audit-trail", icon: ShieldCheck, desc: "Full reasoning trace & logs" },
        ].map(({ label, href, icon: Icon, desc }) => (
          <Link key={href} href={href} className="block group">
            <Card className="p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-all shadow-sm">
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="p-1.5 rounded-lg bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <Icon className="size-4" />
                </div>
                <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                  {label}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground">{desc}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
