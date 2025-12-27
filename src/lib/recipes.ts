import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

export interface Recipe {
  id: string;
  title: string;
  description: string;
  prepTime: string;
  xp: string;
  image: ImagePlaceholder;
  ingredients: string[];
  preparation: string[];
  whyItWorks: string;
}

const findImage = (id: string): ImagePlaceholder => {
    const img = PlaceHolderImages.find(p => p.id === id);
    if (!img) {
      return { id: 'error', description: '', imageUrl: 'https://placehold.co/600x400', imageHint: '' };
    }
    return img;
  };

export const teaRecipes: Recipe[] = [
    {
        id: 'matcha-cremoso',
        title: 'Té Verde Matcha Cremoso',
        description: 'Quema grasa x3 más rápido',
        prepTime: '5 minutos',
        xp: '+15 XP',
        image: findImage('tea-matcha'),
        ingredients: [
            '1 cucharadita de matcha en polvo de calidad',
            '240ml de agua caliente (80°C, no hirviendo)',
            '1 cucharadita de aceite de coco',
            'Stevia al gusto (opcional)',
            'Pizca de canela',
        ],
        preparation: [
            'Calienta el agua hasta que veas pequeñas burbujas (NO debe hervir, o el matcha se amargará).',
            'En una taza, coloca el matcha en polvo.',
            'Agrega 50ml del agua caliente y bate vigorosamente con un batidor de bambú (o tenedor) hasta crear espuma.',
            'Añade el resto del agua.',
            'Incorpora el aceite de coco (ayuda a la absorción de antioxidantes).',
            'Espolvorea canela encima.',
        ],
        whyItWorks: 'El matcha es rico en catequinas, que aceleran el metabolismo y la quema de grasa. El aceite de coco proporciona energía sostenida.',
    },
    {
        id: 'verde-helado-verano',
        title: 'Verde Helado de Verano',
        description: 'Hidratación + quema contínua en días calurosos',
        prepTime: '5 minutos',
        xp: '+15 XP',
        image: findImage('tea-ice-summer'),
        ingredients: [
            '1 bolsita de té verde o 1 cucharadita de hojas',
            '240ml de agua fría',
            'Rodajas de limón y hojas de menta fresca',
            'Hielo al gusto',
        ],
        preparation: [
            'Prepara el té verde en agua caliente y déjalo enfriar completamente.',
            'En un vaso grande, combina el té frío con abundante hielo.',
            'Agrega las rodajas de limón y las hojas de menta.',
            'Remueve bien y disfruta de una bebida refrescante y metabólica.',
        ],
        whyItWorks: 'El té verde frío mantiene sus propiedades quemagrasas, mientras que el limón y la menta añaden un efecto detox y refrescante, ideal para el verano.',
    },
    {
        id: 'chai-especiado',
        title: 'Chai Especiado Metabólico',
        description: 'Termogénesis extrema + control de glucosa',
        prepTime: '10 minutos',
        xp: '+15 XP',
        image: findImage('tea-chai'),
        ingredients: [
            '1 bolsita de té negro',
            '1/2 cucharadita de canela en polvo',
            '1/4 cucharadita de jengibre en polvo',
            'Pizca de cardamomo y clavo',
            '240ml de leche de almendras sin azúcar',
        ],
        preparation: [
            'En una cacerola pequeña, calienta la leche de almendras con todas las especias a fuego medio.',
            'Justo antes de que hierva, retira del fuego y añade la bolsita de té negro.',
            'Deja infusionar por 5 minutos.',
            'Cuela la mezcla si usaste especias enteras y sirve caliente.',
        ],
        whyItWorks: 'Las especias como la canela, el jengibre y el cardamomo son potentes termogénicos que elevan la temperatura corporal y aceleran el metabolismo. Además, la canela ayuda a regular los niveles de azúcar en sangre.',
    },
    {
        id: 'oolong-quema-noche',
        title: 'Oolong Quema-Noche',
        description: 'Quema grasa mientras duermes + digestión nocturna',
        prepTime: '5 minutos',
        xp: '+15 XP',
        image: findImage('tea-oolong'),
        ingredients: [
            '1 cucharadita de té Oolong de alta calidad',
            '240ml de agua caliente (90°C)',
            'Unas gotas de jugo de limón',
        ],
        preparation: [
            'Infusiona el té Oolong en agua caliente durante 3-5 minutos.',
            'Añade unas gotas de jugo de limón antes de beber.',
            'Tómalo 1-2 horas antes de dormir.',
        ],
        whyItWorks: 'El té Oolong aumenta el metabolismo lipídico, ayudando al cuerpo a utilizar la grasa almacenada como energía, incluso durante el sueño. El limón mejora la digestión nocturna.',
    }
];
