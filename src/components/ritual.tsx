'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Leaf, Citrus as Lemon, Sparkles, Lightbulb, Salad, Dumbbell } from 'lucide-react';
import { TeaBowlIcon } from './icons';
import { BrainCircuit } from 'lucide-react';
import type { DailyProgress, ProgressHistory } from '@/lib/types';


const ritualItems = [
    { id: 'tea', label: 'Chá Verde', icon: TeaBowlIcon },
    { id: 'matcha', label: 'Matcha', icon: Leaf },
    { id: 'ginger', label: 'Gengibre', icon: Sparkles },
    { id: 'lemon', label: 'Limão', icon: Lemon },
    { id: 'meditation', label: 'Meditação (5 min)', icon: BrainCircuit, xp: 30 },
];

interface CircleProgressProps {
    progress: number;
    icon: React.ElementType;
    label: string;
}

const CircleProgress = ({ progress, icon: Icon, label }: CircleProgressProps) => {
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className="flex flex-col items-center gap-2">
            <div className="relative w-28 h-28">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                    {/* Background circle */}
                    <circle
                        className="text-card-foreground/10"
                        strokeWidth="10"
                        stroke="currentColor"
                        fill="transparent"
                        r="45"
                        cx="50"
                        cy="50"
                    />
                    {/* Progress circle */}
                    <circle
                        className="text-primary transition-all duration-500"
                        strokeWidth="10"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="45"
                        cx="50"
                        cy="50"
                        transform="rotate(-90 50 50)"
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                     <Icon className="w-8 h-8 text-primary mb-1" />
                     <span className="text-lg font-bold">{progress}%</span>
                </div>
            </div>
            <span className="font-semibold text-muted-foreground">{label}</span>
        </div>
    );
};


export function Ritual() {
    const router = useRouter();
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
    const [isActive, setIsActive] = useState(false);
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
    const [dailyProgress, setDailyProgress] = useState<DailyProgress>({
        ritual: false,
        nutrition: false,
        movement: false,
        dayFinished: false,
    });

    useEffect(() => {
        const storedProgressHistory = localStorage.getItem('mounjaro-progress-history');
        const today = new Date().toISOString().split('T')[0];

        if (storedProgressHistory) {
            const history: ProgressHistory = JSON.parse(storedProgressHistory);
            if (history[today]) {
                setDailyProgress(history[today]);
            }
        }
    }, []);

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
    
    const allChecked = ritualItems.every(item => checkedItems[item.id]);

    const handleFinishRitual = () => {
        const today = new Date().toISOString().split('T')[0];
        const storedProgressHistory = localStorage.getItem('mounjaro-progress-history');
        const history: ProgressHistory = storedProgressHistory ? JSON.parse(storedProgressHistory) : {};
        
        const updatedProgress: DailyProgress = {
            ...dailyProgress,
            ritual: true,
        };

        history[today] = updatedProgress;
        localStorage.setItem('mounjaro-progress-history', JSON.stringify(history));

        router.back();
    }

    return (
        <div className="w-full max-w-2xl mx-auto flex flex-col gap-8 text-center">
            <header className="flex items-center justify-between w-full">
                <Button variant="ghost" onClick={() => router.back()} size="icon">
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-3xl font-bold font-headline text-primary">
                    Ritual do Chá
                </h1>
                <div className="w-10"></div>
            </header>

            <Card className='bg-card/50'>
                <CardHeader>
                    <CardTitle className="text-xl text-accent">O Círculo de Poder</CardTitle>
                    <CardDescription>Seu progresso diário nos 3 pilares.</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-around items-center">
                    <CircleProgress progress={dailyProgress.ritual ? 100 : 0} icon={TeaBowlIcon} label="Ritual" />
                    <CircleProgress progress={dailyProgress.nutrition ? 100 : 0} icon={Salad} label="Nutrição" />
                    <CircleProgress progress={dailyProgress.movement ? 100 : 0} icon={Dumbbell} label="Movimento" />
                </CardContent>
            </Card>


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

            
            <Button size="lg" onClick={handleFinishRitual} disabled={!allChecked}>
                Concluir Ritual e Ganhar +{ritualItems.reduce((acc, item) => acc + (item.xp || 0), 0)} XP
            </Button>
            

        </div>
    );
}
