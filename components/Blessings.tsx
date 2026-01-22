
import React from 'react';
import { motion as motionBase } from 'framer-motion';

const motion = motionBase as any;

const Blessings: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-serif text-4xl text-gray-800 mb-4">With the Blessings of</h2>
        <div className="w-32 h-[1px] bg-[#D4AF37] mx-auto opacity-50"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Groom's Family */}
        <motion.div
          whileHover={{ y: -5 }}
          className="glass p-10 rounded-[40px] border border-pink-100 shadow-xl overflow-hidden relative group"
        >
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-pink-50 rounded-full blur-3xl opacity-60 group-hover:scale-110 transition-transform"></div>
          <h3 className="font-serif text-2xl text-[#880E4F] mb-8 border-b border-pink-50 pb-4">Groom's Family</h3>
          <div className="space-y-8">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold mb-1">Parents</p>
              <p className="text-xl font-serif text-gray-800">Mr. S. Shanmugavel Pillai</p>
              <p className="text-lg font-serif text-gray-700">& Mrs. Premavathi</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold mb-1">Family Members</p>
              <p className="text-sm text-gray-600">S. Kalaiselvi, S. Kavinkumar B.E., M.B.A.,<br/>Priyadarshini Kavinkumar B.E.</p>
            </div>
          </div>
        </motion.div>

        {/* Bride's Family */}
        <motion.div
          whileHover={{ y: -5 }}
          className="glass p-10 rounded-[40px] border border-blue-50 shadow-xl overflow-hidden relative group"
        >
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-60 group-hover:scale-110 transition-transform"></div>
          <h3 className="font-serif text-2xl text-[#880E4F] mb-8 border-b border-blue-50 pb-4">Bride's Family</h3>
          <div className="space-y-8">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold mb-1">Parents</p>
              <p className="text-xl font-serif text-gray-800">Mr. R. Muthukumar</p>
              <p className="text-lg font-serif text-gray-700">& Mrs. Jeyalakshmi</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold mb-1">Grand Parents</p>
              <p className="text-sm text-gray-600">Late Mr. & Mrs. R. Ramalingam Pillai</p>
              <p className="text-sm text-gray-600">Late Mr. & Mrs. R. Kathamuthu Pillai</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Blessings;
