export { cn } from "cn";

export function clsxMerge(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatCurrency(value: number, currency = "₹"): string {
  if (value >= 100000) return `${currency}${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `${currency}${(value / 1000).toFixed(0)}K`;
  return `${currency}${value}`;
}

export function formatPercent(value: number): string {
  return `${value}%`;
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
