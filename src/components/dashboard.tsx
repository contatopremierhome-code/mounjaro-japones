'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { UserData, DailyProgress } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Repeat } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useRouter } from 'next/navigation';

interface DashboardProps {
  user: UserData;
  progress: DailyProgress;
  onProgressUpdate: (progress: DailyProgress) => void;
  onReset: () => void;
}

const mainAction = { id: 'recipes', title: 'Receitas Mounjaro Japonês', path: '/recipes', image: 'https://i.imgur.com/YrTQpoy.png', hint: 'tea recipes' };

const bonusItems = [
  { id: 'nutrition', title: 'Inspiração Nutricional', path: '/nutrition', image: 'https://i.imgur.com/j5LbxSg.png', hint: 'healthy food' },
  { id: 'movement', title: 'Exercícios Diários', path: '/movement', image: 'https://i.imgur.com/U8nvHEd.png', hint: 'daily exercise' },
  { id: 'ritual', title: 'Ritual do Chá Japonês', path: '/ritual', image: 'https://i.imgur.com/wMbgBH8.png', hint: 'tea ritual' },
] as const;


type ActionId = 'ritual' | 'nutrition' | 'movement';


export function Dashboard({ user, progress, onReset }: DashboardProps) {
  const router = useRouter();
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);

  const handleActionClick = (id: string, path: string | null) => {
    if (path) {
      router.push(path);
      return;
    }
    if (id === 'coming-soon') {
        setIsComingSoonOpen(true);
    }
  };

  const calculateBmi = (weight: number, height?: number) => {
    if (!height || height < 1 || height > 2.3) return '--';
    return (weight / (height * height)).toFixed(1);
  };

  const today = new Date();
  const formattedDate = format(today, "EEEE, d 'de' MMMM 'de' yyyy", {
    locale: ptBR,
  });
  
  const isTaskCompleted = (id: ActionId) => progress[id] >= 100;

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

      <div className="space-y-4 flex flex-col items-center">
        <h2 className="text-2xl font-bold uppercase tracking-wider text-primary">
            Produto Principal
        </h2>
        <Card
            key={mainAction.id}
            onClick={() => handleActionClick(mainAction.id, mainAction.path)}
            className="group relative aspect-video w-full flex flex-col items-center justify-end p-4 transition-all duration-300 transform hover:scale-105 overflow-hidden cursor-pointer"
        >
            <Image 
            src={mainAction.image}
            alt={mainAction.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            data-ai-hint={mainAction.hint}
            unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <h2 className="relative text-2xl font-bold text-white text-center z-10">{mainAction.title}</h2>
        </Card>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-bold uppercase tracking-wider text-accent">
            Bônus Exclusivos
        </h2>
        <div className="grid grid-cols-3 gap-4">
            {bonusItems.map((item) => (
            <Card
                key={item.id}
                onClick={() => handleActionClick(item.id, item.path)}
                className={`group relative aspect-square flex flex-col items-center justify-end p-2 text-center transition-all duration-300 transform hover:scale-105 overflow-hidden cursor-pointer
                ${isTaskCompleted(item.id as ActionId) ? 'border-2 border-primary shadow-primary/20' : ''}`}
            >
                <Image 
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                data-ai-hint={item.hint}
                unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                {isTaskCompleted(item.id as ActionId) && (
                <div className="absolute inset-0 bg-primary/30 flex items-center justify-center">
                    <Check className="w-12 h-12 text-white" />
                </div>
                )}
                <h3 className="relative text-sm font-bold text-white z-10 leading-tight">{item.title}</h3>
            </Card>
                )
            )}
        </div>
      </div>

      <AlertDialog open={isComingSoonOpen} onOpenChange={setIsComingSoonOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Novidades a Caminho!</AlertDialogTitle>
            <AlertDialogDescription>
              Fique de olho! Em breve, ainda mais novidades para transformar sua jornada.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setIsComingSoonOpen(false)}>Entendi</AlertDialogAction>
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
          Editar Meus Dados
      </Button>
    </div>
  );
}
