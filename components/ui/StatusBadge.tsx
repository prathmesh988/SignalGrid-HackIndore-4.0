// components/ui/StatusBadge.tsx
import { clsxMerge } from "@/lib/utils";

type AssessmentStatus = "review_required" | "low_ambiguity" | "investigation" | "escalated";
type ConfidenceLevel = "high" | "medium" | "low" | "medium-high";
type ConflictLevel = "high" | "medium" | "low" | "very-high";
type ImpactLevel = "supports" | "conflicts" | "unresolved";
type PriorityLevel = "HIGH" | "MEDIUM" | "LOW";

interface AssessmentBadgeProps {
  status: AssessmentStatus;
  size?: "sm" | "md" | "lg";
}

export function AssessmentBadge({ status, size = "md" }: AssessmentBadgeProps) {
  const config: Record<AssessmentStatus, { label: string; className: string }> = {
    review_required: {
      label: "Review Required",
      className: "bg-amber-500/15 border-amber-500/40 text-amber-400",
    },
    low_ambiguity: {
      label: "Low Ambiguity",
      className: "bg-emerald-500/15 border-emerald-500/40 text-emerald-400",
    },
    investigation: {
      label: "Investigation",
      className: "bg-blue-500/15 border-blue-500/40 text-blue-400",
    },
    escalated: {
      label: "Escalated",
      className: "bg-red-500/15 border-red-500/40 text-red-400",
    },
  };

  const { label, className } = config[status];

  const sizeClass =
    size === "sm"
      ? "text-[11px] px-2.5 py-1 font-semibold"
      : size === "lg"
      ? "text-sm px-3.5 py-1.5 font-semibold"
      : "text-xs px-3 py-1 font-semibold";

  return (
    <span
      className={clsxMerge(
        "inline-flex items-center gap-1.5 border rounded-md whitespace-nowrap",
        className,
        sizeClass
      )}
    >
      {label}
    </span>
  );
}

interface ConfidenceBadgeProps {
  level: ConfidenceLevel;
  size?: "sm" | "md";
}

export function ConfidenceBadge({ level, size = "md" }: ConfidenceBadgeProps) {
  const config: Record<ConfidenceLevel, { label: string; className: string }> = {
    high: {
      label: "High Confidence",
      className: "bg-emerald-500/15 border-emerald-500/40 text-emerald-400",
    },
    "medium-high": {
      label: "Medium-High",
      className: "bg-amber-500/15 border-amber-500/40 text-amber-400",
    },
    medium: {
      label: "Medium Confidence",
      className: "bg-amber-500/15 border-amber-500/40 text-amber-400",
    },
    low: {
      label: "Low Confidence",
      className: "bg-muted border-border text-muted-foreground",
    },
  };

  const { label, className } = config[level];

  const sizeClass =
    size === "sm"
      ? "text-[11px] px-2.5 py-1 font-semibold"
      : "text-xs px-3 py-1 font-semibold";

  return (
    <span
      className={clsxMerge(
        "inline-flex items-center border rounded-md whitespace-nowrap",
        className,
        sizeClass
      )}
    >
      {label}
    </span>
  );
}

interface ConflictBadgeProps {
  level: ConflictLevel;
  size?: "sm" | "md";
}

export function ConflictBadge({ level, size = "md" }: ConflictBadgeProps) {
  const config: Record<ConflictLevel, { label: string; className: string }> = {
    "very-high": {
      label: "Very High Conflict",
      className: "bg-red-500/15 border-red-500/40 text-red-400",
    },
    high: {
      label: "High Conflict",
      className: "bg-red-500/15 border-red-500/40 text-red-400",
    },
    medium: {
      label: "Medium Conflict",
      className: "bg-amber-500/15 border-amber-500/40 text-amber-400",
    },
    low: {
      label: "Low Conflict",
      className: "bg-emerald-500/15 border-emerald-500/40 text-emerald-400",
    },
  };

  const { label, className } = config[level];

  const sizeClass =
    size === "sm"
      ? "text-[11px] px-2.5 py-1 font-semibold"
      : "text-xs px-3 py-1 font-semibold";

  return (
    <span
      className={clsxMerge(
        "inline-flex items-center border rounded-md whitespace-nowrap",
        className,
        sizeClass
      )}
    >
      {label}
    </span>
  );
}

interface ImpactBadgeProps {
  impact: ImpactLevel;
}

export function ImpactBadge({ impact }: ImpactBadgeProps) {
  const config: Record<ImpactLevel, { label: string; className: string }> = {
    supports: {
      label: "Supports",
      className: "bg-emerald-500/15 border-emerald-500/40 text-emerald-400",
    },
    conflicts: {
      label: "Conflicts",
      className: "bg-red-500/15 border-red-500/40 text-red-400",
    },
    unresolved: {
      label: "Unresolved",
      className: "bg-amber-500/15 border-amber-500/40 text-amber-400",
    },
  };

  const { label, className } = config[impact];

  return (
    <span
      className={clsxMerge(
        "inline-flex items-center border rounded-md text-[10px] px-2 py-0.5 font-bold uppercase tracking-wider whitespace-nowrap",
        className
      )}
    >
      {label}
    </span>
  );
}

interface PriorityBadgeProps {
  priority: PriorityLevel;
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const config: Record<PriorityLevel, { className: string }> = {
    HIGH: { className: "bg-red-500/15 border-red-500/40 text-red-400" },
    MEDIUM: { className: "bg-amber-500/15 border-amber-500/40 text-amber-400" },
    LOW: { className: "bg-blue-500/15 border-blue-500/40 text-blue-400" },
  };

  return (
    <span
      className={clsxMerge(
        "inline-flex items-center border rounded-md text-[10px] px-2 py-0.5 font-bold uppercase tracking-wider whitespace-nowrap",
        config[priority].className
      )}
    >
      {priority}
    </span>
  );
}
