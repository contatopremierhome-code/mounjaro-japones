'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Sun, Flame, Moon, Clock, Repeat, CheckCircle, Circle, Play, Pause } from 'lucide-react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import type { DailyProgress, ProgressHistory } from '@/lib/types';


const routineData = {
    morning: {
        title: 'Energia Matutina',
        icon: Sun,
        color: 'text-yellow-400',
        exercises: [
            { name: 'Rotação de tornozelo', duration: '30s cada lado', seconds: 60, xp: 5, image: 'https://i.imgur.com/yydGpJ9.png', hint: 'ankle rotation' },
            { name: 'Círculos com os braços', duration: '30s', seconds: 30, xp: 5, image: 'https://i.imgur.com/8fe7RyQ.png', hint: 'arm circles' },
            { name: 'Alongamento gato-vaca', duration: '1 min', seconds: 60, xp: 10, image: 'https://i.imgur.com/D9Ki8Kj.png', hint: 'cat cow stretch' },
            { name: 'Agachamento isométrico', duration: '30s', seconds: 30, xp: 10, image: 'https://i.imgur.com/sOifsAC.png', hint: 'isometric squat' },
            { name: 'Polichinelos', duration: '45s', seconds: 45, xp: 15, image: 'https://i.imgur.com/FNb9pwK.png', hint: 'jumping jacks' },
        ]
    },
    active: {
        title: 'Queima Ativa',
        icon: Flame,
        color: 'text-destructive',
        exercises: [
            { name: 'Corrida no lugar', duration: '1 min', seconds: 60, xp: 10, image: 'https://i.imgur.com/gi3VSxp.gif', hint: 'running in place' },
            { name: 'Agachamentos', duration: '45s', seconds: 45, xp: 15, image: 'https://i.imgur.com/8mH894y.gif', hint: 'squats' },
            { name: 'Flexões', duration: '45s', seconds: 45, xp: 15, image: 'https://i.imgur.com/uNGHk9i.gif', hint: 'push ups' },
            { name: 'Prancha', duration: '45s', seconds: 45, xp: 15, image: 'https://i.imgur.com/hUQr3Zr.gif', hint: 'plank' },
            { name: 'Burpees', duration: '45s', seconds: 45, xp: 20, image: 'https://i.imgur.com/5YZVi9b.gif', hint: 'burpees' },
            { name: 'Abdominais', duration: '45s', seconds: 45, xp: 10, image: 'https://i.imgur.com/79fVYrp.gif', hint: 'crunches' },
            { name: 'Afundos', duration: '45s cada perna', seconds: 90, xp: 15, image: 'https://i.imgur.com/q2gkoLJ.gif', hint: 'lunges' },
            { name: 'Elevação de quadril', duration: '45s', seconds: 45, xp: 10, image: 'https://i.imgur.com/HvRmuXG.gif', hint: 'hip raise' },
            { name: 'Escalador', duration: '45s', seconds: 45, xp: 15, image: 'https://i.imgur.com/WbuGSmT.gif', hint: 'mountain climber' },
        ]
    },
    night: {
        title: 'Relaxamento Noturno',
        icon: Moon,
        color: 'text-blue-400',
        exercises: [
            { name: 'Alongamento pescoço', duration: '30s cada lado', seconds: 60, xp: 5 },
            { name: 'Postura da criança', duration: '1 min', seconds: 60, xp: 10 },
            { name: 'Torção de coluna deitado', duration: '1 min cada lado', seconds: 120, xp: 10 },
            { name: 'Alongamento borboleta', duration: '1 min', seconds: 60, xp: 10 },
            { name: 'Respiração profunda', duration: '2 mins', seconds: 120, xp: 15 },
        ]
    }
};

type RoutineId = keyof typeof routineData;
type Exercise = (typeof routineData)[RoutineId]['exercises'][0];

interface RoutineProps {
    routineId: string;
}

const TimerDialog = ({ exercise, onComplete, onClose }: { exercise: Exercise, onComplete: () => void, onClose: () => void }) => {
    const [timeLeft, setTimeLeft] = useState(exercise.seconds);
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        if (!isActive) return;

        if (timeLeft === 0) {
            onComplete();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, isActive, onComplete]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const progressPercentage = (timeLeft / exercise.seconds) * 100;

    return (
        <Dialog open={true} onOpenChange={(isOpen) => !isOpen && onClose()}>
            <DialogContent className="max-w-sm w-[90vw] p-0 text-center flex flex-col justify-center items-center gap-6">
                <DialogHeader className='pt-6'>
                    <DialogTitle className="text-2xl font-headline text-primary">{exercise.name}</DialogTitle>
                </DialogHeader>
                
                <div className="relative w-52 h-52 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-8 border-primary/20"></div>
                    <div 
                        className="absolute inset-0 rounded-full"
                        style={{
                            background: `conic-gradient(transparent ${progressPercentage}%, hsl(var(--primary)) 0)`,
                            transition: 'background 0.5s linear'
                        }}
                    ></div>
                    <div className="relative w-44 h-44 bg-card rounded-full flex flex-col items-center justify-center shadow-inner">
                        <span className="text-5xl font-mono font-bold text-primary">
                            {formatTime(timeLeft)}
                        </span>
                        <span className='text-muted-foreground'>+{exercise.xp} XP</span>
                    </div>
                </div>

                <div className='flex flex-col items-center gap-4 p-6 pt-0 w-full'>
                    <Button onClick={() => setIsActive(!isActive)} size="lg" className="w-full">
                        {isActive ? <Pause className="mr-2" /> : <Play className="mr-2" />}
                        {isActive ? 'Pausar' : 'Continuar'}
                    </Button>
                    <Button variant="secondary" className="w-full" onClick={onComplete}>Pular e Concluir</Button>
                </div>

                <DialogClose className="absolute right-4 top-4 bg-black/50 text-white rounded-full p-1">
                    <X className="h-5 w-5" />
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
};


export function Routine({ routineId }: RoutineProps) {
    const router = useRouter();
    const routine = routineData[routineId as RoutineId];
    const [completedExercises, setCompletedExercises] = useState<Set<number>>(new Set());
    const [selectedExerciseIndex, setSelectedExerciseIndex] = useState<number | null>(null);

    if (!routine) {
        return (
            <div className="w-full max-w-2xl mx-auto flex flex-col gap-8 text-center">
                <h1 className="text-2xl font-bold text-destructive">Rotina não encontrada</h1>
                <p>A rotina que você está tentando acessar não existe.</p>
                <Button onClick={() => router.back()}>Voltar</Button>
            </div>
        );
    }
    
    const RoutineIcon = routine.icon;

    const handleToggleExercise = (index: number) => {
        setSelectedExerciseIndex(index);
    };

    const handleTimerComplete = () => {
        if (selectedExerciseIndex !== null) {
            setCompletedExercises(prev => new Set(prev).add(selectedExerciseIndex));
            setSelectedExerciseIndex(null);
        }
    };
    
    const handleCloseTimer = () => {
        setSelectedExerciseIndex(null);
    }

    const handleReset = () => {
        setCompletedExercises(new Set());
    }

    const handleFinishRoutine = () => {
        const allExercisesDone = completedExercises.size === routine.exercises.length;
        if (!allExercisesDone) {
            // Or maybe show a confirmation dialog
             router.push('/');
             return;
        }

        const today = new Date().toISOString().split('T')[0];
        const storedProgressHistory = localStorage.getItem('mounjaro-progress-history');
        const history: ProgressHistory = storedProgressHistory ? JSON.parse(storedProgressHistory) : {};

        const currentProgress = history[today] || { ritual: false, nutrition: false, movement: false, dayFinished: false };

        const updatedProgress: DailyProgress = {
            ...currentProgress,
            movement: true,
        };

        history[today] = updatedProgress;
        localStorage.setItem('mounjaro-progress-history', JSON.stringify(history));

        router.push('/');
    }
    
    const allExercisesDone = completedExercises.size === routine.exercises.length;

    const totalXp = Array.from(completedExercises).reduce((acc, index) => {
        return acc + routine.exercises[index].xp;
    }, 0);

    return (
        <div className="w-full max-w-2xl mx-auto flex flex-col gap-8">
            <header className="flex items-center justify-between w-full">
                <Button variant="ghost" onClick={() => router.back()} size="icon">
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <div className={`text-center flex items-center gap-3 ${routine.color}`}>
                    <RoutineIcon className="w-8 h-8" />
                    <h1 className="text-3xl font-bold font-headline">
                        {routine.title}
                    </h1>
                </div>
                <div className="w-10"></div>
            </header>

            <div className="space-y-4">
                {routine.exercises.map((exercise, index) => {
                    const isCompleted = completedExercises.has(index);
                    return (
                    <Card 
                        key={index} 
                        className={`flex items-center p-4 gap-4 transition-all duration-300 cursor-pointer hover:border-primary/50 ${isCompleted ? 'bg-primary/10 border-primary/50' : 'bg-card/50'}`}
                        onClick={() => !isCompleted && handleToggleExercise(index)}
                    >
                        {'image' in exercise && exercise.image && (
                            <div className="relative w-24 h-24 rounded-md overflow-hidden bg-muted">
                                <Image src={exercise.image} alt={exercise.name} fill style={{ objectFit: 'cover' }} data-ai-hint={exercise.hint} unoptimized />
                                {isCompleted && <div className="absolute inset-0 bg-primary/30 flex items-center justify-center"><CheckCircle className="w-10 h-10 text-white" /></div>}
                            </div>
                        )}
                        {!('image' in exercise) && (
                             <div className="relative w-24 h-24 rounded-md overflow-hidden bg-muted flex items-center justify-center">
                                {isCompleted ? <CheckCircle className="w-10 h-10 text-primary" /> : <Flame className={`w-10 h-10 ${routine.color}`} />}
                            </div>
                        )}
                        <div className="flex-1">
                            <h3 className={`font-semibold text-lg ${isCompleted ? 'text-primary' : ''}`}>{exercise.name}</h3>
                            <div className="flex items-center gap-4 text-muted-foreground">
                                <div className='flex items-center gap-1'><Clock className="w-4 h-4" /><span>{exercise.duration}</span></div>
                                <div className={`flex items-center gap-1 font-bold ${routine.color}`}><Flame className="w-4 h-4" /><span>+{exercise.xp} XP</span></div>
                            </div>
                        </div>
                         {isCompleted ? (
                            <CheckCircle className="w-8 h-8 text-primary transition-colors"/>
                        ) : (
                            <Circle className="w-8 h-8 text-muted-foreground/30 group-hover:text-primary transition-colors"/>
                        )}
                    </Card>
                )})}
            </div>

            <div className="flex gap-4">
                <Button variant="outline" size="lg" className="w-full" onClick={handleReset}>
                    <Repeat className="mr-2 h-4 w-4" />
                    Começar de Novo
                </Button>
                <Button 
                    size="lg" 
                    className="w-full" 
                    onClick={handleFinishRoutine}
                    disabled={!allExercisesDone}
                >
                    {allExercisesDone ? `Concluir (+${totalXp} XP)` : 'Conclua todos os exercícios'}
                </Button>
            </div>
            
            {selectedExerciseIndex !== null && (
                <TimerDialog 
                    exercise={routine.exercises[selectedExerciseIndex]}
                    onComplete={handleTimerComplete}
                    onClose={handleCloseTimer}
                />
            )}
        </div>
    );
}

    

    

