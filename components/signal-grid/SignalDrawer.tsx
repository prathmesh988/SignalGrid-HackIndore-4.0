"use client";
// components/signal-grid/SignalDrawer.tsx

import { Signal } from "@/data/mockCase";
import { ImpactBadge } from "@/components/ui/StatusBadge";
import { clsxMerge } from "@/lib/utils";
import { X, TrendingUp, TrendingDown, HelpCircle, Database, AlertCircle, Info } from "lucide-react";
import { useEffect } from "react";

interface SignalDrawerProps {
  signal: Signal | null;
  onClose: () => void;
}

const impactConfig = {
  supports: { border: "border-signal-support-border", bg: "bg-signal-support-bg", icon: TrendingUp, color: "text-signal-support-text" },
  conflicts: { border: "border-signal-conflict-border", bg: "bg-signal-conflict-bg", icon: TrendingDown, color: "text-signal-conflict-text" },
  unresolved: { border: "border-signal-unresolved-border", bg: "bg-signal-unresolved-bg", icon: HelpCircle, color: "text-signal-unresolved-text" },
};

export default function SignalDrawer({ signal, onClose }: SignalDrawerProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!signal) return null;

  const cfg = impactConfig[signal.impact];
  const ImpactIcon = cfg.icon;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-[440px] bg-bg-surface border-l border-border z-50 flex flex-col shadow-drawer animate-slide-in-right overflow-hidden">
        {/* Header */}
        <div className={clsxMerge("px-5 py-4 border-b flex items-start justify-between", cfg.border, cfg.bg)}>
          <div className="flex items-center gap-3">
            <div className={clsxMerge("w-8 h-8 rounded flex items-center justify-center border", cfg.border)}>
              <ImpactIcon size={16} className={cfg.color} />
            </div>
            <div>
              <div className="text-sm font-bold text-text-primary">{signal.name}</div>
              <div className="text-2xs text-text-secondary mt-0.5">Category: {signal.category}</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded hover:bg-bg-overlay text-text-muted hover:text-text-primary transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          {/* Impact Badge + Value */}
          <div className="flex items-center gap-3">
            <ImpactBadge impact={signal.impact} />
            <span className="text-lg font-bold text-text-primary font-mono">{signal.currentValue}</span>
          </div>

          {/* Definition */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <Info size={12} className="text-text-muted" />
              <span className="text-2xs font-semibold text-text-muted uppercase tracking-wider">Definition</span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">{signal.definition}</p>
          </div>

          {/* Evidence */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <Database size={12} className="text-text-muted" />
              <span className="text-2xs font-semibold text-text-muted uppercase tracking-wider">Evidence</span>
            </div>
            <div className={clsxMerge("rounded border p-3 text-sm text-text-secondary leading-relaxed", cfg.bg, cfg.border)}>
              {signal.evidenceDetail}
            </div>
          </div>

          {/* Source */}
          <div className="flex items-start gap-2 p-3 bg-bg-elevated rounded border border-border">
            <Database size={13} className="text-text-muted mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-2xs text-text-muted uppercase tracking-wider mb-0.5">Source</div>
              <div className="text-sm text-text-primary">{signal.source}</div>
            </div>
          </div>

          {/* Confidence */}
          <div>
            <div className="text-2xs font-semibold text-text-muted uppercase tracking-wider mb-2">Evidence Confidence</div>
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => {
                  const filled =
                    signal.confidence === "high"
                      ? true
                      : signal.confidence === "medium"
                      ? i < 2
                      : i < 1;
                  return (
                    <div
                      key={i}
                      className={clsxMerge(
                        "w-8 h-2 rounded-full",
                        filled
                          ? signal.confidence === "high"
                            ? "bg-signal-support"
                            : signal.confidence === "medium"
                            ? "bg-signal-unresolved"
                            : "bg-text-muted"
                          : "bg-bg-overlay"
                      )}
                    />
                  );
                })}
              </div>
              <span className="text-sm text-text-primary capitalize font-medium">{signal.confidence}</span>
            </div>
          </div>

          {/* Data Points */}
          {signal.dataPoints && signal.dataPoints.length > 0 && (
            <div>
              <div className="text-2xs font-semibold text-text-muted uppercase tracking-wider mb-2">Key Data Points</div>
              <ul className="space-y-1.5">
                {signal.dataPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className={clsxMerge("w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0", cfg.color.replace("text-", "bg-"))} />
                    <span className="text-sm text-text-secondary">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Why It Matters */}
          <div className="bg-bg-elevated border border-border rounded p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <AlertCircle size={12} className="text-signal-info-text" />
              <span className="text-2xs font-semibold text-signal-info-text uppercase tracking-wider">Why This Matters</span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">{signal.whyItMatters}</p>
          </div>
        </div>
      </div>
    </>
  );
}
