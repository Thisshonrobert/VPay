import React from "react";

export function Card({
  title,
  children,
}: {
  title: React.ReactNode;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div
      className="border p-6 font-medium rounded-xl bg-white"
    >
      <h1 className="text-xl border-b pb-2">
        {title}
      </h1>
      <div>{children}</div>
    </div>
  );
}
