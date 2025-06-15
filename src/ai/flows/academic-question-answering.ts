// src/ai/flows/academic-question-answering.ts
'use server';

/**
 * @fileOverview Provides academic assistance to students by answering questions based on IIT Kharagpur's curriculum and resources.
 *
 * - academicQuestionAnswering - A function that answers academic questions.
 * - AcademicQuestionAnsweringInput - The input type for the academicQuestionAnswering function.
 * - AcademicQuestionAnsweringOutput - The return type for the academicQuestionAnswering function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AcademicQuestionAnsweringInputSchema = z.object({
  question: z.string().describe('The academic question to be answered.'),
});
export type AcademicQuestionAnsweringInput = z.infer<typeof AcademicQuestionAnsweringInputSchema>;

const AcademicQuestionAnsweringOutputSchema = z.object({
  answer: z.string().describe('The answer to the academic question.'),
});
export type AcademicQuestionAnsweringOutput = z.infer<typeof AcademicQuestionAnsweringOutputSchema>;

export async function academicQuestionAnswering(input: AcademicQuestionAnsweringInput): Promise<AcademicQuestionAnsweringOutput> {
  return academicQuestionAnsweringFlow(input);
}

const academicQuestionAnsweringPrompt = ai.definePrompt({
  name: 'academicQuestionAnsweringPrompt',
  input: {schema: AcademicQuestionAnsweringInputSchema},
  output: {schema: AcademicQuestionAnsweringOutputSchema},
  prompt: `You are an AI assistant for IIT Kharagpur students, specializing in answering academic questions.
  Use the provided context about IIT Kharagpur's curriculum and resources to answer the student's question accurately.
  If the question is not related to academics or IIT Kharagpur, please respond that you cannot answer the question.

  Question: {{{question}}}
  `, 
});

const academicQuestionAnsweringFlow = ai.defineFlow(
  {
    name: 'academicQuestionAnsweringFlow',
    inputSchema: AcademicQuestionAnsweringInputSchema,
    outputSchema: AcademicQuestionAnsweringOutputSchema,
  },
  async input => {
    const {output} = await academicQuestionAnsweringPrompt(input);
    return output!;
  }
);
