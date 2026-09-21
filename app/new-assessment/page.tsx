"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCaseStore } from "@/store/caseStore";
import { Zap, Building2, DollarSign, Brain, ChevronRight, ArrowRight, ShieldAlert, CheckCircle2 } from "lucide-react";
import { clsxMerge, sleep } from "@/lib/utils";

interface FieldProps {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  options?: string[];
  helper?: string;
}

function Field({ label, id, value, onChange, type = "text", placeholder, options, helper }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-xs font-semibold text-foreground tracking-tight">
        {label}
      </label>
      {options ? (
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-background border border-border rounded-lg px-3.5 py-2 text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all cursor-pointer"
        >
          {options.map((o) => (
            <option key={o} value={o} className="bg-popover text-popover-foreground">
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-background border border-border rounded-lg px-3.5 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all font-mono"
        />
      )}
      {helper && <p className="text-[11px] text-muted-foreground">{helper}</p>}
    </div>
  );
}

const LOADING_MESSAGES = [
  "Validating financial inputs & tax returns...",
  "Deriving multi-dimensional financial signals...",
  "Evaluating evidence confidence & source reliability...",
  "Detecting conflicting signals & contradictions...",
  "Computing conflict severity & default elasticity...",
  "Synthesizing consensus routing recommendation...",
  "Finalizing assessment decision brief...",
];

export default function NewAssessmentPage() {
  const router = useRouter();
  const { setIsAnalyzing } = useCaseStore();

  const [loadingMsg, setLoadingMsg] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Form state default set to Case FL-1024 with Prathmesh Gawade as reviewer
  const [form, setForm] = useState({
    name: "Axiom Manufacturing Pvt. Ltd.",
    caseId: "FL-1024",
    assessmentType: "Credit Facility Review",
    industry: "Manufacturing",
    reviewer: "Prathmesh Gawade",
    monthlyIncome: "240000",
    monthlyExpenses: "158000",
    existingDebt: "1800000",
    creditUtilization: "72",
    cashBalance: "180000",
    monthlyDebtService: "48000",
    repaymentHistory: "Good",
    incomeTrend: "Stable",
    spendingVolatility: "Elevated",
    recentLoanActivity: "Yes — unsecured loan (Oct 2025)",
    transactionVolatility: "Medium-High",
    largeTransactions: "Yes — ₹1.2L (Oct 2025)",
    employmentContinuity: "Not independently verified",
  });

  const set = (key: string) => (val: string) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = async () => {
    setIsLoading(true);
    setIsAnalyzing(true);

    for (let i = 0; i < LOADING_MESSAGES.length; i++) {
      setLoadingMsg(i);
      await sleep(400);
    }

    setIsAnalyzing(false);
    router.push("/assessment/FL-1024");
  };

  return (
    <div className="space-y-6 animate-fade-in pb-8">
      {/* Page Header */}
      <PageHeader
        title="New Financial Assessment"
        subtitle="Ingest applicant profile, financial statements, and behavioral indicators to synthesize consensus intelligence."
        badge={
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
            <Zap className="size-3.5 text-primary" />
            <span>Underwriting Intake Engine</span>
          </div>
        }
      />

      {/* Loading Modal / State */}
      {isLoading && (
        <Card className="p-8 border-primary/50 bg-primary/5 rounded-xl shadow-lg flex flex-col items-center justify-center text-center space-y-4">
          <div className="relative flex size-12">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full size-12 bg-primary/20 border border-primary flex items-center justify-center">
              <Zap className="size-6 text-primary animate-pulse" />
            </span>
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground">Running Consensus Engine</h3>
            <p className="text-xs text-primary font-mono mt-1 animate-pulse">
              {LOADING_MESSAGES[loadingMsg]}
            </p>
          </div>
          <div className="flex gap-1.5 pt-2">
            {LOADING_MESSAGES.map((_, i) => (
              <div
                key={i}
                className={clsxMerge(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === loadingMsg ? "bg-primary w-6" : i < loadingMsg ? "bg-primary/40 w-2" : "bg-muted w-2"
                )}
              />
            ))}
          </div>
        </Card>
      )}

      <div className="space-y-6">
        {/* Section 1: Applicant Profile */}
        <Card className="border-border bg-card p-6 rounded-xl shadow-sm">
          <CardHeader className="p-0 pb-5 border-b border-border/70">
            <CardTitle className="text-sm font-semibold tracking-tight text-foreground flex items-center gap-2">
              <Building2 className="size-4 text-primary" />
              Applicant Profile & Context
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-1">
              Business entity identity, industry classification, and assigned underwriting authority.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0 pt-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field
                label="Applicant / Business Name"
                id="name"
                value={form.name}
                onChange={set("name")}
                placeholder="e.g. Axiom Manufacturing Pvt. Ltd."
              />
              <Field
                label="Case Reference ID"
                id="caseId"
                value={form.caseId}
                onChange={set("caseId")}
                placeholder="e.g. FL-1024"
              />
              <Field
                label="Assessment Type"
                id="assessmentType"
                value={form.assessmentType}
                onChange={set("assessmentType")}
                options={[
                  "Credit Facility Review",
                  "Loan Origination",
                  "Annual Review",
                  "Restructuring Review",
                ]}
              />
              <Field
                label="Industry Vertical"
                id="industry"
                value={form.industry}
                onChange={set("industry")}
                options={[
                  "Manufacturing",
                  "Retail",
                  "Logistics",
                  "Technology",
                  "Pharmaceuticals",
                  "Infrastructure",
                  "Financial Services",
                ]}
              />
              <div className="md:col-span-2">
                <Field
                  label="Assigned Reviewer"
                  id="reviewer"
                  value={form.reviewer}
                  onChange={set("reviewer")}
                  options={[
                    "Prathmesh Gawade",
                    "Vikram Nair",
                    "Ananya Patel",
                    "Ravi Menon",
                    "Unassigned",
                  ]}
                  helper="Assigned lead risk analyst responsible for human-in-the-loop review."
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Financial Quantitative Profile */}
        <Card className="border-border bg-card p-6 rounded-xl shadow-sm">
          <CardHeader className="p-0 pb-5 border-b border-border/70">
            <CardTitle className="text-sm font-semibold tracking-tight text-foreground flex items-center gap-2">
              <DollarSign className="size-4 text-emerald-400" />
              Quantitative Financial Metrics
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-1">
              Extracted from verified bank statements, tax returns, and audited financial filings.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0 pt-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <Field
                label="Monthly Income (₹)"
                id="monthlyIncome"
                value={form.monthlyIncome}
                onChange={set("monthlyIncome")}
                type="number"
                placeholder="240000"
              />
              <Field
                label="Monthly Expenses (₹)"
                id="monthlyExpenses"
                value={form.monthlyExpenses}
                onChange={set("monthlyExpenses")}
                type="number"
                placeholder="158000"
              />
              <Field
                label="Existing Outstanding Debt (₹)"
                id="existingDebt"
                value={form.existingDebt}
                onChange={set("existingDebt")}
                type="number"
                placeholder="1800000"
              />
              <Field
                label="Credit Utilization (%)"
                id="creditUtilization"
                value={form.creditUtilization}
                onChange={set("creditUtilization")}
                type="number"
                placeholder="72"
              />
              <Field
                label="Unencumbered Cash Balance (₹)"
                id="cashBalance"
                value={form.cashBalance}
                onChange={set("cashBalance")}
                type="number"
                placeholder="180000"
              />
              <Field
                label="Monthly Debt Service Obligation (₹)"
                id="monthlyDebtService"
                value={form.monthlyDebtService}
                onChange={set("monthlyDebtService")}
                type="number"
                placeholder="48000"
              />
              <Field
                label="Historical Repayment Compliance"
                id="repaymentHistory"
                value={form.repaymentHistory}
                onChange={set("repaymentHistory")}
                options={["Excellent", "Good", "Fair", "Poor", "No History"]}
              />
              <Field
                label="Income Trend (12 Months)"
                id="incomeTrend"
                value={form.incomeTrend}
                onChange={set("incomeTrend")}
                options={["Stable", "Growing", "Declining", "Volatile", "Unknown"]}
              />
              <div className="flex flex-col justify-end">
                <div className="p-3 rounded-lg bg-muted/30 border border-border/60 text-[11px] text-muted-foreground">
                  <span className="font-semibold text-foreground">Debt-to-Income:</span> {(Number(form.existingDebt) / (Number(form.monthlyIncome) * 12)).toFixed(1)}x annualized
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Behavioral & Contextual Signals */}
        <Card className="border-border bg-card p-6 rounded-xl shadow-sm">
          <CardHeader className="p-0 pb-5 border-b border-border/70">
            <CardTitle className="text-sm font-semibold tracking-tight text-foreground flex items-center gap-2">
              <Brain className="size-4 text-purple-400" />
              Behavioral & Qualitative Signals
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-1">
              Pattern indicators, sudden borrowing velocity, and verification confidence gaps.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0 pt-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field
                label="Spending Volatility"
                id="spendingVolatility"
                value={form.spendingVolatility}
                onChange={set("spendingVolatility")}
                options={["Low", "Moderate", "Elevated", "High", "Unknown"]}
              />
              <Field
                label="Recent Short-term Loan Activity"
                id="recentLoanActivity"
                value={form.recentLoanActivity}
                onChange={set("recentLoanActivity")}
                options={[
                  "None",
                  "Yes — secured loan",
                  "Yes — unsecured loan (Oct 2025)",
                  "Yes — multiple loans",
                  "Unknown",
                ]}
              />
              <Field
                label="Account Transaction Volatility"
                id="transactionVolatility"
                value={form.transactionVolatility}
                onChange={set("transactionVolatility")}
                options={["Low", "Medium", "Medium-High", "High", "Unknown"]}
              />
              <Field
                label="Unusual Large Recent Transactions"
                id="largeTransactions"
                value={form.largeTransactions}
                onChange={set("largeTransactions")}
                options={[
                  "None detected",
                  "Yes — ₹1.2L (Oct 2025)",
                  "Yes — multiple large txns",
                  "Unknown",
                ]}
              />
              <div className="md:col-span-2">
                <Field
                  label="Independent Employment / Continuity Verification"
                  id="employmentContinuity"
                  value={form.employmentContinuity}
                  onChange={set("employmentContinuity")}
                  options={[
                    "Verified via EPFO & Bank Stmt",
                    "Partially Verified",
                    "Not independently verified",
                    "Pending Third-party Report",
                  ]}
                  helper="Discrepancies here trigger unresolved factor flags in the consensus matrix."
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Submission Action Card */}
        <Card className="p-6 border-border bg-card rounded-xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-foreground">Ready to analyze with SignalGrid?</h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              The engine will extract 9 signals, detect contradictions, and synthesize routing for <strong>Prathmesh Gawade</strong>.
            </p>
          </div>
          <Button
            variant="default"
            size="lg"
            onClick={handleSubmit}
            disabled={isLoading}
            icon={<Zap className="size-4" />}
            className="w-full sm:w-auto font-semibold px-6 gap-2"
          >
            {isLoading ? "Processing Signals..." : "Analyze with SignalGrid"}
            <ArrowRight className="size-4" />
          </Button>
        </Card>
      </div>
    </div>
  );
}
