'use server';

import {
  affirmationGenerator,
  type AffirmationGeneratorInput,
  type AffirmationGeneratorOutput,
} from '@/ai/flows/affirmation-generator';
import {
  mealSuggestionGenerator,
  type MealSuggestionInput,
  type MealSuggestionOutput,
} from '@/ai/flows/meal-suggestion-generator';

export async function getAffirmation(
  input: AffirmationGeneratorInput
): Promise<AffirmationGeneratorOutput | null> {
  try {
    console.log('Generating affirmation with input:', input);
    const result = await affirmationGenerator(input);
    console.log('Affirmation result:', result);
    return result;
  } catch (error) {
    console.error('Error in getAffirmation server action:', error);
    return null;
  }
}

export async function getMealSuggestion(
  input: MealSuggestionInput
): Promise<MealSuggestionOutput | null> {
  try {
    const result = await mealSuggestionGenerator(input);
    return result;
  } catch (error) {
    console.error('Error in getMealSuggestion server action:', error);
    return null;
  }
}
