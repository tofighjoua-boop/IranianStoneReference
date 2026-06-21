interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
}

export function Container({ children, className = "", narrow = false }: ContainerProps) {
  return (
    <div
      className={[
        "mx-auto w-full px-4 sm:px-6 lg:px-10 xl:px-16",
        narrow ? "max-w-3xl" : "max-w-7xl",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
