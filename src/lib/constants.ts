
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
  },
  {
    text: "The mind is everything. What you think you become.",
    author: "Buddha"
  },
  {
    text: "Live as if you were to die tomorrow. Learn as if you were to live forever.",
    author: "Mahatma Gandhi"
  },
  {
    text: "Education is the most powerful weapon which you can use to change the world.",
    author: "Nelson Mandela"
  },
  {
    text: "The roots of education are bitter, but the fruit is sweet.",
    author: "Aristotle"
  },
  {
    text: "Develop a passion for learning. If you do, you will never cease to grow.",
    author: "Anthony J. D'Angelo"
  },
  {
    text: "Wisdom is not a product of schooling but of the lifelong attempt to acquire it.",
    author: "Albert Einstein"
  },
  {
    text: "Tell me and I forget. Teach me and I remember. Involve me and I learn.",
    author: "Benjamin Franklin"
  },
  {
    text: "The expert in anything was once a beginner.",
    author: "Helen Hayes"
  },
  {
    text: "Change is the end result of all true learning.",
    author: "Leo Buscaglia"
  },
  {
    text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
    author: "Dr. Seuss"
  },
  {
    text: "Success is no accident. It is hard work, perseverance, learning, studying, sacrifice and most of all, love of what you are doing or learning to do.",
    author: "Pelé"
  },
  {
    text: "A person who never made a mistake never tried anything new.",
    author: "Albert Einstein"
  },
  {
    text: "Learning is a treasure that will follow its owner everywhere.",
    author: "Chinese Proverb"
  },
  {
    text: "Education is not the filling of a pail, but the lighting of a fire.",
    author: "W.B. Yeats"
  },
  {
    text: "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.",
    author: "Brian Herbert"
  },
  {
    text: "Don’t let what you cannot do interfere with what you can do.",
    author: "John Wooden"
  },
  {
    text: "Knowledge is power. Information is liberating. Education is the premise of progress, in every society, in every family.",
    author: "Kofi Annan"
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  },
  {
    text: "Strive for progress, not perfection.",
    author: "Unknown"
  },
  {
    text: "You are never too old to set another goal or to dream a new dream.",
    author: "C.S. Lewis"
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt"
  },
  {
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius"
  },
  {
    text: "The important thing is not to stop questioning. Curiosity has its own reason for existing.",
    author: "Albert Einstein"
  },
  {
    text: "Learning is not attained by chance, it must be sought for with ardor and attended to with diligence.",
    author: "Abigail Adams"
  },
  {
    text: "Intellectual growth should commence at birth and cease only at death.",
    author: "Albert Einstein"
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

