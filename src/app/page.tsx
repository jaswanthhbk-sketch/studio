'use client';

import { useState } from 'react';
import { Dashboard } from '@/components/dashboard';
import { EnterIncome } from '@/components/enter-income';
import type { Budget, Expense } from '@/lib/types';
import { initialBudgets, initialExpenses, initialIncome } from '@/lib/data';

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [budgets, setBudgets] = useState<Budget>(initialBudgets);
  const [income, setIncome] = useState<number>(initialIncome);

  const addExpense = (expense: Expense) => {
    setExpenses(prev => [...prev, expense]);
  };

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
