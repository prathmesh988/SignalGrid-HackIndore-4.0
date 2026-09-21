"use client";

import { useState } from "react";
import { Signal } from "@/data/mockCase";
import { ImpactBadge } from "@/components/ui/StatusBadge";
import SignalDrawer from "./SignalDrawer";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { clsxMerge } from "@/lib/utils";
import { ChevronRight, TrendingUp, TrendingDown, HelpCircle } from "lucide-react";

interface SignalMatrixProps {
  signals: Signal[];
}

function ConfidencePip({ confidence }: { confidence: "high" | "medium" | "low" }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-1">
        {["high", "medium", "low"].map((level, i) => {
          const active =
            (confidence === "high" && i <= 2) ||
            (confidence === "medium" && i <= 1) ||
            (confidence === "low" && i <= 0);
          return (
            <div
              key={i}
              className={clsxMerge(
                "size-1.5 rounded-full",
                active
                  ? confidence === "high"
                    ? "bg-emerald-500"
                    : confidence === "medium"
                    ? "bg-amber-500"
                    : "bg-muted-foreground"
                  : "bg-muted"
              )}
            />
          );
        })}
      </div>
      <span className="text-xs text-muted-foreground capitalize font-medium">{confidence}</span>
    </div>
  );
}

function DirectionIcon({ direction }: { direction: "positive" | "negative" | "unknown" }) {
  if (direction === "positive")
    return (
      <span className="flex items-center gap-1 text-emerald-400 font-medium text-xs">
        <TrendingUp className="size-3.5" />
        <span>Positive</span>
      </span>
    );
  if (direction === "negative")
    return (
      <span className="flex items-center gap-1 text-red-400 font-medium text-xs">
        <TrendingDown className="size-3.5" />
        <span>Negative</span>
      </span>
    );
  return (
    <span className="flex items-center gap-1 text-muted-foreground text-xs">
      <HelpCircle className="size-3.5" />
      <span>Unknown</span>
    </span>
  );
}

const impactRowBorder: Record<string, string> = {
  supports: "border-l-emerald-500/80 hover:bg-emerald-500/[0.04]",
  conflicts: "border-l-red-500/80 hover:bg-red-500/[0.04]",
  unresolved: "border-l-amber-500/80 hover:bg-amber-500/[0.04]",
};

export default function SignalMatrix({ signals }: SignalMatrixProps) {
  const [selectedSignal, setSelectedSignal] = useState<Signal | null>(null);

  return (
    <>
      <div className="rounded-lg border border-border/80 overflow-hidden bg-card">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow className="hover:bg-transparent border-b border-border/80">
              <TableHead className="w-[200px] text-[11px] font-semibold uppercase tracking-wider text-muted-foreground py-3">
                Signal
              </TableHead>
              <TableHead className="w-[140px] text-[11px] font-semibold uppercase tracking-wider text-muted-foreground py-3">
                Current Value
              </TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground py-3">
                Evidence Details
              </TableHead>
              <TableHead className="w-[120px] text-[11px] font-semibold uppercase tracking-wider text-muted-foreground py-3">
                Confidence
              </TableHead>
              <TableHead className="w-[120px] text-[11px] font-semibold uppercase tracking-wider text-muted-foreground py-3">
                Direction
              </TableHead>
              <TableHead className="w-[120px] text-[11px] font-semibold uppercase tracking-wider text-muted-foreground py-3">
                Decision Impact
              </TableHead>
              <TableHead className="w-[32px] p-0" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {signals.map((signal) => (
              <TableRow
                key={signal.id}
                onClick={() => setSelectedSignal(signal)}
                className={clsxMerge(
                  "cursor-pointer transition-colors border-b border-border/60 border-l-[3px]",
                  impactRowBorder[signal.impact]
                )}
              >
                {/* Signal Name */}
                <TableCell className="py-3">
                  <div className="text-xs font-bold text-foreground tracking-tight">
                    {signal.name}
                  </div>
                  <div className="text-[10px] text-muted-foreground uppercase font-mono mt-0.5">
                    {signal.category}
                  </div>
                </TableCell>

                {/* Current Value */}
                <TableCell className="py-3">
                  <span className="text-xs font-bold font-mono text-foreground">
                    {signal.currentValue}
                  </span>
                </TableCell>

                {/* Evidence */}
                <TableCell className="py-3 text-xs text-muted-foreground leading-relaxed">
                  {signal.evidence}
                </TableCell>

                {/* Confidence */}
                <TableCell className="py-3">
                  <ConfidencePip confidence={signal.confidence} />
                </TableCell>

                {/* Direction */}
                <TableCell className="py-3">
                  <DirectionIcon direction={signal.direction} />
                </TableCell>

                {/* Impact */}
                <TableCell className="py-3">
                  <ImpactBadge impact={signal.impact} />
                </TableCell>

                {/* Chevron */}
                <TableCell className="py-3 text-right pr-3">
                  <ChevronRight className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Slide-over Evidence Drawer */}
      <SignalDrawer signal={selectedSignal} onClose={() => setSelectedSignal(null)} />
    </>
  );
}
