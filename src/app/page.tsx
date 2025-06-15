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
import { MessageSquarePlus, Sun, Moon } from "lucide-react";

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial-greeting",
      role: "assistant",
      content: "Hello! I'm KGPT, your AI assistant for IIT Kharagpur. How can I help you today? You can ask about academics, campus information, or get schedule reminders.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark'); // Default to dark theme
  const { toast } = useToast();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [theme]);

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

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="flex flex-col h-screen bg-[hsl(var(--background-page))]">
      <header className="bg-primary text-primary-foreground p-3 shadow-md flex items-center justify-between print:hidden">
        <Logo />
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme} title="Toggle Theme" className="text-primary-foreground hover:bg-primary/80">
            {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
            <span className="sr-only">Toggle Theme</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={startNewChat} title="Start New Chat" className="text-primary-foreground hover:bg-primary/80">
            <MessageSquarePlus size={24} />
            <span className="sr-only">Start New Chat</span>
          </Button>
        </div>
      </header>
      <main className="flex-grow flex flex-col overflow-hidden">
        <ChatWindow messages={messages} isLoading={isLoading} />
      </main>
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}
