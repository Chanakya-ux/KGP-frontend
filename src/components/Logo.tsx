// src/components/Logo.tsx
import { Landmark } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <Landmark className="h-8 w-8 text-primary-foreground" />
      <span className="text-2xl font-bold font-headline text-primary-foreground">
        KGPT
      </span>
    </div>
  );
}
