'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating schedule reminders.
 *
 * - generateScheduleReminders - A function that generates personalized schedule reminders for students.
 * - ScheduleRemindersInput - The input type for the generateScheduleReminders function.
 * - ScheduleRemindersOutput - The return type for the generateScheduleReminders function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ScheduleRemindersInputSchema = z.object({
  schedule: z
    .string()
    .describe(
      'The student schedule as a JSON string. Include class name, time, location, and exam dates.'
    ),
  studentName: z.string().describe('The name of the student.'),
});
export type ScheduleRemindersInput = z.infer<typeof ScheduleRemindersInputSchema>;

const ScheduleRemindersOutputSchema = z.object({
  reminders: z
    .string()
    .describe(
      'A list of personalized reminders for the student, including class times and exam dates.'
    ),
});
export type ScheduleRemindersOutput = z.infer<typeof ScheduleRemindersOutputSchema>;

export async function generateScheduleReminders(
  input: ScheduleRemindersInput
): Promise<ScheduleRemindersOutput> {
  return generateScheduleRemindersFlow(input);
}

const prompt = ai.definePrompt({
  name: 'scheduleRemindersPrompt',
  input: {schema: ScheduleRemindersInputSchema},
  output: {schema: ScheduleRemindersOutputSchema},
  prompt: `You are a helpful assistant that generates personalized reminders for students based on their schedule.

  Student Name: {{{studentName}}}
  Schedule: {{{schedule}}}

  Generate a list of reminders for the student, including class times and exam dates.
  Make sure that the output is easily readable.
  `,
});

const generateScheduleRemindersFlow = ai.defineFlow(
  {
    name: 'scheduleRemindersFlow',
    inputSchema: ScheduleRemindersInputSchema,
    outputSchema: ScheduleRemindersOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
