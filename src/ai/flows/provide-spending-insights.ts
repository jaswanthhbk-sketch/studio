// src/ai/flows/provide-spending-insights.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow that provides personalized spending insights and recommendations to users.
 *
 * - provideSpendingInsights - A function that orchestrates the process of generating spending insights.
 * - ProvideSpendingInsightsInput - The input type for the provideSpendingInsights function.
 * - ProvideSpendingInsightsOutput - The return type for the provideSpendingInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProvideSpendingInsightsInputSchema = z.object({
  historicalSpendingData: z.string().describe('Historical spending data of the user in JSON format.  Include category, amount, and date for each transaction.'),
  budgetGoals: z.string().describe('User-defined budget goals for each spending category in JSON format.'),
  incomeAmount: z.number().describe('User monthly income amount'),
});
export type ProvideSpendingInsightsInput = z.infer<typeof ProvideSpendingInsightsInputSchema>;

const ProvideSpendingInsightsOutputSchema = z.object({
  insights: z.string().describe('Personalized insights and recommendations for optimizing spending, based on historical data and budget goals.'),
});
export type ProvideSpendingInsightsOutput = z.infer<typeof ProvideSpendingInsightsOutputSchema>;

export async function provideSpendingInsights(input: ProvideSpendingInsightsInput): Promise<ProvideSpendingInsightsOutput> {
  return provideSpendingInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'provideSpendingInsightsPrompt',
  input: {
    schema: ProvideSpendingInsightsInputSchema,
  },
  output: {
    schema: ProvideSpendingInsightsOutputSchema,
  },
  prompt: `You are a personal finance advisor. Analyze the user's spending data and budget goals to provide personalized insights and recommendations.

  Here is the user's historical spending data:
  {{historicalSpendingData}}

  Here are the user's budget goals:
  {{budgetGoals}}

  Here is the user's income amount:
  {{incomeAmount}}

  Based on this information, provide actionable insights and recommendations to help the user optimize their spending and achieve their financial goals. Be concise and specific.
  Focus on areas where the user is overspending or can save money.`,
});

const provideSpendingInsightsFlow = ai.defineFlow(
  {
    name: 'provideSpendingInsightsFlow',
    inputSchema: ProvideSpendingInsightsInputSchema,
    outputSchema: ProvideSpendingInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
