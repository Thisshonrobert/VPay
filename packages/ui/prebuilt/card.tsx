import React from "react";

export function Card({
  title,
  subtitle,
  action,
  children,
  className = "",
}: {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}): JSX.Element {
  return (
    <section
      className={`rounded-m3-xl border border-border bg-card p-5 shadow-m3-1 sm:p-6 ${className}`}
    >
      {(title || action) && (
        <header className="mb-4 flex items-start justify-between gap-4">
          <div>
            {title && (
              <h2 className="font-display text-title-lg text-card-foreground">{title}</h2>
            )}
            {subtitle && (
              <p className="mt-0.5 text-body-md text-muted-foreground">{subtitle}</p>
            )}
          </div>
          {action}
        </header>
      )}
      {children}
    </section>
  );
}
