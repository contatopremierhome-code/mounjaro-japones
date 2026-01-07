'use client';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, ChefHat, Sparkles, Loader2, Lightbulb } from 'lucide-react';
import { useUser, useFirestore, useDoc } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { getMealSuggestion } from '@/app/actions';
import type { MealSuggestionOutput } from '@/ai/flows/meal-suggestion-generator';
import { Separator } from './ui/separator';
import { DailyProgress } from '@/lib/types';
import { format } from 'date-fns';

type MealType = 'Café da Manhã' | 'Almoço' | 'Jantar' | 'Lanche';

export function Nutrition() {
    const router = useRouter();
    const { user: authUser } = useUser();
    const firestore = useFirestore();
    const { data: user } = useDoc(authUser ? doc(firestore, 'users', authUser.uid) : null);

    const [suggestion, setSuggestion] = useState<MealSuggestionOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState<MealType | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const todayStr = useMemo(() => format(new Date(), 'yyyy-MM-dd'), []);
    const progressDocRef = useMemo(() => {
        if (!authUser || !firestore) return null;
        return doc(firestore, 'users', authUser.uid, 'progress', todayStr);
    }, [authUser, firestore, todayStr]);

    const { data: progress } = useDoc<DailyProgress>(progressDocRef);

    const handleGetSuggestion = async (mealType: MealType) => {
        if (!user) return;
        setIsLoading(true);
        setSelectedMeal(mealType);
        setSuggestion(null);

        try {
            const result = await getMealSuggestion({ mealType, userDream: user.personalDream });
            setSuggestion(result);
        } catch (error) {
            console.error("Error getting meal suggestion:", error);
            // Here you could show a toast to the user
        } finally {
            setIsLoading(false);
        }
    };

    const handleMarkAsDone = async () => {
      if (!progressDocRef || isSubmitting) return;
      setIsSubmitting(true);
      try {
          const newProgressValue = Math.min((progress?.nutrition || 0) + 25, 100);
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

    const mealButtons: MealType[] = ['Café da Manhã', 'Almoço', 'Jantar', 'Lanche'];

    return (
        <div className="w-full max-w-2xl mx-auto flex flex-col gap-8">
            <header className="flex items-center relative w-full justify-center mb-4">
                <Button variant="ghost" onClick={() => router.back()} size="icon" className="absolute left-0">
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <div className='text-center'>
                    <h1 className="text-3xl font-bold font-headline text-primary flex items-center justify-center gap-2">
                        <ChefHat /> Mestre Cuca Mounjaro
                    </h1>
                     <p className="text-muted-foreground max-w-xl mx-auto mt-2">
                        A nutrição é a base da sua transformação. Peça ao nosso Chef IA uma sugestão de refeição deliciosa e alinhada com seus objetivos para potencializar os resultados do seu chá.
                    </p>
                </div>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle>Precisa de inspiração?</CardTitle>
                    <CardDescription>Selecione o tipo de refeição e receba uma sugestão instantânea.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {mealButtons.map((meal) => (
                        <Button 
                            key={meal} 
                            variant={selectedMeal === meal ? 'default' : 'outline'}
                            onClick={() => handleGetSuggestion(meal)}
                            disabled={isLoading}
                        >
                            {isLoading && selectedMeal === meal ? <Loader2 className="animate-spin" /> : meal}
                        </Button>
                    ))}
                </CardContent>
            </Card>

            {isLoading && (
                <div className="text-center p-10">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
                    <p className="text-muted-foreground">Nosso Chef IA está preparando algo especial para você...</p>
                </div>
            )}

            {suggestion && (
                <Card className="animate-in fade-in-50">
                    <CardHeader>
                        <CardTitle className="text-2xl text-accent flex items-center gap-2">
                            <Sparkles className="w-6 h-6" />
                            {suggestion.mealName}
                        </CardTitle>
                        <CardDescription>{suggestion.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <h3 className="font-semibold text-lg mb-2">Ingredientes:</h3>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                {suggestion.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
                            </ul>
                        </div>
                        <Separator />
                        <div>
                            <h3 className="font-semibold text-lg mb-2">Modo de Preparo:</h3>
                            <ol className="list-decimal list-inside space-y-2">
                                {suggestion.instructions.map((step, i) => <li key={i}>{step}</li>)}
                            </ol>
                        </div>
                        <Separator />
                        <Card className="bg-primary/5 border-primary/20 text-left">
                            <CardContent className="p-4 flex items-start gap-4">
                                <Lightbulb className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="font-bold text-primary mb-1">Por que funciona?</h4>
                                    <p className="text-sm text-primary/80">{suggestion.whyItWorks}</p>
                                </div>
                            </CardContent>
                        </Card>
                        
                        <Button onClick={handleMarkAsDone} size="lg" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? 'Registrando...' : 'Adorei! Registrar +25% de Progresso'}
                        </Button>
                        <p className='text-center text-xs text-muted-foreground'>Registrar que você fez uma refeição saudável aumenta seu progresso diário.</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
