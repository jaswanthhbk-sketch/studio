'use client';

import { useState, useEffect, useCallback } from 'react';
import { doc, getDoc, setDoc, onSnapshot, collection, query, addDoc, Timestamp } from 'firebase/firestore';
import { Dashboard } from '@/components/dashboard';
import { EnterIncome } from '@/components/enter-income';
import type { Budget, Expense } from '@/lib/types';
import { initialBudgets, initialExpenses } from '@/lib/data';
import { useAuth } from '@/hooks/use-auth';
import Login from '@/components/login';
import { Loader2 } from 'lucide-react';
import { db } from '@/lib/firebase/config';

interface UserData {
  income?: number;
  lastIncomeSet?: Timestamp;
  budgets?: Budget;
}

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [budgets, setBudgets] = useState<Budget>(initialBudgets);
  const [income, setIncome] = useState<number | null>(null);
  const [showEnterIncome, setShowEnterIncome] = useState(false);
  const { user, loading } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const checkIncome = useCallback((userData: UserData | undefined) => {
    if (!userData || !userData.income || !userData.lastIncomeSet) {
      setIncome(0);
      setShowEnterIncome(true);
      return;
    }

    const lastSet = userData.lastIncomeSet.toDate();
    const now = new Date();
    
    if (lastSet.getFullYear() < now.getFullYear() || lastSet.getMonth() < now.getMonth()) {
        setIncome(0);
        setShowEnterIncome(true);
    } else {
        setIncome(userData.income);
        setShowEnterIncome(false);
    }
  }, []);
  
  useEffect(() => {
    if (!user) {
      setExpenses(initialExpenses);
      setBudgets(initialBudgets);
      setIncome(null);
      return;
    }

    const userDataRef = doc(db, 'users', user.uid);
    const expensesColRef = collection(db, 'users', user.uid, 'expenses');

    const unsubUserData = onSnapshot(userDataRef, (docSnap) => {
      const data = docSnap.data() as UserData | undefined;
      checkIncome(data);
      if (data?.budgets) {
        setBudgets(data.budgets);
      } else {
        setBudgets(initialBudgets);
      }
    });
    
    const q = query(collection(db, 'users', user.uid, 'expenses'));
    const unsubExpenses = onSnapshot(q, (querySnapshot) => {
      const userExpenses: Expense[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        userExpenses.push({
          id: doc.id,
          description: data.description,
          amount: data.amount,
          category: data.category,
          date: data.date.toDate(),
        });
      });
      setExpenses(userExpenses);
    });

    return () => {
      unsubUserData();
      unsubExpenses();
    };
  }, [user, checkIncome]);


  const addExpense = async (expense: Omit<Expense, 'id'>) => {
    if (!user) return;
    await addDoc(collection(db, 'users', user.uid, 'expenses'), expense);
  };
  
  const handleSetIncome = async (newIncome: number) => {
      if (!user) return;
      const userDataRef = doc(db, 'users', user.uid);
      const userData = {
        income: newIncome,
        lastIncomeSet: Timestamp.now(),
      };
      await setDoc(userDataRef, userData, { merge: true });
      setIncome(newIncome);
      setShowEnterIncome(false);
  };
  
  const handleSetBudgets = async (newBudgets: Budget) => {
    if (!user) return;
    const userDataRef = doc(db, 'users', user.uid);
    await setDoc(userDataRef, { budgets: newBudgets }, { merge: true });
    setBudgets(newBudgets);
  }

  const handleSetIncomeAndBudgets = (newBudgets: Budget, newIncome: number) => {
    handleSetBudgets(newBudgets);
    if(income !== newIncome){
        handleSetIncome(newIncome);
    }
  };


  if (loading || !isClient || income === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }
  
  if (showEnterIncome || income === 0) {
    return <EnterIncome setIncome={handleSetIncome} />;
  }
  
  return (
      <Dashboard
        expenses={expenses}
        budgets={budgets}
        income={income}
        addExpense={addExpense}
        setBudgets={handleSetBudgets}
        setIncome={handleSetIncomeAndBudgets} // Pass the combined one to budget settings
      />
  );
}
