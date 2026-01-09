
import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

export interface Recipe {
  id: string;
  title: string;
  description: string;
  prepTime: string;
  intensity: 1 | 2 | 3;
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
        intensity: 3,
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
        intensity: 2,
        image: findImage('tea-ice-summer'),
        ingredients: [
            '1 saquinho de chá verde ou 1 colher de chá de folhas',
            '240ml de água fria',
            'Rodelas de limão e folhas de hortelã fresca',
            'Gelo a gosto',
        ],
        preparation: [
            'Prepare o chá verde em água quente e deixe esfriar completamente.',
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
        intensity: 3,
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
        intensity: 2,
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
    },
    {
        id: 'hibisco-canela',
        title: 'Chá de Hibisco com Canela',
        description: 'Diurético e acelerador de metabolismo',
        prepTime: '7 minutos',
        intensity: 2,
        image: findImage('tea-hibiscus'),
        ingredients: [
            '1 colher de sopa de flores de hibisco secas',
            '1 pau de canela',
            '240ml de água',
            'Rodelas de limão a gosto (opcional)',
        ],
        preparation: [
            'Ferva a água com o pau de canela.',
            'Desligue o fogo e adicione as flores de hibisco.',
            'Tampe e deixe em infusão por 5-7 minutos.',
            'Coe e sirva quente ou gelado com rodelas de limão.',
        ],
        whyItWorks: 'O hibisco é conhecido por seu efeito diurético, ajudando a reduzir a retenção de líquidos. A canela acelera o metabolismo e melhora a sensibilidade à insulina.',
    },
    {
        id: 'gengibre-limao',
        title: 'Chá de Gengibre e Limão',
        description: 'Detox e anti-inflamatório',
        prepTime: '10 minutos',
        intensity: 3,
        image: findImage('tea-ginger'),
        ingredients: [
            '1 pedaço de 2-3 cm de gengibre fresco, fatiado',
            'Suco de 1/2 limão',
            '240ml de água',
            '1 colher de chá de mel ou stevia (opcional)',
        ],
        preparation: [
            'Ferva as fatias de gengibre na água por 5-10 minutos.',
            'Retire do fogo e coe o líquido para uma xícara.',
            'Adicione o suco de limão e adoce se desejar.',
            'Sirva imediatamente para aproveitar ao máximo suas propriedades.',
        ],
        whyItWorks: 'O gengibre é um poderoso termogênico e anti-inflamatório natural, enquanto o limão é rico em vitamina C e ajuda a alcalinizar o corpo, promovendo a desintoxicação.',
    },
    {
        id: 'camomila-digestivo',
        title: 'Chá de Camomila Digestivo',
        description: 'Relaxante e melhora a digestão',
        prepTime: '8 minutos',
        intensity: 1,
        image: findImage('tea-chamomile'),
        ingredients: [
            '1 colher de sopa de flores de camomila secas',
            '240ml de água quente (quase fervendo)',
            'Folhas de hortelã a gosto',
        ],
        preparation: [
            'Coloque as flores de camomila e as folhas de hortelã em uma xícara.',
            'Despeje a água quente sobre as flores.',
            'Deixe em infusão por 5-8 minutos.',
            'Coe e beba antes de dormir ou após as refeições.',
        ],
        whyItWorks: 'A camomila é conhecida por suas propriedades calmantes, que ajudam a reduzir o estresse (um fator ligado ao ganho de peso). A hortelã auxilia na digestão, prevenindo o inchaço.',
    },
    {
        id: 'cavalinha-diuretico',
        title: 'Chá de Cavalinha',
        description: 'Combate o inchaço e fortalece',
        prepTime: '15 minutos',
        intensity: 1,
        image: findImage('tea-herbal'),
        ingredients: [
            '1 colher de sopa de talos secos de cavalinha',
            '240ml de água',
        ],
        preparation: [
            'Ferva a cavalinha na água por 10 minutos.',
            'Desligue o fogo, tampe a panela e deixe descansar por mais 5 minutos.',
            'Coe bem antes de beber.',
            'Evite tomar por mais de uma semana seguida sem pausa.',
        ],
        whyItWorks: 'A cavalinha possui um forte efeito diurético, sendo uma das plantas mais eficazes para combater a retenção de líquidos e o inchaço. É rica em silício, que fortalece unhas e cabelos.',
    },
    {
        id: 'curcuma-laranja',
        title: 'Chá de Cúrcuma e Laranja',
        description: 'Anti-inflamatório e antioxidante',
        prepTime: '10 minutos',
        intensity: 2,
        image: findImage('tea-turmeric'),
        ingredients: [
            '1 colher de chá de cúrcuma (açafrão-da-terra) em pó',
            'Casca de 1/2 laranja',
            '240ml de água',
            'Uma pitada de pimenta preta (melhora a absorção)',
        ],
        preparation: [
            'Ferva a água com a casca da laranja.',
            'Desligue o fogo e adicione a cúrcuma e a pimenta preta.',
            'Misture bem e deixe em infusão por cerca de 5 minutos.',
            'Coe e sirva. Pode ser consumido quente ou frio.',
        ],
        whyItWorks: 'A curcumina, presente na cúrcuma, é um potente anti-inflamatório que ajuda a combater a inflamação crônica associada à obesidade. A casca de laranja adiciona um sabor cítrico e vitamina C.',
    },
    {
        id: 'mate-energizante',
        title: 'Chá Mate Energizante',
        description: 'Foco e energia para o treino',
        prepTime: '5 minutos',
        intensity: 3,
        image: findImage('tea-mate'),
        ingredients: [
            '1 colher de sopa de erva-mate tostada',
            '240ml de água quente (85°C)',
            'Gotas de limão ou laranja (opcional)',
        ],
        preparation: [
            'Coloque a erva-mate em um infusor.',
            'Despeje a água quente sobre a erva, sem ferver.',
            'Deixe em infusão por 3-5 minutos.',
            'Retire o infusor e adicione as gotas de limão, se desejar.',
        ],
        whyItWorks: 'O chá mate é rico em cafeína e teobromina, que fornecem energia sustentada e melhoram o foco mental. Acelera o metabolismo e pode suprimir o apetite, sendo um ótimo pré-treino.',
    },
    {
        id: 'gengibre-abacaxi',
        title: 'Chá de Gengibre com Abacaxi',
        description: 'Acelera o metabolismo e promove a saciedade',
        prepTime: '15 minutos',
        intensity: 3,
        image: findImage('tea-pineapple'),
        ingredients: [
            'Casca de ½ abacaxi',
            'Casca de 1 laranja',
            '1 colher de sopa de carqueja',
            '1 colher de sopa de gengibre em pó',
            '1 litro de água',
        ],
        preparation: [
            'Em uma chaleira ou panela, adicione a água, a casca de abacaxi, a casca de laranja e o gengibre.',
            'Leve ao fogo para ferver durante 5 a 10 minutos.',
            'Após ferver, desligue o fogo e adicione a carqueja.',
            'Tampe, deixe repousar por 5 minutos, coe e beba ao longo do dia.',
        ],
        whyItWorks: 'Este chá acelera o metabolismo, estimulando o gasto de energia, além de promover a saciedade e contribuir para o bom funcionamento do intestino por ser rico em fibras.',
    },
    {
        id: 'cha-verde-amora',
        title: 'Chá Verde com Amora',
        description: 'Diurético e termogênico para desinchar',
        prepTime: '10 minutos',
        intensity: 2,
        image: findImage('tea-blackberry'),
        ingredients: [
            '1 colher de chá de folhas secas de amora',
            '1 colher de chá de chá verde',
            '150ml de água fervente',
        ],
        preparation: [
            'Coloque as folhas secas da amora e do chá verde numa xícara.',
            'Adicione 150 ml de água fervente.',
            'Tapar, deixar repousar durante 10 minutos e coar antes de beber.',
        ],
        whyItWorks: 'Contém propriedades diuréticas e termogênicas, ajudando a desinchar a barriga e acelerar o metabolismo, facilitando a queima de calorias.',
    },
    {
        id: 'cha-mate-limao',
        title: 'Chá Mate com Limão',
        description: 'Aumenta a saciedade e queima gordura',
        prepTime: '10 minutos',
        intensity: 3,
        image: findImage('tea-mate-lemon'),
        ingredients: [
            '1 colher de sopa de folhas torradas de chá mate',
            'Suco de ½ limão',
            '150 ml de água fervente',
        ],
        preparation: [
            'Numa xícara, coloque as folhas do chá mate e a água fervente.',
            'Tampar e deixar repousar entre 5 a 10 minutos.',
            'Coar, adicionar o suco de limão e beber.',
        ],
        whyItWorks: 'Acelera o metabolismo e a queima de gordura, aumenta a sensação de saciedade e possui ação diurética, ajudando a diminuir o inchaço.',
    },
    {
        id: 'feno-grego-alcachofra',
        title: 'Chá de Feno Grego e Alcachofra',
        description: 'Aumenta a saciedade e a queima de gordura',
        prepTime: '15 minutos',
        intensity: 2,
        image: findImage('tea-artichoke'),
        ingredients: [
            '1 colher de chá de sementes de feno grego',
            '1 colher de chá (5 a 6g) de folhas secas de alcachofra',
            '1 litro de água',
        ],
        preparation: [
            'Ferva a água em uma panela.',
            'Apague o fogo, adicione as sementes e as folhas, tampe e deixe repousar por 5 a 10 minutos.',
            'Coe o chá, deixe amornar e beba até 3 xícaras por dia entre as refeições.',
        ],
        whyItWorks: 'Aumenta a sensação de saciedade, acelera o metabolismo para queimar gordura e tem ação diurética para diminuir a retenção de líquidos.',
    },
    {
        id: 'cha-preto-laranja',
        title: 'Chá Preto com Laranja e Canela',
        description: 'Ajuda a afinar a cintura',
        prepTime: '15 minutos',
        intensity: 2,
        image: findImage('tea-black-orange'),
        ingredients: [
            '2 colheres de chá de folhas secas de chá preto',
            'Cascas de 1/2 laranja',
            '1 canela em pau',
            '2 xícaras de água fervente',
        ],
        preparation: [
            'Em uma panela, coloque a canela e deixe em fogo médio por cerca de 5 minutos.',
            'Acrescente os demais ingredientes à água fervente e deixe repousar por 10 minutos.',
            'Coe e beba frio ou quente, de acordo com a preferência, cerca de 1 a 2 xícaras por dia.',
        ],
        whyItWorks: 'O chá preto é rico em flavonoides, compostos com propriedades antioxidantes que favorecem a perda de peso e ajudam a afinar a cintura quando consumido regularmente.',
    },
    {
        id: 'cha-dente-leao',
        title: 'Chá de Dente de Leão',
        description: 'Promove a perda de peso',
        prepTime: '10 minutos',
        intensity: 1,
        image: findImage('tea-dandelion'),
        ingredients: [
            '1 a 2 colheres de chá de dente de leão trituradas ou em pó',
            '200 ml de água',
        ],
        preparation: [
            'Colocar as raízes ou a folha de dente de leão na água fervida e deixar repousar por cerca de 10 minutos.',
            'Coar e beber morno cerca de 3 vezes ao dia.',
        ],
        whyItWorks: 'As raízes e folhas de dente de leão têm propriedades emagrecedoras que ajudam a promover a diminuição da quantidade de gorduras no organismo.',
    }
];


    
