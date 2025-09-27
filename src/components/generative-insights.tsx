'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { provideSpendingInsights } from '@/ai/flows/provide-spending-insights';
import type { Budget, Expense } from '@/lib/types';
import { Sparkles, Loader2 } from 'lucide-react';

interface GenerativeInsightsProps {
  expenses: Expense[];
  budgets: Budget;
  income: number;
}

export default function GenerativeInsights({ expenses, budgets, income }: GenerativeInsightsProps) {
  const [insights, setInsights] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateInsights = async () => {
    setIsLoading(true);
    setInsights('');
    try {
      const result = await provideSpendingInsights({
        historicalSpendingData: JSON.stringify(expenses.map(e => ({...e, date: e.date.toISOString()})), null, 2),
        budgetGoals: JSON.stringify(budgets, null, 2),
        incomeAmount: income,
      });
      setInsights(result.insights);
    } catch (error) {
      console.error('Failed to generate insights:', error);
      toast({
        variant: 'destructive',
        title: 'Insight Generation Failed',
        description: 'There was an error getting your personalized insights. Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="text-primary" />
          AI-Powered Insights
        </CardTitle>
        <CardDescription>Get personalized tips to improve your spending habits.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col items-center justify-center text-center">
        {isLoading ? (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-muted-foreground">Analyzing your data...</p>
          </div>
        ) : insights ? (
          <div className="text-sm text-left whitespace-pre-wrap font-sans bg-muted/50 p-4 rounded-lg w-full flex-grow overflow-auto">
            {insights}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <p className="text-muted-foreground max-w-xs">Click the button to generate personalized financial advice based on your spending.</p>
            <Button onClick={handleGenerateInsights} disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              Generate Insights
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
