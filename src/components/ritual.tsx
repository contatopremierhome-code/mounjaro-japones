'use client';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle2, ArrowLeft, Lightbulb, BookOpen } from 'lucide-react';
import { TeaBowlIcon } from './icons';
import type { DailyProgress } from '@/lib/types';
import { useUser, useFirestore, useDoc } from '@/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { format } from 'date-fns';

const ritualSteps = [
    { id: 'boil', label: '1. Ferver a Água', description: 'O primeiro passo para um chá perfeito.' },
    { id: 'ingredients', label: '2. Adicionar Ingredientes', description: 'O momento de infundir a magia.' },
    { id: 'infuse', label: '3. Aguardar a Infusão', description: 'A pausa para a alquimia acontecer.' },
    { id: 'enjoy', label: '4. Agradecer e Desfrutar', description: 'Conecte-se com o momento.' },
];

export function Ritual() {
    const router = useRouter();
    const { user } = useUser();
    const firestore = useFirestore();
    const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

    const todayStr = format(new Date(), 'yyyy-MM-dd');
    const progressDocRef = useMemo(() => {
        if (!user || !firestore) return null;
        return doc(firestore, 'users', user.uid, 'progress', todayStr);
    }, [user, firestore, todayStr]);

    const { data: progress, isLoading } = useDoc<DailyProgress>(progressDocRef);

    useEffect(() => {
        if (progress && progress.ritual > 0) {
            const numCompleted = Math.round((progress.ritual / 100) * ritualSteps.length);
            const initialCompleted = new Set<string>();
            for (let i = 0; i < numCompleted; i++) {
                initialCompleted.add(ritualSteps[i].id);
            }
            setCompletedSteps(initialCompleted);
        }
    }, [progress]);

    const handleStepClick = (stepId: string) => {
        const newCompleted = new Set(completedSteps);
        if (newCompleted.has(stepId)) {
            newCompleted.delete(stepId);
        } else {
            newCompleted.add(stepId);
        }
        setCompletedSteps(newCompleted);
    };

    const progressPercentage = Math.round((completedSteps.size / ritualSteps.length) * 100);

    const handleFinishRitual = async () => {
        if (!progressDocRef) return;

        try {
            const docSnap = await getDoc(progressDocRef);
            const currentProgress = docSnap.exists() ? docSnap.data() as DailyProgress : { ritual: 0, nutrition: 0, movement: 0, dayFinished: false, date: todayStr };

            const updatedProgress: DailyProgress = {
                ...currentProgress,
                ritual: progressPercentage,
            };

            await setDoc(progressDocRef, updatedProgress, { merge: true });
            router.back();
        } catch (error) {
            console.error("Error updating ritual progress: ", error);
        }
    };
    
    const circumference = 2 * Math.PI * 90; // radius = 90
    const offset = circumference - (progressPercentage / 100) * circumference;

    return (
        <div className="w-full max-w-2xl mx-auto flex flex-col gap-8 text-center">
            <header className="flex items-center relative w-full justify-center mb-4">
                <Button variant="ghost" onClick={() => router.back()} size="icon" className="absolute left-0">
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <div className='text-center'>
                    <h1 className="text-3xl font-bold font-headline text-primary">
                        Ritual do Chá Japonês
                    </h1>
                     <p className="text-muted-foreground max-w-md mx-auto mt-2">
                        Este é o seu momento sagrado. Reserve um tempo para preparar seu chá, meditar e se conectar com seus objetivos.
                    </p>
                </div>
            </header>

            <div className="relative flex flex-col items-center justify-center gap-6">
                <div className="relative w-64 h-64 flex items-center justify-center">
                     <svg className="w-full h-full" viewBox="0 0 200 200">
                        <circle
                            className="text-card-foreground/10"
                            strokeWidth="10"
                            stroke="currentColor"
                            fill="transparent"
                            r="90"
                            cx="100"
                            cy="100"
                        />
                        <circle
                            className="text-primary transition-all duration-500"
                            strokeWidth="10"
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="transparent"
                            r="90"
                            cx="100"
                            cy="100"
                            transform="rotate(-90 100 100)"
                        />
                    </svg>
                     <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <TeaBowlIcon className="w-20 h-20 text-primary mb-2" />
                        <span className="text-4xl font-bold">{progressPercentage}%</span>
                    </div>
                </div>
            </div>

            <Card className="text-left">
                <CardHeader>
                    <CardTitle className="text-xl text-accent">Guia de Preparo</CardTitle>
                    <CardDescription>Marque cada passo para completar seu ritual diário.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {ritualSteps.map((step) => (
                        <div key={step.id}
                             onClick={() => handleStepClick(step.id)}
                             className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-all ${completedSteps.has(step.id) ? 'bg-primary/10 border-primary/50' : 'bg-card/50 hover:bg-card/80'}`}
                        >
                             <div className="flex items-center gap-4">
                                <CheckCircle2 className={`w-8 h-8 transition-colors ${completedSteps.has(step.id) ? 'text-primary' : 'text-muted-foreground/30'}`} />
                                <div>
                                    <h3 className="text-lg font-semibold">{step.label}</h3>
                                    <p className="text-sm text-muted-foreground">{step.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20 text-left">
                 <CardContent className="p-4 flex items-start gap-4">
                    <Lightbulb className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                        <h4 className="font-bold text-primary mb-1">Conselho Zen</h4>
                        <p className="text-sm text-primary/80">O ritual do chá é o seu momento sagrado do dia. Respire fundo, sinta o calor da xícara e permita que sua mente se aquiete.</p>
                    </div>
                 </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="outline" className="w-full" onClick={() => router.push('/recipes')}>
                    <BookOpen className="mr-2 h-5 w-5" />
                    Ver Receitas Mounjaro de Pobre
                </Button>
                <Button size="lg" onClick={handleFinishRitual} disabled={isLoading || completedSteps.size === 0} className="w-full">
                    Concluir Ritual ({progressPercentage}%)
                </Button>
            </div>
        </div>
    );
}
