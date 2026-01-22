import React, { useState, useEffect } from 'react';
import { motion as motionBase } from 'framer-motion';
import { Clock, ExternalLink, Heart, CalendarPlus } from 'lucide-react';
import { WEDDING_DATE } from '../constants.tsx';
import { AnimatedFloralPin, AnimatedFloralCalendar, BloomingFlowerIcon } from './FloralIcons.tsx';

const motion = motionBase as any;

const Details: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = WEDDING_DATE.getTime() - now;
      if (distance < 0) return;
      
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const addToCalendar = () => {
    const event = {
      title: "Wedding: Praveen Kumar & Krithiga",
      start: "20260206T090000Z",
      end: "20260206T210000Z",
      location: "TamilArasi Mahal, Alangudi",
      description: "Join us for the wedding of Praveen and Krithiga!"
    };
    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start}/${event.end}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="text-center mb-16 relative">
        <BloomingFlowerIcon className="w-12 h-12 text-[#B0727B] mx-auto mb-4 opacity-40" />
        <h2 className="font-serif text-4xl text-[#B0727B] mb-8">The Grand Celebrations</h2>
        
        <div className="flex justify-center gap-4 md:gap-10 text-[#D4AF37] font-serif">
          {[
            { val: timeLeft.days, label: "Days" },
            { val: timeLeft.hours, label: "Hours" },
            { val: timeLeft.minutes, label: "Mins" },
            { val: timeLeft.seconds, label: "Secs" }
          ].map((item, i) => (
            <React.Fragment key={i}>
              <div className="text-center">
                <span className="text-4xl md:text-5xl block font-bold">{item.val}</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-sans mt-2 block">{item.label}</span>
              </div>
              {i < 3 && <span className="text-3xl mt-1 opacity-30 self-start hidden md:block">:</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Wedding Card */}
        <motion.div whileHover={{ y: -5 }} className="glass p-8 md:p-12 rounded-[40px] relative overflow-hidden group border-pink-100">
          <Heart className="absolute -top-4 -right-4 w-32 h-32 text-[#B0727B]/5 rotate-12 group-hover:scale-110 transition-transform" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-[#B0727B]/10 p-3 rounded-2xl">
                <AnimatedFloralCalendar className="w-8 h-8 text-[#B0727B]" />
              </div>
              <h3 className="font-serif text-3xl text-gray-800">The Wedding</h3>
            </div>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-[#B0727B]/40 mt-1" />
                <div>
                  <p className="font-bold text-gray-800 text-sm tracking-wide uppercase">Muhurtham</p>
                  <p className="text-[#B0727B] font-serif text-2xl mt-1">9:30 AM – 10:30 AM</p>
                  <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Feb 06, 2026 | Friday</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <AnimatedFloralPin className="w-6 h-6 text-[#B0727B]/40 mt-1" />
                <div>
                  <p className="font-bold text-gray-800 text-sm tracking-wide uppercase">TamilArasi Mahal</p>
                  <p className="text-sm text-gray-600 leading-relaxed mt-1">
                    Opposite to Alangudi Gurusthalam Temple Arch,<br/>
                    Alangudi, Thanjavur District.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <button 
                onClick={() => window.open('https://maps.app.goo.gl/NXha4QSb6fcMYCWe9', '_blank')}
                className="flex-1 bg-white border border-pink-50 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#B0727B] hover:bg-[#B0727B] hover:text-white transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                View on Maps <ExternalLink className="w-3 h-3" />
              </button>
              <button 
                onClick={addToCalendar}
                className="flex-1 bg-[#B0727B] text-white py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#965E66] transition-all flex items-center justify-center gap-2 shadow-md"
              >
                Add to Calendar <CalendarPlus className="w-3 h-3" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Reception Card */}
        <motion.div whileHover={{ y: -5 }} className="glass p-8 md:p-12 rounded-[40px] relative overflow-hidden group border-gold-100">
          <Heart className="absolute -top-4 -right-4 w-32 h-32 text-[#D4AF37]/5 -rotate-12 group-hover:scale-110 transition-transform" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-[#D4AF37]/10 p-3 rounded-2xl">
                <BloomingFlowerIcon className="w-8 h-8 text-[#D4AF37]" />
              </div>
              <h3 className="font-serif text-3xl text-gray-800">The Reception</h3>
            </div>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-[#D4AF37]/40 mt-1" />
                <div>
                  <p className="font-bold text-gray-800 text-sm tracking-wide uppercase">Evening</p>
                  <p className="text-[#D4AF37] font-serif text-2xl mt-1">05:00 PM Onwards</p>
                  <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Feb 06, 2026 | Same Day</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <AnimatedFloralPin className="w-6 h-6 text-[#D4AF37]/40 mt-1" />
                <div>
                  <p className="font-bold text-gray-800 text-sm tracking-wide uppercase">AISWARYAM MAHAL</p>
                  <p className="text-sm text-gray-600 leading-relaxed mt-1">
                    AISWARYAM MAHAL, 108, N Street(Vadakku Veethi)<br/>
                    Thirubuvanam,Thanjavur District.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <button 
                onClick={() => window.open('https://maps.app.goo.gl/wu4UMs2j9J5ZCqVU7', '_blank')}
                className="w-full bg-white border border-gray-100 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                Get Directions <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Details;
