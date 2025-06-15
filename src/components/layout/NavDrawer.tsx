// src/components/layout/NavDrawer.tsx
"use client";

import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription, // Added for completeness, if needed
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { NAV_LINKS, APP_NAME } from '@/lib/constants';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { X } from 'lucide-react'; // Import X for close button

interface NavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NavDrawer({ isOpen, onClose }: NavDrawerProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-[280px] bg-background p-0 text-foreground">
        <SheetHeader className="flex flex-row items-center justify-between border-b p-4">
          <SheetTitle className="text-lg font-semibold">{APP_NAME} Menu</SheetTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-muted-foreground">
            <X size={20} />
            <span className="sr-only">Close menu</span>
          </Button>
        </SheetHeader>
        <nav className="flex flex-col p-4 space-y-1">
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <Button
                key={link.label}
                variant="ghost"
                className="justify-start text-base"
                asChild
                onClick={onClose}
              >
                <Link href={link.href}>
                  <Icon className="mr-3 h-5 w-5" />
                  {link.label}
                </Link>
              </Button>
            );
          })}
        </nav>
        <Separator className="my-2" />
        <div className="p-4">
            <p className="text-xs text-muted-foreground">Version 1.0.0</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
