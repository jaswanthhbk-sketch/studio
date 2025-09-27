'use server';

/**
 * @fileOverview This file defines a Genkit flow for categorizing expenses.
 *
 * It uses AI to automatically categorize expenses based on the expense description.
 * The flow takes an expense description as input and returns the predicted category.
 *
 * @module ai/flows/categorize-expense
 *
 * @exports categorizeExpense - The main function to categorize an expense.
 * @exports CategorizeExpenseInput - The input type for the categorizeExpense function.
 * @exports CategorizeExpenseOutput - The output type for the categorizeExpense function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CategorizeExpenseInputSchema = z.object({
  description: z
    .string()
    .describe('The description of the expense, e.g. \'Lunch at The Italian Place\''),
});
export type CategorizeExpenseInput = z.infer<typeof CategorizeExpenseInputSchema>;

const CategorizeExpenseOutputSchema = z.object({
  category: z
    .string()
    .describe(
      'The predicted category of the expense. Must be one of: Food, Transportation, Entertainment, Utilities, Housing, Groceries, Shopping, Health, Travel, Education, Personal Care, Finance, Other.'
    ),
});
export type CategorizeExpenseOutput = z.infer<typeof CategorizeExpenseOutputSchema>;

export async function categorizeExpense(input: CategorizeExpenseInput): Promise<CategorizeExpenseOutput> {
  return categorizeExpenseFlow(input);
}

const categorizeExpensePrompt = ai.definePrompt({
  name: 'categorizeExpensePrompt',
  input: {schema: CategorizeExpenseInputSchema},
  output: {schema: CategorizeExpenseOutputSchema},
  prompt: `You are an expert financial advisor.

You will categorize user expenses into one of the following categories: Food, Transportation, Entertainment, Utilities, Housing, Groceries, Shopping, Health, Travel, Education, Personal Care, Finance, Other.

Given the following expense description, determine the most appropriate category:

Description: {{{description}}}

Return ONLY the category name.`,
});

const categorizeExpenseFlow = ai.defineFlow(
  {
    name: 'categorizeExpenseFlow',
    inputSchema: CategorizeExpenseInputSchema,
    outputSchema: CategorizeExpenseOutputSchema,
  },
  async input => {
    const {output} = await categorizeExpensePrompt(input);
    return output!;
  }
);
