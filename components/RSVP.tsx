import React, { useState } from 'react';
import { motion as motionBase } from 'framer-motion';
import { Send, CheckCircle2, MessageCircle } from 'lucide-react';
import { RSVPFormData } from '../types.ts';

const motion = motionBase as any;

const RSVP: React.FC = () => {
  const [form, setForm] = useState<RSVPFormData>({
    attendance: 'yes',
    side: 'groom',
    guests: 1,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

 const sendWhatsApp = () => {
  const groomPhone = "9597303603";   // Praveen
  const bridePhone = "6384814479";   // Krithiga (put real number here)

  const receiverPhone = form.side === "bride" ? bridePhone : groomPhone;

  const text = `*RSVP for Praveen & Krithiga Wedding*%0A%0A*Attending:* ${form.attendance.toUpperCase()}%0A*Side:* ${form.side.toUpperCase()}%0A*Guests:* ${form.guests}%0A*Wishes:* ${form.message || 'None'}`;

  const waUrl = `https://wa.me/${receiverPhone}?text=${text}`;
  window.open(waUrl, '_blank');
};


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate a brief loading state
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      sendWhatsApp();
    }, 1000);
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl mx-auto glass p-8 md:p-12 rounded-[40px] text-center shadow-xl border border-white/60 mx-4"
      >
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-100">
          <CheckCircle2 className="w-10 h-10 text-green-400" />
        </div>
        <h2 className="font-serif text-2xl text-gray-800 mb-3">RSVP Confirmed!</h2>
        <p className="text-gray-500 mb-8 font-serif italic">"Your blessings mean a lot to us!"</p>
        <div className="space-y-4">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">Opening WhatsApp for confirmation...</p>
          <button 
            onClick={() => setSubmitted(false)}
            className="text-[#B0727B] text-[10px] font-bold uppercase tracking-widest hover:opacity-70 transition-opacity"
          >
            Edit Response
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4">
      <div className="text-center mb-10">
        <h2 className="font-serif text-3xl text-gray-800 mb-3">Will You Join Us?</h2>
        <div className="w-12 h-[1px] bg-[#B0727B]/20 mx-auto mb-3"></div>
        <p className="text-gray-400 italic font-serif text-sm px-6">Your presence will double our joy</p>
      </div>

      <form onSubmit={handleSubmit} className="glass p-6 md:p-10 rounded-[40px] shadow-xl space-y-8 border border-white/60">
        <div className="space-y-4">
          <label className="text-[9px] uppercase tracking-widest text-gray-400 font-bold ml-2">Attending?</label>
          <div className="flex gap-2">
            {(['yes', 'no', 'maybe'] as const).map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setForm({ ...form, attendance: opt })}
                className={`flex-1 py-3 px-4 rounded-2xl text-[10px] font-bold tracking-widest uppercase transition-all duration-300 ${
                  form.attendance === opt 
                  ? 'bg-[#B0727B] text-white shadow-lg shadow-[#B0727B]/10 border-[#B0727B]' 
                  : 'bg-white/50 text-gray-500 hover:bg-white border-white/40'
                } border`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="text-[9px] uppercase tracking-widest text-gray-400 font-bold ml-2">Which side?</label>
            <div className="relative">
              <select
                value={form.side}
                onChange={(e) => setForm({ ...form, side: e.target.value as any })}
                className="w-full bg-white/50 border border-white/40 focus:border-[#B0727B]/20 rounded-2xl py-3 px-4 text-xs outline-none transition-all appearance-none text-gray-600 font-medium"
              >
                <option value="groom">Groom's Side</option>
                <option value="bride">Bride's Side</option>
                <option value="friend">Mutual Friend</option>
              </select>
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-[9px] uppercase tracking-widest text-gray-400 font-bold ml-2">Guests count</label>
            <input
              type="number"
              min="1"
              max="10"
              value={form.guests}
              onChange={(e) => setForm({ ...form, guests: parseInt(e.target.value) || 1 })}
              className="w-full bg-white/50 border border-white/40 focus:border-[#B0727B]/20 rounded-2xl py-3 px-4 text-xs outline-none transition-all text-gray-600 font-medium"
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[9px] uppercase tracking-widest text-gray-400 font-bold ml-2">Message for us</label>
          <textarea
            rows={3}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Wishing you both..."
            className="w-full bg-white/50 border border-white/40 focus:border-[#B0727B]/20 rounded-2xl py-4 px-5 text-xs outline-none transition-all resize-none text-gray-600 font-medium placeholder:text-gray-300"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-[#B0727B] text-white py-4 rounded-2xl font-bold tracking-widest uppercase text-[10px] flex items-center justify-center gap-3 transition-all shadow-lg active:scale-95 ${isSubmitting ? 'opacity-70' : ''}`}
        >
          {isSubmitting ? 'Confirming...' : (
            <>Send Blessings <MessageCircle className="w-4 h-4" /></>
          )}
        </button>
      </form>
    </div>
  );
};

export default RSVP;