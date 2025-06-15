// src/components/chat/ChatInput.tsx
"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { SendHorizonal } from "lucide-react";
import { cn } from "@/lib/utils";

const chatInputSchema = z.object({
  message: z.string().min(1, "Message cannot be empty."),
});

type ChatInputFormValues = z.infer<typeof chatInputSchema>;

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const form = useForm<ChatInputFormValues>({
    resolver: zodResolver(chatInputSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<ChatInputFormValues> = (data) => {
    if (isLoading) return;
    onSendMessage(data.message);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="sticky bottom-0 flex items-start space-x-2 border-t bg-[hsl(var(--background-page))] p-4 shadow- ऊपर"
        aria-label="Chat input form"
      >
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormControl>
                <Textarea
                  placeholder="Type your message..."
                  className="min-h-[50px] resize-none rounded-xl border-input bg-background shadow-sm focus-visible:ring-primary"
                  rows={1}
                  disabled={isLoading}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      if (form.getValues("message").trim()) {
                        form.handleSubmit(onSubmit)();
                      }
                    }
                  }}
                  {...field}
                  aria-label="Message input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          size="icon"
          className={cn("h-[50px] w-[50px] rounded-xl shrink-0", isLoading && "opacity-50 cursor-not-allowed")}
          disabled={isLoading}
          aria-label={isLoading ? "Sending message" : "Send message"}
        >
          {isLoading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-solid border-primary-foreground border-t-transparent" />
          ) : (
            <SendHorizonal size={24} />
          )}
        </Button>
      </form>
    </Form>
  );
}
