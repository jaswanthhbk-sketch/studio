'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { Categories, Category, Budget } from '@/lib/types';
import { GetCategoryIcon } from './icons';

interface BudgetSettingsDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSave: (budgets: Budget, income: number) => void;
  currentBudgets: Budget;
  currentIncome: number;
}

export function BudgetSettingsDialog({ isOpen, setIsOpen, onSave, currentBudgets, currentIncome }: BudgetSettingsDialogProps) {
  const [budgets, setBudgets] = useState<Budget>(currentBudgets);
  const [income, setIncome] = useState<number>(currentIncome);
  const { toast } = useToast();

  const handleBudgetChange = (category: Category, value: string) => {
    const amount = parseFloat(value) || 0;
    setBudgets(prev => ({ ...prev, [category]: amount }));
  };

  const handleSave = () => {
    onSave(budgets, income);
    setIsOpen(false);
    toast({
      title: 'Settings Saved',
      description: 'Your budget and income information has been updated.',
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Budget Settings</DialogTitle>
          <DialogDescription>Set your monthly income and budget for each category.</DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="income">Monthly Income</Label>
            <Input
              id="income"
              type="number"
              value={income}
              onChange={(e) => setIncome(parseFloat(e.target.value) || 0)}
              placeholder="e.g., 5000"
            />
          </div>
          <div className="space-y-2">
            <Label>Category Budgets</Label>
            <ScrollArea className="h-64 pr-4">
              <div className="space-y-4">
                {Categories.map(category => (
                  <div key={category} className="flex items-center gap-4">
                    <GetCategoryIcon category={category} className="h-5 w-5 text-muted-foreground" />
                    <Label htmlFor={`budget-${category}`} className="flex-1 font-normal">{category}</Label>
                    <Input
                      id={`budget-${category}`}
                      type="number"
                      value={budgets[category] || ''}
                      onChange={(e) => handleBudgetChange(category, e.target.value)}
                      className="w-32"
                      placeholder="0.00"
                    />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
