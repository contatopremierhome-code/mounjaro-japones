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
        title: 'Chá Verde Matcha Cremoso',
        description: 'Queima gordura 3x mais rápido',
        prepTime: '5 minutos',
        xp: '+15 XP',
        image: findImage('tea-matcha'),
        ingredients: [
            '1 colher de chá de matcha em pó de qualidade',
            '240ml de água quente (80°C, não fervente)',
            '1 colher de chá de óleo de coco',
            'Stevia a gosto (opcional)',
            'Uma pitada de canela',
        ],
        preparation: [
            'Aqueça a água até ver pequenas bolhas (NÃO deve ferver, ou o matcha ficará amargo).',
            'Em uma xícara, coloque o matcha em pó.',
            'Adicione 50ml da água quente e bata vigorosamente com um batedor de bambu (ou garfo) até criar espuma.',
            'Adicione o resto da água.',
            'Incorpore o óleo de coco (ajuda na absorção de antioxidantes).',
            'Polvilhe canela por cima.',
        ],
        whyItWorks: 'O matcha é rico em catequinas, que aceleram o metabolismo e a queima de gordura. O óleo de coco fornece energia sustentada.',
    },
    {
        id: 'verde-helado-verano',
        title: 'Chá Verde Gelado de Verão',
        description: 'Hidratação + queima contínua em dias quentes',
        prepTime: '5 minutos',
        xp: '+15 XP',
        image: findImage('tea-ice-summer'),
        ingredients: [
            '1 saquinho de chá verde ou 1 colher de chá de folhas',
            '240ml de água fria',
            'Rodelas de limão e folhas de hortelã fresca',
            'Gelo a gosto',
        ],
        preparation: [
            'Prepare o chá verde em água quente и deixe esfriar completamente.',
            'Em um copo grande, combine o chá frio com bastante gelo.',
            'Adicione as rodelas de limão e as folhas de hortelã.',
            'Mexa bem e desfrute de uma bebida refrescante e metabólica.',
        ],
        whyItWorks: 'O chá verde frio mantém suas propriedades de queima de gordura, enquanto o limão e a hortelã adicionam um efeito detox e refrescante, ideal para o verão.',
    },
    {
        id: 'chai-especiado',
        title: 'Chá Chai Especiado Metabólico',
        description: 'Termogênese extrema + controle de glicose',
        prepTime: '10 minutos',
        xp: '+15 XP',
        image: findImage('tea-chai'),
        ingredients: [
            '1 saquinho de chá preto',
            '1/2 colher de chá de canela em pó',
            '1/4 colher de chá de gengibre em pó',
            'Pitada de cardamomo e cravo',
            '240ml de leite de amêndoas sem açúcar',
        ],
        preparation: [
            'Em uma panela pequena, aqueça o leite de amêndoas com todas as especiarias em fogo médio.',
            'Pouco antes de ferver, retire do fogo e adicione o saquinho de chá preto.',
            'Deixe em infusão por 5 minutos.',
            'Coe a mistura se usou especiarias inteiras e sirva quente.',
        ],
        whyItWorks: 'Especiarias como canela, gengibre e cardamomo são potentes termogênicos que elevam a temperatura corporal e aceleram o metabolismo. Além disso, a canela ajuda a regular os níveis de açúcar no sangue.',
    },
    {
        id: 'oolong-quema-noche',
        title: 'Chá Oolong Queima-Noite',
        description: 'Queima gordura enquanto dorme + digestão noturna',
        prepTime: '5 minutos',
        xp: '+15 XP',
        image: findImage('tea-oolong'),
        ingredients: [
            '1 colher de chá de chá Oolong de alta qualidade',
            '240ml de água quente (90°C)',
            'Algumas gotas de suco de limão',
        ],
        preparation: [
            'Faça a infusão do chá Oolong em água quente por 3-5 minutos.',
            'Adicione algumas gotas de suco de limão antes de beber.',
            'Tome 1-2 horas antes de dormir.',
        ],
        whyItWorks: 'O chá Oolong aumenta o metabolismo lipídico, ajudando o corpo a usar a gordura armazenada como energia, mesmo durante o sono. O limão melhora a digestão noturna.',
    }
];
