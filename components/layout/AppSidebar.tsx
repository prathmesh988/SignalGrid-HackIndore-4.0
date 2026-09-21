"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderOpen,
  PlusCircle,
  Zap,
  Grid3x3,
  GitBranch,
  SlidersHorizontal,
  ListChecks,
  Users,
  FileText,
  ClipboardList,
  ShieldCheck,
  Building2,
  ChevronRight,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const WORKSPACE_NAV = [
  { label: "Overview", href: "/overview", icon: LayoutDashboard },
  { label: "Cases", href: "/cases", icon: FolderOpen, badge: "12" },
  { label: "New Assessment", href: "/new-assessment", icon: PlusCircle },
];

const DECISION_INTELLIGENCE_NAV = [
  { label: "Assessment", href: "/assessment/FL-1024", icon: Zap },
  { label: "Signal Grid", href: "/signal-grid", icon: Grid3x3, badge: "5" },
  { label: "Evidence Graph", href: "/evidence-graph", icon: GitBranch },
  { label: "Decision Sensitivity", href: "/decision-sensitivity", icon: SlidersHorizontal },
  { label: "What Matters Next", href: "/what-matters-next", icon: ListChecks },
];

const REVIEW_NAV = [
  { label: "Review Center", href: "/review-center", icon: Users },
  { label: "Analyst Review", href: "/analyst-review", icon: ClipboardList },
];

const GOVERNANCE_NAV = [
  { label: "Decision Brief", href: "/decision-brief", icon: FileText },
  { label: "Audit Trail", href: "/audit-trail", icon: ShieldCheck },
  { label: "Governance", href: "/governance", icon: ShieldCheck },
];

export default function AppSidebar() {
  const pathname = usePathname();

  const isItemActive = (href: string) => {
    if (href === "/overview" && pathname === "/overview") return true;
    if (href === "/cases" && pathname === "/cases") return true;
    if (href === "/new-assessment" && pathname === "/new-assessment") return true;
    if (href !== "/overview" && href !== "/cases" && href !== "/new-assessment") {
      return pathname === href || pathname.startsWith(href);
    }
    return false;
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-border bg-[#0B0D11]">
      {/* Brand Header */}
      <SidebarHeader className="px-4 py-3.5 border-b border-border/60">
        <Link
          href="/overview"
          className="flex items-center gap-3 px-1 py-1 rounded-md hover:bg-muted/40 transition-colors group"
        >
          <div className="size-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shrink-0 shadow-sm shadow-blue-500/25 group-hover:scale-105 transition-transform">
            <Grid3x3 className="size-4 text-white" />
          </div>
          <div className="flex flex-col min-w-0 group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-bold tracking-tight text-foreground flex items-center gap-1.5">
              SIGNALGRID
            </span>
            <span className="text-[11px] text-muted-foreground truncate">
              Decision Intelligence
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-3 space-y-4">
        {/* Active Case Card (Collapses smoothly in icon mode) with generous padding */}
        <div className="group-data-[collapsible=icon]:hidden">
          <Link
            href="/assessment/FL-1024"
            className="block p-3 rounded-xl bg-card border border-border hover:border-primary/50 transition-all group relative shadow-xs"
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[10px] font-mono font-semibold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-blue-400 animate-pulse" />
                Active Focus
              </span>
              <Badge variant="destructive" className="text-[9px] px-1.5 py-0.5 font-semibold">
                CONFLICT
              </Badge>
            </div>
            <div className="text-xs font-bold text-foreground truncate flex items-center gap-1.5">
              <Building2 className="size-3.5 text-muted-foreground shrink-0" />
              FL-1024 · Axiom Mfg.
            </div>
            <div className="text-[11px] text-muted-foreground mt-1.5 pt-1.5 border-t border-border/50 flex items-center justify-between">
              <span>₹14.2 Cr Exposure</span>
              <span className="text-blue-400 flex items-center text-[10px] font-semibold group-hover:translate-x-0.5 transition-transform">
                View <ChevronRight className="size-3 ml-0.5" />
              </span>
            </div>
          </Link>
        </div>

        {/* Group 1: WORKSPACE */}
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="text-[10px] uppercase tracking-wider text-muted-foreground/80 px-2 py-1 font-bold group-data-[collapsible=icon]:hidden">
            WORKSPACE
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {WORKSPACE_NAV.map((item) => {
                const active = isItemActive(item.href);
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      render={<Link href={item.href} />}
                      isActive={active}
                      tooltip={item.label}
                      className={
                        active
                          ? "bg-primary/15 text-primary border border-primary/25 font-semibold"
                          : "text-xs font-medium text-muted-foreground hover:text-foreground"
                      }
                    >
                      <item.icon className="size-4 shrink-0" />
                      <span className="truncate">{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-muted text-muted-foreground group-data-[collapsible=icon]:hidden">
                          {item.badge}
                        </span>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="group-data-[collapsible=icon]:hidden" />

        {/* Group 2: DECISION INTELLIGENCE */}
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="text-[10px] uppercase tracking-wider text-muted-foreground/80 px-2 py-1 font-bold group-data-[collapsible=icon]:hidden">
            DECISION INTELLIGENCE
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {DECISION_INTELLIGENCE_NAV.map((item) => {
                const active = isItemActive(item.href);
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      render={<Link href={item.href} />}
                      isActive={active}
                      tooltip={item.label}
                      className={
                        active
                          ? "bg-primary/15 text-primary border border-primary/25 font-semibold"
                          : "text-xs font-medium text-muted-foreground hover:text-foreground"
                      }
                    >
                      <item.icon className="size-4 shrink-0" />
                      <span className="truncate">{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 group-data-[collapsible=icon]:hidden">
                          {item.badge}
                        </span>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="group-data-[collapsible=icon]:hidden" />

        {/* Group 3: REVIEW */}
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="text-[10px] uppercase tracking-wider text-muted-foreground/80 px-2 py-1 font-bold group-data-[collapsible=icon]:hidden">
            REVIEW
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {REVIEW_NAV.map((item) => {
                const active = isItemActive(item.href);
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      render={<Link href={item.href} />}
                      isActive={active}
                      tooltip={item.label}
                      className={
                        active
                          ? "bg-primary/15 text-primary border border-primary/25 font-semibold"
                          : "text-xs font-medium text-muted-foreground hover:text-foreground"
                      }
                    >
                      <item.icon className="size-4 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="group-data-[collapsible=icon]:hidden" />

        {/* Group 4: GOVERNANCE */}
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="text-[10px] uppercase tracking-wider text-muted-foreground/80 px-2 py-1 font-bold group-data-[collapsible=icon]:hidden">
            GOVERNANCE
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {GOVERNANCE_NAV.map((item) => {
                const active = isItemActive(item.href);
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      render={<Link href={item.href} />}
                      isActive={active}
                      tooltip={item.label}
                      className={
                        active
                          ? "bg-primary/15 text-primary border border-primary/25 font-semibold"
                          : "text-xs font-medium text-muted-foreground hover:text-foreground"
                      }
                    >
                      <item.icon className="size-4 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer: User profile / reviewer (Prathmesh Gawade) */}
      <SidebarFooter className="p-3.5 border-t border-border/60">
        <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-md hover:bg-muted/40 transition-colors">
          <Avatar size="sm" className="border border-border">
            <AvatarFallback className="bg-primary/20 text-primary font-semibold text-xs">
              PG
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0 group-data-[collapsible=icon]:hidden">
            <span className="text-xs font-bold text-foreground truncate">
              Prathmesh Gawade
            </span>
            <span className="text-[10px] text-muted-foreground truncate">
              Risk Analyst
            </span>
          </div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
