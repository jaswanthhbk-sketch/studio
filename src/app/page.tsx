'use client';

import { useState, useEffect } from 'react';
import { Dashboard } from '@/components/dashboard';
import { EnterIncome } from '@/components/enter-income';
import type { Budget, Expense } from '@/lib/types';
import { initialBudgets, initialExpenses } from '@/lib/data';

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [budgets, setBudgets] = useState<Budget>(initialBudgets);
  const [income, setIncome] = useState<number>(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const addExpense = (expense: Expense) => {
    setExpenses(prev => [...prev, expense]);
  };

  if (!isClient) {
    return null; // or a loading spinner
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
