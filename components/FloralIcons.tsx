import React from 'react';
import { motion as motionBase } from 'framer-motion';

const motion = motionBase as any;

export const AnimatedFloralPin = ({ className }: { className?: string }) => (
  <motion.svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="pinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#B0727B" />
        <stop offset="100%" stopColor="#D4AF37" />
      </linearGradient>
    </defs>
    {/* The Pin Body - Organic Shape */}
    <motion.path
      d="M12 21C12 21 19 14 19 9.5C19 5.63401 15.866 2.5 12 2.5C8.13401 2.5 5 5.63401 5 9.5C5 14 12 21 12 21Z"
      stroke="url(#pinGradient)"
      strokeWidth="1.2"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    />
    {/* Flower blooming inside the pin head */}
    <g transform="translate(12, 9.5)">
      {[0, 72, 144, 216, 288].map((angle, i) => (
        <motion.path
          key={angle}
          d="M0,0 C2,-4 5,-4 5,0 C5,4 2,4 0,0"
          fill="#B0727B"
          fillOpacity="0.4"
          initial={{ scale: 0, rotate: angle }}
          animate={{ scale: 1, rotate: angle + 360 }}
          transition={{ 
            scale: { delay: 1 + i * 0.1, duration: 0.8 },
            rotate: { delay: 1, duration: 20, repeat: Infinity, ease: "linear" }
          }}
        />
      ))}
      <motion.circle
        r="1.5"
        fill="#D4AF37"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5 }}
      />
    </g>
  </motion.svg>
);

export const AnimatedFloralCalendar = ({ className }: { className?: string }) => (
  <motion.svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.rect
      x="3" y="5" width="18" height="16" rx="3"
      stroke="#B0727B"
      strokeWidth="1.2"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.2 }}
    />
    <motion.path
      d="M3 10H21"
      stroke="#B0727B"
      strokeWidth="1"
      opacity="0.3"
      initial={{ x: -20 }}
      animate={{ x: 0 }}
    />
    {/* Aesthetic Sprout */}
    <motion.path
      d="M16 2C16 2 16 5 16 5M16 2C16 2 18 3 19 2M8 2C8 2 8 5 8 5M8 2C8 2 6 3 5 2"
      stroke="#D4AF37"
      strokeWidth="1.2"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ delay: 0.8, duration: 1 }}
    />
    <motion.circle
      cx="12" cy="15" r="2.5"
      fill="#B0727B"
      fillOpacity="0.2"
      stroke="#B0727B"
      strokeWidth="0.5"
      initial={{ scale: 0 }}
      animate={{ scale: [0, 1.2, 1] }}
      transition={{ delay: 1.2 }}
    />
  </motion.svg>
);

// BloomingFlowerIcon: A decorative animated flower used in section headers and cards.
export const BloomingFlowerIcon = ({ className }: { className?: string }) => (
  <motion.svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g transform="translate(12, 12)">
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <motion.path
          key={angle}
          d="M0,0 C2,-6 6,-6 6,0 C6,6 2,6 0,0"
          fill="currentColor"
          fillOpacity="0.4"
          initial={{ scale: 0, rotate: angle }}
          animate={{ scale: 1, rotate: angle + 360 }}
          transition={{ 
            scale: { delay: i * 0.1, duration: 1 },
            rotate: { duration: 15, repeat: Infinity, ease: "linear" }
          }}
        />
      ))}
      <motion.circle
        r="2"
        fill="currentColor"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6 }}
      />
    </g>
  </motion.svg>
);

export const PremiumBouquetIcon = ({ className, delay = 0 }: { className?: string, delay?: number }) => (
  <motion.svg
    viewBox="0 0 100 100"
    className={className}
    initial="hidden"
    animate="visible"
  >
    {/* Detailed Watercolor-style Rose */}
    <g transform="translate(50, 45)">
      <motion.path
        d="M-20,0 C-20,-30 20,-30 20,0 C20,30 -20,30 -20,0"
        fill="#FCE4EC"
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: { scale: 1, opacity: 0.6, transition: { delay, duration: 1.5 } }
        }}
      />
      {[0, 120, 240].map((angle, i) => (
        <motion.path
          key={angle}
          d="M0,0 C10,-15 25,-15 25,0 C25,15 10,15 0,0"
          fill="#F8BBD0"
          transform={`rotate(${angle})`}
          variants={{
            hidden: { scale: 0, rotate: angle - 30 },
            visible: { scale: 1, rotate: angle, transition: { delay: delay + 0.5 + i * 0.2, duration: 1 } }
          }}
        />
      ))}
      <motion.circle
        r="5"
        fill="#D4AF37"
        opacity="0.4"
        variants={{
          hidden: { scale: 0 },
          visible: { scale: 1, transition: { delay: delay + 1.2 } }
        }}
      />
    </g>
    {/* Leaves */}
    <motion.path
      d="M30,60 Q20,70 35,80 Q50,70 30,60"
      fill="#9EBD9E"
      opacity="0.5"
      variants={{
        hidden: { scale: 0, rotate: -45 },
        visible: { scale: 1, rotate: 0, transition: { delay: delay + 0.3 } }
      }}
    />
    <motion.path
      d="M70,60 Q80,70 65,80 Q50,70 70,60"
      fill="#9EBD9E"
      opacity="0.5"
      variants={{
        hidden: { scale: 0, rotate: 45 },
        visible: { scale: 1, rotate: 0, transition: { delay: delay + 0.4 } }
      }}
    />
  </motion.svg>
);