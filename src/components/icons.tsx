import {
  UtensilsCrossed,
  Car,
  Ticket,
  Bolt,
  Home,
  ShoppingCart,
  ShoppingBag,
  HeartPulse,
  Plane,
  BookOpen,
  Smile,
  Landmark,
  MoreHorizontal,
  type LucideIcon
} from 'lucide-react';
import type { Category } from '@/lib/types';

export const categoryIcons: Record<Category, LucideIcon> = {
  Food: UtensilsCrossed,
  Transportation: Car,
  Entertainment: Ticket,
  Utilities: Bolt,
  Housing: Home,
  Groceries: ShoppingCart,
  Shopping: ShoppingBag,
  Health: HeartPulse,
  Travel: Plane,
  Education: BookOpen,
  'Personal Care': Smile,
  Finance: Landmark,
  Other: MoreHorizontal,
};

export const GetCategoryIcon = ({ category, ...props }: { category: Category } & React.ComponentProps<LucideIcon>) => {
  const Icon = categoryIcons[category] || MoreHorizontal;
  return <Icon {...props} />;
};
