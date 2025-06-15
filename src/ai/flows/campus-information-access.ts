'use server';

/**
 * @fileOverview Provides access to campus information for IIT Kharagpur students.
 *
 * - getCampusInfo - A function that retrieves campus information based on a query.
 * - GetCampusInfoInput - The input type for the getCampusInfo function.
 * - GetCampusInfoOutput - The return type for the getCampusInfo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetCampusInfoInputSchema = z.object({
  query: z.string().describe('The query for campus information, e.g., contact details for a department or directions to a building.'),
});
export type GetCampusInfoInput = z.infer<typeof GetCampusInfoInputSchema>;

const GetCampusInfoOutputSchema = z.object({
  information: z.string().describe('The retrieved campus information.'),
});
export type GetCampusInfoOutput = z.infer<typeof GetCampusInfoOutputSchema>;

export async function getCampusInfo(input: GetCampusInfoInput): Promise<GetCampusInfoOutput> {
  return getCampusInfoFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getCampusInfoPrompt',
  input: {schema: GetCampusInfoInputSchema},
  output: {schema: GetCampusInfoOutputSchema},
  prompt: `You are an AI assistant for IIT Kharagpur students.  Please respond to the following query with information about the campus:\n\nQuery: {{{query}}}`,
});

const getCampusInfoFlow = ai.defineFlow(
  {
    name: 'getCampusInfoFlow',
    inputSchema: GetCampusInfoInputSchema,
    outputSchema: GetCampusInfoOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
