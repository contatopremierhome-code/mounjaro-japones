'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Leaf, UtensilsCrossed, Heart } from 'lucide-react';
import type { DailyProgress } from '@/lib/types';
import { useUser, useFirestore } from '@/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { format } from 'date-fns';


type Category = 'leve' | 'equilibrada' | 'conforto';

const categories = [
    { id: 'leve', label: 'Leve e Nutritiva', description: 'Pratos que nutrem o corpo e a alma.', icon: Leaf, progress: 100, color: 'text-green-400', borderColor: 'border-green-400/50' },
    { id: 'equilibrada', label: 'Equilibrada', description: 'Uma refeição completa e balanceada.', icon: UtensilsCrossed, progress: 60, color: 'text-yellow-400', borderColor: 'border-yellow-400/50' },
    { id: 'conforto', label: 'Conforto', description: 'Para momentos especiais, sem culpa.', icon: Heart, progress: 20, color: 'text-red-400', borderColor: 'border-red-400/50' },
] as const;


export function Nutrition() {
    const router = useRouter();
    const { user } = useUser();
    const firestore = useFirestore();
    const [description, setDescription] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleRegisterFood = async () => {
        if (!user || !firestore || !selectedCategory) return;
        setIsSubmitting(true);

        const today = format(new Date(), 'yyyy-MM-dd');
        const progressDocRef = doc(firestore, 'users', user.uid, 'progress', today);
        const selectedProgress = categories.find(c => c.id === selectedCategory)?.progress || 0;

        try {
            const docSnap = await getDoc(progressDocRef);
            const currentProgress = docSnap.exists() ? docSnap.data() as DailyProgress : { ritual: 0, nutrition: 0, movement: 0, dayFinished: false, date: today };

            const updatedProgress: DailyProgress = {
                ...currentProgress,
                nutrition: selectedProgress,
            };

            await setDoc(progressDocRef, updatedProgress, { merge: true });
            router.back();
        } catch (error) {
            console.error("Error updating nutrition progress: ", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto flex flex-col gap-8">
            <header className="flex items-center relative w-full justify-center mb-4">
                <Button variant="ghost" onClick={() => router.back()} size="icon" className="absolute left-0">
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <div className='text-center'>
                    <h1 className="text-3xl font-bold font-headline text-primary">
                        Registro de Nutrição
                    </h1>
                     <p className="text-muted-foreground max-w-md mx-auto mt-2">
                        A nutrição é um ato de carinho com seu corpo. Registre suas refeições com consciência, reconhecendo cada escolha como parte da sua jornada de bem-estar.
                    </p>
                </div>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle>Como você se nutriu hoje?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Textarea
                        placeholder="Descreva sua refeição... Ex: Salmão grelhado com legumes."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                    />

                    <div>
                        <label className="text-sm font-medium text-muted-foreground mb-4 block">Selecione o tipo de refeição que mais representa seu prato:</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {categories.map((cat) => {
                                const Icon = cat.icon;
                                return (
                                <Card
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id as Category)}
                                    className={`flex flex-col items-center justify-start text-center p-4 cursor-pointer transition-all duration-200 ${selectedCategory === cat.id ? `border-2 ${cat.borderColor} shadow-lg ${cat.borderColor}/20 scale-105` : 'border-border'}`}
                                >
                                    <Icon className={`w-10 h-10 mb-3 ${cat.color}`} />
                                    <h3 className={`font-bold text-lg ${cat.color}`}>{cat.label}</h3>
                                    <p className="text-xs text-muted-foreground mt-1 h-10">{cat.description}</p>
                                </Card>
                            )})}
                        </div>
                    </div>
                    <Button onClick={handleRegisterFood} size="lg" className="w-full" disabled={!description || !selectedCategory || isSubmitting}>
                        {isSubmitting ? 'Registrando...' : 'Registrar Refeição'}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
