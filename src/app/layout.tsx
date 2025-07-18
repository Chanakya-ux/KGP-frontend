import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google'; // Import Inter font
import { Toaster } from "@/components/ui/toaster"; // Import Toaster
import { APP_NAME } from '@/lib/constants';


// Configure Inter font
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', // CSS variable for Inter font
});

export const metadata: Metadata = {
  title: APP_NAME,
  description: `AI Assistant and Campus Guide for IIT Kharagpur students - ${APP_NAME}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The 'dark' class is now managed dynamically by src/app/page.tsx or a theme provider
    <html lang="en" className={`${inter.variable}`}>
      <head>
        {/* Google Fonts links are kept as per guidelines, though Next/Font is used here for Inter */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
