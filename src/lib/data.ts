import type { Expense, Budget, Category } from './types';

export const initialExpenses: Expense[] = [
  { id: '1', description: 'Dinner with friends', amount: 45.50, category: 'Food', date: new Date(2024, 6, 1) },
  { id: '2', description: 'Monthly train pass', amount: 85.00, category: 'Transportation', date: new Date(2024, 6, 2) },
  { id: '3', description: 'Movie night', amount: 25.00, category: 'Entertainment', date: new Date(2024, 6, 5) },
  { id: '4', description: 'Electricity bill', amount: 75.20, category: 'Utilities', date: new Date(2024, 6, 10) },
  { id: '5', description: 'Groceries for the week', amount: 120.80, category: 'Groceries', date: new Date(2024, 6, 3) },
  { id: '6', description: 'New pair of shoes', amount: 150.00, category: 'Shopping', date: new Date(2024, 6, 7) },
  { id: '7', description: 'Flight to Paris', amount: 450.00, category: 'Travel', date: new Date(2024, 5, 15)},
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

export const initialIncome = 5000;
