'use client';

import { useState, useEffect } from 'react';
import type { UserData, DailyProgress } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { getAffirmation } from '@/app/actions';
import { TeaBowlIcon } from '@/components/icons';
import { Salad, BookOpen, Dumbbell, Check, Repeat } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from './ui/input';
import { Label } from './ui/label';

interface DashboardProps {
  user: UserData;
  progress: DailyProgress;
  onProgressUpdate: (progress: DailyProgress) => void;
  onReset: () => void;
}

const actionItems = [
  { id: 'ritual', title: 'Ritual do Chá', icon: TeaBowlIcon },
  { id: 'nutrition', title: 'Registrar Comida', icon: Salad },
  { id: 'recipes', title: 'Receitas de Chás', icon: BookOpen, isActionable: false },
  { id: 'movement', title: 'Exercícios Diários', icon: Dumbbell },
] as const;

type ActionId = 'ritual' | 'nutrition' | 'movement';

export function Dashboard({ user, progress, onProgressUpdate, onReset }: DashboardProps) {
  const [confirmedAction, setConfirmedAction] = useState<string | null>(null);
  const [weightChange, setWeightChange] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleActionClick = (id: ActionId) => {
    const newProgress = { ...progress, [id]: !progress[id] };
    onProgressUpdate(newProgress);
    setConfirmedAction(id);
    setTimeout(() => setConfirmedAction(null), 2000);
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

  const completedCount = Object.values(progress).filter(Boolean).length;
  const overallProgress = (completedCount / 3) * 100;

  const calculateBmi = (weight: number) => {
    // Assuming a default height of 1.7m for BMI calculation
    const height = 1.7;
    return (weight / (height * height)).toFixed(1);
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-8 text-center">
      <header className="space-y-2">
        <h1 className="text-4xl font-headline font-bold text-primary">
          Olá, {user.name.split(' ')[0]}!
        </h1>
        <p className="text-muted-foreground">Pronto para conquistar seu dia?</p>
      </header>

      <div className="relative flex items-center justify-center">
        <div className="absolute w-64 h-64 border-8 border-primary/20 rounded-full"></div>
        <div 
           className="absolute w-64 h-64 rounded-full"
           style={{
             background: `conic-gradient(hsl(var(--primary)) ${overallProgress}%, transparent 0)`,
             transition: 'background 0.5s ease-out'
           }}
        ></div>
        <div className="relative w-52 h-52 bg-card rounded-full flex flex-col items-center justify-center shadow-inner">
          <span className="text-5xl font-bold font-headline text-primary">
            {Math.round(overallProgress)}%
          </span>
          <span className="text-sm text-muted-foreground">Completo</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {actionItems.map((item) => (
          <Card
            key={item.id}
            onClick={() => item.isActionable === false ? window.alert('Função em breve!') : handleActionClick(item.id as ActionId)}
            className={`aspect-square flex flex-col items-center justify-center p-4 transition-all duration-300 transform hover:scale-105 hover:bg-primary/10 cursor-pointer ${progress[item.id as ActionId] ? 'border-primary shadow-primary/20' : ''}`}
          >
            {confirmedAction === item.id ? (
              <Check className="w-16 h-16 text-primary animate-ping" />
            ) : (
              <>
                <item.icon className={`w-10 h-10 mb-2 ${progress[item.id as ActionId] ? 'text-primary' : 'text-muted-foreground'}`} />
                <h3 className="text-sm font-semibold text-center">{item.title}</h3>
              </>
            )}
          </Card>
        ))}
      </div>
      
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="lg" disabled={isSubmitting}>
             {isSubmitting ? 'Processando...' : 'Finalizar o Dia'}
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
          <p className="font-bold text-lg">{calculateBmi(user.currentWeight)}</p>
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
