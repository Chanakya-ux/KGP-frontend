// src/components/kgptai/KgptAiChatModal.tsx
"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChatInput } from "@/components/chat/ChatInput"; // Reusing existing ChatInput
import { ChatWindow } from "@/components/chat/ChatWindow"; // Reusing existing ChatWindow
import type { ChatMessage } from "@/app/actions";
import { processUserMessage } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { APP_NAME } from "@/lib/constants";
import { X } from "lucide-react";

interface KgptAiChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function KgptAiChatModal({ isOpen, onClose }: KgptAiChatModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial-ai-greeting",
      role: "assistant",
      content: `Hello! I'm ${APP_NAME}, your AI assistant for IIT Kharagpur. How can I help with academic queries, campus info, or schedule reminders?`,
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
      // Add a system message indicating failure if desired
      // setMessages((prevMessages) => [...prevMessages, { id: 'error-' + Date.now().toString(), role: 'system', content: 'Sorry, I encountered an error. Please try again.'}]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleModalOpenChange}>
      <DialogContent className="sm:max-w-[90vw] md:max-w-[70vw] lg:max-w-[50vw] xl:max-w-[40vw] h-[80vh] flex flex-col p-0 gap-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="text-lg">{APP_NAME} AI Assistant</DialogTitle>
          <DialogDescription>
            Ask me anything about IIT Kharagpur!
          </DialogDescription>
          <DialogClose asChild>
            <Button variant="ghost" size="icon" className="absolute right-4 top-3">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogHeader>
        <div className="flex-grow overflow-hidden">
          <ChatWindow messages={messages} isLoading={isLoading} />
        </div>
        <div className="border-t p-0">
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
