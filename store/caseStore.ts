"use client";
// store/caseStore.ts — Zustand store for SignalGrid application state

import { create } from "zustand";
import { CASE_FL1024, AUDIT_EVENTS, AuditEvent } from "@/data/mockCase";

export type AnalystDecision = "confirm" | "request_more_info" | "override" | null;

interface OverrideRecord {
  decision: AnalystDecision;
  reason: string;
  timestamp: string;
  analyst: string;
}

interface CaseStore {
  // Active case
  activeCaseId: string;
  setActiveCaseId: (id: string) => void;

  // Analyst review state
  analystDecision: AnalystDecision;
  overrideReason: string;
  overrideRecord: OverrideRecord | null;
  setAnalystDecision: (decision: AnalystDecision) => void;
  setOverrideReason: (reason: string) => void;
  saveAnalystDecision: (decision: AnalystDecision, reason?: string) => void;

  // Audit trail (local)
  auditEvents: AuditEvent[];
  addAuditEvent: (event: Omit<AuditEvent, "id">) => void;

  // Decision Sensitivity state
  sensitivityValues: {
    income: number;
    debt: number;
    expenses: number;
    creditUtilization: number;
    repaymentHistory: number;
  };
  setSensitivityValue: (key: string, value: number) => void;
  resetSensitivity: () => void;

  // Information requests
  requestedInfo: string[];
  requestInfo: (item: string) => void;

  // New assessment loading state
  isAnalyzing: boolean;
  setIsAnalyzing: (v: boolean) => void;
}

const DEFAULT_SENSITIVITY = {
  income: 240000,
  debt: 1800000,
  expenses: 158000,
  creditUtilization: 72,
  repaymentHistory: 98,
};

export const useCaseStore = create<CaseStore>((set, get) => ({
  activeCaseId: "FL-1024",
  setActiveCaseId: (id) => set({ activeCaseId: id }),

  analystDecision: null,
  overrideReason: "",
  overrideRecord: null,
  setAnalystDecision: (decision) => set({ analystDecision: decision }),
  setOverrideReason: (reason) => set({ overrideReason: reason }),
  saveAnalystDecision: (decision, reason = "") => {
    const now = new Date();
    const timestamp = now.toISOString();
    const timeStr = now.toLocaleTimeString("en-IN", { hour12: false });

    const record: OverrideRecord = {
      decision,
      reason,
      timestamp,
      analyst: "Prathmesh Gawade",
    };

    set({ overrideRecord: record, analystDecision: decision });

    // Add to audit trail
    const eventMap: Record<string, string> = {
      confirm: "Assessment Confirmed",
      request_more_info: "Additional Information Requested",
      override: "Assessment Override Recorded",
    };

    get().addAuditEvent({
      timestamp,
      time: timeStr,
      event: eventMap[decision as string] || "Analyst Action",
      actor: "Prathmesh Gawade",
      detail:
        decision === "override"
          ? `Override reason: ${reason}`
          : decision === "confirm"
          ? "Analyst confirmed the system assessment: REVIEW REQUIRED."
          : "Analyst requested additional information before making a decision.",
      type: "analyst",
    });
  },

  auditEvents: AUDIT_EVENTS,
  addAuditEvent: (event) => {
    const id = `evt-${Date.now()}`;
    set((state) => ({
      auditEvents: [...state.auditEvents, { ...event, id }],
    }));
  },

  sensitivityValues: { ...DEFAULT_SENSITIVITY },
  setSensitivityValue: (key, value) =>
    set((state) => ({
      sensitivityValues: { ...state.sensitivityValues, [key]: value },
    })),
  resetSensitivity: () =>
    set({ sensitivityValues: { ...DEFAULT_SENSITIVITY } }),

  requestedInfo: [],
  requestInfo: (item) => {
    set((state) => ({
      requestedInfo: state.requestedInfo.includes(item)
        ? state.requestedInfo
        : [...state.requestedInfo, item],
    }));
    const now = new Date();
    get().addAuditEvent({
      timestamp: now.toISOString(),
      time: now.toLocaleTimeString("en-IN", { hour12: false }),
      event: "Verification Requested",
      actor: "Prathmesh Gawade",
      detail: `Verification requested for: ${item}`,
      type: "analyst",
    });
  },

  isAnalyzing: false,
  setIsAnalyzing: (v) => set({ isAnalyzing: v }),
}));

// Computed: Sensitivity-driven assessment
export function computeSensitivityAssessment(values: {
  income: number;
  debt: number;
  expenses: number;
  creditUtilization: number;
  repaymentHistory: number;
}): {
  assessment: string;
  confidence: string;
  conflictSeverity: string;
  routing: string;
  changes: string[];
} {
  const baseline = DEFAULT_SENSITIVITY;
  const changes: string[] = [];

  const debtRatio = values.debt / values.income;
  const baseDebtRatio = baseline.debt / baseline.income;
  const utilizationChange = values.creditUtilization - baseline.creditUtilization;
  const debtChange = values.debt - baseline.debt;
  const incomeChange = values.income - baseline.income;

  let conflictScore = 3; // baseline: 3 conflicts
  let confidenceScore = 50; // baseline: medium (50)

  // Debt impact
  if (debtChange < -300000) {
    conflictScore -= 1;
    confidenceScore += 15;
    changes.push("Debt reduction → Conflict Severity ↓");
  } else if (debtChange > 300000) {
    conflictScore += 1;
    confidenceScore -= 15;
    changes.push("Debt increase → Conflict Severity ↑");
  }

  // Utilization impact
  if (utilizationChange < -20) {
    conflictScore -= 1;
    confidenceScore += 10;
    changes.push("Lower utilization → Conflict Severity ↓");
  } else if (utilizationChange > 10) {
    conflictScore += 1;
    confidenceScore -= 10;
    changes.push("Higher utilization → Conflict Severity ↑");
  }

  // Income impact
  if (incomeChange > 40000) {
    confidenceScore += 10;
    changes.push("Higher income → Confidence ↑");
  } else if (incomeChange < -40000) {
    confidenceScore -= 15;
    changes.push("Lower income → Confidence ↓, Conflict Severity ↑");
  }

  // Repayment impact
  if (values.repaymentHistory >= 99) {
    confidenceScore += 5;
  } else if (values.repaymentHistory < 80) {
    conflictScore += 2;
    confidenceScore -= 20;
    changes.push("Poor repayment history → Conflict Severity ↑↑");
  }

  // Determine outputs
  let assessment = "Review Required";
  let confidence = "Medium";
  let conflictSeverity = "High";
  let routing = "Human Review";

  if (conflictScore <= 1 && confidenceScore >= 70) {
    assessment = "Low Ambiguity";
    confidence = "High";
    conflictSeverity = "Low";
    routing = "Automated";
  } else if (conflictScore <= 2 && confidenceScore >= 60) {
    assessment = "Standard Review";
    confidence = "Medium-High";
    conflictSeverity = "Medium";
    routing = "Standard Review";
  } else if (conflictScore >= 5 || confidenceScore < 30) {
    assessment = "Escalated — Urgent Review";
    confidence = "Low";
    conflictSeverity = "Very High";
    routing = "Senior Analyst Escalation";
  }

  return { assessment, confidence, conflictSeverity, routing, changes };
}
