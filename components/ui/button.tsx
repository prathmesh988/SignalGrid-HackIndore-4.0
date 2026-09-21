import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/85 shadow-sm",
        primary: "bg-primary text-primary-foreground hover:bg-primary/85 shadow-sm",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground border border-border",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/15 text-destructive hover:bg-destructive/25 border border-destructive/30 focus-visible:border-destructive/40 focus-visible:ring-destructive/20",
        danger:
          "bg-destructive/15 text-destructive hover:bg-destructive/25 border border-destructive/30 focus-visible:border-destructive/40 focus-visible:ring-destructive/20",
        success:
          "bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 border border-emerald-500/30",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 gap-2 px-4",
        xs: "h-7 gap-1.5 rounded-md px-2.5 text-xs",
        sm: "h-8 gap-1.5 rounded-lg px-3.5 text-sm",
        md: "h-9 gap-2 px-4 text-sm",
        lg: "h-11 gap-2 px-6 text-sm font-semibold",
        icon: "size-9",
        "icon-xs": "size-7",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "ghost"
    | "destructive"
    | "danger"
    | "success"
    | "outline"
    | "link";
  size?: "default" | "xs" | "sm" | "md" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg";
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      icon,
      iconRight,
      loading,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="size-3.5 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
        ) : (
          icon && <span className="shrink-0">{icon}</span>
        )}
        {children}
        {iconRight && <span className="shrink-0">{iconRight}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
export default Button;
