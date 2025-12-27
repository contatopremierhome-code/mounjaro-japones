'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, Circle, Flame, Salad, Award } from 'lucide-react';
import type { ProgressHistory, DailyProgress } from '@/lib/types';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { TeaBowlIcon } from './icons';

export function ProgressCalendar() {
    const router = useRouter();
    const [history, setHistory] = useState<ProgressHistory>({});
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    useEffect(() => {
        const storedHistory = localStorage.getItem('mounjaro-progress-history');
        if (storedHistory) {
            setHistory(JSON.parse(storedHistory));
        }
    }, []);

    const finishedDays = Object.keys(history)
        .filter(dateStr => history[dateStr].dayFinished)
        .map(dateStr => parseISO(dateStr));
    
    const selectedDateString = format(selectedDate, 'yyyy-MM-dd');
    const selectedDayProgress = history[selectedDateString];

    const DayInfo = ({ progress }: { progress: DailyProgress }) => (
        <div className='space-y-3'>
            <div className="flex items-center gap-3">
                {progress.ritual ? <CheckCircle className='w-5 h-5 text-primary'/> : <Circle className='w-5 h-5 text-muted-foreground/50' />}
                <TeaBowlIcon className='w-5 h-5 text-primary' />
                <span>Ritual do Chá</span>
            </div>
            <div className="flex items-center gap-3">
                {progress.nutrition ? <CheckCircle className='w-5 h-5 text-primary'/> : <Circle className='w-5 h-5 text-muted-foreground/50' />}
                <Salad className='w-5 h-5 text-primary' />
                <span>Nutrição</span>
            </div>
            <div className="flex items-center gap-3">
                {progress.movement ? <CheckCircle className='w-5 h-5 text-primary'/> : <Circle className='w-5 h-5 text-muted-foreground/50' />}
                <Flame className='w-5 h-5 text-primary' />
                <span>Movimento</span>
            </div>
             <div className="flex items-center gap-3 pt-3 border-t border-border mt-3">
                {progress.dayFinished ? <Award className='w-5 h-5 text-accent'/> : <Award className='w-5 h-5 text-muted-foreground/50' />}
                <span className='font-bold'>Dia Finalizado</span>
            </div>
        </div>
    );

    return (
        <div className="w-full max-w-md mx-auto flex flex-col gap-8">
            <header className="flex items-center relative w-full justify-center">
                <Button variant="ghost" onClick={() => router.back()} size="icon" className="absolute left-0">
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <div className='text-center'>
                    <h1 className="text-3xl font-bold font-headline text-primary">
                        Meu Progresso
                    </h1>
                    <p className="text-muted-foreground">Sua jornada de bem-estar</p>
                </div>
            </header>

            <Card>
                <CardContent className="p-2">
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => date && setSelectedDate(date)}
                        modifiers={{ finished: finishedDays }}
                        modifiersClassNames={{
                            finished: 'bg-primary/20 text-primary-foreground rounded-full',
                        }}
                        locale={ptBR}
                    />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>{format(selectedDate, "d 'de' MMMM", { locale: ptBR })}</CardTitle>
                    <CardDescription>Resumo do dia</CardDescription>
                </CardHeader>
                <CardContent>
                    {selectedDayProgress ? (
                        <DayInfo progress={selectedDayProgress} />
                    ) : (
                        <p className="text-muted-foreground">Nenhuma atividade registrada para este dia.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
