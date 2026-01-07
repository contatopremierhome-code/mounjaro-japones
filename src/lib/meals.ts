import type { ImagePlaceholder } from './placeholder-images';

export interface Meal {
  id: string;
  mealType: 'Café da Manhã' | 'Almoço' | 'Jantar';
  title: string;
  description: string;
  image: ImagePlaceholder;
}

// Helper function to find an image or return a default
const findImage = (id: string, hint: string): ImagePlaceholder => {
    return { 
        id: id, 
        description: '', 
        imageUrl: `https://i.imgur.com/${id}.png`, 
        imageHint: hint 
    };
};

export const mealExamples: Meal[] = [
    // Café da Manhã
    {
        id: 'breakfast-1',
        mealType: 'Café da Manhã',
        title: 'Iogurte com Frutas',
        description: 'Iogurte natural, morangos, mirtilos e um punhado de granola sem açúcar.',
        image: findImage('wR4R32a', 'yogurt berries')
    },
    {
        id: 'breakfast-2',
        mealType: 'Café da Manhã',
        title: 'Ovos Mexidos com Abacate',
        description: 'Dois ovos mexidos com uma fatia de abacate e um toque de pimenta preta.',
        image: findImage('q9Q0B4O', 'scrambled eggs')
    },
    // Almoço
    {
        id: 'lunch-1',
        mealType: 'Almoço',
        title: 'Salada de Frango Grelhado',
        description: 'Frango grelhado, folhas verdes, tomate cereja, pepino e molho leve de limão.',
        image: findImage('CSpwMks', 'chicken salad')
    },
    {
        id: 'lunch-2',
        mealType: 'Almoço',
        title: 'Salmão com Brócolis',
        description: 'Filé de salmão grelhado servido com brócolis cozido no vapor e limão.',
        image: findImage('Oaqx4D6', 'salmon broccoli')
    },
    // Jantar
    {
        id: 'dinner-1',
        mealType: 'Jantar',
        title: 'Sopa de Legumes',
        description: 'Uma sopa quente e reconfortante com cenoura, abobrinha, aipo e espinafre.',
        image: findImage('9eUaJ3A', 'vegetable soup')
    },
    {
        id: 'dinner-2',
        mealType: 'Jantar',
        title: 'Omelete de Cogumelos',
        description: 'Omelete de dois ovos recheado com cogumelos frescos e espinafre.',
        image: findImage('0SjA2pU', 'mushroom omelette')
    }
];
