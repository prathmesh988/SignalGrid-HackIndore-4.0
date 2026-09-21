"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, KpiCard } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { AssessmentBadge, ConfidenceBadge, ConflictBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ALL_CASES } from "@/data/mockCase";
import { Plus, LayoutDashboard, ExternalLink, ArrowRight, Filter } from "lucide-react";
import { clsxMerge } from "@/lib/utils";

const FILTERS = ["All", "Review Required", "Investigation", "Low Ambiguity"] as const;
type Filter = (typeof FILTERS)[number];

const assessmentFilter: Record<Filter, string[]> = {
  All: [],
  "Review Required": ["review_required"],
  Investigation: ["investigation"],
  "Low Ambiguity": ["low_ambiguity"],
};

export default function OverviewPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const filtered =
    activeFilter === "All"
      ? ALL_CASES
      : ALL_CASES.filter((c) => assessmentFilter[activeFilter].includes(c.assessment));

  return (
    <div className="space-y-6 animate-fade-in pb-8">
      {/* Page Header */}
      <PageHeader
        title="Case Overview"
        subtitle="Monitor active underwriting assessments, signal conflicts, and triage queue priorities."
        badge={
          <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-medium">
            <LayoutDashboard className="size-3.5 text-primary" />
            <span>Executive Underwriting Pipeline</span>
          </div>
        }
        actions={
          <Link href="/new-assessment">
            <Button variant="default" size="sm" icon={<Plus className="size-3.5" />}>
              New Assessment
            </Button>
          </Link>
        }
      />

      {/* 1. Consistent KPI Metric Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
        <KpiCard label="Total Cases" value={24} sub="Active portfolio pipeline" accent="neutral" />
        <KpiCard label="Review Required" value={7} sub="Awaiting analyst decision" accent="unresolved" />
        <KpiCard label="High Conflict" value={4} sub="Material signal contradictions" accent="conflict" />
        <KpiCard label="Unresolved Factors" value={6} sub="Pending third-party verification" accent="info" />
      </div>

      {/* 2. Pipeline Table inside a structured shadcn Card with consistent spacing */}
      <Card className="border-border bg-card rounded-xl shadow-sm p-6 overflow-hidden">
        {/* Card Header with Title and Filter Tabs */}
        <CardHeader className="p-0 pb-5 border-b border-border/70 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="text-base font-semibold tracking-tight text-foreground flex items-center gap-2">
              <span>Underwriting Assessment Queue</span>
              <Badge variant="secondary" className="font-mono text-xs px-2 py-0.5">
                {filtered.length} Cases
              </Badge>
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-1">
              Click any row to open the full explainability assessment and evidence graph.
            </CardDescription>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-muted/40 border border-border/60 self-start md:self-auto">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={clsxMerge(
                  "px-3 py-1 text-xs font-medium rounded-md transition-all",
                  activeFilter === f
                    ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </CardHeader>

        {/* Card Content containing shadcn Table */}
        <CardContent className="p-0 pt-4">
          <div className="rounded-lg border border-border/70 overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="hover:bg-transparent border-b border-border/70">
                  <TableHead className="w-[120px] text-[11px] font-semibold uppercase tracking-wider text-muted-foreground py-3">
                    Case ID
                  </TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground py-3">
                    Applicant / Business
                  </TableHead>
                  <TableHead className="w-[160px] text-[11px] font-semibold uppercase tracking-wider text-muted-foreground py-3">
                    Assessment
                  </TableHead>
                  <TableHead className="w-[150px] text-[11px] font-semibold uppercase tracking-wider text-muted-foreground py-3">
                    Confidence
                  </TableHead>
                  <TableHead className="w-[150px] text-[11px] font-semibold uppercase tracking-wider text-muted-foreground py-3">
                    Conflict Level
                  </TableHead>
                  <TableHead className="w-[160px] text-[11px] font-semibold uppercase tracking-wider text-muted-foreground py-3">
                    Reviewer
                  </TableHead>
                  <TableHead className="w-[140px] text-[11px] font-semibold uppercase tracking-wider text-muted-foreground py-3 text-right">
                    Last Updated
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((c) => (
                  <TableRow
                    key={c.id}
                    onClick={() => {
                      if (c.id === "FL-1024") {
                        router.push("/assessment/FL-1024");
                      }
                    }}
                    className={clsxMerge(
                      "cursor-pointer transition-colors border-b border-border/50 hover:bg-muted/40",
                      c.id === "FL-1024" && "bg-blue-500/[0.03]"
                    )}
                  >
                    {/* Case ID */}
                    <TableCell className="font-mono text-xs font-bold text-primary ">
                      <div className="flex items-center gap-1.5">
                        <span>{c.id}</span>
                        {c.id === "FL-1024" && (
                          <ExternalLink className="size-3 text-muted-foreground" />
                        )}
                      </div>
                    </TableCell>

                    {/* Applicant */}
                    <TableCell className="">
                      <div className="font-semibold text-xs text-foreground">
                        {c.applicant}
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5 font-normal">
                        {c.industry}
                      </div>
                    </TableCell>

                    {/* Assessment */}
                    <TableCell className="">
                      <AssessmentBadge status={c.assessment} size="sm" />
                    </TableCell>

                    {/* Confidence */}
                    <TableCell className="">
                      <ConfidenceBadge level={c.confidence} size="sm" />
                    </TableCell>

                    {/* Conflict Level */}
                    <TableCell className="">
                      <ConflictBadge level={c.conflictSeverity} size="sm" />
                    </TableCell>

                    {/* Reviewer */}
                    <TableCell className="">
                      <span className="text-xs font-medium text-foreground">
                        {c.reviewer}
                      </span>
                    </TableCell>

                    {/* Last Updated */}
                    <TableCell className=" text-right font-mono text-xs text-muted-foreground">
                      {c.lastUpdated}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 p-3 rounded-lg bg-muted/20 border border-border/50 text-xs text-muted-foreground flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-blue-500 shrink-0" />
              <span>
                <strong>Active Reference Case:</strong> FL-1024 (Axiom Manufacturing Pvt. Ltd.) contains active multi-signal conflicts.
              </span>
            </div>
            <Link
              href="/assessment/FL-1024"
              className="text-primary hover:underline flex items-center gap-1 text-xs font-medium"
            >
              Open FL-1024 <ArrowRight className="size-3" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

