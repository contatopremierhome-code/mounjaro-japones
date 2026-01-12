'use client';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { ArrowLeft, CheckCircle, Sparkles, X, Flame, Check } from 'lucide-react';
import { useUser, useFirestore, useDoc } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import type { DailyProgress } from '@/lib/types';
import { format } from 'date-fns';
import { mealExamples, Meal } from '@/lib/meals';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from './ui/separator';

export function Nutrition() {
    const router = useRouter();
    const { user: authUser } = useUser();
    const firestore = useFirestore();
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
    
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
          // Each healthy meal registration adds a third of the progress.
          const newProgressValue = Math.min((progress?.nutrition || 0) + 34, 100);
          const updatedProgress: Partial<DailyProgress> = {
              nutrition: newProgressValue,
          };
          await setDoc(progressDocRef, updatedProgress, { merge: true });
          if(selectedMeal){
              setSelectedMeal(null);
          }
          router.push('/');
      } catch (error) {
          console.error("Error updating nutrition progress: ", error);
      } finally {
          setIsSubmitting(false);
      }
    };
    
    const MealCard = ({ meal }: { meal: Meal }) => (
        <Card className="overflow-hidden group cursor-pointer" onClick={() => setSelectedMeal(meal)}>
            <div className="relative h-40 w-full">
                <Image 
                    src={meal.image.imageUrl}
                    alt={meal.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    data-ai-hint={meal.image.imageHint}
                    
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                 <div className="absolute bottom-0 p-4">
                    <h3 className="font-bold text-lg text-white">{meal.title}</h3>
                </div>
            </div>
            <CardContent className="p-4">
                <p className="text-sm text-muted-foreground h-10">{meal.description}</p>
                 <Button variant="link" className="p-0 mt-2 h-auto text-primary">Ver Detalhes</Button>
            </CardContent>
        </Card>
    );

    const MealDialog = () => {
        if (!selectedMeal) return null;

        return (
             <Dialog open={!!selectedMeal} onOpenChange={(isOpen) => !isOpen && setSelectedMeal(null)}>
                <DialogContent className="max-w-2xl w-[95vw] p-0 border-primary/20">
                    <div className='max-h-[90vh] overflow-y-auto'>
                    <DialogHeader className="p-0">
                        <div className="relative h-60 w-full">
                            <Image 
                                src={selectedMeal.image.imageUrl}
                                alt={selectedMeal.title}
                                fill
                                style={{ objectFit: 'cover' }}
                                className="rounded-t-lg"
                                data-ai-hint={selectedMeal.image.imageHint}
                                
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                            <DialogClose className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-1">
                                <X className="h-5 w-5" />
                            </DialogClose>
                        </div>
                        <div className="p-6 pb-0">
                            <DialogTitle className="text-3xl font-headline text-primary mb-2">{selectedMeal.title}</DialogTitle>
                            <p className="text-muted-foreground">{selectedMeal.description}</p>
                        </div>
                    </DialogHeader>
                    
                    <div className='px-6 pb-6 mt-4'>
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-accent"><Flame className='h-5 w-5' />Ingredientes</h3>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                {selectedMeal.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
                            </ul>
                        </div>
                        
                        <Separator className="my-6" />

                        <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-accent"><Check className='h-5 w-5' />Preparação</h3>
                            <ol className="list-decimal list-inside space-y-3">
                                {selectedMeal.preparation.map((step, i) => <li key={i}><span className="font-semibold text-foreground">Passo {i+1}: </span><span className='text-muted-foreground'>{step}</span></li>)}
                            </ol>
                        </div>

                        <Separator className="my-6" />

                        <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-accent"><Sparkles className='h-5 w-5' />Porquê funciona?</h3>
                            <p className="text-muted-foreground">{selectedMeal.whyItWorks}</p>
                        </div>

                         <Button onClick={handleMarkAsDone} size="lg" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? 'Registrando...' : (
                                <>
                                    <CheckCircle className="mr-2 h-5 w-5" />
                                    Fiz uma Refeição Saudável
                                </>
                            )}
                        </Button>
                    </div>
                    </div>
                </DialogContent>
            </Dialog>
        );
    };

    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
            <header className="flex items-center relative w-full justify-center mb-4">
                <Button variant="ghost" onClick={() => router.back()} size="icon" className="absolute left-0">
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <div className='text-center'>
                    <h1 className="text-3xl font-bold font-headline text-primary flex items-center justify-center gap-2">
                        <Sparkles /> Inspiração Nutricional
                    </h1>
                     <p className="text-muted-foreground max-w-xl mx-auto mt-2">
                        A chave para potencializar os efeitos do Mounjaro de Pobre é uma alimentação inteligente. Aqui estão algumas sugestões rápidas e deliciosas para inspirar seu dia e manter seu metabolismo ativo.
                    </p>
                </div>
            </header>

            <Tabs defaultValue="Café da Manhã" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="Café da Manhã">Café da Manhã</TabsTrigger>
                    <TabsTrigger value="Almoço">Almoço</TabsTrigger>
                    <TabsTrigger value="Jantar">Jantar</TabsTrigger>
                    <TabsTrigger value="Lanche">Lanche</TabsTrigger>
                </TabsList>
                <TabsContent value="Café da Manhã">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                        {mealExamples.filter(m => m.mealType === 'Café da Manhã').map(meal => (
                            <MealCard key={meal.id} meal={meal} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="Almoço">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                        {mealExamples.filter(m => m.mealType === 'Almoço').map(meal => (
                            <MealCard key={meal.id} meal={meal} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="Jantar">
                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                        {mealExamples.filter(m => m.mealType === 'Jantar').map(meal => (
                            <MealCard key={meal.id} meal={meal} />
                        ))}
                    </div>
                </TabsContent>
                 <TabsContent value="Lanche">
                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                        {mealExamples.filter(m => m.mealType === 'Lanche').map(meal => (
                            <MealCard key={meal.id} meal={meal} />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
             <div className="flex flex-col gap-2 items-center mt-8">
                 <p className='text-center text-sm text-muted-foreground'>Se inspirou? Registre que você fez uma refeição saudável para aumentar seu progresso diário. Você pode registrar até 3 refeições por dia.</p>
                 <Button onClick={handleMarkAsDone} size="lg" className="w-full max-w-md mt-2" disabled={isSubmitting}>
                    {isSubmitting ? 'Registrando...' : (
                        <>
                            <CheckCircle className="mr-2 h-5 w-5" />
                            Registrar Refeição Saudável (+34%)
                        </>
                    )}
                </Button>
            </div>

            <MealDialog />
        </div>
    );
}
