'use client';

import { useState, useEffect, useMemo } from 'react';
import { Onboarding } from '@/components/onboarding';
import { Dashboard } from '@/components/dashboard';
import { AuthComponent } from '@/components/auth';
import type { UserData, DailyProgress } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { useUser, useDoc, useFirestore } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { format } from 'date-fns';

const initialProgress: DailyProgress = {
  ritual: 0,
  nutrition: 0,
  movement: 0,
  dayFinished: false,
};

export default function Home() {
  const { user: authUser, isUserLoading } = useUser();
  const firestore = useFirestore();
  const todayStr = format(new Date(), 'yyyy-MM-dd');

  const userDocRef = useMemo(() => {
    if (!firestore || !authUser?.uid) return null;
    return doc(firestore, 'users', authUser.uid);
  }, [firestore, authUser?.uid]);

  const progressDocRef = useMemo(() => {
      if (!firestore || !authUser?.uid) return null;
      return doc(firestore, 'users', authUser.uid, 'progress', todayStr);
  }, [firestore, authUser?.uid, todayStr]);

  const { data: user, isLoading: isUserDocLoading } = useDoc<UserData>(userDocRef);
  const { data: progress, isLoading: isProgressLoading } = useDoc<DailyProgress>(progressDocRef);

  const [localProgress, setLocalProgress] = useState<DailyProgress | null>(null);

  useEffect(() => {
    // This effect ensures that when we get data from Firestore, we update the local state.
    // It also handles the case where there's no data for today, setting it to the initial state.
    if (progress) {
      setLocalProgress(progress);
    } else if (!isProgressLoading) { // Only set to initial if not loading and progress is null
      setLocalProgress(initialProgress);
    }
  }, [progress, isProgressLoading]);


  const handleOnboardingComplete = (data: Omit<UserData, 'onboarded'>) => {
    if (userDocRef && progressDocRef) {
      const userData: UserData = { ...data, onboarded: true };
      // Create user document
      setDoc(userDocRef, userData, { merge: true });
      // Create the first progress document for today, ensuring it's fresh and zeroed out.
      setDoc(progressDocRef, initialProgress);
      // Set local state immediately for a smooth UI transition
      setLocalProgress(initialProgress);
    }
  };

  const handleProgressUpdate = (newProgress: DailyProgress) => {
    if (progressDocRef) {
      setLocalProgress(newProgress); // Optimistic update
      setDoc(progressDocRef, newProgress, { merge: true });
    }
  };
  
  const handleReset = async () => {
    if (userDocRef) {
      // Set onboarded to false to restart the onboarding process.
      await setDoc(userDocRef, { onboarded: false }, { merge: true });
    }
  }
  
  const isLoading = isUserLoading || isUserDocLoading || isProgressLoading;

  if (isLoading) {
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

  if (!authUser) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-6">
            <AuthComponent />
        </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-6">
      {user?.onboarded && localProgress ? (
        <Dashboard user={user} progress={localProgress} onProgressUpdate={handleProgressUpdate} onReset={handleReset} />
      ) : (
        <Onboarding onOnboardingComplete={handleOnboardingComplete} />
      )}
    </main>
  );
}
