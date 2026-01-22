import React, { useState, useEffect } from 'react';
import Hero from './components/Hero.tsx';
import Timeline from './components/Timeline.tsx';
import Blessings from './components/Blessings.tsx';
import Details from './components/Details.tsx';
import RSVP from './components/RSVP.tsx';
import Quiz from './components/Quiz.tsx';
import Guestbook from './components/Guestbook.tsx';
import MusicPlayer from './components/MusicPlayer.tsx';
import { motion as motionBase } from 'framer-motion';

const motion = motionBase as any;

const App: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen overflow-x-hidden selection:bg-[#B0727B]/20">
      <MusicPlayer />
      
      <main>
        {/* HERO SECTION */}
        <section id="hero">
          <Hero />
        </section>

        <div className="space-y-20 md:space-y-40 py-20 md:py-40">
          {/* TIMELINE */}
          <section className="scroll-mt-20">
            <Timeline />
          </section>

          {/* BLESSINGS */}
          <section className="px-4 scroll-mt-20">
            <Blessings />
          </section>

          {/* WEDDING DETAILS */}
          <section id="details" className="px-4 scroll-mt-20">
            <Details />
          </section>

          {/* FUN QUIZ */}
          <section className="px-4 bg-gradient-to-b from-transparent via-[#B0727B]/5 to-transparent py-10 scroll-mt-20">
            <Quiz />
          </section>

          {/* RSVP FORM */}
          <section className="px-4 scroll-mt-20">
            <RSVP />
          </section>

          {/* GUESTBOOK */}
          <section className="px-4 pb-20 scroll-mt-20">
            <Guestbook />
          </section>
        </div>

        {/* FOOTER */}
        <footer className="py-12 px-6 text-center border-t border-gray-100 bg-white/20 backdrop-blur-md">
          <p className="font-serif italic text-base text-gray-500 mb-2">With Love, Families of Praveen & Krithiga</p>
          <p className="text-[8px] uppercase tracking-[0.4em] text-[#B0727B] font-bold">Forever Begins Feb 2026</p>
          <div className="mt-6 opacity-20 flex justify-center gap-3">
             <div className="w-6 h-[0.5px] bg-[#B0727B]"></div>
             <div className="w-1 h-1 rounded-full bg-[#B0727B]"></div>
             <div className="w-6 h-[0.5px] bg-[#B0727B]"></div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;