'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import type { UserData } from '@/lib/types';
import { ArrowLeft } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const steps = [
  {
    title: 'Olá!',
    description: 'Vamos começar com o básico.',
    fields: ['name', 'age'],
  },
  {
    title: 'Suas Metas',
    description: 'Defina seus objetivos de bem-estar.',
    fields: ['currentWeight', 'weightGoal', 'height'],
  },
  {
    title: 'Detalhes Finais',
    description: 'Estamos quase lá.',
    fields: ['takesMedication', 'medicationDose', 'personalDream'],
  },
];

const requiredNumber = z.coerce.number({ required_error: "Este campo é obrigatório.", invalid_type_error: "Por favor, insira um número válido." });


const formSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres.'),
  age: requiredNumber.min(18, 'Você deve ser maior de idade.').max(100, 'Idade inválida.'),
  currentWeight: requiredNumber.min(30, 'Peso inválido.').max(300, 'Peso inválido.'),
  weightGoal: requiredNumber.min(30, 'Meta de peso inválida.').max(300, 'Meta de peso inválida.'),
  height: z.coerce.number({ invalid_type_error: "Altura deve ser um número." }).min(1, 'Altura inválida.').max(2.3, 'Altura máxima de 2.30m').optional().or(z.literal('')),
  takesMedication: z.enum(['yes', 'no']),
  medicationDose: z.string().optional(),
  personalDream: z.string().optional(),
}).refine(data => {
    if (data.takesMedication === 'yes') {
        return !!data.medicationDose && data.medicationDose.length > 0;
    }
    return true;
}, {
    message: 'Dose é obrigatória.',
    path: ['medicationDose'],
});


interface OnboardingProps {
  onOnboardingComplete: (data: Omit<UserData, 'onboarded'>) => void;
}

export function Onboarding({ onOnboardingComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      age: undefined,
      currentWeight: undefined,
      weightGoal: undefined,
      height: undefined,
      takesMedication: 'no',
      medicationDose: '',
      personalDream: '',
    },
  });

  const takesMedicationValue = form.watch('takesMedication');

  async function processStep(data: z.infer<typeof formSchema>) {
    const finalData = {
      ...data,
      height: data.height || undefined,
      medicationDose: data.takesMedication === 'yes' ? data.medicationDose || '' : 'N/A',
      personalDream: data.personalDream || 'Conquistar meus objetivos!',
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onOnboardingComplete(finalData as Omit<UserData, 'onboarded'>);
    }
  }

  const handleNext = async () => {
    const fieldsToValidate = steps[currentStep].fields as (keyof z.infer<typeof formSchema>)[];
    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      processStep(form.getValues());
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progressValue = ((currentStep + 1) / steps.length) * 100;

  return (
    <Card className="w-full max-w-lg border-primary/20 shadow-lg shadow-primary/5">
      <CardHeader>
        <div className="space-y-2 mb-4">
          <Label>Progresso</Label>
          <Progress value={progressValue} className="w-full h-2" />
        </div>
        <CardTitle className="font-headline text-3xl text-primary">{steps[currentStep].title}</CardTitle>
        <CardDescription>{steps[currentStep].description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4">
            {currentStep === 0 && (
              <>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seu Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Maria Silva" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Idade</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Ex: 35" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {currentStep === 1 && (
              <>
                <FormField
                  control={form.control}
                  name="currentWeight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Peso Atual (kg)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Ex: 80" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="weightGoal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta de Peso (kg)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Ex: 65" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Altura (m)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" placeholder="Ex: 1.75" {...field} />
                      </FormControl>
                       <FormDescription>
                        Opcional. Se não quiser informar, basta clicar em Próximo.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            {currentStep === 2 && (
              <>
                <FormField
                  control={form.control}
                  name="takesMedication"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Você toma alguma medicação?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex items-center space-x-4"
                        >
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="yes" />
                            </FormControl>
                            <FormLabel className="font-normal">Sim</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="no" />
                            </FormControl>
                            <FormLabel className="font-normal">Não</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {takesMedicationValue === 'yes' && (
                  <FormField
                    control={form.control}
                    name="medicationDose"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dose da Medicação</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: 10mg" {...field} value={field.value || ''} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  control={form.control}
                  name="personalDream"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Qual seu sonho pessoal?</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Correr uma maratona" {...field} value={field.value || ''}/>
                      </FormControl>
                       <FormDescription>
                        Opcional, mas ajuda a lembrar seu 'porquê' nesta jornada.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </form>
        </Form>
      </CardContent>
      <CardFooter className={`flex ${currentStep > 0 ? 'justify-between' : 'justify-end'}`}>
        {currentStep > 0 && (
            <Button variant="outline" onClick={handlePrev}>
              <ArrowLeft />
              Voltar
            </Button>
        )}
        <Button onClick={handleNext}>
          {currentStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
        </Button>
      </CardFooter>
    </Card>
  );
}
