'use client';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Leaf, Citrus as Lemon, Sparkles, Lightbulb } from 'lucide-react';
import { TeaBowlIcon } from './icons';
import { BrainCircuit } from 'lucide-react';
import type { DailyProgress } from '@/lib/types';
import { useUser, useFirestore, useDoc } from '@/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { format } from 'date-fns';


const ritualItems = [
    { id: 'tea', label: 'Chá Verde', icon: TeaBowlIcon, xp: 20 },
    { id: 'matcha', label: 'Matcha', icon: Leaf, xp: 20 },
    { id: 'ginger', label: 'Gengibre', icon: Sparkles, xp: 20 },
    { id: 'lemon', label: 'Limão', icon: Lemon, xp: 10 },
    { id: 'meditation', label: 'Meditação (5 min)', icon: BrainCircuit, xp: 30 },
];

const totalRitualPoints = ritualItems.length;

export function Ritual() {
    const router = useRouter();
    const { user } = useUser();
    const firestore = useFirestore();
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
    const [isActive, setIsActive] = useState(false);
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

    const todayStr = format(new Date(), 'yyyy-MM-dd');
    const progressDocRef = useMemo(() => {
        if (!user || !firestore) return null;
        return doc(firestore, 'users', user.uid, 'progress', todayStr);
    }, [user, firestore, todayStr]);

    const { data: progress, isLoading } = useDoc<DailyProgress>(progressDocRef);

    useEffect(() => {
        if (progress && progress.ritual > 0) {
            const itemsChecked = Math.round((progress.ritual / 100) * totalRitualPoints);
            const initialChecked: Record<string, boolean> = {};
            for(let i=0; i < itemsChecked; i++) {
               initialChecked[ritualItems[i].id] = true;
            }
            setCheckedItems(initialChecked);
        }
    }, [progress]);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isActive, timeLeft]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const handleCheckboxChange = (id: string) => {
        setCheckedItems(prev => ({...prev, [id]: !prev[id]}));
    }
    
    const checkedCount = Object.values(checkedItems).filter(Boolean).length;
    const progressPercentage = Math.round((checkedCount / totalRitualPoints) * 100);

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
    }

    const totalXp = ritualItems.reduce((acc, item) => checkedItems[item.id] ? acc + (item.xp || 0) : acc, 0);

    return (
        <div className="w-full max-w-2xl mx-auto flex flex-col gap-8 text-center">
            <header className="flex items-center justify-between w-full mb-4">
                <Button variant="ghost" onClick={() => router.back()} size="icon" className="absolute left-4">
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <div className='text-center w-full'>
                    <h1 className="text-3xl font-bold font-headline text-primary">
                        Ritual do Chá
                    </h1>
                     <p className="text-muted-foreground max-w-md mx-auto mt-2">
                        Este é o seu momento sagrado. Reserve um tempo para preparar seu chá, meditar e se conectar com seus objetivos.
                    </p>
                </div>
                <div className="w-10"></div>
            </header>

            <div className="relative flex flex-col items-center justify-center gap-6">
                <div className="relative w-64 h-64 flex items-center justify-center">
                    <div 
                        className="absolute inset-0 rounded-full border-[10px] border-primary/20"
                    ></div>
                    <div 
                        className="absolute inset-0 rounded-full"
                        style={{
                            background: `conic-gradient(hsl(var(--primary)) ${(timeLeft / 600) * 360}deg, transparent 0deg)`,
                            transition: 'background 0.5s linear'
                        }}
                    ></div>
                     <div className="relative w-[210px] h-[210px] bg-background rounded-full flex flex-col items-center justify-center shadow-inner">
                        <span className="text-6xl font-mono font-bold text-primary">
                            {formatTime(timeLeft)}
                        </span>
                    </div>
                </div>
                 <Button onClick={toggleTimer} size="lg" className="w-48">
                    {isActive ? 'Pausar Ritual' : 'Começar Ritual'}
                </Button>
            </div>

            <Card className="text-left">
                <CardHeader>
                    <CardTitle className="text-xl text-accent">Ingredientes do Ritual</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {ritualItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between">
                             <div className="flex items-center gap-3">
                                <Checkbox 
                                    id={item.id} 
                                    onCheckedChange={() => handleCheckboxChange(item.id)}
                                    checked={!!checkedItems[item.id]}
                                />
                                <label htmlFor={item.id} className="flex items-center gap-2 text-lg font-medium cursor-pointer">
                                    <item.icon className="w-6 h-6 text-primary" />
                                    {item.label}
                                </label>
                            </div>
                            {item.xp && <span className="text-sm font-bold text-accent">+{item.xp} XP</span>}
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

            
            <Button size="lg" onClick={handleFinishRitual} disabled={checkedCount === 0 || isLoading}>
                Concluir Ritual e Ganhar +{totalXp} XP ({progressPercentage}%)
            </Button>
            

        </div>
    );
}
