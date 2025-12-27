'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Sun, Flame, Moon, Clock, Repeat, CheckCircle } from 'lucide-react';
import { Badge } from './ui/badge';
import Image from 'next/image';

const routineData = {
    morning: {
        title: 'Energia Matutina',
        icon: Sun,
        color: 'text-yellow-400',
        exercises: [
            { name: 'Rotação de tornozelo', duration: '30s cada lado', image: 'https://i.imgur.com/2yA4Xyq.gif', hint: 'ankle rotation' },
            { name: 'Círculos com os braços', duration: '30s', image: 'https://i.imgur.com/sS8f4o8.gif', hint: 'arm circles' },
            { name: 'Alongamento gato-vaca', duration: '1 min', image: 'https://i.imgur.com/M6i3A4g.gif', hint: 'cat cow stretch' },
            { name: 'Agachamento isométrico', duration: '30s', image: 'https://i.imgur.com/L6b5nS6.gif', hint: 'isometric squat' },
            { name: 'Polichinelos', duration: '45s', image: 'https://i.imgur.com/uFvVx6v.gif', hint: 'jumping jacks' },
        ]
    },
    active: {
        title: 'Queima Ativa',
        icon: Flame,
        color: 'text-destructive',
        exercises: [
            { name: 'Corrida no lugar', duration: '1 min', image: 'https://i.imgur.com/I0zJ1mI.gif', hint: 'running in place' },
            { name: 'Agachamentos', duration: '45s', image: 'https://i.imgur.com/pYkq9vj.gif', hint: 'squats' },
            { name: 'Flexões', duration: '45s', image: 'https://i.imgur.com/C5uVT9d.gif', hint: 'push ups' },
            { name: 'Prancha', duration: '45s', image: 'https://i.imgur.com/3Yd4J4f.gif', hint: 'plank' },
            { name: 'Burpees', duration: '45s', image: 'https://i.imgur.com/6jLhG2i.gif', hint: 'burpees' },
            { name: 'Abdominais', duration: '45s', image: 'https://i.imgur.com/zX7MhJ4.gif', hint: 'crunches' },
            { name: 'Afundos', duration: '45s cada perna', image: 'https://i.imgur.com/b6b5V4T.gif', hint: 'lunges' },
            { name: 'Elevação de quadril', duration: '45s', image: 'https://i.imgur.com/yN7kY6a.gif', hint: 'hip raise' },
            { name: 'Escalador', duration: '45s', image: 'https://i.imgur.com/y4GkL0D.gif', hint: 'mountain climber' },
        ]
    },
    night: {
        title: 'Relaxamento Noturno',
        icon: Moon,
        color: 'text-blue-400',
        exercises: [
            { name: 'Alongamento pescoço', duration: '30s cada lado', image: 'https://i.imgur.com/OHg0d5V.gif', hint: 'neck stretch' },
            { name: 'Postura da criança', duration: '1 min', image: 'https://i.imgur.com/zW3BqQk.gif', hint: 'childs pose' },
            { name: 'Torção de coluna deitado', duration: '1 min cada lado', image: 'https://i.imgur.com/dTeLp4F.gif', hint: 'supine spinal twist' },
            { name: 'Alongamento borboleta', duration: '1 min', image: 'https://i.imgur.com/2g3j3rX.gif', hint: 'butterfly stretch' },
            { name: 'Respiração profunda', duration: '2 mins', image: 'https://i.imgur.com/d9a4hSg.gif', hint: 'deep breathing' },
        ]
    }
};

type RoutineId = keyof typeof routineData;

interface RoutineProps {
    routineId: string;
}

export function Routine({ routineId }: RoutineProps) {
    const router = useRouter();
    const routine = routineData[routineId as RoutineId];

    if (!routine) {
        return (
            <div className="w-full max-w-2xl mx-auto flex flex-col gap-8 text-center">
                <p>Rotina não encontrada.</p>
                <Button onClick={() => router.back()}>Voltar</Button>
            </div>
        );
    }
    
    const RoutineIcon = routine.icon;

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
                {routine.exercises.map((exercise, index) => (
                    <Card key={index} className="flex items-center p-4 gap-4 bg-card/50">
                        <div className="relative w-24 h-24 rounded-md overflow-hidden">
                             <Image src={exercise.image} alt={exercise.name} fill style={{ objectFit: 'cover' }} data-ai-hint={exercise.hint} />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-lg">{exercise.name}</h3>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Clock className="w-4 h-4" />
                                <span>{exercise.duration}</span>
                            </div>
                        </div>
                        <CheckCircle className="w-8 h-8 text-muted-foreground/30 hover:text-primary transition-colors cursor-pointer"/>
                    </Card>
                ))}
            </div>

            <div className="flex gap-4">
                <Button variant="outline" size="lg" className="w-full">
                    <Repeat className="mr-2 h-4 w-4" />
                    Começar de Novo
                </Button>
                <Button size="lg" className="w-full" onClick={() => router.push('/')}>
                    Concluir Treino
                </Button>
            </div>
        </div>
    );
}