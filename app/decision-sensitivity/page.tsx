"use client";

import * as React from "react";
import { useCaseStore, computeSensitivityAssessment } from "@/store/caseStore";
import PageHeader from "@/components/layout/PageHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  SlidersHorizontal,
  RotateCcw,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Building2,
  Activity,
  Layers,
  Sparkles,
  Zap,
} from "lucide-react";
import { clsxMerge } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Cell,
  ReferenceLine,
} from "recharts";

const BASELINE_VALUES = {
  income: 240000,
  debt: 1800000,
  expenses: 158000,
  creditUtilization: 72,
  repaymentHistory: 98,
};

function formatValue(key: string, value: number): string {
  if (key === "creditUtilization" || key === "repaymentHistory") return `${value}%`;
  const inL = (value / 100000).toFixed(1);
  return `₹${inL}L`;
}

function calculateDelta(key: string, current: number, baseline: number): { text: string; status: "neutral" | "positive" | "negative" } {
  const diff = current - baseline;
  if (Math.abs(diff) < 0.001) {
    return { text: "Baseline", status: "neutral" };
  }
  const pct = ((diff / baseline) * 100).toFixed(1);
  const sign = diff > 0 ? "+" : "";

  if (key === "income" || key === "repaymentHistory") {
    return {
      text: `${sign}${pct}%`,
      status: diff > 0 ? "positive" : "negative",
    };
  }

  // For debt, expenses, utilization: lower is positive
  return {
    text: `${sign}${pct}%`,
    status: diff < 0 ? "positive" : "negative",
  };
}

interface SliderControlProps {
  label: string;
  category: string;
  valueKey: keyof typeof BASELINE_VALUES;
  min: number;
  max: number;
  step: number;
}

function SliderControl({
  label,
  category,
  valueKey,
  min,
  max,
  step,
}: SliderControlProps) {
  const { sensitivityValues, setSensitivityValue } = useCaseStore();
  const value = sensitivityValues[valueKey];
  const baseline = BASELINE_VALUES[valueKey];
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  const delta = calculateDelta(valueKey, value, baseline);

  const handleNudge = (factor: number) => {
    const newValue = Math.min(max, Math.max(min, Math.round((value * factor) / step) * step));
    setSensitivityValue(valueKey, newValue);
  };

  const handleReset = () => {
    setSensitivityValue(valueKey, baseline);
  };

  return (
    <div className="p-4 rounded-lg bg-muted/25 border border-border/70 hover:border-border transition-all">
      {/* Label and Readout */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-foreground tracking-tight">{label}</span>
          <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
            {category}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {delta.status !== "neutral" && (
            <span
              className={clsxMerge(
                "text-[11px] font-mono font-medium px-1.5 py-0.5 rounded border",
                delta.status === "positive"
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/25"
                  : "bg-red-500/10 text-red-400 border-red-500/25"
              )}
            >
              {delta.text}
            </span>
          )}
          <span className="text-sm font-mono font-bold text-foreground">
            {formatValue(valueKey, value)}
          </span>
        </div>
      </div>

      {/* Range Input Slider */}
      <div className="relative py-1">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => setSensitivityValue(valueKey, Number(e.target.value))}
          className="w-full h-2 rounded-lg cursor-pointer accent-primary appearance-none transition-all"
          style={{
            background: `linear-gradient(to right, #3B5BFF 0%, #3B5BFF ${pct}%, #1E2230 ${pct}%, #1E2230 100%)`,
          }}
        />
      </div>

      {/* Scale indicators and Quick Nudges */}
      <div className="flex items-center justify-between text-[11px] text-muted-foreground mt-2">
        <div className="flex items-center gap-2">
          <span>Min: {formatValue(valueKey, min)}</span>
          <span className="text-border">·</span>
          <span className="text-foreground/70 font-mono">
            Baseline: {formatValue(valueKey, baseline)}
          </span>
          <span className="text-border">·</span>
          <span>Max: {formatValue(valueKey, max)}</span>
        </div>

        {/* Nudge Buttons */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => handleNudge(0.9)}
            className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors border border-border/60"
            title="Decrease 10%"
          >
            -10%
          </button>
          <button
            type="button"
            onClick={handleReset}
            disabled={value === baseline}
            className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors border border-border/60 disabled:opacity-40"
            title="Reset to baseline"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={() => handleNudge(1.1)}
            className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors border border-border/60"
            title="Increase 10%"
          >
            +10%
          </button>
        </div>
      </div>
    </div>
  );
}

const scenarios = [
  {
    id: "s1",
    title: "Debt Settled to ₹12L",
    desc: "Applicant liquidates non-core assets to retire ₹6.0L of short-term debt.",
    values: { income: 240000, debt: 1200000, expenses: 158000, creditUtilization: 50, repaymentHistory: 98 },
    deltaSummary: "Debt -33% · Utilization 50%",
  },
  {
    id: "s2",
    title: "Income Verified Lower (-25%)",
    desc: "Bank & GST statement reconciliation applies a 25% conservative haircut.",
    values: { income: 180000, debt: 1800000, expenses: 158000, creditUtilization: 72, repaymentHistory: 98 },
    deltaSummary: "Income ₹1.8L · Debt/Income ↑",
  },
  {
    id: "s3",
    title: "Utilization Normalized (35%)",
    desc: "Revolving credit facility paid down to optimal threshold before disbursement.",
    values: { income: 240000, debt: 1800000, expenses: 158000, creditUtilization: 35, repaymentHistory: 98 },
    deltaSummary: "Utilization 35% · Liquidity ↑",
  },
];

export default function DecisionSensitivityPage() {
  const { sensitivityValues, resetSensitivity, setSensitivityValue } = useCaseStore();
  const result = computeSensitivityAssessment(sensitivityValues);

  // Check if current parameters match any scenario
  const isScenarioActive = (sValues: typeof scenarios[0]["values"]) => {
    return (
      sensitivityValues.income === sValues.income &&
      sensitivityValues.debt === sValues.debt &&
      sensitivityValues.expenses === sValues.expenses &&
      sensitivityValues.creditUtilization === sValues.creditUtilization &&
      sensitivityValues.repaymentHistory === sValues.repaymentHistory
    );
  };

  const chartData = [
    {
      name: "Income",
      ratio: Number((sensitivityValues.income / BASELINE_VALUES.income).toFixed(2)),
      actual: formatValue("income", sensitivityValues.income),
      fill: "#3B5BFF",
    },
    {
      name: "Debt",
      ratio: Number((sensitivityValues.debt / BASELINE_VALUES.debt).toFixed(2)),
      actual: formatValue("debt", sensitivityValues.debt),
      fill: result.conflictSeverity === "High" || result.conflictSeverity === "Very High" ? "#DC2626" : "#D97706",
    },
    {
      name: "Expenses",
      ratio: Number((sensitivityValues.expenses / BASELINE_VALUES.expenses).toFixed(2)),
      actual: formatValue("expenses", sensitivityValues.expenses),
      fill: "#8B90A8",
    },
    {
      name: "Utilization",
      ratio: Number((sensitivityValues.creditUtilization / BASELINE_VALUES.creditUtilization).toFixed(2)),
      actual: formatValue("creditUtilization", sensitivityValues.creditUtilization),
      fill: sensitivityValues.creditUtilization > 75 ? "#DC2626" : "#D97706",
    },
    {
      name: "Repayment",
      ratio: Number((sensitivityValues.repaymentHistory / BASELINE_VALUES.repaymentHistory).toFixed(2)),
      actual: formatValue("repaymentHistory", sensitivityValues.repaymentHistory),
      fill: "#16A34A",
    },
  ];

  // Visual status stylings for dominating Live Assessment status
  const assessmentStatusConfig: Record<
    string,
    { title: string; subtitle: string; bg: string; border: string; text: string; badge: string; icon: React.ReactNode }
  > = {
    "Review Required": {
      title: "REVIEW REQUIRED",
      subtitle: "Multi-Signal Contradiction Detected",
      bg: "bg-amber-500/10",
      border: "border-amber-500/40",
      text: "text-amber-400",
      badge: "border-amber-500/40 bg-amber-500/20 text-amber-300",
      icon: <AlertTriangle className="size-6 text-amber-400" />,
    },
    "Low Ambiguity": {
      title: "LOW AMBIGUITY",
      subtitle: "Signals Align with Lending Policy",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/40",
      text: "text-emerald-400",
      badge: "border-emerald-500/40 bg-emerald-500/20 text-emerald-300",
      icon: <CheckCircle2 className="size-6 text-emerald-400" />,
    },
    "Standard Review": {
      title: "STANDARD REVIEW",
      subtitle: "Acceptable Variance with Document Check",
      bg: "bg-blue-500/10",
      border: "border-blue-500/40",
      text: "text-blue-400",
      badge: "border-blue-500/40 bg-blue-500/20 text-blue-300",
      icon: <HelpCircle className="size-6 text-blue-400" />,
    },
    "Escalated — Urgent Review": {
      title: "ESCALATED — URGENT REVIEW",
      subtitle: "Severe Contradictions & High Default Elasticity",
      bg: "bg-red-500/10",
      border: "border-red-500/40",
      text: "text-red-400",
      badge: "border-red-500/40 bg-red-500/20 text-red-300",
      icon: <ShieldAlert className="size-6 text-red-400" />,
    },
  };

  const currentStatus =
    assessmentStatusConfig[result.assessment] || assessmentStatusConfig["Review Required"];

  return (
    <div className="space-y-6 animate-fade-in pb-8">
      {/* 1. Page Header & Context */}
      <PageHeader
        title="Decision Sensitivity"
        subtitle="Explore how financial parameters and counterfactual conditions shift consensus decisions."
        badge={
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/25 font-semibold flex items-center gap-1.5">
              <Building2 className="size-3" />
              FL-1024 · Axiom Manufacturing Ltd
            </span>
            <Badge variant="outline" className="text-[11px] text-muted-foreground border-border">
              Exposure: ₹14.2 Cr
            </Badge>
          </div>
        }
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={<RotateCcw className="size-3.5" />}
              onClick={resetSensitivity}
              className="border-border text-xs"
            >
              Reset Baseline
            </Button>
          </div>
        }
      />

      {/* 2. Main 12-Column Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols): Primary Interactive Decision Controls */}
        <div className="xl:col-span-8 space-y-6">
          <Card className="border-border bg-card p-6 rounded-xl shadow-sm">
            <CardHeader className="p-0 pb-4 border-b border-border/70 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold tracking-tight text-foreground flex items-center gap-2">
                  <SlidersHorizontal className="size-4 text-primary" />
                  Financial Indicator Sensitivity Controls
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground mt-1">
                  Adjust counterfactual inputs to stress-test liquidity, debt service, and cashflow assumptions.
                </CardDescription>
              </div>
              <span className="text-[11px] font-mono text-muted-foreground hidden sm:inline">
                5 Parameters Active
              </span>
            </CardHeader>

            <CardContent className="p-0 pt-5 space-y-4">
              <SliderControl
                label="Monthly Cash Flow (Income)"
                category="Cash Flow"
                valueKey="income"
                min={100000}
                max={500000}
                step={10000}
              />
              <SliderControl
                label="Existing Outstanding Debt"
                category="Leverage"
                valueKey="debt"
                min={500000}
                max={5000000}
                step={100000}
              />
              <SliderControl
                label="Monthly Operating Expenses"
                category="Burn Rate"
                valueKey="expenses"
                min={50000}
                max={400000}
                step={10000}
              />
              <SliderControl
                label="Credit Line Utilization"
                category="Liquidity"
                valueKey="creditUtilization"
                min={10}
                max={100}
                step={1}
              />
              <SliderControl
                label="Debt Repayment Track Record"
                category="Behavior"
                valueKey="repaymentHistory"
                min={50}
                max={100}
                step={1}
              />

              <div className="p-3 rounded-lg bg-muted/20 border border-border/50 text-[11px] text-muted-foreground flex items-center gap-2">
                <Activity className="size-3.5 text-blue-400 shrink-0" />
                <span>
                  All slider values update the neural consensus matrix and conflict evaluator in real time without page reload.
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column (4 cols): Live Assessment Card (Structural shadcn Card) */}
        <div className="xl:col-span-4 space-y-6">
          <Card className="border-border bg-card p-6 rounded-xl shadow-sm space-y-5">
            {/* Header with Live Indicator */}
            <div className="flex items-center justify-between pb-3 border-b border-border/70">
              <span className="text-[11px] font-mono font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <span className="relative flex size-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full size-2 bg-emerald-500" />
                </span>
                LIVE ASSESSMENT
              </span>
              <span className="text-[10px] font-mono text-muted-foreground">REAL-TIME</span>
            </div>

            {/* Dominating Status Block */}
            <div
              className={clsxMerge(
                "p-4 rounded-xl border transition-all duration-200 shadow-sm",
                currentStatus.bg,
                currentStatus.border
              )}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-background/50 shrink-0">{currentStatus.icon}</div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-0.5">
                    Consensus Decision
                  </div>
                  <h3 className={clsxMerge("text-base font-extrabold tracking-tight", currentStatus.text)}>
                    {currentStatus.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                    {currentStatus.subtitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Clean Internal Grid: Confidence and Conflict Severity */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-muted/40 border border-border/70">
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider block mb-1">
                  Confidence
                </span>
                <div className="text-sm font-bold text-foreground font-mono">
                  {result.confidence}
                </div>
                <div className="w-full bg-background h-1.5 rounded-full mt-2 overflow-hidden border border-border/60">
                  <div
                    className={clsxMerge(
                      "h-full rounded-full transition-all",
                      result.confidence.includes("High")
                        ? "bg-emerald-500 w-4/5"
                        : result.confidence.includes("Medium")
                        ? "bg-amber-500 w-1/2"
                        : "bg-red-500 w-1/4"
                    )}
                  />
                </div>
              </div>

              <div className="p-3 rounded-lg bg-muted/40 border border-border/70">
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider block mb-1">
                  Conflict Severity
                </span>
                <div
                  className={clsxMerge(
                    "text-sm font-bold font-mono",
                    result.conflictSeverity === "High" || result.conflictSeverity === "Very High"
                      ? "text-red-400"
                      : result.conflictSeverity === "Medium"
                      ? "text-amber-400"
                      : "text-emerald-400"
                  )}
                >
                  {result.conflictSeverity}
                </div>
                <div className="w-full bg-background h-1.5 rounded-full mt-2 overflow-hidden border border-border/60">
                  <div
                    className={clsxMerge(
                      "h-full rounded-full transition-all",
                      result.conflictSeverity === "High" || result.conflictSeverity === "Very High"
                        ? "bg-red-500 w-5/6"
                        : result.conflictSeverity === "Medium"
                        ? "bg-amber-500 w-1/2"
                        : "bg-emerald-500 w-1/4"
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Recommended Routing */}
            <div className="p-3.5 rounded-lg bg-muted/40 border border-border/70">
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider block mb-1">
                Recommended Routing
              </span>
              <div className="text-sm font-semibold text-foreground flex items-center justify-between">
                <span>{result.routing}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                  {result.routing === "Automated" ? "Tier 1" : "Tier 2 Review"}
                </span>
              </div>
            </div>

            {/* Dynamic Assessment Changes Delta List */}
            {result.changes.length > 0 && (
              <div className="p-3.5 rounded-lg bg-background border border-border/70 space-y-2">
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block">
                  Active Sensitivity Deltas
                </span>
                <ul className="space-y-1.5">
                  {result.changes.map((change, i) => {
                    const isUp = change.includes("↑");
                    const isDown = change.includes("↓");
                    return (
                      <li key={i} className="flex items-start gap-2 text-xs">
                        {isDown && !isUp ? (
                          <TrendingDown className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        ) : isUp ? (
                          <TrendingUp className="size-3.5 text-red-400 shrink-0 mt-0.5" />
                        ) : (
                          <span className="size-1.5 rounded-full bg-blue-400 shrink-0 mt-1.5" />
                        )}
                        <span className="text-foreground/90">{change}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Baseline Snapshot Comparison */}
            <div className="pt-3 border-t border-border/70 text-xs text-muted-foreground space-y-1.5">
              <div className="flex justify-between items-center text-[11px]">
                <span className="font-semibold text-foreground/80">Baseline Assessment</span>
                <span className="font-mono text-amber-400">Review Required</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span>Baseline Severity</span>
                <span className="font-mono text-red-400">High (3 Conflicts)</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* 3. Signal Impact & Baseline Variance Analysis (Full Width col-span-12) */}
      <Card className="border-border bg-card p-6 rounded-xl shadow-sm">
        <CardHeader className="p-0 pb-4 border-b border-border/70 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-sm font-semibold tracking-tight text-foreground flex items-center gap-2">
              <Layers className="size-4 text-primary" />
              Signal Impact & Baseline Ratio Analysis
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-1">
              Relative variance of each financial factor compared to the 1.0x baseline reference line.
            </CardDescription>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-blue-500" /> Income
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-red-500" /> Leverage
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-emerald-500" /> Track Record
            </span>
          </div>
        </CardHeader>

        <CardContent className="p-0 pt-5">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-center">
            {/* Recharts Bar Chart */}
            <div className="xl:col-span-8 h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} barSize={28} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11, fill: "#8B90A8" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 2]}
                    tick={{ fontSize: 10, fill: "#555B72" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `${v}x`}
                  />
                  <ReferenceLine
                    y={1.0}
                    stroke="#3B5BFF"
                    strokeDasharray="3 3"
                    label={{
                      value: "1.0x Baseline",
                      fill: "#3B5BFF",
                      fontSize: 10,
                      position: "right",
                    }}
                  />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: "#0F1117",
                      borderColor: "#1E2230",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                    labelStyle={{ color: "#E8EAF0", fontWeight: 600 }}
                    formatter={(value, name, item) => [
                      `${(Number(value) * 100).toFixed(0)}% (${item.payload.actual})`,
                      "Relative Ratio",
                    ]}
                  />
                  <Bar dataKey="ratio" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, idx) => (
                      <Cell key={idx} fill={entry.fill} fillOpacity={0.9} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Elasticity Breakdown */}
            <div className="xl:col-span-4 space-y-3 p-4 rounded-lg bg-muted/25 border border-border/70">
              <span className="text-[11px] font-semibold text-foreground uppercase tracking-wider block">
                Elasticity Sensitivity Ranking
              </span>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between pb-1.5 border-b border-border/50">
                  <span className="text-muted-foreground">1. Existing Debt</span>
                  <Badge variant="destructive" className="text-[10px] px-1.5 py-0">
                    High Elasticity (1.84)
                  </Badge>
                </div>
                <div className="flex items-center justify-between pb-1.5 border-b border-border/50">
                  <span className="text-muted-foreground">2. Credit Utilization</span>
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                    Moderate (1.42)
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">3. Operating Cashflow</span>
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 text-muted-foreground">
                    Inelastic (0.65)
                  </Badge>
                </div>
              </div>
              <p className="text-[11px] text-muted-foreground pt-1 leading-relaxed">
                Debt and credit utilization are the primary conflict drivers. A 33% debt reduction transitions the case to standard automated eligibility.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 4. Pre-Configured Scenarios (3 Equal Columns) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold tracking-tight text-foreground flex items-center gap-2">
              <Zap className="size-4 text-primary" />
              Pre-Configured Stress Scenarios
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Simulate standard underwriter counterfactual conditions with a single click.
            </p>
          </div>
          <span className="text-xs text-muted-foreground font-mono">3 Scenarios Defined</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {scenarios.map((sc) => {
            const scResult = computeSensitivityAssessment(sc.values);
            const active = isScenarioActive(sc.values);

            return (
              <Card
                key={sc.id}
                className={clsxMerge(
                  "p-5 rounded-xl border bg-card flex flex-col justify-between transition-all hover:border-primary/50 cursor-pointer shadow-sm relative overflow-hidden group",
                  active && "border-primary ring-1 ring-primary/40 bg-primary/5"
                )}
                onClick={() => {
                  Object.entries(sc.values).forEach(([k, v]) =>
                    setSensitivityValue(k, v as number)
                  );
                }}
              >
                {active && (
                  <span className="absolute top-2 right-2 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-primary text-primary-foreground">
                    ACTIVE
                  </span>
                )}

                <div>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                      {sc.title}
                    </h4>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                    {sc.desc}
                  </p>

                  <div className="text-[11px] font-mono text-muted-foreground mb-4 p-2 rounded bg-muted/40 border border-border/50">
                    {sc.deltaSummary}
                  </div>
                </div>

                <div className="pt-3 border-t border-border/60 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-muted-foreground uppercase">Expected:</span>
                    <Badge
                      variant="outline"
                      className={clsxMerge(
                        "text-[10px] font-semibold px-2 py-0.5",
                        scResult.assessment === "Low Ambiguity"
                          ? "border-emerald-500/40 text-emerald-400 bg-emerald-500/10"
                          : scResult.assessment === "Standard Review"
                          ? "border-blue-500/40 text-blue-400 bg-blue-500/10"
                          : "border-red-500/40 text-red-400 bg-red-500/10"
                      )}
                    >
                      {scResult.assessment}
                    </Badge>
                  </div>

                  <Button
                    variant={active ? "default" : "secondary"}
                    size="xs"
                    className="gap-1 font-medium text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      Object.entries(sc.values).forEach(([k, v]) =>
                        setSensitivityValue(k, v as number)
                      );
                    }}
                  >
                    <span>{active ? "Applied" : "Simulate"}</span>
                    <ArrowRight className="size-3" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

