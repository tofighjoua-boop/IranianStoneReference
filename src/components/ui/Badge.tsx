type BadgeVariant = "exclusive" | "new" | "category" | "coming-soon";

const variantStyles: Record<BadgeVariant, string> = {
  exclusive: "bg-[#c6a25f] text-white",
  new: "bg-[#0c1626] text-[#c6a25f] border border-[#c6a25f]",
  category: "bg-white/10 text-white border border-white/30 backdrop-blur-sm",
  "coming-soon": "bg-[#1d2330]/60 text-[#c6a25f] border border-[#c6a25f]/40",
};

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = "exclusive", children, className = "" }: BadgeProps) {
  return (
    <span
      className={[
        "inline-block px-2 py-0.5",
        "text-[10px] uppercase tracking-[0.15em] font-bold",
        variantStyles[variant],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
