'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { PlusCircle, Settings } from 'lucide-react';
import type { Budget, Expense } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AddExpenseDialog } from './add-expense-dialog';
import { BudgetSettingsDialog } from './budget-settings-dialog';
import { SpendingCharts } from './spending-charts';
import GenerativeInsights from './generative-insights';
import placeholderImages from '@/lib/placeholder-images.json';

interface DashboardProps {
    expenses: Expense[];
    budgets: Budget;
    income: number;
    addExpense: (expense: Expense) => void;
    setBudgets: (budgets: Budget) => void;
    setIncome: (income: number) => void;
}

const quotes = [
    "The journey of a thousand miles begins with a single step.",
    "The best way to predict the future is to create it.",
    "Believe you can and you're halfway there.",
    "The only limit to our realization of tomorrow will be our doubts of today.",
    "It does not matter how slowly you go as long as you do not stop.",
    "The secret of getting ahead is getting started."
];

export function Dashboard({ expenses, budgets, income, addExpense, setBudgets, setIncome }: DashboardProps) {
  const [isAddExpenseOpen, setAddExpenseOpen] = useState(false);
  const [isBudgetSettingsOpen, setBudgetSettingsOpen] = useState(false);
  const [dailyQuote, setDailyQuote] = useState('');

  const totalSpending = useMemo(() => expenses.reduce((sum, expense) => sum + expense.amount, 0), [expenses]);
  const balance = useMemo(() => income - totalSpending, [income, totalSpending]);
  
  useEffect(() => {
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    setDailyQuote(quotes[dayOfYear % quotes.length]);
  }, []);

  const saveSettings = (newBudgets: Budget, newIncome: number) => {
    setBudgets(newBudgets);
    setIncome(newIncome);
  };

  return (
    <div className="flex flex-col gap-8 min-h-screen">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
            <h1 className="text-2xl font-bold font-headline">SpendWise</h1>
            <div className="flex items-center gap-2">
                 <Button onClick={() => setAddExpenseOpen(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Expense
                </Button>
                <Button variant="outline" size="icon" onClick={() => setBudgetSettingsOpen(true)}>
                    <Settings className="h-4 w-4" />
                </Button>
            </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 md:px-6 space-y-8 pb-8">
        <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-xl shadow-lg">
            <Image
                src={placeholderImages.hero.src}
                alt={placeholderImages.hero.alt}
                fill
                style={{ objectFit: 'cover' }}
                data-ai-hint="anime landscape"
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 md:p-8">
                <h2 className="text-4xl md:text-5xl font-bold text-white font-headline">Your Financial Story</h2>
                <p className="text-lg text-white/80 mt-2 max-w-lg">Track your journey, one expense at a time.</p>
            </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              <p className="text-xs text-muted-foreground">${income.toLocaleString('en-US')} - ${totalSpending.toLocaleString('en-US')}</p>
            </CardContent>
          </Card>
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Spending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">${totalSpending.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              <p className="text-xs text-muted-foreground">across {expenses.length} transactions</p>
            </CardContent>
          </Card>
          <div className="md:col-span-1">
            <GenerativeInsights expenses={expenses} budgets={budgets} income={income} />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Spending Overview</CardTitle>
            <CardDescription>Your spending activity over the last 30 days.</CardDescription>
          </CardHeader>
          <CardContent>
            <SpendingCharts expenses={expenses} />
          </CardContent>
        </Card>

        <footer className="text-center text-muted-foreground italic py-6">
            {dailyQuote && <p>&quot;{dailyQuote}&quot;</p>}
        </footer>
      </main>
      
      <AddExpenseDialog isOpen={isAddExpenseOpen} setIsOpen={setAddExpenseOpen} onAddExpense={addExpense} />
      <BudgetSettingsDialog isOpen={isBudgetSettingsOpen} setIsOpen={setBudgetSettingsOpen} onSave={saveSettings} currentBudgets={budgets} currentIncome={income} />

    </div>
  );
}
