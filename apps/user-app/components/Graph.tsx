"use client";
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "ui"; // Adjust this import if your card components differ
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "ui"; // Adjust this based on your chart components

export function Graph({ transactions }) {
  console.log("Transactions data for graph:", transactions);

  const chartConfig = {
    sent: {
      label: "Sent",
      color: "#8884d8", // Adjusted color for sent transactions
    },
    received: {
      label: "Received",
      color: "#82ca9d", // Adjusted color for received transactions
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Chart</CardTitle>
        <CardDescription>January - December 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart width={500} height={300} data={transactions}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="sent" fill={chartConfig.sent.color} radius={4} />
            <Bar dataKey="received" fill={chartConfig.received.color} radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Transactions done <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing transactions for 1 year
        </div>
      </CardFooter>
    </Card>
  );
}
