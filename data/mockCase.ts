// data/mockCase.ts — Complete mock data for SignalGrid FL-1024

export type SignalDirection = "positive" | "negative" | "unknown";
export type SignalConfidence = "high" | "medium" | "low";
export type SignalImpact = "supports" | "conflicts" | "unresolved";

export interface Signal {
  id: string;
  name: string;
  category: string;
  currentValue: string;
  evidence: string;
  evidenceDetail: string;
  source: string;
  confidence: SignalConfidence;
  direction: SignalDirection;
  impact: SignalImpact;
  definition: string;
  whyItMatters: string;
  dataPoints?: string[];
}

export interface CaseData {
  id: string;
  applicant: string;
  applicantShort: string;
  industry: string;
  assessmentType: string;
  reviewer: string;
  assessment: "review_required" | "low_ambiguity" | "investigation" | "escalated";
  confidence: "high" | "medium" | "low";
  conflictSeverity: "high" | "medium" | "low";
  routing: "human_review" | "standard_review" | "automated";
  executiveSummary: string;
  signals: Signal[];
  financialProfile: {
    monthlyIncome: number;
    monthlyExpenses: number;
    existingDebt: number;
    creditUtilization: number;
    cashBalance: number;
    monthlyDebtService: number;
    repaymentHistory: string;
    incomeTrend: string;
  };
  behavioralSignals: {
    spendingVolatility: string;
    recentLoanActivity: string;
    transactionVolatility: string;
    largRecentTransactions: string;
    employmentContinuity: string;
  };
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  time: string;
  event: string;
  actor: string;
  detail: string;
  type: "system" | "analyst" | "signal" | "decision";
}

export const SIGNALS: Signal[] = [
  {
    id: "income-stability",
    name: "Income Stability",
    category: "Income",
    currentValue: "₹24L annualized",
    evidence: "Stable verified bank credits over 12 months",
    evidenceDetail:
      "Consistent salary credits of ₹2.0–2.4L per month over the past 12 months from two verified employer sources. No gaps exceeding 30 days.",
    source: "Bank statement analysis — last 12 months",
    confidence: "high",
    direction: "positive",
    impact: "supports",
    definition:
      "Income Stability measures whether declared income is consistent, verified, and sustainable over the assessment period.",
    whyItMatters:
      "Verified and stable income is the primary driver of repayment capacity. Inconsistent or unverified income dramatically increases assessment uncertainty.",
    dataPoints: [
      "12 consecutive months of verified credits",
      "Mean monthly credit: ₹2.1L",
      "Std deviation: ₹0.18L (low volatility)",
      "Income source: 2 verified employers",
    ],
  },
  {
    id: "debt-exposure",
    name: "Debt Exposure",
    category: "Debt",
    currentValue: "₹18L",
    evidence: "Debt increased 28% over 6 months",
    evidenceDetail:
      "Total outstanding obligations grew from ₹14.1L to ₹18L in 6 months. New liability includes an unsecured personal loan of ₹3.2L and additional credit card exposure of ₹0.7L.",
    source: "Credit bureau report — current",
    confidence: "high",
    direction: "negative",
    impact: "conflicts",
    definition:
      "Debt Exposure measures the total outstanding financial obligations relative to income and asset capacity.",
    whyItMatters:
      "Rapid debt accumulation — especially above 20% growth — materially increases default risk and conflicts with otherwise healthy repayment signals.",
    dataPoints: [
      "Total debt: ₹18L",
      "6-month growth: +28% (₹14.1L → ₹18L)",
      "New unsecured loan: ₹3.2L (Oct 2025)",
      "Credit card utilization: 72%",
    ],
  },
  {
    id: "repayment-behavior",
    name: "Repayment Behavior",
    category: "Repayment",
    currentValue: "98% on-time",
    evidence: "Consistent loan repayment over 36 months",
    evidenceDetail:
      "Loan repayment history shows 98% on-time payment rate across 3 active loan accounts over the past 36 months. One late payment (< 30 days) recorded in March 2024.",
    source: "Loan repayment database — 36 months",
    confidence: "high",
    direction: "positive",
    impact: "supports",
    definition:
      "Repayment Behavior captures the historical track record of meeting financial obligations on time.",
    whyItMatters:
      "Strong repayment history is one of the strongest predictors of future repayment reliability. A 98% on-time rate is materially positive.",
    dataPoints: [
      "36-month repayment history reviewed",
      "98% on-time rate",
      "1 minor late payment (< 30 days, March 2024)",
      "3 active loan accounts tracked",
    ],
  },
  {
    id: "cash-flow",
    name: "Cash Flow",
    category: "Liquidity",
    currentValue: "₹0.82L avg monthly surplus",
    evidence: "Positive net cash flow with increasing volatility",
    evidenceDetail:
      "Monthly cash flow analysis shows consistent surplus (income minus expenses), averaging ₹0.82L per month. However, month-to-month variance has increased by 40% in the last quarter, indicating growing instability.",
    source: "Transaction-level bank analysis — 12 months",
    confidence: "medium",
    direction: "positive",
    impact: "supports",
    definition:
      "Cash Flow measures the net difference between income and outflows, including expenses and debt service.",
    whyItMatters:
      "Positive cash flow supports current repayment capacity. Increasing volatility, however, is an early warning signal worth monitoring.",
    dataPoints: [
      "Average monthly surplus: ₹0.82L",
      "Min monthly surplus (last 6m): ₹0.31L",
      "Max monthly surplus (last 6m): ₹1.41L",
      "Volatility index: Elevated (+40% in last quarter)",
    ],
  },
  {
    id: "credit-utilization",
    name: "Credit Utilization",
    category: "Credit",
    currentValue: "72%",
    evidence: "Elevated credit card utilization above threshold",
    evidenceDetail:
      "Current credit card utilization stands at 72% of total credit limit. Industry standard for comfortable utilization is below 30%. Utilization has increased from 45% twelve months ago.",
    source: "Credit bureau — current snapshot",
    confidence: "high",
    direction: "negative",
    impact: "conflicts",
    definition:
      "Credit Utilization measures the percentage of available credit being used. High utilization signals financial stress or over-reliance on credit.",
    whyItMatters:
      "Utilization above 70% is a material negative indicator. Combined with 28% debt growth, this pattern signals increasing financial pressure.",
    dataPoints: [
      "Current utilization: 72%",
      "12 months ago: 45%",
      "Industry comfort threshold: <30%",
      "Total credit limit: ₹8.4L",
    ],
  },
  {
    id: "spending-volatility",
    name: "Spending Volatility",
    category: "Behavioral",
    currentValue: "Elevated (σ = 1.8)",
    evidence: "Transaction pattern shows elevated spending variance",
    evidenceDetail:
      "Transaction analysis reveals spending volatility of 1.8 standard deviations above baseline. Three months show spending spikes exceeding 150% of average. No clear seasonal explanation.",
    source: "Transaction-level analysis — 12 months",
    confidence: "medium",
    direction: "negative",
    impact: "conflicts",
    definition:
      "Spending Volatility measures the consistency of monthly expenditure patterns. High volatility suggests unpredictable financial behavior.",
    whyItMatters:
      "Elevated spending volatility introduces uncertainty about future expense levels and reduces the reliability of surplus projections.",
    dataPoints: [
      "Volatility score: 1.8σ above baseline",
      "3 months with spikes >150% of average",
      "No seasonal pattern identified",
      "Largest unexplained spike: Oct 2025 (₹1.2L)",
    ],
  },
  {
    id: "employment-continuity",
    name: "Employment Continuity",
    category: "Employment",
    currentValue: "Unverified",
    evidence: "No independent employment verification obtained",
    evidenceDetail:
      "Employment continuity has not been independently verified through payroll records, HR confirmation, or third-party employment check. Income is verified via bank credits, but source employer continuity is unconfirmed.",
    source: "Internal records — verification pending",
    confidence: "low",
    direction: "unknown",
    impact: "unresolved",
    definition:
      "Employment Continuity verifies whether the income source is stable and ongoing through independent confirmation.",
    whyItMatters:
      "Without employment verification, income projections rely solely on historical data. A change in employment status could materially alter repayment capacity.",
    dataPoints: [
      "Verification status: Not obtained",
      "Bank credits indicate active income source",
      "Employer name on record: Axiom Manufacturing",
      "Last employer verification: Not on file",
    ],
  },
  {
    id: "account-continuity",
    name: "Account Continuity",
    category: "Stability",
    currentValue: "8+ years",
    evidence: "Long-standing primary banking relationship",
    evidenceDetail:
      "Primary bank account has been active for 8 years and 4 months. No account closures or significant account activity gaps detected in the assessment period.",
    source: "Bank relationship data",
    confidence: "high",
    direction: "positive",
    impact: "supports",
    definition:
      "Account Continuity measures the stability and longevity of the primary banking relationship.",
    whyItMatters:
      "Long-standing, active banking relationships indicate financial stability and reduce the risk of undisclosed financial distress.",
    dataPoints: [
      "Account age: 8 years 4 months",
      "Account closures in period: 0",
      "Active transaction frequency: Regular",
      "Average balance maintained: ₹1.2L",
    ],
  },
  {
    id: "liability-statement",
    name: "Current Liability Statement",
    category: "Documentation",
    currentValue: "Unavailable",
    evidence: "Most recent liability statement not provided",
    evidenceDetail:
      "The latest liability statement (within 30 days) has not been provided or obtained. Given the 28% debt growth detected, the current true liability position may differ materially from credit bureau data.",
    source: "Documentation — missing",
    confidence: "low",
    direction: "unknown",
    impact: "unresolved",
    definition:
      "A current liability statement provides a point-in-time snapshot of all outstanding financial obligations.",
    whyItMatters:
      "Given the observed rapid debt growth, the absence of a current liability statement creates material uncertainty about total debt exposure.",
    dataPoints: [
      "Statement status: Not provided",
      "Last credit bureau pull: 45 days ago",
      "Debt growth rate: 28% in 6 months",
      "Risk: Understated liability position",
    ],
  },
];

export const CASE_FL1024: CaseData = {
  id: "FL-1024",
  applicant: "Axiom Manufacturing Pvt. Ltd.",
  applicantShort: "Axiom Manufacturing",
  industry: "Manufacturing",
  assessmentType: "Credit Facility Review",
  reviewer: "Prathmesh Gawade",
  assessment: "review_required",
  confidence: "medium",
  conflictSeverity: "high",
  routing: "human_review",
  executiveSummary:
    "The case demonstrates stable verified income and strong repayment behavior over 36 months. However, these positive indicators are materially offset by rapidly increasing debt obligations (+28% in 6 months), elevated credit utilization (72%), and elevated spending volatility. Two critical information gaps — employment continuity verification and current liability statement — prevent a conclusive automated assessment. The combination of high conflict severity and material information gaps requires human analyst review.",
  signals: SIGNALS,
  financialProfile: {
    monthlyIncome: 240000,
    monthlyExpenses: 158000,
    existingDebt: 1800000,
    creditUtilization: 72,
    cashBalance: 180000,
    monthlyDebtService: 48000,
    repaymentHistory: "Good (98% on-time, 36 months)",
    incomeTrend: "Stable",
  },
  behavioralSignals: {
    spendingVolatility: "Elevated (3 spike months in last 6)",
    recentLoanActivity: "New unsecured loan taken (Oct 2025)",
    transactionVolatility: "Medium-High",
    largRecentTransactions: "₹1.2L unexplained (Oct 2025)",
    employmentContinuity: "Not independently verified",
  },
};

export const ALL_CASES = [
  {
    id: "FL-1024",
    applicant: "Axiom Manufacturing Pvt. Ltd.",
    assessment: "review_required" as const,
    confidence: "medium" as const,
    conflictSeverity: "high" as const,
    reviewer: "Prathmesh Gawade",
    lastUpdated: "21 Sep 2026, 10:47",
    industry: "Manufacturing",
  },
  {
    id: "FL-1025",
    applicant: "Nova Retail Solutions",
    assessment: "low_ambiguity" as const,
    confidence: "high" as const,
    conflictSeverity: "low" as const,
    reviewer: "Vikram Nair",
    lastUpdated: "20 Sep 2026, 15:22",
    industry: "Retail",
  },
  {
    id: "FL-1026",
    applicant: "Vertex Logistics Ltd.",
    assessment: "investigation" as const,
    confidence: "medium" as const,
    conflictSeverity: "medium" as const,
    reviewer: "Ananya Patel",
    lastUpdated: "19 Sep 2026, 11:05",
    industry: "Logistics",
  },
  {
    id: "FL-1027",
    applicant: "Meridian Tech Services",
    assessment: "review_required" as const,
    confidence: "medium" as const,
    conflictSeverity: "high" as const,
    reviewer: "Unassigned",
    lastUpdated: "18 Sep 2026, 09:30",
    industry: "Technology",
  },
  {
    id: "FL-1028",
    applicant: "Harbinger Pharma",
    assessment: "low_ambiguity" as const,
    confidence: "high" as const,
    conflictSeverity: "low" as const,
    reviewer: "Ravi Menon",
    lastUpdated: "17 Sep 2026, 14:10",
    industry: "Pharmaceuticals",
  },
  {
    id: "FL-1029",
    applicant: "Crestline Infrastructure",
    assessment: "investigation" as const,
    confidence: "low" as const,
    conflictSeverity: "medium" as const,
    reviewer: "Prathmesh Gawade",
    lastUpdated: "16 Sep 2026, 16:45",
    industry: "Infrastructure",
  },
];

export const AUDIT_EVENTS: AuditEvent[] = [
  {
    id: "evt-001",
    timestamp: "2026-09-21T10:42:01",
    time: "10:42:01",
    event: "Case Created",
    actor: "System",
    detail: "Case FL-1024 initiated for Axiom Manufacturing Pvt. Ltd. Assessment type: Credit Facility Review.",
    type: "system",
  },
  {
    id: "evt-002",
    timestamp: "2026-09-21T10:42:08",
    time: "10:42:08",
    event: "Financial Inputs Validated",
    actor: "System",
    detail: "9 financial input fields validated. All required fields present. Validation passed with no data quality errors.",
    type: "system",
  },
  {
    id: "evt-003",
    timestamp: "2026-09-21T10:42:14",
    time: "10:42:14",
    event: "9 Signals Derived",
    actor: "SignalGrid Engine",
    detail: "Income Stability, Debt Exposure, Repayment Behavior, Cash Flow, Credit Utilization, Spending Volatility, Employment Continuity, Account Continuity, Liability Statement.",
    type: "signal",
  },
  {
    id: "evt-004",
    timestamp: "2026-09-21T10:42:18",
    time: "10:42:18",
    event: "3 Material Conflicts Detected",
    actor: "SignalGrid Engine",
    detail: "Conflicts identified: (1) Rapid debt accumulation vs. stable income. (2) Elevated credit utilization vs. repayment history. (3) Spending volatility vs. cash flow stability.",
    type: "signal",
  },
  {
    id: "evt-005",
    timestamp: "2026-09-21T10:42:22",
    time: "10:42:22",
    event: "Evidence Confidence Evaluated",
    actor: "SignalGrid Engine",
    detail: "High confidence: 5 signals. Medium confidence: 2 signals. Low confidence: 2 signals (Employment Continuity, Liability Statement).",
    type: "signal",
  },
  {
    id: "evt-006",
    timestamp: "2026-09-21T10:42:27",
    time: "10:42:27",
    event: "Assessment Generated",
    actor: "SignalGrid Engine",
    detail: "Assessment: REVIEW REQUIRED. Confidence: Medium. Conflict Severity: High. Routing: Human Review.",
    type: "decision",
  },
  {
    id: "evt-007",
    timestamp: "2026-09-21T10:42:31",
    time: "10:42:31",
    event: "Human Review Triggered",
    actor: "SignalGrid Engine",
    detail: "Review triggered on condition: High conflict severity AND material information gaps (2 unresolved signals). Priority: High.",
    type: "decision",
  },
  {
    id: "evt-008",
    timestamp: "2026-09-21T10:42:35",
    time: "10:42:35",
    event: "Reviewer Assigned",
    actor: "System",
    detail: "Case assigned to analyst Prathmesh Gawade based on industry rotation. Priority: High.",
    type: "system",
  },
  {
    id: "evt-009",
    timestamp: "2026-09-21T10:45:10",
    time: "10:45:10",
    event: "Analyst Opened Case",
    actor: "Prathmesh Gawade",
    detail: "Analyst opened case FL-1024 in the Review Workspace. Session started.",
    type: "analyst",
  },
  {
    id: "evt-010",
    timestamp: "2026-09-21T10:47:32",
    time: "10:47:32",
    event: "Analyst Action Recorded",
    actor: "Prathmesh Gawade",
    detail: "Analyst requested verification of Employment Continuity and Current Liability Statement. Status: Pending third-party verification.",
    type: "analyst",
  },
];

export const DECISION_CRITICAL_INFO = [
  {
    rank: 1,
    title: "Current Liability Statement",
    priority: "HIGH" as const,
    reason: "Given 28% debt growth in 6 months, the current liability statement could materially change the debt exposure assessment and overall conflict severity.",
    impact: "Could shift routing from Human Review to Standard Review if liabilities are stable, or escalate if additional obligations are disclosed.",
    status: "Pending",
  },
  {
    rank: 2,
    title: "Employment Continuity Verification",
    priority: "MEDIUM" as const,
    reason: "Independent verification of employment status would resolve the income continuity uncertainty and improve overall confidence from Medium to High.",
    impact: "Would remove one unresolved factor and potentially increase confidence level.",
    status: "Requested",
  },
  {
    rank: 3,
    title: "Explanation for Oct 2025 Transaction Spike",
    priority: "LOW" as const,
    reason: "An unexplained ₹1.2L spending event in October 2025 contributes to spending volatility signal. An explanation (e.g., business expense) could reduce this signal's conflict impact.",
    impact: "Minor — would improve context but unlikely to change assessment routing.",
    status: "Not requested",
  },
];
