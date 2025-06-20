// src/app/actions.ts
"use server";


export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
}

const API_URL = process.env.KGPT_BACKEND_URL ?? "https://kgpt-1.onrender.com/query";

export async function processUserMessage(userInput: string): Promise<ChatMessage> {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: userInput }),
    });

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const data = await res.json();
    const answer = data?.answer ?? "No answer returned.";
    return { id: Date.now().toString(), role: "assistant", content: answer };
  } catch (error) {
    console.error("Error communicating with backend:", error);
    if (error instanceof Error) {
      throw new Error(`Backend request failed: ${error.message}`);
    }
    throw new Error("An unknown error occurred while contacting the backend.");
  }
}
