"use client";

import { useCaseStore } from "@/store/caseStore";
import PageHeader from "@/components/layout/PageHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, KpiCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClipboardList, Server, User, Zap, Flag, ShieldCheck } from "lucide-react";
import { clsxMerge } from "@/lib/utils";
import type { AuditEvent } from "@/data/mockCase";

const eventTypeConfig = {
  system: { icon: Server, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/30", label: "System" },
  signal: { icon: Zap, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/30", label: "Signal Engine" },
  decision: { icon: Flag, color: "text-primary", bg: "bg-primary/10 border-primary/30", label: "Decision" },
  analyst: { icon: User, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/30", label: "Analyst" },
};

function AuditEventCard({ event, isLast }: { event: AuditEvent; isLast: boolean }) {
  const config = eventTypeConfig[event.type];
  const Icon = config.icon;

  return (
    <div className="flex gap-4">
      {/* Timeline line + icon */}
      <div className="flex flex-col items-center shrink-0">
        <div className={clsxMerge("size-8 rounded-full border flex items-center justify-center shrink-0 z-10", config.bg)}>
          <Icon className={clsxMerge("size-4", config.color)} />
        </div>
        {!isLast && <div className="w-px flex-1 bg-border/70 my-1" />}
      </div>

      {/* Content */}
      <div className={clsxMerge("flex-1 pb-6", isLast && "pb-0")}>
        <div className="flex items-start justify-between gap-3 mb-1">
          <div>
            <span className="text-sm font-bold text-foreground">{event.event}</span>
            <span className={clsxMerge("ml-2 text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded border", config.bg, config.color)}>
              {config.label}
            </span>
          </div>
          <div className="text-right shrink-0">
            <div className="text-xs font-mono text-muted-foreground">{event.time}</div>
          </div>
        </div>
        <div className="text-xs font-medium text-primary mb-1">{event.actor}</div>
        <div className="text-xs text-muted-foreground leading-relaxed p-3 rounded-lg bg-muted/20 border border-border/50 mt-1.5">
          {event.detail}
        </div>
      </div>
    </div>
  );
}

export default function AuditTrailPage() {
  const { auditEvents } = useCaseStore();

  const systemEvents = auditEvents.filter((e) => e.type === "system").length;
  const signalEvents = auditEvents.filter((e) => e.type === "signal").length;
  const decisionEvents = auditEvents.filter((e) => e.type === "decision").length;
  const analystEvents = auditEvents.filter((e) => e.type === "analyst").length;

  return (
    <div className="space-y-6 animate-fade-in pb-8 max-w-5xl mx-auto">
      <PageHeader
        title="Decision Audit Trail"
        subtitle="Every material reasoning step is cryptographically logged, timestamped, and attributable."
        badge={
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
            <ClipboardList className="size-3.5 text-primary" />
            <span>FL-1024 · Immutable Audit Log</span>
          </div>
        }
      />

      {/* 1. Consistent KPI Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
        <KpiCard label="System Events" value={systemEvents} sub="Automated intake logs" accent="info" />
        <KpiCard label="Signal Events" value={signalEvents} sub="Derived factor records" accent="unresolved" />
        <KpiCard label="Decision Events" value={decisionEvents} sub="Consensus transitions" accent="support" />
        <KpiCard label="Analyst Events" value={analystEvents} sub="Prathmesh Gawade actions" accent="conflict" />
      </div>

      {/* 2. Timeline Card with Consistent p-6 Padding */}
      <Card className="border-border bg-card p-6 rounded-xl shadow-sm space-y-6">
        <CardHeader className="p-0 pb-4 border-b border-border/70 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-sm font-semibold tracking-tight text-foreground flex items-center gap-2">
              <ShieldCheck className="size-4 text-emerald-400" />
              Chronological Audit Log (FL-1024)
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-1">
              Axiom Manufacturing Pvt. Ltd. · {auditEvents.length} verifiable reasoning steps recorded.
            </CardDescription>
          </div>
          <Badge variant="outline" className="text-emerald-400 border-emerald-500/30 bg-emerald-500/10 text-xs gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Audit Complete
          </Badge>
        </CardHeader>

        <CardContent className="p-0 pt-2">
          <div className="space-y-1">
            {auditEvents.map((event, idx) => (
              <AuditEventCard
                key={event.id}
                event={event}
                isLast={idx === auditEvents.length - 1}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

