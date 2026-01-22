import React, { useMemo } from 'react';
import { motion as motionBase, useScroll, useTransform } from 'framer-motion';
import { Heart } from 'lucide-react';
import { AnimatedFloralPin, AnimatedFloralCalendar, PremiumBouquetIcon } from './FloralIcons.tsx';

const motion = motionBase as any;

const FloatingPetal = ({ delay, x, duration }: { delay: number; x: string; duration: number }) => (
  <motion.div
    initial={{ y: '-10vh', x, opacity: 0, rotate: 0, scale: 0.5 }}
    animate={{ 
      y: '110vh', 
      x: `calc(${x} + 80px)`,
      opacity: [0, 0.5, 0.5, 0],
      rotate: 360,
      scale: [0.5, 1, 1, 0.5]
    }}
    transition={{ duration, repeat: Infinity, delay, ease: "linear" }}
    className="absolute pointer-events-none z-0"
  >
    <div className="w-4 h-4 bg-pink-200/40 rounded-full blur-[1px]" style={{ borderRadius: '60% 40% 70% 30% / 70% 30% 70% 30%' }}></div>
  </motion.div>
);

const AestheticGrowth = ({ className, delay = 0, color = "#B0727B", type = "rose" }: { className?: string, delay?: number, color?: string, type?: "rose" | "buds" | "blossom" }) => {
  const isBuds = type === "buds";
  const isBlossom = type === "blossom";

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      className={`absolute pointer-events-none z-0 ${className}`}
    >
      <motion.svg 
        viewBox="0 0 100 100" 
        className="w-full h-full overflow-visible"
        animate={{ rotate: [-1, 1, -1] }}
        transition={{ duration: 5 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.path
          d={isBuds ? "M50,100 Q60,70 40,40 T50,0" : "M50,100 Q40,70 60,50 T70,10"}
          stroke={color}
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.25 }}
          transition={{ duration: 3.5, delay: delay, ease: "easeInOut" }}
        />

        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 }}
          transition={{ delay: delay + 1.8, duration: 1.2, type: "spring", damping: 12 }}
          className="origin-center"
          style={{ transformOrigin: isBuds ? '50% 0%' : '70% 10%' }}
        >
          {isBlossom ? (
            [0, 72, 144, 216, 288].map((a) => (
              <path
                key={a}
                d="M70,10 Q78,-2 86,10 Q78,22 70,10"
                fill="#FCE4EC"
                opacity="0.9"
                transform={`rotate(${a}, 70, 10)`}
              />
            ))
          ) : isBuds ? (
            [0, 120, 240].map((a) => (
              <circle key={a} cx={50 + Math.sin(a) * 3} cy={Math.cos(a) * 3} r="4" fill={color} opacity="0.6" />
            ))
          ) : (
            [0, 60, 120, 180, 240, 300].map((a) => (
              <path
                key={a}
                d="M70,10 Q75,-5 85,10 Q75,25 70,10"
                fill={color}
                opacity="0.8"
                transform={`rotate(${a}, 70, 10)`}
              />
            ))
          )}
          <motion.circle 
            cx={isBuds ? 50 : 70} cy={isBuds ? 0 : 10} r="2.5" fill="#D4AF37"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.g>

        {!isBuds && (
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 0.6, opacity: 0.5 }}
            transition={{ delay: delay + 2.5, duration: 1 }}
            style={{ transformOrigin: '45% 60%' }}
          >
             <circle cx="45" cy="60" r="8" fill={color} />
             <circle cx="45" cy="60" r="3" fill="#D4AF37" />
          </motion.g>
        )}

        <motion.path
          d="M52,75 Q30,65 40,55 Q50,65 52,75"
          fill="#9EBD9E"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.35 }}
          transition={{ delay: delay + 1.2, duration: 1.5 }}
        />
        <motion.path
          d="M60,40 Q80,30 70,20 Q60,30 60,40"
          fill="#9EBD9E"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 0.8, opacity: 0.3 }}
          transition={{ delay: delay + 1.5, duration: 1.5 }}
        />
      </motion.svg>
    </motion.div>
  );
};

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const petals = useMemo(() => [...Array(12)].map((_, i) => ({
    delay: i * 2,
    x: `${Math.random() * 100}%`,
    duration: 12 + Math.random() * 6
  })), []);

  const scrollToContent = () => {
    const el = document.getElementById('details');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative h-[100dvh] flex flex-col items-center justify-center overflow-hidden animate-gradient bg-gradient-to-br from-[#FFFDF9] via-[#FFF3F5] to-[#FDF5E6]">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] bg-gradient-to-tr from-[#B0727B]/5 via-transparent to-[#D4AF37]/5 blur-[100px]"
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {petals.map((p, i) => <FloatingPetal key={`p-${i}`} {...p} />)}
      </div>

      <motion.div
        style={{ y: y1, opacity }}
        className="text-center z-10 px-4 w-full max-w-2xl mx-auto relative flex flex-col items-center"
      >
        <div className="flex justify-center mb-6">
          <PremiumBouquetIcon className="w-16 h-16 text-[#B0727B]" delay={0.2} />
        </div>

        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-[#B0727B] tracking-[0.5em] uppercase text-[10px] font-black mb-12 drop-shadow-sm flex items-center justify-center gap-3 w-full"
        >
          <span className="w-8 h-[0.5px] bg-[#B0727B]/40"></span>
          ஸ்ரீ அங்காள பரமேஸ்வரி துணை
          <span className="w-8 h-[0.5px] bg-[#B0727B]/40"></span>
        </motion.p>
        
        <div className="mb-10 relative py-4 w-full">
          {/* MULTIPLE FLORAL GROWTHS ON SIDES */}
          <AestheticGrowth className="w-48 h-48 -left-16 -top-24 -rotate-12" delay={0.8} type="rose" />
          <AestheticGrowth className="w-40 h-40 -left-12 top-1/2 -translate-y-1/2 -rotate-45" delay={1.4} type="buds" color="#D4AF37" />
          <AestheticGrowth className="w-52 h-52 -left-20 -bottom-16 rotate-[150deg]" delay={2.0} type="blossom" color="#965E66" />

          <AestheticGrowth className="w-48 h-48 -right-16 -top-24 rotate-12 scale-x-[-1]" delay={1.1} type="rose" />
          <AestheticGrowth className="w-44 h-44 -right-12 top-1/2 -translate-y-1/2 rotate-45 scale-x-[-1]" delay={1.7} type="blossom" color="#B0727B" />
          <AestheticGrowth className="w-52 h-52 -right-20 -bottom-16 rotate-[20deg] scale-x-[-1]" delay={2.3} type="buds" color="#D4AF37" />

          <motion.div className="relative z-10 space-y-3">
            <motion.h1 
              className="font-serif text-6xl md:text-8xl text-gray-800 leading-tight relative px-4 tracking-tighter"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Praveen Kumar
              <motion.div 
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 4, repeat: Infinity, repeatDelay: 4, ease: "linear" }}
                className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-[-25deg] pointer-events-none"
              />
            </motion.h1>

            <motion.div
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 1.2, duration: 1.2 }}
               className="flex items-center justify-center gap-8 py-4"
            >
              <div className="h-[1px] w-16 md:w-20 bg-gradient-to-r from-transparent to-[#B0727B]/40"></div>
              <span className="font-script text-5xl md:text-7xl text-[#B0727B] drop-shadow-sm select-none">weds</span>
              <div className="h-[1px] w-16 md:w-20 bg-gradient-to-l from-transparent to-[#B0727B]/40"></div>
            </motion.div>

            <motion.h1 
              className="font-serif text-6xl md:text-8xl text-gray-800 leading-tight relative px-4 tracking-tighter"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Krithiga
              <motion.div 
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 4, repeat: Infinity, repeatDelay: 6, ease: "linear", delay: 1 }}
                className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-[-25deg] pointer-events-none"
              />
            </motion.h1>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8 }}
          className="mb-12 relative z-20 w-full"
        >
          <p className="font-serif italic text-2xl md:text-4xl text-gray-500/80 mb-4">are getting married</p>
          <div className="flex items-center justify-center gap-4 opacity-60">
            <div className="w-6 h-[0.5px] bg-[#B0727B]"></div>
            <p className="text-[#B0727B] tracking-[0.5em] uppercase text-[9px] md:text-[10px] font-black">
              With the blessings of our families
            </p>
            <div className="w-6 h-[0.5px] bg-[#B0727B]"></div>
          </div>
        </motion.div>

        {/* ALIGNED INFO BARS */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2 }}
          className="flex flex-col md:flex-row gap-4 md:gap-0 mb-10 items-center relative z-20 glass p-2 rounded-[3rem] shadow-2xl border-white/90 overflow-hidden"
        >
          <div className="flex items-center gap-5 px-8 md:px-10 py-4 min-w-[280px] md:min-w-0 justify-center group cursor-pointer transition-all hover:bg-white/30">
            <AnimatedFloralCalendar className="w-7 h-7 text-[#B0727B] transition-transform group-hover:rotate-6 flex-shrink-0" />
            <div className="text-left">
              <span className="block text-[12px] font-black tracking-[0.1em] uppercase text-gray-800">FEB 06, 2026</span>
              <span className="block text-[9px] text-gray-400 uppercase tracking-widest -mt-1 font-bold whitespace-nowrap">Friday Morning</span>
            </div>
          </div>
          
          <div className="hidden md:block w-[1px] h-10 bg-[#B0727B]/10 mx-2"></div>

          <div className="flex items-center gap-5 px-8 md:px-10 py-4 min-w-[280px] md:min-w-0 justify-center group cursor-pointer transition-all hover:bg-white/30">
            <AnimatedFloralPin className="w-7 h-7 text-[#B0727B] transition-transform group-hover:-translate-y-1 flex-shrink-0" />
            <div className="text-left">
              <span className="block text-[12px] font-black tracking-[0.1em] uppercase text-gray-800">ALANGUDI</span>
              <span className="block text-[9px] text-gray-400 uppercase tracking-widest -mt-1 font-bold whitespace-nowrap">TamilArasi Mahal</span>
            </div>
          </div>
        </motion.div>

        {/* PROPERLY ALIGNED VIEW INVITATION BUTTON */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.8 }}
          className="w-full flex justify-center z-20"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(176, 114, 123, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            onClick={scrollToContent}
            className="bg-[#B0727B] text-white px-16 py-6 rounded-full font-black tracking-[0.4em] shadow-2xl transition-all uppercase text-[11px] w-full max-w-[320px] relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center justify-center gap-4">
              View Invitation <Heart className="w-4 h-4" fill="currentColor" />
            </span>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-[#B0727B] via-[#C2858D] to-[#B0727B] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Decorative Border Frame */}
      <div className="absolute inset-6 md:inset-12 border-[1.5px] border-[#B0727B]/10 rounded-[5rem] pointer-events-none z-0"></div>
    </div>
  );
};

export default Hero;
