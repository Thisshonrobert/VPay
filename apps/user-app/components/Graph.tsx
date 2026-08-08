"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "ui";

type Transaction = {
  month: string;
  sent: number;
  received: number;
};

type GraphProps = {
  transactions: Transaction[];
};

const chartConfig = {
  sent: {
    label: "Sent",
    color: "#d93025", // Google Red 600
  },
  received: {
    label: "Received",
    color: "#1e8e3e", // Google Green 700
  },
};

export function Graph({ transactions }: GraphProps) {
  return (
    <section className="rounded-m3-xl border border-border bg-card p-5 shadow-m3-1 sm:p-6">
      <header className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-title-lg text-foreground">Monthly activity</h2>
          <p className="mt-0.5 text-body-md text-muted-foreground">
            Money sent and received across the year
          </p>
        </div>

        {/* Inline legend — cheaper on vertical space than Recharts' own. */}
        <div className="flex items-center gap-4">
          {Object.entries(chartConfig).map(([key, cfg]) => (
            <span key={key} className="flex items-center gap-1.5 text-body-sm text-muted-foreground">
              <span
                className="h-2.5 w-2.5 rounded-sm"
                style={{ backgroundColor: cfg.color }}
                aria-hidden="true"
              />
              {cfg.label}
            </span>
          ))}
        </div>
      </header>

      <ChartContainer config={chartConfig} className="h-[260px] w-full">
        <BarChart data={transactions} margin={{ top: 4, right: 4, bottom: 0, left: -8 }}>
          <CartesianGrid vertical={false} stroke="hsl(var(--border))" strokeDasharray="4 4" />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            tickFormatter={(value) => String(value).slice(0, 3)}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            width={64}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            // getByMonth already converts paise to rupees, so format as-is.
            tickFormatter={(value) => `₹${new Intl.NumberFormat("en-IN", { notation: "compact" }).format(Number(value))}`}
          />
          <ChartTooltip
            cursor={{ fill: "hsl(var(--muted))" }}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <Bar dataKey="sent" fill={chartConfig.sent.color} radius={[6, 6, 0, 0]} maxBarSize={28} />
          <Bar dataKey="received" fill={chartConfig.received.color} radius={[6, 6, 0, 0]} maxBarSize={28} />
        </BarChart>
      </ChartContainer>
    </section>
  );
}
