'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating meal suggestions
 * based on the Mounjaro de Pobre principles.
 *
 * @exports {mealSuggestionGenerator} - The main function to trigger the meal suggestion flow.
 * @exports {MealSuggestionInput} - The input type for the mealSuggestionGenerator function.
 * @exports {MealSuggestionOutput} - The return type for the mealSuggestionGenerator function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const MealSuggestionInputSchema = z.object({
  mealType: z.enum(['Café da Manhã', 'Almoço', 'Jantar', 'Lanche']),
  userDream: z.string().describe('The user\'s personal dream or motivation.'),
});

export type MealSuggestionInput = z.infer<typeof MealSuggestionInputSchema>;

const MealSuggestionOutputSchema = z.object({
  mealName: z.string().describe('The creative name of the suggested meal.'),
  description: z.string().describe('A brief, appetizing description of the meal.'),
  ingredients: z.array(z.string()).describe('A list of ingredients for the meal.'),
  instructions: z.array(z.string()).describe('Step-by-step preparation instructions.'),
  whyItWorks: z.string().describe('An explanation of why this meal helps with weight loss and pairs well with the Mounjaro de Pobre tea.'),
});

export type MealSuggestionOutput = z.infer<typeof MealSuggestionOutputSchema>;

export async function mealSuggestionGenerator(
  input: MealSuggestionInput
): Promise<MealSuggestionOutput> {
  return mealSuggestionFlow(input);
}

const mealSuggestionPrompt = ai.definePrompt({
    name: 'mealSuggestionPrompt',
    input: { schema: MealSuggestionInputSchema },
    output: { schema: MealSuggestionOutputSchema },
    prompt: `Você é um chef e nutricionista especialista na filosofia Mounjaro de Pobre, que combina chás metabólicos com uma alimentação saudável para perda de peso.

Sua tarefa é criar uma sugestão de refeição inspiradora e detalhada para o usuário.

Tipo de Refeição Solicitada: {{mealType}}
O Sonho do Usuário: {{userDream}}

Princípios da Filosofia Mounjaro de Pobre:
- Foco em alimentos naturais e integrais.
- Priorizar proteínas magras, muitas fibras (vegetais, legumes) e gorduras saudáveis.
- Baixo teor de carboidratos processados e açúcares.
- As refeições devem ser leves, saborosas e fáceis de preparar.
- A refeição deve complementar os efeitos dos chás metabólicos, como o chá verde, hibisco e gengibre.

Instruções:
1. Crie um nome criativo e atraente para a refeição.
2. Escreva uma descrição curta e apetitosa.
3. Liste os ingredientes de forma clara.
4. Forneça instruções de preparo simples, passo a passo.
5. Em "whyItWorks", explique de forma motivacional como esta refeição ajuda na perda de peso e se alinha com a filosofia Mounjaro de Pobre, mencionando como ela potencializa os benefícios dos chás. Conecte a sugestão ao sonho do usuário.

Seja criativo e inspirador. A refeição deve parecer um presente, não uma obrigação.
`,
});

const mealSuggestionFlow = ai.defineFlow(
  {
    name: 'mealSuggestionFlow',
    inputSchema: MealSuggestionInputSchema,
    outputSchema: MealSuggestionOutputSchema,
  },
  async input => {
    const { output } = await mealSuggestionPrompt(input);
    return output!;
  }
);
