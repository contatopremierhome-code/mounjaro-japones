'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, TrafficCone } from 'lucide-react';

type Category = 'verde' | 'amarelo' | 'vermelho';

const categories = [
    { id: 'verde', label: 'Verde', xp: '+30 XP', color: 'bg-green-500', borderColor: 'border-green-500', textColor: 'text-green-500' },
    { id: 'amarelo', label: 'Amarelo', xp: '+10 XP', color: 'bg-yellow-500', borderColor: 'border-yellow-500', textColor: 'text-yellow-500' },
    { id: 'vermelho', label: 'Vermelho', xp: '0 XP', color: 'bg-red-500', borderColor: 'border-red-500', textColor: 'text-red-500' },
] as const;

const trafficLightGuide = [
    { label: 'Verde', description: 'Proteínas magras, vegetais, frutas', color: 'bg-green-500' },
    { label: 'Amarelo', description: 'Carboidratos integrais, gorduras saudáveis', color: 'bg-yellow-500' },
    { label: 'Vermelho', description: 'Processados, açúcares, frituras', color: 'bg-red-500' },
];

export function Nutrition() {
    const router = useRouter();
    const [description, setDescription] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    const handleRegisterFood = () => {
        // Here you would typically save the data to a backend or state management
        console.log({
            description,
            category: selectedCategory,
        });
        // For now, it just navigates back and marks the task as complete
        // A more complex implementation would update the progress state globally
        router.back();
    };

    return (
        <div className="w-full max-w-2xl mx-auto flex flex-col gap-8">
            <header className="flex items-center justify-between w-full">
                <Button variant="ghost" onClick={() => router.back()} size="icon">
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <div className='text-center'>
                    <h1 className="text-3xl font-bold font-headline text-primary">
                        Registro de Nutrição
                    </h1>
                </div>
                <div className="w-10"></div>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle>Registrar Refeição</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Textarea
                        placeholder="Descreva sua refeição... Ex: Salada de quinoa com frango"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                    />

                    <div>
                        <label className="text-sm font-medium text-muted-foreground mb-2 block">Selecione a categoria:</label>
                        <div className="grid grid-cols-3 gap-4">
                            {categories.map((cat) => (
                                <Card
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id as Category)}
                                    className={`flex flex-col items-center justify-center p-4 cursor-pointer transition-all duration-200 ${selectedCategory === cat.id ? `border-2 ${cat.borderColor} shadow-lg ${cat.borderColor}/20 scale-105` : 'border-border'}`}
                                >
                                    <div className={`w-4 h-4 rounded-full ${cat.color} mb-2`}></div>
                                    <span className="font-bold">{cat.label}</span>
                                    <span className="text-xs text-muted-foreground">{cat.xp}</span>
                                </Card>
                            ))}
                        </div>
                    </div>
                    <Button onClick={handleRegisterFood} size="lg" className="w-full" disabled={!description || !selectedCategory}>
                        Registrar Refeição
                    </Button>
                </CardContent>
            </Card>

            <Card className="bg-card">
                 <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-lg text-accent'>
                        <TrafficCone className="w-5 h-5" />
                        Guia do Semáforo
                    </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-3">
                    {trafficLightGuide.map((item) => (
                        <div key={item.label} className="flex items-start gap-3">
                            <div className={`w-3 h-3 rounded-full ${item.color} mt-1 flex-shrink-0`}></div>
                            <div>
                                <h4 className="font-semibold">{item.label}</h4>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                        </div>
                    ))}
                 </CardContent>
            </Card>
        </div>
    );
}
