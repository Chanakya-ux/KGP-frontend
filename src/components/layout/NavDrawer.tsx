
// src/components/layout/NavDrawer.tsx
"use client";

import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { NAV_LINKS, APP_NAME } from '@/lib/constants';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import type { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Keep for nav links if needed

interface NavLink {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface NavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NavDrawer({ isOpen, onClose }: NavDrawerProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-[280px] bg-background p-0 text-foreground">
        <SheetHeader className="border-b p-4">
          <SheetTitle className="text-lg font-semibold">{APP_NAME} Menu</SheetTitle>
          {/* The default SheetClose button is part of SheetContent, no need for an extra one here */}
        </SheetHeader>
        <nav className="flex flex-col p-4 space-y-1">
          {NAV_LINKS.map((link: NavLink) => {
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
