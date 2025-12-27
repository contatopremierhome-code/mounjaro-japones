'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating personalized affirmations based on user progress.
 *
 * The flow analyzes user input related to daily activities and weight loss progress,
 * decides whether to provide motivational affirmations, and returns the affirmation.
 *
 * @exports {affirmationGenerator} - The main function to trigger the affirmation generation flow.
 * @exports {AffirmationGeneratorInput} - The input type for the affirmationGenerator function.
 * @exports {AffirmationGeneratorOutput} - The return type for the affirmationGenerator function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AffirmationGeneratorInputSchema = z.object({
  dailyRitualCompleted: z
    .boolean()
    .describe('Whether the user completed their daily ritual.'),
  'nutrition adherence': z
    .number()
    .min(0)
    .max(100)
    .describe('Percentage of nutrition goals achieved for the day.'),
  movementMinutes: z
    .number()
    .describe('Number of minutes spent on movement/exercise.'),
  weightChange: z
    .number()
    .describe('Change in weight (in kg) since the last check-in. Can be negative.'),
  personalDream: z.string().describe('The users personal dream or goal.'),
});

export type AffirmationGeneratorInput = z.infer<
  typeof AffirmationGeneratorInputSchema
>;

const AffirmationGeneratorOutputSchema = z.object({
  affirmation: z.string().describe('A personalized affirmation message.'),
  shouldSendAffirmation: z
    .boolean()
    .describe(
      'A flag indicating whether an affirmation should be sent to the user.'
    ),
});

export type AffirmationGeneratorOutput = z.infer<
  typeof AffirmationGeneratorOutputSchema
>;

export async function affirmationGenerator(
  input: AffirmationGeneratorInput
): Promise<AffirmationGeneratorOutput> {
  return affirmationGeneratorFlow(input);
}

const affirmationPrompt = ai.definePrompt({
  name: 'affirmationPrompt',
  input: {schema: AffirmationGeneratorInputSchema},
  output: {schema: AffirmationGeneratorOutputSchema},
  prompt: `You are a motivational coach specializing in weight loss. Analyze the user's progress based on the following data:

Daily Ritual Completed: {{dailyRitualCompleted}}
Nutrition Adherence: {{'nutrition adherence'}}%
Movement Minutes: {{movementMinutes}}
Weight Change: {{weightChange}} kg
Personal Dream: {{personalDream}}

Based on this information, determine if the user needs an affirmation to stay motivated. Consider these factors:
- If the user has shown good progress (positive weight change, high nutrition adherence, completed ritual and movement), offer strong encouragement.
- If the user has struggled (negative weight change, low nutrition adherence, missed ritual or movement), provide gentle support and strategies for improvement.
- Always relate the affirmation to their personal dream, reminding them why they started this journey.

Set the shouldSendAffirmation flag to true if an affirmation is needed, otherwise set it to false.

Compose a personalized affirmation message that is both encouraging and actionable. The affirmation should be short and to the point.

Example Affirmations:
- "Great job staying on track! Keep pushing towards your dream of {{personalDream}}!"
- "Every small step counts. Remember your dream of {{personalDream}} and keep moving forward."
- "You've got this! Stay strong, focused, and you will realize your dream of {{personalDream}}!"
`,
});

const affirmationGeneratorFlow = ai.defineFlow(
  {
    name: 'affirmationGeneratorFlow',
    inputSchema: AffirmationGeneratorInputSchema,
    outputSchema: AffirmationGeneratorOutputSchema,
  },
  async input => {
    const {
      dailyRitualCompleted,
      'nutrition adherence': nutritionAdherence,
      movementMinutes,
      weightChange,
      personalDream,
    } = input;

    let shouldSendAffirmation = false;

    // Determine if an affirmation is needed based on user progress.
    if (
      weightChange <= 0 ||
      nutritionAdherence < 70 ||
      !dailyRitualCompleted ||
      movementMinutes < 30
    ) {
      shouldSendAffirmation = true;
    } else if (
      weightChange > 0 &&
      nutritionAdherence >= 80 &&
      dailyRitualCompleted &&
      movementMinutes >= 45
    ) {
      // If the user has made very good progress.
      shouldSendAffirmation = true;
    }
    const {output} = await affirmationPrompt(input);
    return {
      ...output,
      shouldSendAffirmation,
    } as AffirmationGeneratorOutput;
  }
);
