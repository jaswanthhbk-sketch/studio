'use client';

import { useState } from 'react';
import { DollarSign, PlusCircle } from 'lucide-react';
import { initialBudgets, initialExpenses, initialIncome } from '@/lib/data';
import type { Budget, Expense } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AddExpenseDialog } from './add-expense-dialog';
import { BudgetSettingsDialog } from './budget-settings-dialog';
import { SpendingCharts } from './spending-charts';
import GenerativeInsights from './generative-insights';

export function Dashboard() {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [budgets, setBudgets] = useState<Budget>(initialBudgets);
  const [income, setIncome] = useState<number>(initialIncome);
  const [isAddExpenseOpen, setAddExpenseOpen] = useState(false);
  const [isBudgetSettingsOpen, setBudgetSettingsOpen] = useState(false);

  const totalSpending = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalBudget = Object.values(budgets).reduce((sum, budget) => sum + (budget || 0), 0);
  const remainingBudget = totalBudget - totalSpending;

  const addExpense = (expense: Expense) => {
    setExpenses(prev => [...prev, expense]);
  };

  const saveSettings = (newBudgets: Budget, newIncome: number) => {
    setBudgets(newBudgets);
    setIncome(newIncome);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your financial overview.</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setAddExpenseOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Expense
          </Button>
          <Button variant="outline" onClick={() => setBudgetSettingsOpen(true)}>
            Settings
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spending</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSpending.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            <p className="text-xs text-muted-foreground">in the current period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${remainingBudget.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            <p className="text-xs text-muted-foreground">of ${totalBudget.toLocaleString('en-US')} budget</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Income</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${income.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            <p className="text-xs text-muted-foreground">per month</p>
          </CardContent>
        </Card>
        <Card>
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transactions</CardTitle>
           </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{expenses.length}</div>
            <p className="text-xs text-muted-foreground">in the current period</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Spending Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <SpendingCharts expenses={expenses} budgets={budgets} />
          </CardContent>
        </Card>
        <div className="lg:col-span-2">
          <GenerativeInsights expenses={expenses} budgets={budgets} income={income} />
        </div>
      </div>
      
      <AddExpenseDialog isOpen={isAddExpenseOpen} setIsOpen={setAddExpenseOpen} onAddExpense={addExpense} />
      <BudgetSettingsDialog isOpen={isBudgetSettingsOpen} setIsOpen={setBudgetSettingsOpen} onSave={saveSettings} currentBudgets={budgets} currentIncome={income} />

    </div>
  );
}
