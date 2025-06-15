// src/components/Logo.tsx
import { BrainCircuit } from "lucide-react"; // Example icon

export function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <BrainCircuit className="h-8 w-8 text-primary-foreground" />
      <span className="text-2xl font-bold font-headline text-primary-foreground">
        KGPT
      </span>
    </div>
  );
}
