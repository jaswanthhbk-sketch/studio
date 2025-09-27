'use client';
import { useState } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CardHeader } from '@/components/ui/card';
import placeholderImages from '@/lib/placeholder-images.json';

interface EnterIncomeProps {
  setIncome: (income: number) => void;
}

export function EnterIncome({ setIncome }: EnterIncomeProps) {
  const [value, setValue] = useState('');

  const handleContinue = () => {
    const incomeAmount = parseFloat(value);
    if (!isNaN(incomeAmount) && incomeAmount > 0) {
      setIncome(incomeAmount);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden rounded-xl shadow-2xl border">
        <div className="hidden md:block relative h-full">
            <Image
                src={placeholderImages.income.src}
                alt={placeholderImages.income.alt}
                fill
                style={{ objectFit: 'cover' }}
                data-ai-hint="anime character"
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
        <div className="bg-card text-card-foreground p-8 md:p-12 flex flex-col justify-center">
            <CardHeader className="p-0 mb-6">
              <h1 className="text-3xl font-bold font-headline mb-2">Welcome</h1>
              <p className="text-muted-foreground">Let's start by setting your monthly income.</p>
            </CardHeader>
            <div className="space-y-4">
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                        type="number"
                        placeholder="5000"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleContinue()}
                        className="pl-7 h-12 text-lg"
                    />
                </div>
                <Button onClick={handleContinue} className="w-full h-12 text-md" size="lg">
                    Continue
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
}
