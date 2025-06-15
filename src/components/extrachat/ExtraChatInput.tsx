// src/components/extrachat/ExtraChatInput.tsx
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Paperclip, SendHorizonal, Mic } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExtraChatInputProps {
  onSendMessage: (message: string) => void;
  onFileUpload?: () => void; // Placeholder for file upload functionality
  isSending: boolean;
}

export function ExtraChatInput({ onSendMessage, onFileUpload, isSending }: ExtraChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (message.trim() && !isSending) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="sticky bottom-0 flex items-center space-x-2 border-t bg-background p-3 shadow-top z-10"
      aria-label="ExtraChat input form"
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="text-muted-foreground hover:text-primary shrink-0"
        onClick={onFileUpload}
        disabled={isSending}
        aria-label="Attach file"
      >
        <Paperclip size={22} />
      </Button>
      <Textarea
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="min-h-[48px] max-h-[120px] resize-none rounded-xl border-input bg-background shadow-sm focus-visible:ring-primary flex-grow"
        rows={1}
        disabled={isSending}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
        aria-label="Message input"
      />
      {message.trim() ? (
        <Button
          type="submit"
          size="icon"
          className={cn("h-[48px] w-[48px] rounded-full shrink-0 bg-primary hover:bg-primary/90", isSending && "opacity-50 cursor-not-allowed")}
          disabled={isSending}
          aria-label={isSending ? "Sending message" : "Send message"}
        >
          {isSending ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-solid border-primary-foreground border-t-transparent" />
          ) : (
            <SendHorizonal size={22} className="text-primary-foreground" />
          )}
        </Button>
      ) : (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-[48px] w-[48px] rounded-full text-muted-foreground hover:text-primary shrink-0"
          // onClick={onStartVoiceInput} // Placeholder for voice input
          disabled={isSending}
          aria-label="Record voice message"
        >
          <Mic size={22} />
        </Button>
      )}
    </form>
  );
}
