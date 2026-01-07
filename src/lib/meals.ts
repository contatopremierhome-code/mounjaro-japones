'use client';
import type { ImagePlaceholder } from './placeholder-images';

export interface Meal {
  id: string;
  mealType: 'Café da Manhã' | 'Almoço' | 'Jantar' | 'Lanche';
  title: string;
  description: string;
  image: ImagePlaceholder;
  ingredients: string[];
  preparation: string[];
  whyItWorks: string;
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
        title: 'Ovos Mexidos com Espinafre',
        description: 'Proteína e fibras para começar o dia com saciedade.',
        image: findImage('FORtLtH', 'scrambled eggs'),
        ingredients: ['2 ovos', '1 punhado de espinafre fresco', '1 colher de chá de azeite', 'Sal e pimenta a gosto'],
        preparation: [
            'Aqueça o azeite em uma frigideira em fogo médio.',
            'Adicione o espinafre e refogue até murchar.',
            'Bata os ovos com sal e pimenta e despeje na frigideira.',
            'Mexa suavemente até os ovos atingirem a consistência desejada.'
        ],
        whyItWorks: 'Rico em proteínas, os ovos promovem uma sensação de saciedade prolongada, reduzindo a vontade de beliscar. O espinafre adiciona fibras e nutrientes com poucas calorias.'
    },
    {
        id: 'breakfast-2',
        mealType: 'Café da Manhã',
        title: 'Iogurte Grego com Frutas Vermelhas',
        description: 'Cremoso, rico em probióticos e antioxidantes.',
        image: findImage('gRBMFeJ', 'yogurt berries'),
        ingredients: ['1 pote de iogurte grego natural (sem açúcar)', '1/2 xícara de frutas vermelhas (morangos, mirtilos)', '1 colher de sopa de sementes de chia'],
        preparation: [
            'Em uma tigela, coloque o iogurte grego.',
            'Adicione as frutas vermelhas por cima.',
            'Polvilhe com as sementes de chia para um impulso de fibras.'
        ],
        whyItWorks: 'O iogurte grego é uma excelente fonte de proteína. As frutas vermelhas são ricas em antioxidantes e pobres em açúcar, enquanto a chia ajuda na digestão e na saciedade.'
    },
    {
        id: 'breakfast-3',
        mealType: 'Café da Manhã',
        title: 'Vitamina de Abacate com Linhaça',
        description: 'Gorduras boas e fibras para uma manhã cheia de energia.',
        image: findImage('DCi47cG', 'avocado smoothie'),
        ingredients: ['1/4 de abacate maduro', '200ml de água ou leite de amêndoas', '1 colher de sopa de farinha de linhaça', 'Adoçante a gosto (opcional)'],
        preparation: [
            'Bata todos os ingredientes no liquidificador até obter uma mistura homogênea.',
            'Sirva imediatamente.'
        ],
        whyItWorks: 'O abacate fornece gorduras monoinsaturadas saudáveis que aumentam a saciedade. A linhaça é uma potência de fibras, regulando o intestino e mantendo a fome sob controle.'
    },
    {
        id: 'breakfast-4',
        mealType: 'Café da Manhã',
        title: 'Crepioca com Queijo Cottage',
        description: 'Versátil, sem glúten e rica em proteína.',
        image: findImage('HPL5PlN', 'tapioca crepe'),
        ingredients: ['1 ovo', '2 colheres de sopa de goma de tapioca', '1 colher de sopa de queijo cottage', 'Sal a gosto'],
        preparation: [
            'Misture o ovo e a goma de tapioca com um garfo até ficar homogêneo.',
            'Despeje a mistura em uma frigideira antiaderente aquecida.',
            'Quando a massa firmar, espalhe o queijo cottage em uma metade e dobre.',
            'Deixe dourar levemente dos dois lados.'
        ],
        whyItWorks: 'Uma combinação de carboidrato de rápida absorção da tapioca com a proteína do ovo e do cottage, garantindo energia e saciedade sem pesar.'
    },
    {
        id: 'breakfast-5',
        mealType: 'Café da Manhã',
        title: 'Mingau de Aveia com Canela',
        description: 'Confortável, aquece e regula o açúcar no sangue.',
        image: findImage('g6Mcw0X', 'oatmeal cinnamon'),
        ingredients: ['3 colheres de sopa de aveia em flocos', '200ml de água ou leite de amêndoas', '1 colher de chá de canela em pó'],
        preparation: [
            'Em uma panela, cozinhe a aveia com a água/leite em fogo baixo, mexendo sempre.',
            'Quando atingir a consistência de mingau, desligue o fogo.',
            'Adicione a canela e misture bem.'
        ],
        whyItWorks: 'A aveia é rica em fibras solúveis que formam um gel no estômago, retardando a digestão e prolongando a saciedade. A canela ajuda a controlar os níveis de açúcar no sangue.'
    },
    {
        id: 'breakfast-6',
        mealType: 'Café da Manhã',
        title: 'Pão Integral com Pasta de Amendoim',
        description: 'Energia rápida e duradoura para uma manhã agitada.',
        image: findImage('hiULVp7', 'toast peanut'),
        ingredients: ['1 fatia de pão integral', '1 colher de sopa de pasta de amendoim integral (sem açúcar)'],
        preparation: [
            'Torre levemente a fatia de pão integral.',
            'Espalhe a pasta de amendoim sobre o pão torrado.'
        ],
        whyItWorks: 'A combinação do carboidrato complexo do pão integral com a proteína e gordura boa da pasta de amendoim oferece uma liberação de energia mais lenta e estável.'
    },
    // Almoço
    {
        id: 'lunch-1',
        mealType: 'Almoço',
        title: 'Salada de Frango Desfiado',
        description: 'Leve, proteica e cheia de frescor.',
        image: findImage('hx5TodG', 'chicken salad'),
        ingredients: ['100g de frango cozido e desfiado', 'Mix de folhas verdes à vontade', '1/2 tomate picado', '1/4 de pepino em rodelas', 'Molho: limão, azeite e sal'],
        preparation: [
            'Em um prato, faça uma "cama" com as folhas verdes.',
            'Distribua o frango desfiado, o tomate e o pepino sobre as folhas.',
            'Tempere com o molho na hora de servir.'
        ],
        whyItWorks: 'Uma refeição com baixa caloria e alta em proteína e fibras, o que garante saciedade com leveza. Ideal para não se sentir pesado(a) durante a tarde.'
    },
    {
        id: 'lunch-2',
        mealType: 'Almoço',
        title: 'Salmão Grelhado com Brócolis',
        description: 'Ômega-3 e fibras para a saúde do cérebro e do corpo.',
        image: findImage('Pp0sCM0', 'salmon broccoli'),
        ingredients: ['1 posta de salmão (aprox. 120g)', '1 xícara de brócolis cozido no vapor', 'Suco de 1/2 limão', 'Sal e pimenta a gosto'],
        preparation: [
            'Tempere o salmão com sal, pimenta e suco de limão.',
            'Grelhe em frigideira antiaderente por cerca de 4-5 minutos de cada lado.',
            'Sirva imediatamente com o brócolis cozido no vapor.'
        ],
        whyItWorks: 'O salmão é rico em ômega-3, uma gordura anti-inflamatória que auxilia no processo de emagrecimento. O brócolis é uma potência de fibras e nutrientes.'
    },
    {
        id: 'lunch-3',
        mealType: 'Almoço',
        title: 'Omelete de Legumes',
        description: 'Rápido, prático e cheio de nutrientes.',
        image: findImage('ulsOFpr', 'vegetable omelette'),
        ingredients: ['2 ovos', '1/4 de xícara de legumes picados (pimentão, cebola, cogumelos)', '1 fatia de queijo magro (opcional)', 'Sal e pimenta'],
        preparation: [
            'Refogue os legumes em uma frigideira antiaderente.',
            'Bata os ovos e despeje sobre os legumes.',
            'Quando a base estiver firme, adicione o queijo e dobre ao meio.',
            'Cozinhe até o ponto desejado.'
        ],
        whyItWorks: 'Uma forma inteligente de consumir proteínas (ovos) e uma variedade de vegetais, garantindo uma refeição completa, de baixo carboidrato e que sustenta.'
    },
    {
        id: 'lunch-4',
        mealType: 'Almoço',
        title: 'Frango com Batata Doce e Salada',
        description: 'A combinação clássica para energia e massa magra.',
        image: findImage('Eo86dTo', 'chicken sweet-potato'),
        ingredients: ['100g de filé de frango grelhado', '100g de batata doce cozida ou assada', 'Salada verde à vontade'],
        preparation: [
            'Grelhe o filé de frango temperado a gosto.',
            'Cozinhe ou asse a batata doce em rodelas.',
            'Monte o prato com o frango, a batata doce e uma porção generosa de salada.'
        ],
        whyItWorks: 'A batata doce é um carboidrato de baixo índice glicêmico, fornecendo energia sem picos de insulina. Combinada com a proteína magra do frango, é ideal para a recuperação muscular e saciedade.'
    },
    {
        id: 'lunch-5',
        mealType: 'Almoço',
        title: 'Escondidinho de Mandioquinha com Carne Moída',
        description: 'Sabor de comida caseira em uma versão saudável.',
        image: findImage('jnnM245', 'shepherds pie'),
        ingredients: ['150g de mandioquinha cozida e amassada', '100g de carne moída (patinho) refogada', '1 colher de sopa de requeijão light'],
        preparation: [
            'Misture a mandioquinha amassada com o requeijão para fazer um purê.',
            'Em um refratário pequeno, coloque a carne moída no fundo e cubra com o purê.',
            'Leve ao forno para gratinar ou ao micro-ondas para aquecer.'
        ],
        whyItWorks: 'Uma refeição completa que conforta. A mandioquinha é um carboidrato de fácil digestão, e a carne magra fornece a proteína necessária para a saciedade.'
    },
    {
        id: 'lunch-6',
        mealType: 'Almoço',
        title: 'Quibe de Quinoa com Salada',
        description: 'Opção vegetariana rica em proteína e fibras.',
        image: findImage('ZdlhCVN', 'quinoa kibe'),
        ingredients: ['1 xícara de quinoa cozida', '1/2 xícara de trigo para quibe hidratado', 'Hortelã, cebola e temperos a gosto', 'Salada de pepino e tomate para acompanhar'],
        preparation: [
            'Misture a quinoa, o trigo, a hortelã picada e os temperos.',
            'Modele os quibes e asse em forno médio até dourar.',
            'Sirva com a salada de pepino e tomate.'
        ],
        whyItWorks: 'A quinoa é uma das poucas fontes vegetais de proteína completa. Junto com as fibras do trigo e da salada, esta refeição promove saciedade e um excelente funcionamento intestinal.'
    },
    // Jantar
    {
        id: 'dinner-1',
        mealType: 'Jantar',
        title: 'Sopa Cremosa de Abóbora com Gengibre',
        description: 'Aconchegante, digestiva e com poucas calorias.',
        image: findImage('9eUaJ3A', 'vegetable soup'),
        ingredients: ['2 xícaras de abóbora cozida', '1 pedaço pequeno de gengibre ralado', 'Cebola e alho a gosto', 'Caldo de legumes caseiro (ou água)'],
        preparation: [
            'Refogue a cebola e o alho, adicione a abóbora e o gengibre.',
            'Cubra com o caldo e cozinhe até a abóbora ficar bem macia.',
            'Bata tudo no liquidificador até obter um creme.',
            'Ajuste o sal e sirva quente.'
        ],
        whyItWorks: 'Leve e de fácil digestão, ideal para a noite. A abóbora é rica em fibras e betacaroteno, e o gengibre tem efeito termogênico e anti-inflamatório, auxiliando o corpo durante o sono.'
    },
    {
        id: 'dinner-2',
        mealType: 'Jantar',
        title: 'Filé de Tilápia com Legumes Assados',
        description: 'Refeição leve, colorida e rica em nutrientes.',
        image: findImage('m9R1a2b', 'fish vegetables'),
        ingredients: ['1 filé de tilápia', '1/2 abobrinha em rodelas', '1/2 pimentão em tiras', 'Tomate cereja a gosto', 'Ervas finas, sal e azeite'],
        preparation: [
            'Em uma assadeira, disponha o filé de tilápia e os legumes.',
            'Tempere com sal, ervas finas e um fio de azeite.',
            'Asse em forno pré-aquecido a 180°C por cerca de 20 minutos.'
        ],
        whyItWorks: 'O peixe branco é uma fonte de proteína magra e de digestão rápida. Os legumes assados mantêm seus nutrientes e fibras, garantindo uma refeição completa e de baixo carboidrato para a noite.'
    },
    {
        id: 'dinner-3',
        mealType: 'Jantar',
        title: 'Salada Caprese Turbinada',
        description: 'Leve, fresca e com um toque de proteína.',
        image: findImage('uL3c4C5', 'caprese salad'),
        ingredients: ['1 tomate em rodelas', '2 fatias de muçarela de búfala', 'Folhas de manjericão fresco', '4 fatias de peito de peru light ou frango desfiado'],
        preparation: [
            'Intercale as rodelas de tomate, a muçarela e o peito de peru em um prato.',
            'Decore com as folhas de manjericão.',
            'Tempere com um fio de azeite e uma pitada de sal.'
        ],
        whyItWorks: 'Uma opção de jantar extremamente leve, sem carboidratos e com a proteína do queijo e do peru para garantir que você não sinta fome durante a noite.'
    },
    {
        id: 'dinner-4',
        mealType: 'Jantar',
        title: 'Caldo Verde Funcional',
        description: 'Sopa detox para limpar o organismo.',
        image: findImage('vN6d7F8', 'green soup'),
        ingredients: ['1 maço de couve picada', '1 chuchu cozido', '1/2 cebola', 'Caldo de legumes (ou água)', 'Sal e azeite'],
        preparation: [
            'Cozinhe o chuchu com a cebola no caldo.',
            'Bata no liquidificador com a couve crua (para manter os nutrientes).',
            'Aqueça levemente sem ferver, ajuste o sal e finalize com um fio de azeite.'
        ],
        whyItWorks: 'A couve é um superalimento detox, rico em fibras e antioxidantes. O chuchu dá a cremosidade sem adicionar calorias. Perfeito para uma limpeza interna no final do dia.'
    },
    {
        id: 'dinner-5',
        mealType: 'Jantar',
        title: 'Wrap de Alface com Carne Moída',
        description: 'Low-carb, crocante e cheio de sabor.',
        image: findImage('wP8g9T0', 'lettuce wrap'),
        ingredients: ['Folhas de alface americana (grandes e firmes)', '100g de carne moída refogada com temperos', 'Cenoura ralada e cebolinha para finalizar'],
        preparation: [
            'Use as folhas de alface como se fossem "pães" ou "tortillas".',
            'Recheie cada folha com a carne moída quente.',
            'Adicione a cenoura ralada e a cebolinha por cima.'
        ],
        whyItWorks: 'Substituir o pão ou a massa pela folha de alface reduz drasticamente os carboidratos da refeição, mantendo a crocância e o prazer de comer com as mãos.'
    },
    {
        id: 'dinner-6',
        mealType: 'Jantar',
        title: 'Cogumelos Salteados com Quinoa',
        description: 'Nutritivo, saboroso e amigo da digestão.',
        image: findImage('xQ1a2S3', 'mushroom quinoa'),
        ingredients: ['1 xícara de cogumelos fatiados (paris ou shitake)', '1/2 xícara de quinoa cozida', 'Alho picado e shoyu light a gosto'],
        preparation: [
            'Salteie o alho em uma frigideira com um fio de azeite.',
            'Adicione os cogumelos e refogue até dourarem.',
            'Incorpore a quinoa cozida e um pouco de shoyu para temperar.',
            'Sirva quente.'
        ],
        whyItWorks: 'Cogumelos são ricos em nutrientes e umami, trazendo sabor à refeição com poucas calorias. A quinoa complementa com proteína e fibras, ideal para uma ceia leve e nutritiva.'
    },
     // Lanches
    {
        id: 'snack-1',
        mealType: 'Lanche',
        title: 'Maçã com Canela',
        description: 'Doce natural que controla a vontade de açúcar.',
        image: findImage('yA3b4C5', 'apple cinnamon'),
        ingredients: ['1 maçã pequena', 'Canela em pó a gosto'],
        preparation: [
            'Fatie a maçã em rodelas finas.',
            'Polvilhe canela em pó por cima.',
            'Para uma versão quente, aqueça no micro-ondas por 1 minuto.'
        ],
        whyItWorks: 'A maçã é rica em fibras, promovendo saciedade. A canela ajuda a estabilizar os níveis de açúcar no sangue, combatendo a vontade de comer doces e o acúmulo de gordura.'
    },
    {
        id: 'snack-2',
        mealType: 'Lanche',
        title: 'Castanhas e Nozes',
        description: 'Um punhado de energia e gorduras boas.',
        image: findImage('zB5d6E7', 'nuts mix'),
        ingredients: ['1 punhado (aprox. 30g) de mix de castanhas e nozes sem sal'],
        preparation: [
            'Separe um punhado medido para não exagerar na quantidade.',
            'Consuma nos intervalos entre as refeições.'
        ],
        whyItWorks: 'As oleaginosas são ricas em gorduras saudáveis, proteínas e fibras. Elas fornecem energia de forma lenta e constante, mantendo a saciedade por mais tempo.'
    },
    {
        id: 'snack-3',
        mealType: 'Lanche',
        title: 'Ovos de Codorna Cozidos',
        description: 'Mini porção de proteína para matar a fome.',
        image: findImage('aC7f8G9', 'quail eggs'),
        ingredients: ['4-5 ovos de codorna cozidos', 'Uma pitada de sal e orégano'],
        preparation: [
            'Cozinhe os ovos de codorna por cerca de 5-7 minutos.',
            'Descasque e tempere com sal e orégano.'
        ],
        whyItWorks: 'Uma fonte pura de proteína em um pacote pequeno. A proteína é o macronutriente que mais gera saciedade, tornando este um lanche perfeito para segurar a fome até a próxima refeição.'
    },
    {
        id: 'snack-4',
        mealType: 'Lanche',
        title: 'Tomate Cereja com Queijo Cottage',
        description: 'Leve, refrescante e com baixo carboidrato.',
        image: findImage('bD9h0I1', 'cherry tomatoes'),
        ingredients: ['10 tomates cereja', '2 colheres de sopa de queijo cottage', 'Manjericão fresco a gosto'],
        preparation: [
            'Misture o queijo cottage com o manjericão picado.',
            'Sirva os tomates cereja com o cottage como um "dip".'
        ],
        whyItWorks: 'O tomate cereja é hidratante e cheio de vitaminas, com pouquíssimas calorias. O cottage adiciona uma dose de proteína de lenta absorção, mantendo o metabolismo ativo.'
    },
    {
        id: 'snack-5',
        mealType: 'Lanche',
        title: 'Palitos de Cenoura e Pepino',
        description: 'Crocante, hidratante e quase zero calorias.',
        image: findImage('cE2j3K4', 'vegetable sticks'),
        ingredients: ['1/2 cenoura em palitos', '1/2 pepino em palitos', 'Molho de iogurte (opcional)'],
        preparation: [
            'Corte a cenoura e o pepino em formato de palitos.',
            'Consuma puros ou com um molho leve de iogurte natural e ervas.'
        ],
        whyItWorks: 'Estes vegetais são ricos em água e fibras. Mastigá-los ajuda a "enganar" o cérebro, satisfazendo a vontade de comer algo crocante sem adicionar calorias significativas.'
    },
    {
        id: 'snack-6',
        mealType: 'Lanche',
        title: 'Chips de Couve',
        description: 'Um snack "salgadinho" cheio de nutrientes.',
        image: findImage('dF5l6M7', 'kale chips'),
        ingredients: ['Folhas de couve', 'Um fio de azeite', 'Sal e páprica a gosto'],
        preparation: [
            'Lave e seque bem as folhas de couve, rasgando-as em pedaços.',
            'Misture com um fio de azeite e os temperos.',
            'Asse em forno baixo (150°C) por cerca de 10-15 minutos, até ficarem crocantes.'
        ],
        whyItWorks: 'Satisfaz a vontade de comer algo salgado e crocante. A couve é um superalimento, rica em cálcio, ferro e vitaminas, e assada se torna um snack delicioso e sem culpa.'
    }
];

    