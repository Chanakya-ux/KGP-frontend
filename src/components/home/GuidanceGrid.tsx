// src/components/home/GuidanceGrid.tsx
"use client";

import React from 'react';
import { GUIDANCE_BUTTONS_DATA } from '@/lib/constants';
import { GuidanceButton } from './GuidanceButton';
import type { GuidanceButtonProps as ButtonData } from '@/lib/constants';

interface GuidanceGridProps {
  onButtonClick: (actionType: ButtonData['actionType'], actionValue?: string) => void;
}

export function GuidanceGrid({ onButtonClick }: GuidanceGridProps) {
  return (
    <section aria-labelledby="guidance-title" className="py-6 md:py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="guidance-title" className="mb-6 text-2xl font-bold text-center text-foreground sm:text-3xl">
          PROPER GUIDANCE
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {GUIDANCE_BUTTONS_DATA.map((button) => (
            <GuidanceButton
              key={button.id}
              buttonData={button}
              onClick={onButtonClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
