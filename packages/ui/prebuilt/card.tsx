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
      className="border p-6 font-sans font-medium rounded-xl bg-white"
    >
      <h1 className="text-2xl border-b pb-2 text-purple-900 font-semibold">
        {title}
      </h1>
      <div>{children}</div>
    </div>
  );
}
