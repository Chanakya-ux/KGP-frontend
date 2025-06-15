// src/components/chat/ChatWindow.tsx
"use client";

import type { ChatMessage as Message } from "@/app/actions";
import { ChatMessage } from "./ChatMessage";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useEffect, useRef } from "react";
import { Bot } from "lucide-react";

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
}

export function ChatWindow({ messages, isLoading }: ChatWindowProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);
  
  return (
    <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
      <div className="space-y-4 pb-4">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isLoading && messages[messages.length -1]?.role === 'user' && (
          <div className="flex items-end space-x-3 py-2 justify-start">
             <ChatMessage key="loading" message={{id: "loading", role: "assistant", content: "Thinking..."}} />
          </div>
        )}
      </div>
      <div ref={messagesEndRef} />
    </ScrollArea>
  );
}
