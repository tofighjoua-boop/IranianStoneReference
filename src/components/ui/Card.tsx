import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export function Card({ children, className, hoverable = false }: CardProps) {
  return (
    <div
      className={`
        bg-white border border-gray-200 transition-all duration-300
        ${hoverable ? "hover:shadow-lg hover:border-accent-gold cursor-pointer" : ""}
        ${className || ""}
      `}
    >
      {children}
    </div>
  );
}
