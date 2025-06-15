// src/components/home/GuidanceButton.tsx
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { GuidanceButtonProps as ButtonData } from '@/lib/constants'; // Renamed for clarity
import { cn } from '@/lib/utils';

interface GuidanceButtonProps {
  buttonData: ButtonData;
  onClick: (actionType: ButtonData['actionType'], actionValue?: string) => void;
}

export function GuidanceButton({ buttonData, onClick }: GuidanceButtonProps) {
  const { label, icon: Icon, actionType, actionValue, bgColorClass, textColorClass } = buttonData;

  return (
    <Card 
      className={cn(
        "overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out",
        bgColorClass ? bgColorClass : 'bg-card'
      )}
    >
      <Button
        variant="ghost"
        className={cn(
          "w-full h-full p-0 focus:ring-2 focus:ring-ring focus:ring-offset-2",
          textColorClass ? textColorClass : 'text-card-foreground'
        )}
        onClick={() => onClick(actionType, actionValue)}
        aria-label={label}
      >
        <CardContent className="flex flex-col items-center justify-center p-4 space-y-2 aspect-square">
          <Icon size={32} className={cn("mb-1", textColorClass ? textColorClass : 'text-primary')} />
          <span className={cn("text-center text-sm font-medium", textColorClass ? textColorClass : 'text-card-foreground')}>
            {label}
          </span>
        </CardContent>
      </Button>
    </Card>
  );
}
