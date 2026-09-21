"use client";
// app/analyst-review/page.tsx — Human Review Workspace (Shadcn UI Refactor)

import { useState } from "react";
import { useCaseStore } from "@/store/caseStore";
import PageHeader from "@/components/layout/PageHeader";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SIGNALS, DECISION_CRITICAL_INFO } from "@/data/mockCase";
import {
  ClipboardList,
  CheckCircle2,
  XCircle,
  HelpCircle,
  AlertTriangle,
  Edit3,
  MessageSquare,
  Save,
  RotateCcw,
  ShieldAlert,
  FileText,
} from "lucide-react";
import { clsxMerge } from "@/lib/utils";

const supporting = SIGNALS.filter((s) => s.impact === "supports");
const conflicting = SIGNALS.filter((s) => s.impact === "conflicts");
const unresolved = SIGNALS.filter((s) => s.impact === "unresolved");

type ActionTab = "confirm" | "request_more_info" | "override";

const ACTION_TABS = [
  {
    id: "confirm" as const,
    label: "Confirm Assessment",
    icon: CheckCircle2,
    colorActive: "text-emerald-400",
    borderActive: "border-emerald-500/40 bg-emerald-500/5",
    desc: "Agree with SignalGrid assessment — REVIEW REQUIRED",
  },
  {
    id: "request_more_info" as const,
    label: "Request More Information",
    icon: MessageSquare,
    colorActive: "text-blue-400",
    borderActive: "border-blue-500/40 bg-blue-500/5",
    desc: "Pend the case until additional information is received",
  },
  {
    id: "override" as const,
    label: "Override Assessment",
    icon: Edit3,
    colorActive: "text-red-400",
    borderActive: "border-red-500/40 bg-red-500/5",
    desc: "Record a different conclusion with documented reasoning",
  },
];

interface EvidenceBlockProps {
  title: string;
  items: string[];
  icon: typeof CheckCircle2;
  impact: "supports" | "conflicts" | "unresolved";
}

function EvidenceBlock({ title, items, icon: Icon, impact }: EvidenceBlockProps) {
  const styles = {
    supports: {
      border: "border-emerald-500/30",
      bg: "bg-emerald-500/5",
      icon: "text-emerald-400",
      badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
    },
    conflicts: {
      border: "border-red-500/30",
      bg: "bg-red-500/5",
      icon: "text-red-400",
      badge: "bg-red-500/10 text-red-400 border-red-500/25",
    },
    unresolved: {
      border: "border-amber-500/30",
      bg: "bg-amber-500/5",
      icon: "text-amber-400",
      badge: "bg-amber-500/10 text-amber-400 border-amber-500/25",
    },
  }[impact];

  return (
    <div className={clsxMerge("rounded-xl border p-5", styles.border, styles.bg)}>
      <div className="flex items-center gap-2.5 mb-4">
        <div className={clsxMerge("p-1.5 rounded-md border", styles.badge)}>
          <Icon className={clsxMerge("size-3.5", styles.icon)} />
        </div>
        <span className={clsxMerge("text-xs font-bold uppercase tracking-wider", styles.icon)}>
          {title}
        </span>
        <Badge variant="outline" className={clsxMerge("ml-auto text-[10px] font-mono border", styles.badge)}>
          {items.length} signal{items.length !== 1 ? "s" : ""}
        </Badge>
      </div>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-xs">
            <div className={clsxMerge("size-1.5 rounded-full mt-1.5 shrink-0", styles.icon.replace("text-", "bg-"))} />
            <span className="text-foreground/85 leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AnalystReviewPage() {
  const { analystDecision, overrideReason, overrideRecord, setOverrideReason, saveAnalystDecision } = useCaseStore();
  const [activeTab, setActiveTab] = useState<ActionTab>("confirm");

  const handleSave = () => {
    if (activeTab === "override" && !overrideReason.trim()) return;
    saveAnalystDecision(activeTab, overrideReason);
  };

  const hasDecision = !!overrideRecord;

  return (
    <div className="space-y-6 animate-fade-in pb-8">
      <PageHeader
        title="Analyst Review"
        subtitle="Review the SignalGrid assessment, evaluate the evidence, and record your final decision."
        badge={
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
            <ClipboardList className="size-3.5 text-primary" />
            <span>FL-1024 · Human Review Workspace</span>
          </div>
        }
      />

      {/* Decision Recorded Banner */}
      {hasDecision && (
        <Card className="p-5 border-emerald-500/30 bg-emerald-500/5 rounded-xl">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="size-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-semibold text-emerald-400 mb-0.5">
                Analyst Decision Recorded
              </div>
              <div className="text-xs text-muted-foreground">
                {overrideRecord!.analyst} ·{" "}
                {new Date(overrideRecord!.timestamp).toLocaleString("en-IN")} ·{" "}
                <span className="font-medium capitalize text-foreground/80">
                  {overrideRecord!.decision?.replace("_", " ")}
                </span>
              </div>
              {overrideRecord!.reason && (
                <div className="mt-1.5 text-xs text-muted-foreground italic">
                  &quot;{overrideRecord!.reason}&quot;
                </div>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* Main 12-Column Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left Column: Evidence Pane (8 cols) */}
        <div className="xl:col-span-8 space-y-5">
          {/* System Assessment Status */}
          <Card className="p-5 border-amber-500/30 bg-amber-500/5 rounded-xl">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg border border-amber-500/30 bg-amber-500/10 shrink-0">
                <AlertTriangle className="size-4 text-amber-400" />
              </div>
              <div>
                <div className="text-[10px] font-mono font-semibold text-amber-400 uppercase tracking-wider mb-0.5">
                  SignalGrid Assessment — FL-1024
                </div>
                <div className="text-xl font-extrabold text-foreground tracking-tight">
                  REVIEW REQUIRED
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  Confidence: Medium · Conflict Severity: High
                </div>
              </div>
            </div>
          </Card>

          {/* Evidence Sections */}
          <EvidenceBlock
            title="Supporting Evidence"
            impact="supports"
            icon={CheckCircle2}
            items={supporting.map((s) => `${s.name}: ${s.evidence}`)}
          />
          <EvidenceBlock
            title="Conflicting Evidence"
            impact="conflicts"
            icon={XCircle}
            items={conflicting.map((s) => `${s.name}: ${s.evidence}`)}
          />
          <EvidenceBlock
            title="Unresolved Factors"
            impact="unresolved"
            icon={HelpCircle}
            items={unresolved.map((s) => `${s.name}: ${s.evidence}`)}
          />

          {/* Decision-Critical Information */}
          <Card className="border-border bg-card p-5 rounded-xl">
            <CardHeader className="p-0 pb-4 border-b border-border/70">
              <CardTitle className="text-sm font-semibold tracking-tight text-foreground flex items-center gap-2">
                <FileText className="size-4 text-primary" />
                Decision-Critical Information
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground mt-1">
                Ranked by information gain — resolving these gaps will most significantly shift the assessment.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 pt-4 space-y-3">
              {DECISION_CRITICAL_INFO.filter((d) => d.priority !== "LOW").map((d) => (
                <div key={d.rank} className="flex items-start gap-3 text-xs p-3 rounded-lg bg-muted/20 border border-border/50">
                  <span className="text-muted-foreground font-mono font-bold w-5 shrink-0 mt-0.5">
                    {d.rank}.
                  </span>
                  <div>
                    <span className="font-semibold text-foreground">{d.title}</span>
                    <span className="text-muted-foreground ml-1">— {d.reason}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* System Recommendation */}
          <Card className="border-border bg-card p-5 rounded-xl">
            <div className="text-[10px] font-mono font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              System Recommendation
            </div>
            <p className="text-sm text-foreground/85 leading-relaxed">
              Obtain employment verification and current liability statement before finalizing. If both are
              satisfactory, case may qualify for Standard Review. If liabilities are materially higher,
              consider escalation.
            </p>
          </Card>
        </div>

        {/* Right Column: Analyst Decision Panel (4 cols) */}
        <div className="xl:col-span-4 space-y-5">
          {/* Decision Card */}
          <Card className="border-border bg-card p-6 rounded-xl shadow-sm">
            <div className="text-[11px] font-mono font-bold text-muted-foreground uppercase tracking-wider pb-4 mb-4 border-b border-border/70">
              Analyst Decision
            </div>

            {/* Action Tabs */}
            <div className="space-y-2.5 mb-5">
              {ACTION_TABS.map(({ id, label, icon: Icon, colorActive, borderActive, desc }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={clsxMerge(
                    "w-full flex items-start gap-3 p-4 rounded-xl border transition-all text-left",
                    activeTab === id
                      ? borderActive
                      : "border-border bg-muted/20 hover:border-border/80 hover:bg-muted/40"
                  )}
                >
                  <Icon
                    className={clsxMerge(
                      "size-4 shrink-0 mt-0.5",
                      activeTab === id ? colorActive : "text-muted-foreground"
                    )}
                  />
                  <div>
                    <div
                      className={clsxMerge(
                        "text-xs font-semibold mb-0.5",
                        activeTab === id ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {label}
                    </div>
                    <div className="text-[11px] text-muted-foreground leading-relaxed">{desc}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Override Reason Textarea */}
            {activeTab === "override" && (
              <div className="mb-5 animate-fade-in">
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Override Reason <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={overrideReason}
                  onChange={(e) => setOverrideReason(e.target.value)}
                  rows={4}
                  placeholder="Document the basis for overriding the system assessment. Include supporting rationale and any additional context..."
                  className="w-full bg-background border border-border rounded-lg px-3.5 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all resize-none leading-relaxed"
                />
              </div>
            )}

            {/* Save Button */}
            <Button
              variant={activeTab === "override" ? "destructive" : "default"}
              size="sm"
              className="w-full justify-center gap-2 font-semibold h-10 text-sm"
              onClick={handleSave}
              disabled={activeTab === "override" && !overrideReason.trim()}
            >
              {hasDecision ? <RotateCcw className="size-4" /> : <Save className="size-4" />}
              {hasDecision ? "Update Decision" : "Save Decision"}
            </Button>

            {activeTab === "override" && !overrideReason.trim() && (
              <p className="mt-2 text-[11px] text-red-400 text-center">
                Override reason is required to proceed
              </p>
            )}
          </Card>

          {/* Audit Note */}
          <Card className="border-border bg-card p-5 rounded-xl">
            <div className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider mb-2.5">
              Audit Note
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <span className="text-blue-400 font-semibold">Automated Logging: </span>
              All analyst decisions are recorded to the Decision Audit Trail with timestamp, actor, and full decision detail.
              This decision is persisted in session memory.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

