// src/components/home/QuoteCarousel.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { QUOTES } from '@/lib/constants';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function QuoteCarousel() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % QUOTES.length);
    }, 7000); // Change quote every 7 seconds
    return () => clearTimeout(timer);
  }, [currentQuoteIndex]);

  const goToPrevious = () => {
    setCurrentQuoteIndex((prevIndex) => (prevIndex - 1 + QUOTES.length) % QUOTES.length);
  };

  const goToNext = () => {
    setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % QUOTES.length);
  };
  
  if (!QUOTES || QUOTES.length === 0) {
    return null;
  }

  return (
    <section aria-label="Quote of the day" className="py-6 md:py-8 bg-background/70 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <Card className="shadow-lg border-border/50 rounded-xl overflow-hidden">
          <CardContent className="p-6 text-center min-h-[100px] flex flex-col justify-center items-center">
            <blockquote className="text-lg md:text-xl font-medium text-foreground">
              <p>"{QUOTES[currentQuoteIndex].text}"</p>
            </blockquote>
            {QUOTES[currentQuoteIndex].author && (
              <cite className="block text-sm text-muted-foreground mt-2">
                – {QUOTES[currentQuoteIndex].author}
              </cite>
            )}
          </CardContent>
        </Card>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={goToPrevious} 
          className="absolute left-0 top-1/2 -translate-y-1/2 transform ml-1 sm:ml-2 bg-background/50 hover:bg-accent hover:text-accent-foreground rounded-full h-8 w-8 sm:h-10 sm:w-10"
          aria-label="Previous quote"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={goToNext} 
          className="absolute right-0 top-1/2 -translate-y-1/2 transform mr-1 sm:mr-2 bg-background/50 hover:bg-accent hover:text-accent-foreground rounded-full h-8 w-8 sm:h-10 sm:w-10"
          aria-label="Next quote"
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </div>
    </section>
  );
}
