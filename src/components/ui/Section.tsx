type SectionBg = "dark" | "light" | "cream" | "gold" | "transparent";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  bg?: SectionBg;
  /** Skip internal padding — useful for full-bleed image sections */
  noPadding?: boolean;
  /** Remove the inner max-width container */
  fullBleed?: boolean;
  id?: string;
  backgroundDark?: boolean;
}

const bgStyles: Record<SectionBg, string> = {
  dark: "bg-[#0c1626] text-[#f4f1ea]",
  light: "bg-white text-[#1d2330]",
  cream: "bg-[#fbfaf6] text-[#1d2330]",
  gold: "bg-[#c6a25f] text-[#0c1626]",
  transparent: "",
};

export function Section({
  children,
  className = "",
  bg = "light",
  noPadding = false,
  fullBleed = false,
  id,
  backgroundDark = false,
}: SectionProps) {
  const resolvedBg = backgroundDark ? "dark" : bg;
  return (
    <section
      id={id}
      className={[
        bgStyles[resolvedBg],
        noPadding ? "" : "py-16 sm:py-20 lg:py-28",
        fullBleed ? "px-0" : "px-4 sm:px-6 lg:px-10",
        className,
      ].join(" ")}
    >
      {children}
    </section>
  );
}
