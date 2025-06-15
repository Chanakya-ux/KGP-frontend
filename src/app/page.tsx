// src/app/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { NavDrawer } from "@/components/layout/NavDrawer";
import { QuoteCarousel } from "@/components/home/QuoteCarousel";
import { GuidanceGrid } from "@/components/home/GuidanceGrid";
import { KgptAiChatModal } from "@/components/kgptai/KgptAiChatModal";
import { ExtraChatSheet } from "@/components/extrachat/ExtraChatSheet";
import type { GuidanceButtonProps as ButtonData } from '@/lib/constants';
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster"; // Ensure Toaster is here for page-specific toasts

export default function KGPellenceStylePage() {
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);
  const [isKgptAiChatModalOpen, setIsKgptAiChatModalOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark'); // Default to dark theme
  const { toast } = useToast();

  useEffect(() => {
    // Apply theme class to HTML element
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const handleGuidanceButtonClick = (
    actionType: ButtonData['actionType'],
    actionValue?: string
  ) => {
    if (actionType === 'modal' && actionValue === 'kgptAiChat') {
      setIsKgptAiChatModalOpen(true);
    } else if (actionType === 'link' && actionValue) {
      window.open(actionValue, '_blank');
    } else {
      // Placeholder for other actions
      toast({
        title: "Feature Not Implemented",
        description: `The action for "${actionValue || 'this button'}" is not yet configured.`,
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-page transition-colors duration-300">
      <AppHeader 
        onMenuClick={() => setIsNavDrawerOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <NavDrawer isOpen={isNavDrawerOpen} onClose={() => setIsNavDrawerOpen(false)} />
      
      <main className="flex-grow">
        <QuoteCarousel />
        <GuidanceGrid onButtonClick={handleGuidanceButtonClick} />
      </main>

      <KgptAiChatModal 
        isOpen={isKgptAiChatModalOpen} 
        onClose={() => setIsKgptAiChatModalOpen(false)} 
      />
      
      <ExtraChatSheet />
      {/* Toaster is in RootLayout, but if you need page specific toasts, ensure it's available */}
      {/* <Toaster /> already in RootLayout */}
    </div>
  );
}
