'use client';

import { Bar, BarChart, CartesianGrid, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell, Legend } from 'recharts';
import { useMemo } from 'react';
import type { Budget, Expense } from '@/lib/types';
import { Categories } from '@/lib/types';
import { ChartConfig, ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

const chartConfig = {
  spending: {
    label: 'Spending',
    color: 'hsl(var(--primary))',
  },
  budget: {
    label: 'Budget',
    color: 'hsl(var(--accent))',
  },
} satisfies ChartConfig;

const pieColors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  'hsl(22, 80%, 55%)',
  'hsl(280, 65%, 60%)',
  'hsl(340, 75%, 55%)',
  'hsl(160, 60%, 45%)',
  'hsl(30, 80%, 55%)',
  'hsl(220, 70%, 50%)',
  'hsl(200, 75%, 55%)',
  'hsl(180, 65%, 60%)',
];


interface SpendingChartsProps {
  expenses: Expense[];
  budgets: Budget;
}

export function SpendingCharts({ expenses, budgets }: SpendingChartsProps) {
  const { barChartData, pieChartData } = useMemo(() => {
    const spendingByCategory = new Map<string, number>();
    for (const expense of expenses) {
      spendingByCategory.set(expense.category, (spendingByCategory.get(expense.category) || 0) + expense.amount);
    }

    const barData = Categories.map(category => ({
      name: category,
      spending: spendingByCategory.get(category) || 0,
      budget: budgets[category] || 0,
    })).filter(d => d.spending > 0 || d.budget > 0);

    const pieData = Array.from(spendingByCategory.entries())
      .map(([name, value]) => ({ name, value }))
      .filter(d => d.value > 0);

    return { barChartData: barData, pieChartData: pieData };
  }, [expenses, budgets]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 min-h-[400px]">
      <div>
        <h3 className="text-lg font-semibold mb-2">Category Breakdown</h3>
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <ResponsiveContainer>
            <BarChart data={barChartData} accessibilityLayer>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} angle={-45} textAnchor="end" height={70} />
              <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
              <Tooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Legend />
              <Bar dataKey="spending" fill="var(--color-spending)" radius={4} />
              <Bar dataKey="budget" fill="var(--color-budget)" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Spending Distribution</h3>
        <ChartContainer config={{}} className="h-[350px] w-full">
          <ResponsiveContainer>
            <PieChart>
              <Tooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
              <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} labelLine={false}>
                {pieChartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
}
