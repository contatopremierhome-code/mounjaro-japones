'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuth } from '@/firebase';
import { signInAnonymously } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export function AuthComponent() {
  const auth = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleAnonymousSignIn = async () => {
        if (!auth) return;
        setIsSubmitting(true);
        try {
            await signInAnonymously(auth);
            // onAuthStateChanged will handle the UI change
        } catch (error: any) {
             toast({
                variant: 'destructive',
                title: 'Erro de Conexão',
                description: "Não foi possível conectar. Por favor, tente novamente mais tarde.",
              });
             setIsSubmitting(false); // Only set to false on error
        } 
      }
    handleAnonymousSignIn();
  }, [auth, toast]);


  return (
    <Card className="w-full max-w-md text-center">
      <CardHeader>
        <CardTitle className='font-headline text-2xl'>Bem-vindo(a)!</CardTitle>
        <CardDescription>Estamos preparando tudo para sua jornada de bem-estar.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-4 p-10">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-muted-foreground">Conectando...</p>
      </CardContent>
    </Card>
  );
}
