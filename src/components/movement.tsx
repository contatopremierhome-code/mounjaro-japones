'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Sun, Flame, Moon, Clock, Target, Dumbbell } from 'lucide-react';
import { Badge } from './ui/badge';

const routines = [
    {
        id: 'morning',
        title: 'Energia Matutina',
        description: 'Ativar metabolismo + Despertar corpo',
        icon: Sun,
        duration: '5 minutos',
        exercises: '5 exercícios',
        xp: '+30 XP',
        color: 'text-yellow-400',
        borderColor: 'border-yellow-400/30'
    },
    {
        id: 'active',
        title: 'Queima Ativa',
        description: 'Queimar calorias + Fortalecer',
        icon: Flame,
        duration: '10 minutos',
        exercises: '9 exercícios',
        xp: '+50 XP',
        color: 'text-destructive',
        borderColor: 'border-destructive/30'
    },
    {
        id: 'night',
        title: 'Relaxamento Noturno',
        description: 'Liberar tensão + Preparar para dormir',
        icon: Moon,
        duration: '7 minutos',
        exercises: '5 exercícios',
        xp: '+35 XP',
        color: 'text-blue-400',
        borderColor: 'border-blue-400/30'
    },
];

export function Movement() {
    const router = useRouter();

    const handleStartRoutine = (routineId: string) => {
        router.push(`/movement/${routineId}`);
    };

    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
            <header className="flex items-center relative w-full justify-center">
                <Button variant="ghost" onClick={() => router.back()} size="icon" className="absolute left-0">
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <div className='text-center'>
                    <h1 className="text-3xl font-bold font-headline text-primary">
                        Movimento Zen Diário
                    </h1>
                    <p className="text-muted-foreground">Escolha sua energia hoje</p>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {routines.map((routine) => (
                    <Card key={routine.id} className={`flex flex-col bg-card hover:border-primary/50 transition-all ${routine.borderColor}`}>
                        <CardHeader className='items-center text-center'>
                            <routine.icon className={`w-12 h-12 mb-4 ${routine.color}`} />
                            <CardTitle className={`${routine.color}`}>{routine.title}</CardTitle>
                            <CardDescription>{routine.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-4">
                           <div className="flex justify-between items-center text-sm text-muted-foreground border-t border-b border-border/50 py-3">
                               <div className='flex items-center gap-2'>
                                <Clock className='w-4 h-4' />
                                <span>{routine.duration}</span>
                               </div>
                                <Badge variant='outline'>{routine.exercises}</Badge>
                           </div>
                           <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Target className='w-4 h-4' />
                                <span>Objetivo</span>
                                <span className={`font-bold ml-auto ${routine.color}`}>{routine.xp}</span>
                           </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" variant='outline' onClick={() => handleStartRoutine(routine.id)}>
                                <Dumbbell className="mr-2 h-4 w-4" />
                                Começar Rotina
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
