import React from 'react';
import { motion as motionBase } from 'framer-motion';
import { TIMELINE_EVENTS } from '../constants.tsx';

const motion = motionBase as any;

const Timeline: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="font-serif text-3xl md:text-4xl text-gray-800 mb-3">Our Journey</h2>
        <div className="w-12 h-[1px] bg-[#B0727B]/30 mx-auto mb-3"></div>
        <p className="text-gray-500 italic font-serif text-base">From family ties to forever</p>
      </div>

      <div className="relative">
        {/* Central Line - Only visible on desktop or modified for mobile */}
        <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 h-full w-[1px] bg-gradient-to-b from-[#B0727B]/5 via-[#B0727B]/20 to-[#B0727B]/5"></div>

        <div className="space-y-12">
          {TIMELINE_EVENTS.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -10 : 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`relative flex items-start gap-8 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'
              }`}
            >
              {/* Desktop Empty Space */}
              <div className="flex-1 hidden md:block"></div>
              
              {/* Icon Dot */}
              <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 z-10">
                <div className="w-10 h-10 rounded-full bg-white shadow-lg border border-pink-50 flex items-center justify-center text-[#B0727B]">
                  {event.icon}
                </div>
              </div>

              {/* Content Card */}
              <div className="flex-1 pl-12 md:pl-0">
                <div className={`glass p-6 md:p-8 rounded-3xl border border-white/60 shadow-sm ${
                  index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                }`}>
                  <span className="text-[#B0727B]/50 font-bold text-[8px] tracking-[0.2em] uppercase mb-2 block">{event.date}</span>
                  <h3 className="font-serif text-xl text-gray-800 mb-2">{event.title}</h3>
                  <p className="text-gray-600 text-xs leading-relaxed opacity-80">{event.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;