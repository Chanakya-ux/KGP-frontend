// src/app/actions.ts
"use server";

import { academicQuestionAnswering } from "@/ai/flows/academic-question-answering";
import { getCampusInfo } from "@/ai/flows/campus-information-access";
import { generateScheduleReminders } from "@/ai/flows/schedule-reminder-generation";
import type { AcademicQuestionAnsweringInput } from "@/ai/flows/academic-question-answering";
import type { GetCampusInfoInput } from "@/ai/flows/campus-information-access";
import type { ScheduleRemindersInput } from "@/ai/flows/schedule-reminder-generation";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
}

const MOCK_SCHEDULE_JSON_STRING = JSON.stringify({
  classes: [
    { name: "CS101 Introduction to Programming", time: "Mon 9:00 AM", location: "Room V1" },
    { name: "MA202 Advanced Calculus", time: "Tue 11:00 AM", location: "Room M5" },
    { name: "PH101 Mechanics & Waves", time: "Wed 9:00 AM", location: "F116" },
    { name: "EE101 Basic Electrical Engineering", time: "Thu 2:00 PM", location: "Room E2" },
    { name: "CH101 Chemistry Lab", time: "Fri 10:00 AM", location: "Chem Lab 3" }
  ],
  exams: [
    { name: "CS101 Midterm", date: "2024-10-25", time: "9:00 AM" },
    { name: "MA202 Quiz 1", date: "2024-09-30", time: "11:00 AM"},
    { name: "PH101 Final", date: "2024-12-12", time: "2:00 PM" }
  ],
  assignments: [
    { name: "EE101 Assignment 3", dueDate: "2024-10-05"},
    { name: "CH101 Lab Report 2", dueDate: "2024-10-10"}
  ]
});

const MOCK_STUDENT_NAME = "KGPian";

export async function processUserMessage(userInput: string): Promise<ChatMessage> {
  const lowerInput = userInput.toLowerCase();

  try {
    if (lowerInput.includes("schedule") || lowerInput.includes("reminder") || lowerInput.includes("my classes") || lowerInput.includes("exam date") || lowerInput.includes("assignment due")) {
      const input: ScheduleRemindersInput = {
        schedule: MOCK_SCHEDULE_JSON_STRING,
        studentName: MOCK_STUDENT_NAME,
      };
      const result = await generateScheduleReminders(input);
      return { id: Date.now().toString(), role: "assistant", content: result.reminders };
    } else if (
        lowerInput.includes("explain") || 
        lowerInput.includes("what is") || 
        lowerInput.includes("who is professor") || 
        lowerInput.includes("tell me about course") ||
        lowerInput.includes("academic") ||
        lowerInput.startsWith("how to solve")
    ) {
      const input: AcademicQuestionAnsweringInput = { question: userInput };
      const result = await academicQuestionAnswering(input);
      return { id: Date.now().toString(), role: "assistant", content: result.answer };
    } else {
      const input: GetCampusInfoInput = { query: userInput };
      const result = await getCampusInfo(input);
      return { id: Date.now().toString(), role: "assistant", content: result.information };
    }
  } catch (error) {
    console.error("Error processing message with AI:", error);
    // It's better to throw the error and let the client side use toast for errors.
    // Or return a specific error message object if preferred.
    // For now, throwing will make it clearer on client to use toast.
    if (error instanceof Error) {
      throw new Error(`AI processing failed: ${error.message}`);
    }
    throw new Error("An unknown error occurred while processing your request with the AI.");
  }
}
