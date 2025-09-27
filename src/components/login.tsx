'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CardHeader, Card, CardContent } from '@/components/ui/card';
import placeholderImages from '@/lib/placeholder-images.json';
import { useToast } from '@/hooks/use-toast';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '@/lib/firebase/config';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!email || !password) {
      toast({
        variant: 'destructive',
        title: 'Missing Fields',
        description: 'Please enter both email and password.',
      });
      return;
    }
    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        toast({ title: 'Login Successful', description: "Welcome back!" });
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        toast({ title: 'Signup Successful', description: 'Welcome! Please log in.' });
        setIsLogin(true); // Switch to login view after successful signup
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Authentication Failed',
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden shadow-2xl border">
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
        <CardContent className="bg-card text-card-foreground p-8 md:p-12 flex flex-col justify-center">
          <CardHeader className="p-0 mb-6">
            <h1 className="text-3xl font-bold font-headline mb-2">{isLogin ? 'Welcome Back' : 'Create an Account'}</h1>
            <p className="text-muted-foreground">{isLogin ? 'Log in to continue your financial journey.' : 'Sign up to start tracking your expenses.'}</p>
          </CardHeader>
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 text-lg"
              disabled={loading}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              className="h-12 text-lg"
              disabled={loading}
            />
            <Button onClick={handleSubmit} className="w-full h-12 text-md" size="lg" loading={loading}>
              {loading ? (isLogin ? 'Logging In...' : 'Signing Up...') : (isLogin ? 'Log In' : 'Sign Up')}
            </Button>
            <Button variant="link" onClick={() => setIsLogin(!isLogin)} className="w-full" disabled={loading}>
              {isLogin ? 'Need an account? Sign up' : 'Already have an account? Log in'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
