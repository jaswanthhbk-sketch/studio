'use client';

import { useState, useEffect } from 'react';
import { Dashboard } from '@/components/dashboard';
import { EnterIncome } from '@/components/enter-income';
import type { Budget, Expense } from '@/lib/types';
import { initialBudgets, initialExpenses } from '@/lib/data';
import { useAuth } from '@/hooks/use-auth';
import Login from '@/components/login';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [budgets, setBudgets] = useState<Budget>(initialBudgets);
  const [income, setIncome] = useState<number>(0);
  const [isClient, setIsClient] = useState(false);
  const { user, loading } = useAuth();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const addExpense = (expense: Expense) => {
    setExpenses(prev => [...prev, expense]);
  };

  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }
  
  if (income === 0) {
    return <EnterIncome setIncome={setIncome} />;
  }
  
  return (
      <Dashboard
        expenses={expenses}
        budgets={budgets}
        income={income}
        addExpense={addExpense}
        setBudgets={setBudgets}
        setIncome={setIncome}
      />
  );
}
