// src/components/extrachat/ExtraChatSheet.tsx
"use client";

import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  // SheetClose, // Removed as SheetContent provides a default
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ExtraChatWindow } from './ExtraChatMessageDisplay'; // Using the new component
import { ExtraChatInput } from './ExtraChatInput';
import type { ExtraChatMessage } from '@/lib/constants';
import { MOCK_EXTRA_CHAT_MESSAGES } from '@/lib/constants';
import { MessageSquarePlus } from 'lucide-react'; // Used MessageSquarePlus for FAB
import { useToast } from '@/hooks/use-toast';

export function ExtraChatSheet() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ExtraChatMessage[]>(MOCK_EXTRA_CHAT_MESSAGES);
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async (text: string) => {
    setIsSending(true);
    const newMessage: ExtraChatMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);

    // Simulate assistant response
    // TODO: Replace with actual Firebase/backend call
    setTimeout(() => {
      const assistantResponse: ExtraChatMessage = {
        id: Date.now().toString() + '-assistant',
        text: `You said: "${text}". This is a mock reply. Firestore integration is pending.`,
        sender: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantResponse]);
      setIsSending(false);
    }, 1500);
  };

  const handleFileUpload = () => {
    // Placeholder for file upload logic
    toast({
        title: "File Upload",
        description: "File upload functionality is not yet implemented.",
    });
  };

  return (
    <>
      <Button
        variant="default"
        size="lg"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-xl z-30 p-0"
        onClick={() => setIsOpen(true)}
        aria-label="Open ExtraChat"
      >
        <MessageSquarePlus size={28} className="text-primary-foreground" />
      </Button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          side="bottom"
          className="h-[90vh] sm:h-[85vh] w-full p-0 flex flex-col bg-background text-foreground rounded-t-2xl shadow-2xl"
          aria-describedby="extrachat-description"
        >
          <SheetHeader className="p-4 border-b flex flex-row items-center justify-between">
            <SheetTitle className="text-lg font-semibold">ExtraChat Assistant</SheetTitle>
            {/* The default SheetClose button from SheetContent will be used */}
          </SheetHeader>
          <div id="extrachat-description" className="sr-only">
            A chat window for general queries and campus life discussions.
          </div>
          
          <div className="flex-grow overflow-hidden">
            <ExtraChatWindow messages={messages} isLoading={isSending && messages[messages.length -1]?.sender === 'user'} />
          </div>
          
          <div className="border-t">
            <ExtraChatInput
              onSendMessage={handleSendMessage}
              onFileUpload={handleFileUpload}
              isSending={isSending}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
