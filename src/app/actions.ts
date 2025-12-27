'use server';

import {
  affirmationGenerator,
  type AffirmationGeneratorInput,
  type AffirmationGeneratorOutput,
} from '@/ai/flows/affirmation-generator';

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
