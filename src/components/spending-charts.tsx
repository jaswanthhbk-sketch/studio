'use client';

import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useMemo } from 'react';
import { format } from 'date-fns';
import type { Expense } from '@/lib/types';
import { ChartConfig, ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

const chartConfig = {
  amount: {
    label: 'Amount',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

interface SpendingChartsProps {
  expenses: Expense[];
}

export function SpendingCharts({ expenses }: SpendingChartsProps) {
  const lineChartData = useMemo(() => {
    const dataByDay: { [key: string]: number } = {};
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

    const filteredExpenses = expenses.filter(e => new Date(e.date) >= last30Days);

    for (const expense of filteredExpenses) {
      const day = format(new Date(expense.date), 'yyyy-MM-dd');
      dataByDay[day] = (dataByDay[day] || 0) + expense.amount;
    }
    
    return Object.entries(dataByDay)
      .map(([date, amount]) => ({ date, amount }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [expenses]);

  return (
    <div className="h-[400px]">
      <ChartContainer config={chartConfig} className="h-full w-full">
        <ResponsiveContainer>
          <LineChart data={lineChartData} accessibilityLayer margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
            <XAxis 
              dataKey="date" 
              tickLine={false} 
              axisLine={false}
              tickMargin={10} 
              tickFormatter={(value) => format(new Date(value), 'MMM d')}
            />
            <YAxis 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(value) => `₹${value}`}
              width={50}
            />
            <Tooltip
              cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '3 3' }}
              content={<ChartTooltipContent indicator="dot" formatter={(value, name) => {
                if (name === 'amount') {
                  return [`₹${(value as number).toLocaleString('en-IN')}`, 'Amount']
                }
                return [value, name];
              }} />}
            />
            <Line 
              dataKey="amount" 
              type="monotone" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              dot={{
                r: 4,
                fill: 'hsl(var(--primary))',
                stroke: 'hsl(var(--background))',
                strokeWidth: 2,
              }}
              activeDot={{
                r: 6,
                fill: 'hsl(var(--primary))',
                stroke: 'hsl(var(--background))',
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
