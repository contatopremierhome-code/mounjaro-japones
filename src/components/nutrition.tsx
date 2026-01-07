'use client';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, Sparkles } from 'lucide-react';
import { useUser, useFirestore, useDoc } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import type { DailyProgress } from '@/lib/types';
import { format } from 'date-fns';
import { mealExamples, Meal } from '@/lib/meals';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type MealType = 'Café da Manhã' | 'Almoço' | 'Jantar';

export function Nutrition() {
    const router = useRouter();
    const { user: authUser } = useUser();
    const firestore = useFirestore();
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const todayStr = useMemo(() => format(new Date(), 'yyyy-MM-dd'), []);
    const progressDocRef = useMemo(() => {
        if (!authUser || !firestore) return null;
        return doc(firestore, 'users', authUser.uid, 'progress', todayStr);
    }, [authUser, firestore, todayStr]);

    const { data: progress } = useDoc<DailyProgress>(progressDocRef);

    const handleMarkAsDone = async () => {
      if (!progressDocRef || isSubmitting) return;
      setIsSubmitting(true);
      try {
          const newProgressValue = Math.min((progress?.nutrition || 0) + 34, 100);
          const updatedProgress: Partial<DailyProgress> = {
              nutrition: newProgressValue,
          };
          await setDoc(progressDocRef, updatedProgress, { merge: true });
          router.push('/');
      } catch (error) {
          console.error("Error updating nutrition progress: ", error);
      } finally {
          setIsSubmitting(false);
      }
    };

    const MealCard = ({ meal }: { meal: Meal }) => (
        <Card className="overflow-hidden group">
            <div className="relative h-40 w-full">
                <Image 
                    src={meal.image.imageUrl}
                    alt={meal.title}
                    fill
                    className="object-cover"
                    data-ai-hint={meal.image.imageHint}
                    unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <CardContent className="p-4">
                <h3 className="font-bold text-lg text-primary">{meal.title}</h3>
                <p className="text-sm text-muted-foreground">{meal.description}</p>
            </CardContent>
        </Card>
    );

    return (
        <div className="w-full max-w-2xl mx-auto flex flex-col gap-8">
            <header className="flex items-center relative w-full justify-center mb-4">
                <Button variant="ghost" onClick={() => router.back()} size="icon" className="absolute left-0">
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <div className='text-center'>
                    <h1 className="text-3xl font-bold font-headline text-primary flex items-center justify-center gap-2">
                        <Sparkles /> Inspiração Nutricional
                    </h1>
                     <p className="text-muted-foreground max-w-xl mx-auto mt-2">
                        Aqui estão alguns exemplos simples e rápidos de refeições que se alinham à filosofia Mounjaro Japonês para inspirar o seu dia.
                    </p>
                </div>
            </header>

            <Tabs defaultValue="Café da Manhã" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="Café da Manhã">Café da Manhã</TabsTrigger>
                    <TabsTrigger value="Almoço">Almoço</TabsTrigger>
                    <TabsTrigger value="Jantar">Jantar</TabsTrigger>
                </TabsList>
                <TabsContent value="Café da Manhã">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        {mealExamples.filter(m => m.mealType === 'Café da Manhã').map(meal => (
                            <MealCard key={meal.id} meal={meal} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="Almoço">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        {mealExamples.filter(m => m.mealType === 'Almoço').map(meal => (
                            <MealCard key={meal.id} meal={meal} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="Jantar">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        {mealExamples.filter(m => m.mealType === 'Jantar').map(meal => (
                            <MealCard key={meal.id} meal={meal} />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>

            <div className="flex flex-col gap-2 items-center">
                 <Button onClick={handleMarkAsDone} size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Registrando...' : (
                        <>
                            <CheckCircle className="mr-2 h-5 w-5" />
                            Fiz uma Refeição Saudável (+34%)
                        </>
                    )}
                </Button>
                <p className='text-center text-xs text-muted-foreground'>Se inspirou? Registre que você fez uma refeição saudável para aumentar seu progresso diário.</p>
            </div>
        </div>
    );
}
