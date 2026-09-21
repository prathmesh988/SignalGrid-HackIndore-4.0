// components/layout/PageHeader.tsx

import { clsxMerge } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export default function PageHeader({ title, subtitle, badge, actions, className }: PageHeaderProps) {
  return (
    <div className={clsxMerge("flex items-start justify-between mb-6 gap-4", className)}>
      <div className="min-w-0 flex-1">
        {badge && <div className="mb-2.5">{badge}</div>}
        <h1 className="text-2xl font-bold text-foreground tracking-tight">{title}</h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{subtitle}</p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-2 flex-shrink-0 ml-4">{actions}</div>
      )}
    </div>
  );
}
