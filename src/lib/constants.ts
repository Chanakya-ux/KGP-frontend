// src/lib/constants.ts
import type { LucideIcon } from 'lucide-react';
import {
  GraduationCap,
  Users,
  Newspaper,
  Briefcase,
  ClipboardCheck,
  Brain,
  Building2,
  Library,
  Award,
  Dumbbell,
  University,
  Home,
  HeartPulse,
  Car,
  Bus,
  Sheet,
  MessageSquareHeart,
  FileText,
  Info,
  Scroll,
  Scale,
  Landmark,
  Video,
  Lightbulb,
  CalendarDays,
  Navigation,
} from 'lucide-react';

export const APP_NAME = "KGPT";

export const QUOTES = [
  {
    text: "Learning never exhausts the mind.",
    author: "Leonardo da Vinci",
  },
  {
    text: "The only source of knowledge is experience.",
    author: "Albert Einstein",
  },
  {
    text: "The beautiful thing about learning is that no one can take it away from you.",
    author: "B.B. King",
  },
  {
    text: "An investment in knowledge pays the best interest.",
    author: "Benjamin Franklin"
  }
];

export interface GuidanceButtonProps {
  id: string;
  label: string;
  icon: LucideIcon;
  actionType: 'modal' | 'link' | 'info'; // Add more as needed
  actionValue?: string; // For modal ID or link URL
  bgColorClass?: string; // Tailwind background color class
  textColorClass?: string; // Tailwind text color class
}

export const GUIDANCE_BUTTONS_DATA: GuidanceButtonProps[] = [
  { id: "academic_material", label: "Academic Material", icon: FileText, actionType: 'info', bgColorClass: 'bg-sky-600 hover:bg-sky-700', textColorClass: 'text-white' },
  { id: "peoples_chat", label: "People's Chat", icon: Users, actionType: 'info', bgColorClass: 'bg-teal-600 hover:bg-teal-700', textColorClass: 'text-white' },
  { id: "lost_found_news", label: "Lost & Found", icon: Newspaper, actionType: 'info', bgColorClass: 'bg-amber-600 hover:bg-amber-700', textColorClass: 'text-white' },
  { id: "internships_competitions", label: "Internships", icon: Briefcase, actionType: 'info', bgColorClass: 'bg-indigo-600 hover:bg-indigo-700', textColorClass: 'text-white' },
  { id: "cdc_guidance", label: "CDC Guidance", icon: ClipboardCheck, actionType: 'info', bgColorClass: 'bg-rose-600 hover:bg-rose-700', textColorClass: 'text-white' },
  { id: "kgpt_guidance", label: "KGPT AI Chat", icon: Brain, actionType: 'modal', actionValue: 'kgptAiChat', bgColorClass: 'bg-purple-600 hover:bg-purple-700', textColorClass: 'text-white' },
  { id: "society_info", label: "Society Info", icon: Building2, actionType: 'info', bgColorClass: 'bg-cyan-600 hover:bg-cyan-700', textColorClass: 'text-white' },
  { id: "department_info", label: "Department Info", icon: Library, actionType: 'info', bgColorClass: 'bg-lime-600 hover:bg-lime-700', textColorClass: 'text-white' },
  { id: "scholarship_info", label: "Scholarships", icon: Award, actionType: 'info', bgColorClass: 'bg-pink-600 hover:bg-pink-700', textColorClass: 'text-white' },
  { id: "gymkhana", label: "TSG", icon: Dumbbell, actionType: 'info', bgColorClass: 'bg-orange-600 hover:bg-orange-700', textColorClass: 'text-white' },
  { id: "institute_amenities", label: "Amenities", icon: Landmark, actionType: 'info', bgColorClass: 'bg-green-600 hover:bg-green-700', textColorClass: 'text-white' },
  { id: "hmc", label: "HMC", icon: Home, actionType: 'info', bgColorClass: 'bg-yellow-600 hover:bg-yellow-700', textColorClass: 'text-gray-800' },
  { id: "health_guidance", label: "Health Guidance", icon: HeartPulse, actionType: 'info', bgColorClass: 'bg-red-600 hover:bg-red-700', textColorClass: 'text-white' },
  { id: "toto_contact", label: "Toto Contact", icon: Car, actionType: 'info', bgColorClass: 'bg-blue-600 hover:bg-blue-700', textColorClass: 'text-white' },
  { id: "kgp_bus", label: "KGP Bus", icon: Bus, actionType: 'info', bgColorClass: 'bg-gray-600 hover:bg-gray-700', textColorClass: 'text-white' },
  { id: "event_updates", label: "Event Updates", icon: CalendarDays, actionType: 'info', bgColorClass: 'bg-fuchsia-600 hover:bg-fuchsia-700', textColorClass: 'text-white'},
];

export const NAV_LINKS = [
    { href: "#home", label: "Home", icon: Home },
    { href: "#profile", label: "Profile", icon: Users },
    { href: "#settings", label: "Settings", icon: Info }, // Replaced Cog with Info
    { href: "#help", label: "Help & Feedback", icon: MessageSquareHeart }, // Replaced HelpCircle with MessageSquareHeart
];

export interface ExtraChatMessage {
    id: string;
    text: string;
    sender: 'user' | 'assistant' | 'system';
    timestamp: Date;
    avatar?: string;
  }
  
export const MOCK_EXTRA_CHAT_MESSAGES: ExtraChatMessage[] = [
    {
      id: '1',
      text: 'Hello! How can I help you with non-academic queries or general campus life?',
      sender: 'assistant',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      avatar: '/path/to/assistant-avatar.png', 
    },
    {
      id: '2',
      text: 'Hi, I was wondering about the upcoming events this weekend.',
      sender: 'user',
      timestamp: new Date(Date.now() - 1000 * 60 * 3),
    },
    {
      id: '3',
      text: 'Sure! Spring Fest preparations are in full swing. There\'s also a guest lecture on AI ethics on Saturday. Would you like more details?',
      sender: 'assistant',
      timestamp: new Date(Date.now() - 1000 * 60 * 1),
      avatar: '/path/to/assistant-avatar.png',
    },
];
