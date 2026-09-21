"use client";

import { useCaseStore } from "@/store/caseStore";
import PageHeader from "@/components/layout/PageHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PriorityBadge } from "@/components/ui/StatusBadge";
import { DECISION_CRITICAL_INFO } from "@/data/mockCase";
import { ListChecks, CheckCircle2, SendHorizonal, AlertCircle, Sparkles } from "lucide-react";
import { clsxMerge } from "@/lib/utils";

export default function WhatMattersNextPage() {
  const { requestedInfo, requestInfo } = useCaseStore();

  return (
    <div className="space-y-6 animate-fade-in pb-8 max-w-5xl mx-auto">
      <PageHeader
        title="What Matters Next"
        subtitle="Ranked decision-critical information gaps most likely to reduce uncertainty or shift underwriting outcome."
        badge={
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
            <ListChecks className="size-3.5 text-primary" />
            <span>FL-1024 · Uncertainty Minimization</span>
          </div>
        }
      />

      {/* Context Banner */}
      <Card className="p-6 border-amber-500/30 bg-amber-500/[0.04] rounded-xl shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 shrink-0 mt-0.5">
            <AlertCircle className="size-5 text-amber-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground mb-1">
              2 Decision-Critical Information Gaps Identified
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              SignalGrid has computed the highest information-gain data points needed to resolve the current <strong>REVIEW REQUIRED</strong> state. Requesting these specific documents directly targets the core conflict drivers.
            </p>
          </div>
        </div>
      </Card>

      {/* Information Cards with Consistent p-6 Spacing */}
      <div className="space-y-4">
        {DECISION_CRITICAL_INFO.map((item) => {
          const isRequested = requestedInfo.includes(item.title);

          return (
            <Card
              key={item.rank}
              className={clsxMerge(
                "p-6 border-border bg-card rounded-xl shadow-sm transition-all hover:border-primary/40",
                isRequested && "opacity-80 bg-muted/20"
              )}
            >
              <div className="flex flex-col sm:flex-row items-start justify-between gap-5">
                <div className="flex items-start gap-4">
                  {/* Rank Badge */}
                  <div className="size-10 rounded-xl border border-border bg-muted/40 flex items-center justify-center shrink-0">
                    <span className="text-xs font-extrabold text-foreground font-mono">
                      #{item.rank}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h4 className="text-sm font-bold text-foreground">{item.title}</h4>
                      <PriorityBadge priority={item.priority} />
                      {isRequested && (
                        <Badge variant="outline" className="text-emerald-400 bg-emerald-500/10 border-emerald-500/30 text-xs gap-1">
                          <CheckCircle2 className="size-3" />
                          Requested by Prathmesh Gawade
                        </Badge>
                      )}
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">
                      {item.reason}
                    </p>

                    <div className="p-3 rounded-lg bg-muted/30 border border-border/60 text-xs text-foreground/90">
                      <span className="text-muted-foreground font-medium">Expected Decision Impact: </span>
                      {item.impact}
                    </div>
                  </div>
                </div>

                {/* Action */}
                <div className="shrink-0 self-end sm:self-center">
                  <Button
                    variant={isRequested ? "outline" : "default"}
                    size="sm"
                    icon={isRequested ? <CheckCircle2 className="size-3.5" /> : <SendHorizonal className="size-3.5" />}
                    onClick={() => requestInfo(item.title)}
                    disabled={isRequested}
                    className="font-medium text-xs gap-1.5"
                  >
                    {isRequested ? "Request Sent" : "Request Document"}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
