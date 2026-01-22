import React from 'react';
import { Phone, Coffee, Handshake, Heart } from 'lucide-react';
import { QuizQuestion } from './types';

export const COLORS = {
  rose: '#B0727B',
  gold: '#D4AF37',
  blush: '#FCE4EC',
  ivory: '#FFFDF9',
  accent: '#965E66'
};

export const TIMELINE_EVENTS = [
  {
    icon: <Phone className="w-5 h-5" />,
    title: "The First Call",
    description: "Our families connected through elders, sparking the beginning of a beautiful bond.",
    date: "Aug 2025"
  },
  {
    icon: <Coffee className="w-5 h-5" />,
    title: "First Encounter",
    description: "A warm meeting in Thiruvisanallur where we shared our first conversation and smiles.",
    date: "Sep 2025"
  },
  {
    icon: <Handshake className="w-5 h-5" />,
    title: "The Nitchayathartham",
    description: "With hearts full of joy and family blessings, our union was officially sealed.",
    date: "Sep 2025"
  },
  {
    icon: <Heart className="w-5 h-5" />,
    title: "The Big Day",
    description: "Starting our lifetime journey of togetherness and love.",
    date: "Feb 06, 2026"
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "First meeting-la diplomatic drink-aa serve pannadha enna?",
    options: ["Filter Coffee ☕", "Tea 🍵", "Boost", "cool drinks"],
    correctIndex: 0
  },
  {
    id: 2,
    question: "First 2 minutes-la enna sound dhaan adhigamaa irundhuchu?",
    options: ["Coffee spoon jing jing","Phone vibration", "Silence with smile 😁", "Gossips🤐"],
    correctIndex: 2
  },
  {
    id: 3,
    question: "Final confirmation eppadi vandhuchu?",
    options: ["Direct call", "Joint family meeting", "Parcel sweets arrival 🎉", "WhatsApp status update ❤️"],
    correctIndex: 1
  }
];

export const WEDDING_DATE = new Date('2026-02-06T09:00:00');
export const RECEPTION_DATE = new Date('2026-02-06T18:00:00');