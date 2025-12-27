'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { UserData, DailyProgress } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { getAffirmation } from '@/app/actions';
import { Check, Repeat, Salad, Dumbbell } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from './ui/input';
import { Label } from './ui/label';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useRouter } from 'next/navigation';
import { TeaBowlIcon } from './icons';

interface DashboardProps {
  user: UserData;
  progress: DailyProgress;
  onProgressUpdate: (progress: DailyProgress) => void;
  onReset: () => void;
}

const actionItems = [
  { id: 'ritual', title: 'Ritual do Chá', path: '/ritual', image: 'https://i.imgur.com/wMbgBH8.png', hint: 'tea ritual' },
  { id: 'nutrition', title: 'Registrar Comida', path: '/nutrition', image: 'https://i.imgur.com/j5LbxSg.png', hint: 'healthy food' },
  { id: 'recipes', title: 'Receitas de Chás', path: '/recipes', image: 'https://i.imgur.com/YrTQpoy.png', hint: 'tea recipes' },
  { id: 'movement', title: 'Exercícios Diários', path: '/movement', image: 'https://i.imgur.com/U8nvHEd.png', hint: 'daily exercise' },
  { id: 'progress', title: 'Meu Progresso', path: '/progress', image: 'https://i.imgur.com/BlHfCOr.png', hint: 'progress calendar' },
] as const;


type ActionId = 'ritual' | 'nutrition' | 'movement';


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


export function Dashboard({ user, progress, onProgressUpdate, onReset }: DashboardProps) {
  const router = useRouter();
  const [weightChange, setWeightChange] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleActionClick = (id: string, path: string) => {
    if (path) {
      router.push(path);
      return;
    }
  };
  
  const handleFinishDay = async () => {
    setIsSubmitting(true);
    try {
      const input = {
        dailyRitualCompleted: progress.ritual,
        'nutrition adherence': progress.nutrition ? 100 : 0,
        movementMinutes: progress.movement ? 30 : 0,
        weightChange: parseFloat(weightChange) || 0,
        personalDream: user.personalDream,
      };

      const result = await getAffirmation(input);
      
      const newProgress = { ...progress, dayFinished: true };
      onProgressUpdate(newProgress);

      if (result && result.shouldSendAffirmation) {
        toast({
          title: "Uma mensagem para você ✨",
          description: result.affirmation,
          duration: 9000,
        });
      } else {
        toast({
          title: "Dia finalizado! 🎉",
          description: "Ótimo trabalho hoje. Continue assim!",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Ops! Algo deu errado.',
        description: 'Não foi possível buscar sua mensagem de motivação.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateBmi = (weight: number, height?: number) => {
    if (!height) return '--';
    return (weight / (height * height)).toFixed(1);
  };

  const today = new Date();
  const formattedDate = format(today, "EEEE, d 'de' MMMM 'de' yyyy", {
    locale: ptBR,
  });
  
  const allCoreTasksDone = progress.ritual && progress.nutrition && progress.movement;

  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-8 text-center">
      <header className="space-y-1">
        <h1 className="text-4xl font-headline font-bold text-primary">
          Olá, {user.name.split(' ')[0]}!
        </h1>
        <p className="text-sm text-muted-foreground capitalize">
          {formattedDate}
        </p>
      </header>
    
      <Card className='bg-card/50'>
          <CardHeader>
              <CardTitle className="text-xl text-accent">O Círculo de Poder</CardTitle>
              <CardDescription>Seu progresso diário nos 3 pilares.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-around items-center">
              <CircleProgress progress={progress.ritual ? 100 : 0} icon={TeaBowlIcon} label="Ritual" />
              <CircleProgress progress={progress.nutrition ? 100 : 0} icon={Salad} label="Nutrição" />
              <CircleProgress progress={progress.movement ? 100 : 0} icon={Dumbbell} label="Movimento" />
          </CardContent>
      </Card>
      
      <div className="grid grid-cols-2 gap-4">
        {actionItems.map((item) => (
          <Card
            key={item.id}
            onClick={() => handleActionClick(item.id, item.path)}
            className={`group relative aspect-square flex flex-col items-center justify-end p-4 transition-all duration-300 transform hover:scale-105 overflow-hidden cursor-pointer
              ${progress[item.id as ActionId] ? 'border-2 border-primary shadow-primary/20' : ''}`}
          >
            <Image 
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              data-ai-hint={item.hint}
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
             {progress[item.id as ActionId] && (
              <div className="absolute inset-0 bg-primary/30 flex items-center justify-center">
                <Check className="w-16 h-16 text-white" />
              </div>
            )}
            <h3 className="relative text-base font-bold text-white text-center z-10">{item.title}</h3>
          </Card>
        ))}
      </div>
      
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="lg" disabled={isSubmitting || progress.dayFinished || !allCoreTasksDone}>
             {isSubmitting ? 'Processando...' : (progress.dayFinished ? 'Dia Finalizado' : 'Finalizar o Dia')}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Balanço do Dia</AlertDialogTitle>
            <AlertDialogDescription>
              Para te dar uma motivação personalizada, precisamos saber como foi a balança hoje.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-2 py-4">
            <Label htmlFor="weight-change">Variação de peso (kg)</Label>
            <Input 
              id="weight-change"
              type="number"
              step="0.1"
              value={weightChange}
              onChange={(e) => setWeightChange(e.target.value)}
              placeholder="Ex: -0.5 ou 0.2"
            />
             <p className="text-xs text-muted-foreground">Use valor negativo para perda de peso. Ex: -0.5</p>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleFinishDay} disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Receber Motivação'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <footer className="w-full bg-card p-4 rounded-lg flex justify-around items-center">
        <div className="text-center">
          <p className="text-xs text-muted-foreground">IMC</p>
          <p className="font-bold text-lg">{calculateBmi(user.currentWeight, user.height)}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Peso Atual</p>
          <p className="font-bold text-lg">{user.currentWeight}kg</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Meta</p>
          <p className="font-bold text-lg">{user.weightGoal}kg</p>
        </div>
      </footer>
      <Button variant="ghost" size="sm" onClick={onReset} className="text-muted-foreground hover:text-primary">
          <Repeat className="mr-2 h-4 w-4" />
          Recomeçar Onboarding
      </Button>
    </div>
  );
}
