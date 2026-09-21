"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  RotateCcw,
  ChevronDown,
  Building2,
} from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useCaseStore } from "@/store/caseStore";

const ROUTE_TITLES: Record<string, string> = {
  "/overview": "Overview",
  "/cases": "Cases",
  "/new-assessment": "New Assessment",
  "/assessment/FL-1024": "Assessment",
  "/signal-grid": "Signal Grid",
  "/evidence-graph": "Evidence Graph",
  "/decision-sensitivity": "Decision Sensitivity",
  "/what-matters-next": "What Matters Next",
  "/review-center": "Review Center",
  "/analyst-review": "Analyst Review",
  "/decision-brief": "Decision Brief",
  "/audit-trail": "Audit Trail",
  "/governance": "Governance",
};

export default function TopHeader() {
  const pathname = usePathname();
  const resetSensitivity = useCaseStore((state) => state.resetSensitivity);

  const pageTitle = ROUTE_TITLES[pathname] || pathname.replace("/", "").replace(/-/g, " ");

  const handleDemoReset = () => {
    resetSensitivity();
  };

  return (
    <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center justify-between border-b border-border/80 bg-background/95 px-4 backdrop-blur-md">
      {/* Left: SidebarTrigger + Breadcrumb */}
      <div className="flex items-center gap-3">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground size-8" />
        <div className="h-4 w-px bg-border/70" />

        <Breadcrumb className="text-xs font-medium">
          <BreadcrumbList className="gap-1.5 text-xs text-muted-foreground">
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href="/overview" />} className="hover:text-foreground">
                SignalGrid
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium text-muted-foreground capitalize">
                {pageTitle}
              </BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <span className="font-semibold text-foreground font-mono text-[11px] px-1.5 py-0.5 rounded bg-muted/60 border border-border/60">
                FL-1024
              </span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Right: Case selector, Demo reset, Notifications, User avatar */}
      <div className="flex items-center gap-2.5">
        {/* Case Selector */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted/50 border border-border/70 text-xs font-medium text-foreground hover:bg-muted/80 transition-colors cursor-pointer">
          <Building2 className="size-3.5 text-muted-foreground" />
          <span className="font-mono text-blue-400 font-semibold">FL-1024</span>
          <span className="text-muted-foreground">· Axiom Mfg.</span>
          <ChevronDown className="size-3 text-muted-foreground ml-0.5" />
        </div>

        {/* Demo Reset */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleDemoReset}
          className="h-8 gap-1.5 text-xs text-muted-foreground border-border bg-background hover:text-foreground hover:bg-muted/60"
          title="Reset parameter adjustments to baseline"
        >
          <RotateCcw className="size-3.5" />
          <span className="hidden md:inline">Demo Reset</span>
        </Button>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="size-8 text-muted-foreground hover:text-foreground relative"
        >
          <Bell className="size-4" />
          <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-blue-500" />
        </Button>

        {/* User Avatar */}
        <div className="flex items-center gap-2 pl-1">
          <Avatar size="sm" className="border border-border">
            <AvatarFallback className="bg-primary/20 text-primary font-semibold text-[11px]">
              PG
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
