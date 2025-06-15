// src/components/extrachat/ExtraChatMessageDisplay.tsx
"use client";

import React from 'react';
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Bot } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { ExtraChatMessage as MessageType } from '@/lib/constants'; // Using the new type

interface ExtraChatMessageDisplayProps {
  message: MessageType;
}

function formatTimestamp(date: Date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
}

export function ExtraChatMessageDisplay({ message }: ExtraChatMessageDisplayProps) {
  const isUser = message.sender === "user";
  const isAssistant = message.sender === "assistant";

  return (
    <div
      className={cn(
        "flex items-end w-full mb-3 animate-message-appear",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div className={cn("flex items-end max-w-[80%] sm:max-w-[70%]", isUser ? "flex-row-reverse" : "flex-row")}>
        {isAssistant && (
          <Avatar className="h-8 w-8 shrink-0 mr-2 self-start">
            {message.avatar ? <AvatarImage src={message.avatar} alt="Assistant" /> : null}
            <AvatarFallback className="bg-accent text-accent-foreground">
              <Bot size={18} />
            </AvatarFallback>
          </Avatar>
        )}
        <div
          className={cn(
            "p-3 rounded-2xl shadow-md",
            isUser
              ? "bg-primary text-primary-foreground rounded-br-none"
              : "bg-card text-card-foreground rounded-bl-none"
          )}
        >
          <p className="text-sm whitespace-pre-wrap break-words">
            {message.text}
          </p>
          <p className={cn(
            "text-xs mt-1",
            isUser ? "text-primary-foreground/70 text-right" : "text-muted-foreground text-left"
          )}>
            {formatTimestamp(message.timestamp)}
          </p>
        </div>
        {isUser && (
          <Avatar className="h-8 w-8 shrink-0 ml-2 self-start">
            {/* User avatar can be added here if available */}
            <AvatarFallback className="bg-secondary text-secondary-foreground">
              <User size={18} />
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    </div>
  );
}

interface ExtraChatWindowProps {
    messages: MessageType[];
    isLoading?: boolean; // Optional loading state for assistant replies
}
  
export function ExtraChatWindow({ messages, isLoading }: ExtraChatWindowProps) {
    const messagesEndRef = React.useRef<HTMLDivElement>(null);
  
    React.useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);
  
    return (
      <ScrollArea className="h-full w-full p-4">
        <div className="space-y-2 pb-4"> {/* Added pb-4 for bottom padding inside scroll */}
          {messages.map((msg) => (
            <ExtraChatMessageDisplay key={msg.id} message={msg} />
          ))}
          {isLoading && (
             <div className="flex items-end space-x-3 py-2 justify-start">
                <ExtraChatMessageDisplay 
                    key="loading" 
                    message={{
                        id: "loading", 
                        sender: "assistant", 
                        text: "Typing...",
                        timestamp: new Date()
                    }} 
                />
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </ScrollArea>
    );
}
