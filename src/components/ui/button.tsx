"use client";

import React, { forwardRef } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "gold";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-[#c6a25f] text-white border border-[#c6a25f] hover:bg-[#d8bd86] hover:border-[#d8bd86]",
  outline:
    "bg-transparent text-[#c6a25f] border border-[#c6a25f] hover:bg-[#c6a25f] hover:text-white",
  ghost:
    "bg-transparent text-[#f4f1ea] border border-transparent hover:border-[#c6a25f] hover:text-[#c6a25f]",
  secondary:
    "bg-[#f5f3ef] text-[#1d2330] border border-[#e5e0d8] hover:border-[#c6a25f] hover:text-[#c6a25f]",
  gold:
    "bg-[#c6a25f] text-[#0c1626] border border-[#c6a25f] hover:bg-[#d8bd86] font-bold",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-sm",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => (
    <button
      ref={ref}
      className={[
        "inline-flex items-center justify-center gap-2",
        "uppercase tracking-[0.15em] font-semibold",
        "transition-all duration-300 cursor-pointer select-none",
        variantStyles[variant],
        sizeStyles[size],
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  )
);
Button.displayName = "Button";
