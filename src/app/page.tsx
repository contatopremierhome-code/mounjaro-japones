'use client';

import { useState, useEffect } from 'react';
import { Onboarding } from '@/components/onboarding';
import { Dashboard } from '@/components/dashboard';
import type { UserData, DailyProgress, ProgressHistory } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

const initialProgress: DailyProgress = {
  ritual: false,
  nutrition: false,
  movement: false,
  dayFinished: false,
};

export default function Home() {
  const [user, setUser] = useState<UserData | null>(null);
  const [progress, setProgress] = useState<DailyProgress>(initialProgress);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('mounjaro-user');
    const storedProgressHistory = localStorage.getItem('mounjaro-progress-history');
    const today = new Date().toISOString().split('T')[0];

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedProgressHistory) {
      const history: ProgressHistory = JSON.parse(storedProgressHistory);
      if (history[today]) {
        setProgress(history[today]);
      } else {
        // New day, reset progress
        setProgress(initialProgress);
      }
    }
    setLoading(false);
  }, []);

  const handleOnboardingComplete = (data: UserData) => {
    setUser(data);
    localStorage.setItem('mounjaro-user', JSON.stringify(data));
  };

  const handleProgressUpdate = (newProgress: DailyProgress) => {
    setProgress(newProgress);
    const today = new Date().toISOString().split('T')[0];
    const storedProgressHistory = localStorage.getItem('mounjaro-progress-history');
    const history: ProgressHistory = storedProgressHistory ? JSON.parse(storedProgressHistory) : {};
    history[today] = newProgress;
    localStorage.setItem('mounjaro-progress-history', JSON.stringify(history));
  };
  
  const handleReset = () => {
    localStorage.removeItem('mounjaro-user');
    localStorage.removeItem('mounjaro-progress-history');
    setUser(null);
    setProgress(initialProgress);
    // Also remove from router history
    window.location.replace('/');
  }

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background p-4">
        <div className="flex flex-col items-center gap-4 w-full max-w-md">
           <Skeleton className="h-32 w-32 rounded-full" />
           <Skeleton className="h-8 w-48" />
           <Skeleton className="h-6 w-64" />
           <div className="grid grid-cols-2 gap-4 w-full pt-8">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
           </div>
        </div>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-6">
      {user ? (
        <Dashboard user={user} progress={progress} onProgressUpdate={handleProgressUpdate} onReset={handleReset} />
      ) : (
        <Onboarding onOnboardingComplete={handleOnboardingComplete} />
      )}
    </main>
  );
}
