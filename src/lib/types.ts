import type { LucideIcon } from 'lucide-react';

export const Categories = [
  "Food",
  "Transportation",
  "Entertainment",
  "Utilities",
  "Housing",
  "Groceries",
  "Shopping",
  "Health",
  "Travel",
  "Education",
  "Personal Care",
  "Finance",
  "Other",
] as const;

export type Category = typeof Categories[number];

export interface Expense {
  id: string;
  amount: number;
  category: Category;
  date: Date;
  description: string;
}

export type Budget = {
  [key in Category]?: number;
};

export interface CategoryInfo {
  icon: LucideIcon;
  color: string;
}
