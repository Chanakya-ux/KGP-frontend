// src/app/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatWindow } from "@/components/chat/ChatWindow";
import type { ChatMessage } from "./actions";
import { processUserMessage } from "./actions";
import { Logo } from "@/components/Logo";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { MessageSquarePlus } from "lucide-react";

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial-greeting",
      role: "assistant",
      content: "Hello! I'm KGPT, your AI assistant for IIT Kharagpur. How can I help you today? You can ask about academics, campus information, or get schedule reminders.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim()) return;

    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
    };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setIsLoading(true);

    try {
      const assistantResponse = await processUserMessage(messageText);
      setMessages((prevMessages) => [...prevMessages, assistantResponse]);
    } catch (error) {
      console.error("Failed to get assistant response:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Could not connect to the assistant. Please try again.",
      });
      // Optionally add an error message to chat
      // setMessages((prevMessages) => [...prevMessages, { id: Date.now().toString(), role: 'system', content: 'Error: Could not get response.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const startNewChat = () => {
    setMessages([
      {
        id: "initial-greeting-new",
        role: "assistant",
        content: "New chat started! How can I assist you with IIT Kharagpur related queries?",
      },
    ]);
  };


  return (
    <div className="flex flex-col h-screen bg-[hsl(var(--background-page))]">
      <header className="bg-primary text-primary-foreground p-3 shadow-md flex items-center justify-between print:hidden">
        <Logo />
        <Button variant="ghost" size="icon" onClick={startNewChat} title="Start New Chat" className="text-primary-foreground hover:bg-primary/80">
          <MessageSquarePlus size={24} />
          <span className="sr-only">Start New Chat</span>
        </Button>
      </header>
      <main className="flex-grow flex flex-col overflow-hidden">
        <ChatWindow messages={messages} isLoading={isLoading} />
      </main>
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}
