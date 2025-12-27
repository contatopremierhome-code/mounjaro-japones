'use client';

import { useState, useEffect } from 'react';
import { Onboarding } from '@/components/onboarding';
import { Dashboard } from '@/components/dashboard';
import type { UserData, DailyProgress } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const [user, setUser] = useState<UserData | null>(null);
  const [progress, setProgress] = useState<DailyProgress>({
    ritual: false,
    nutrition: false,
    movement: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user data from Firestore
    const storedUser = localStorage.getItem('mounjaro-user');
    const storedProgress = localStorage.getItem('mounjaro-progress');
    const today = new Date().toISOString().split('T')[0];

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedProgress) {
      const progressData = JSON.parse(storedProgress);
      if (progressData.date === today) {
        setProgress(progressData.progress);
      } else {
        // Reset progress for a new day
        localStorage.removeItem('mounjaro-progress');
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
    localStorage.setItem(
      'mounjaro-progress',
      JSON.stringify({ date: today, progress: newProgress })
    );
  };
  
  const handleReset = () => {
    localStorage.removeItem('mounjaro-user');
    localStorage.removeItem('mounjaro-progress');
    setUser(null);
    setProgress({ ritual: false, nutrition: false, movement: false });
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
