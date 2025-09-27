import type { Expense, Budget } from './types';

function daysAgo(days: number): Date {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
}

export const initialExpenses: Expense[] = [
  { id: '1', description: 'Ramen dinner', amount: 25.50, category: 'Food', date: daysAgo(28) },
  { id: '2', description: 'Subway pass', amount: 85.00, category: 'Transportation', date: daysAgo(25) },
  { id: '3', description: 'Manga volume', amount: 15.00, category: 'Entertainment', date: daysAgo(22) },
  { id: '4', description: 'Electricity bill', amount: 75.20, category: 'Utilities', date: daysAgo(20) },
  { id: '5', description: 'Onigiri and snacks', amount: 40.80, category: 'Groceries', date: daysAgo(18) },
  { id: '6', description: 'New hoodie', amount: 90.00, category: 'Shopping', date: daysAgo(15) },
  { id: '7', description: 'Train to Kyoto', amount: 150.00, category: 'Travel', date: daysAgo(10)},
  { id: '8', description: 'Bento box for lunch', amount: 12.00, category: 'Food', date: daysAgo(7) },
  { id: '9', description: 'Gachapon', amount: 5.00, category: 'Entertainment', date: daysAgo(5) },
  { id: '10', description: 'Konbini run', amount: 22.30, category: 'Groceries', date: daysAgo(2) },
];

export const initialBudgets: Budget = {
  Food: 300,
  Transportation: 150,
  Entertainment: 100,
  Utilities: 150,
  Housing: 1200,
  Groceries: 400,
  Shopping: 250,
  Health: 100,
  Travel: 500,
  Education: 50,
  'Personal Care': 80,
  Finance: 50,
  Other: 100,
};

export const initialIncome = 0;
