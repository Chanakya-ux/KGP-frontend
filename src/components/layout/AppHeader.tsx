// src/components/layout/AppHeader.tsx
"use client";

import React from 'react';
import { Menu, Bell, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';
import { APP_NAME } from '@/lib/constants';

interface AppHeaderProps {
  onMenuClick: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export function AppHeader({ onMenuClick, theme, onToggleTheme }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-primary text-primary-foreground shadow-md print:hidden">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="mr-2 text-primary-foreground hover:bg-primary/80 lg:hidden"
            aria-label="Open navigation menu"
          >
            <Menu size={24} />
          </Button>
          <Logo />
        </div>

        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggleTheme} 
            title="Toggle Theme"
            className="text-primary-foreground hover:bg-primary/80"
            aria-label={theme === 'dark' ? "Switch to light theme" : "Switch to dark theme"}
          >
            {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-primary-foreground hover:bg-primary/80"
            aria-label="Notifications"
          >
            <Bell size={22} />
            <span className="sr-only">View notifications</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
