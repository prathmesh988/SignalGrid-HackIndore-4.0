import * as React from "react";
import { cn } from "cn";
import { clsxMerge } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  size?: "default" | "sm";
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, padding, hover, size = "default", onClick, children, ...props }, ref) => {
    const paddingClass =
      padding !== undefined
        ? {
            none: "p-0",
            sm: "p-4",
            md: "p-6",
            lg: "p-8",
          }[padding]
        : padding === undefined && !className?.includes("p-")
        ? "p-6"
        : "";

    return (
      <div
        ref={ref}
        data-slot="card"
        data-size={size}
        onClick={onClick}
        className={cn(
          "group/card flex flex-col overflow-hidden rounded-xl bg-card text-card-foreground border border-border/80 shadow-sm transition-all",
          paddingClass,
          hover && "hover:border-border/60 hover:bg-card/80 cursor-pointer",
          onClick && "cursor-pointer",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header flex flex-col gap-2 pb-5 border-b border-border/60",
        className
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-heading text-sm font-semibold tracking-tight text-foreground",
        className
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-xs text-muted-foreground", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("text-sm pt-6", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center pt-4 border-t border-border/60", className)}
      {...props}
    />
  );
}

interface KpiCardProps {
  label: string;
  value: string | number;
  sub?: string;
  accent?: "neutral" | "support" | "conflict" | "unresolved" | "info";
  icon?: React.ReactNode;
}

function KpiCard({
  label,
  value,
  sub,
  accent = "neutral",
  icon,
}: KpiCardProps) {
  const accentConfig = {
    neutral: {
      dot: "bg-muted-foreground",
      dotLabel: "text-muted-foreground",
      value: "text-foreground",
      dotBg: "bg-muted/40 border-border/70",
    },
    support: {
      dot: "bg-emerald-500",
      dotLabel: "text-emerald-400",
      value: "text-foreground",
      dotBg: "bg-emerald-500/10 border-emerald-500/30",
    },
    conflict: {
      dot: "bg-red-500",
      dotLabel: "text-red-400",
      value: "text-foreground",
      dotBg: "bg-red-500/10 border-red-500/30",
    },
    unresolved: {
      dot: "bg-amber-500",
      dotLabel: "text-amber-400",
      value: "text-foreground",
      dotBg: "bg-amber-500/10 border-amber-500/30",
    },
    info: {
      dot: "bg-blue-500",
      dotLabel: "text-blue-400",
      value: "text-foreground",
      dotBg: "bg-blue-500/10 border-blue-500/30",
    },
  }[accent];

  return (
    <Card className="p-6 flex flex-col justify-between gap-4 hover:border-border/80 transition-all min-h-[120px]">
      <div className="flex items-start justify-between gap-3">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider leading-tight">
          {label}
        </span>
        <span
          className={clsxMerge(
            "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold border uppercase tracking-wider shrink-0",
            accentConfig.dotBg,
            accentConfig.dotLabel
          )}
        >
          <span className={clsxMerge("size-1.5 rounded-full", accentConfig.dot)} />
          {accent}
        </span>
      </div>
      <div>
        <div className="text-4xl font-bold tracking-tight font-mono text-foreground leading-none">
          {value}
        </div>
        {sub && (
          <div className="text-xs text-muted-foreground mt-2 leading-relaxed">
            {sub}
          </div>
        )}
      </div>
    </Card>
  );
}


export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
  KpiCard,
};
export default Card;
