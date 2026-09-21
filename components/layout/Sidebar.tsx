"use client";
// components/layout/Sidebar.tsx

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderOpen,
  PlusCircle,
  Grid3x3,
  GitBranch,
  SlidersHorizontal,
  ListChecks,
  Users,
  FileText,
  ClipboardList,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { clsxMerge } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Overview", href: "/overview", icon: LayoutDashboard },
  { label: "Cases", href: "/cases", icon: FolderOpen },
  { label: "New Assessment", href: "/new-assessment", icon: PlusCircle },
  { divider: true },
  { label: "Assessment", href: "/assessment/FL-1024", icon: Zap },
  { label: "Signal Grid", href: "/signal-grid", icon: Grid3x3 },
  { label: "Evidence Graph", href: "/evidence-graph", icon: GitBranch },
  { label: "Decision Sensitivity", href: "/decision-sensitivity", icon: SlidersHorizontal },
  { label: "What Matters Next", href: "/what-matters-next", icon: ListChecks },
  { divider: true },
  { label: "Review Center", href: "/review-center", icon: Users },
  { label: "Analyst Review", href: "/analyst-review", icon: ClipboardList },
  { label: "Decision Brief", href: "/decision-brief", icon: FileText },
  { label: "Audit Trail", href: "/audit-trail", icon: ClipboardList },
  { label: "Governance", href: "/governance", icon: ShieldCheck },
];

type NavItem =
  | { label: string; href: string; icon: React.ComponentType<{ size?: number; className?: string }> ; divider?: never }
  | { divider: true; label?: never; href?: never; icon?: never };

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-56 bg-bg-surface border-r border-border flex flex-col z-50">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-border flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded bg-accent flex items-center justify-center flex-shrink-0">
            <Grid3x3 size={14} className="text-white" />
          </div>
          <div>
            <div className="text-sm font-bold text-text-primary tracking-tight">SignalGrid</div>
            <div className="text-2xs text-text-muted leading-tight">Decision Intelligence</div>
          </div>
        </div>
      </div>

      {/* Active Case Pill */}
      <div className="px-4 py-3 border-b border-border flex-shrink-0">
        <div className="bg-accent/10 border border-accent/20 rounded px-2.5 py-1.5">
          <div className="text-2xs text-accent-text font-medium uppercase tracking-wider">Active Case</div>
          <div className="text-xs text-text-primary font-semibold mt-0.5">FL-1024 — Axiom Mfg.</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
        {(NAV_ITEMS as NavItem[]).map((item, idx) => {
          if ("divider" in item && item.divider) {
            return <div key={idx} className="my-2 border-t border-border" />;
          }
          const navItem = item as { label: string; href: string; icon: React.ComponentType<{ size?: number; className?: string }> };
          const Icon = navItem.icon;
          const isActive = pathname === navItem.href || (navItem.href !== "/" && pathname.startsWith(navItem.href) && navItem.href !== "/overview");
          const exactActive = pathname === navItem.href;

          return (
            <Link
              key={navItem.href}
              href={navItem.href}
              className={clsxMerge(
                "flex items-center gap-2.5 px-2.5 py-2 rounded text-xs font-medium transition-all group",
                exactActive
                  ? "bg-accent/15 text-accent-text border border-accent/25"
                  : "text-text-secondary hover:text-text-primary hover:bg-bg-elevated"
              )}
            >
              <Icon
                size={14}
                className={clsxMerge(
                  "flex-shrink-0 transition-colors",
                  exactActive ? "text-accent-text" : "text-text-muted group-hover:text-text-secondary"
                )}
              />
              <span>{navItem.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-border flex-shrink-0">
        <div className="text-2xs text-text-muted">
          <div className="font-medium text-text-secondary">Prathmesh Gawade</div>
          <div>Senior Analyst · Risk Team</div>
        </div>
      </div>
    </aside>
  );
}

export { Sidebar };

