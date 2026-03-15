import * as React from "react";
import { cn } from "@/lib";

type Variant = "default" | "outline";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", type = "button", ...props }, ref) => {
    const variantClasses: Record<Variant, string> = {
      default:
        "bg-[#4d3426] text-white hover:bg-[#65493a] border border-transparent",
      outline:
        "bg-white/70 text-[#4d3426] border border-[#d9c7b6] hover:bg-[#f6ecdf]",
    };

    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium shadow-sm transition disabled:cursor-not-allowed disabled:opacity-50",
          variantClasses[variant],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
