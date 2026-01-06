'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { teaRecipes, type Recipe } from '@/lib/recipes';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Flame, Info, CheckCircle, X } from 'lucide-react';
import { Separator } from './ui/separator';

const IntensityIndicator = ({ level }: { level: 1 | 2 | 3 }) => (
    <div className="flex gap-1">
      {Array.from({ length: 3 }).map((_, i) => (
        <Flame
          key={i}
          className={`h-4 w-4 ${i < level ? 'text-destructive fill-destructive' : 'text-muted-foreground/30'}`}
        />
      ))}
    </div>
  );

export function Recipes() {
  const router = useRouter();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleClose = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <header className="flex items-center justify-between mb-8">
        <Button variant="ghost" onClick={() => router.back()} size="icon">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <div className="text-center">
          <h1 className="text-3xl font-bold font-headline text-primary">
            Receitas Mounjaro Japonês
          </h1>
          <p className="text-muted-foreground">
            10 variações poderosas para impulsionar seu metabolismo.
          </p>
        </div>
        <div className="w-10"></div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teaRecipes.map((recipe) => (
          <Card
            key={recipe.id}
            className="overflow-hidden cursor-pointer group transform transition-all duration-300 hover:scale-[1.02] hover:shadow-primary/20"
            onClick={() => handleRecipeClick(recipe)}
          >
            <div className="relative h-48 w-full">
              <Image
                src={recipe.image.imageUrl}
                alt={recipe.title}
                fill
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-300 group-hover:scale-110"
                data-ai-hint={recipe.image.imageHint}
              />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
               <div className="absolute top-3 right-3 bg-card/80 backdrop-blur-sm rounded-full p-2 flex gap-1">
                {Array.from({ length: recipe.intensity }).map((_, i) => (
                    <Flame key={i} className="h-4 w-4 text-destructive fill-destructive" />
                ))}
               </div>
            </div>
            <CardContent className="p-4 relative">
              <h2 className="text-xl font-bold text-primary mb-2">{recipe.title}</h2>
              <Badge variant="secondary" className="mb-3">{recipe.description}</Badge>
              <div className="flex items-center text-sm text-muted-foreground space-x-4">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{recipe.prepTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Flame className="h-4 w-4" />
                  <span>{recipe.xp}</span>
                </div>
              </div>
              <Button variant="link" className="p-0 mt-2 h-auto text-primary">Ver Receita Completa</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedRecipe} onOpenChange={(isOpen) => !isOpen && handleClose()}>
        <DialogContent className="max-w-2xl w-[95vw] p-0 border-primary/20">
            {selectedRecipe && (
                <div className='max-h-[90vh] overflow-y-auto'>
                <DialogHeader className="p-0">
                    <div className="relative h-64 w-full">
                        <Image 
                            src={selectedRecipe.image.imageUrl}
                            alt={selectedRecipe.title}
                            fill
                            style={{ objectFit: 'cover' }}
                            className="rounded-t-lg"
                            data-ai-hint={selectedRecipe.image.imageHint}
                        />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                         <DialogClose className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-1">
                            <X className="h-5 w-5" />
                        </DialogClose>
                    </div>
                    <div className="p-6">
                        <DialogTitle className="text-3xl font-headline text-primary mb-2">{selectedRecipe.title}</DialogTitle>
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    <span>{selectedRecipe.prepTime}</span>
                                </div>
                                <Badge>{selectedRecipe.description}</Badge>
                            </div>
                            <IntensityIndicator level={selectedRecipe.intensity} />
                        </div>
                    </div>
                </DialogHeader>
                
                <div className='px-6 pb-6'>
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-accent"><Flame className='h-5 w-5' />Ingredientes</h3>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            {selectedRecipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
                        </ul>
                    </div>
                    
                    <Separator className="my-6" />

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-accent"><CheckCircle className='h-5 w-5' />Preparação</h3>
                        <ol className="list-decimal list-inside space-y-3">
                            {selectedRecipe.preparation.map((step, i) => <li key={i}><span className="font-semibold text-foreground">Passo {i+1}: </span><span className='text-muted-foreground'>{step}</span></li>)}
                        </ol>
                    </div>

                    <Separator className="my-6" />

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-accent"><Info className='h-5 w-5' />Porquê funciona?</h3>
                        <p className="text-muted-foreground">{selectedRecipe.whyItWorks}</p>
                    </div>

                    <Button size="lg" className="w-full mt-4" onClick={handleClose}>
                        Marcar como Preparada
                    </Button>
                </div>
                </div>
            )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
