"use client";

import { ReactNode } from "react";

type Variant = "filled" | "tonal" | "outlined" | "text";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: Variant;
  fullWidth?: boolean;
  className?: string;
}

// Material 3 button styles. Filled is the default high-emphasis action.
const VARIANTS: Record<Variant, string> = {
  filled: "bg-primary text-primary-foreground shadow-m3-1 hover:shadow-m3-2",
  tonal: "bg-gpay-blue-container text-gpay-blue hover:shadow-m3-1",
  outlined: "border border-border bg-transparent text-primary hover:bg-accent",
  text: "bg-transparent text-primary hover:bg-accent",
};

export const Button = ({
  onClick,
  children,
  disabled,
  loading,
  variant = "filled",
  fullWidth,
  className = "",
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      type="button"
      aria-busy={loading || undefined}
      className={`state-layer inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-label-lg
        transition-all duration-200 focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-ring focus-visible:ring-offset-2
        disabled:pointer-events-none disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none
        ${VARIANTS[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
    >
      {loading && (
        <span
          className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  );
};
