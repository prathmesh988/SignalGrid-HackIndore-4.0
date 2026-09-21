"use client";

import PageHeader from "@/components/layout/PageHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CASE_FL1024, SIGNALS, DECISION_CRITICAL_INFO } from "@/data/mockCase";
import { FileText, Printer, CheckCircle2, XCircle, HelpCircle, Users, Building2, ShieldCheck } from "lucide-react";
import { clsxMerge } from "@/lib/utils";

const supporting = SIGNALS.filter((s) => s.impact === "supports");
const conflicting = SIGNALS.filter((s) => s.impact === "conflicts");
const unresolved = SIGNALS.filter((s) => s.impact === "unresolved");

interface BriefSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function BriefSection({ title, icon, children }: BriefSectionProps) {
  return (
    <div className="py-5 border-b border-border/70 last:border-b-0 space-y-3">
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{title}</h3>
      </div>
      <div>{children}</div>
    </div>
  );
}

function EvidenceList({ items, variant }: { items: { name: string; evidence: string }[]; variant: "supports" | "conflicts" | "unresolved" }) {
  const dotColor = {
    supports: "bg-emerald-500",
    conflicts: "bg-red-500",
    unresolved: "bg-amber-500",
  }[variant];

  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-xs leading-relaxed">
          <div className={clsxMerge("size-1.5 rounded-full mt-1.5 shrink-0", dotColor)} />
          <div>
            <span className="font-semibold text-foreground">{item.name}</span>
            <span className="text-muted-foreground"> — {item.evidence}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function DecisionBriefPage() {
  const date = new Date().toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-6 animate-fade-in pb-8 max-w-4xl mx-auto">
      <PageHeader
        title="Explainable Decision Brief"
        subtitle="Auditable executive memorandum detailing multi-signal consensus and causality trace."
        badge={
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
            <FileText className="size-3.5 text-primary" />
            <span>FL-1024 · Underwriting Brief</span>
          </div>
        }
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            icon={<Printer className="size-3.5" />}
            className="border-border text-xs gap-1.5"
          >
            Print Memorandum
          </Button>
        }
      />

      {/* Structured shadcn Card with consistent p-8 padding */}
      <Card className="border-border bg-card p-8 rounded-xl shadow-sm space-y-6">
        {/* Memo Header */}
        <div className="pb-6 border-b border-border/80 flex flex-col sm:flex-row items-start justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">
              Internal Underwriting Memorandum
            </span>
            <div className="text-xs font-mono text-muted-foreground mt-0.5 mb-3">
              REF: {CASE_FL1024.id} · {date}
            </div>
            <h2 className="text-xl font-bold text-foreground tracking-tight">
              {CASE_FL1024.applicant}
            </h2>
            <div className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
              <span>{CASE_FL1024.assessmentType}</span>
              <span>·</span>
              <span>{CASE_FL1024.industry}</span>
              <span>·</span>
              <span>Facility: ₹14.2 Cr</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-muted/30 border border-border/60 text-right sm:min-w-[180px]">
            <span className="text-[10px] font-mono text-muted-foreground uppercase block mb-1">
              Lead Reviewer
            </span>
            <div className="text-sm font-bold text-foreground">
              Prathmesh Gawade
            </div>
            <div className="text-[11px] text-muted-foreground mt-0.5">
              Risk Analyst · Credit Committee
            </div>
          </div>
        </div>

        {/* Section: Consensus Outcome */}
        <BriefSection
          title="Consensus Decision Status"
          icon={<ShieldCheck className="size-4 text-amber-400" />}
        >
          <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/[0.04] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">
                Triage Result
              </span>
              <div className="text-lg font-bold text-foreground mt-0.5">
                REVIEW REQUIRED
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Multi-signal contradiction detected between revenue and recent debt acceleration.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-card border border-border/70 text-center">
                <span className="text-[10px] text-muted-foreground uppercase block">Confidence</span>
                <span className="font-bold text-foreground font-mono">Medium</span>
              </div>
              <div className="p-2.5 rounded-lg bg-card border border-border/70 text-center">
                <span className="text-[10px] text-muted-foreground uppercase block">Severity</span>
                <span className="font-bold text-red-400 font-mono">High</span>
              </div>
            </div>
          </div>
        </BriefSection>

        {/* Section: Executive Summary */}
        <BriefSection
          title="Executive Causality Synthesis"
          icon={<FileText className="size-4 text-primary" />}
        >
          <p className="text-xs text-foreground/90 leading-relaxed font-sans">
            {CASE_FL1024.executiveSummary}
          </p>
        </BriefSection>

        {/* Section: Substantiating Evidence */}
        <BriefSection
          title="Substantiating Signals (4)"
          icon={<CheckCircle2 className="size-4 text-emerald-400" />}
        >
          <EvidenceList
            items={supporting.map((s) => ({ name: s.name, evidence: s.evidence }))}
            variant="supports"
          />
        </BriefSection>

        {/* Section: Conflicting Evidence */}
        <BriefSection
          title="Contradictory Signals (3)"
          icon={<XCircle className="size-4 text-red-400" />}
        >
          <EvidenceList
            items={conflicting.map((s) => ({ name: s.name, evidence: s.evidence }))}
            variant="conflicts"
          />
        </BriefSection>

        {/* Section: Unresolved Information Gaps */}
        <BriefSection
          title="Unresolved Gaps (2)"
          icon={<HelpCircle className="size-4 text-amber-400" />}
        >
          <EvidenceList
            items={unresolved.map((s) => ({ name: s.name, evidence: s.evidence }))}
            variant="unresolved"
          />
        </BriefSection>

        {/* Section: Signature & Sign-Off */}
        <div className="pt-6 border-t border-border/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>
            <span>Attributable to: </span>
            <strong className="text-foreground font-medium">Prathmesh Gawade</strong>
            <span> · Decision Record ID: #REC-FL1024-V2</span>
          </div>
          <div className="font-mono text-[11px] text-emerald-400">
            Hash: SHA256:8f4c...3e1a (Verified)
          </div>
        </div>
      </Card>
    </div>
  );
}
