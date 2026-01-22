
import React, { useState, useEffect, useMemo } from 'react';
import { motion as motionBase, AnimatePresence } from 'framer-motion';
import { Heart, MessageSquareQuote, Radio, AlertTriangle, Settings } from 'lucide-react';
import { GuestWish } from '../types.ts';
import { initializeApp, getApp, getApps } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';

const motion = motionBase as any;

// FIREBASE CONFIGURATION
// Replace these placeholders with your actual Firebase project configuration from the Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyCpbdxtL4LeedofNJwy69h-QbFfEd5ZNDQ",
  authDomain: "praveen-weds-kerthiga.firebaseapp.com",
  projectId: "praveen-weds-kerthiga",
  storageBucket: "praveen-weds-kerthiga.firebasestorage.app",
  messagingSenderId: "842212050971",
  appId: "1:842212050971:web:7b121decebb6811861d0be",
  measurementId: "G-VDR85593TH"
};

// Check if we are still using placeholder values
const isConfigPlaceholder = firebaseConfig.apiKey === "YOUR_API_KEY" || firebaseConfig.projectId === "your-project-id";

// Initialize Firebase only once
let app;
let db;
if (!isConfigPlaceholder) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app);
  } catch (err) {
    console.error("Firebase Init Error:", err);
  }
}

const Guestbook: React.FC = () => {
  const [wishes, setWishes] = useState<GuestWish[]>([]);
  const [newName, setNewName] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  // Load wishes from Firestore in real-time
  useEffect(() => {
    if (isConfigPlaceholder || !db) return;

    const wishesRef = collection(db, 'wishes');
    const q = query(wishesRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedWishes = snapshot.docs.map(doc => {
        const data = doc.data();
        const ts = data.createdAt as Timestamp;
        const dateStr = ts ? ts.toDate().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }) : 'Just now';

        return {
          id: doc.id,
          name: data.name,
          message: data.message,
          timestamp: dateStr
        } as GuestWish;
      });
      setWishes(fetchedWishes);
      setIsLive(true);
      setConnectionError(null);
    }, (error) => {
      console.error("Firestore Error:", error);
      setIsLive(false);
      // Capture specific permission/config errors
      if (error.code === 'permission-denied') {
        setConnectionError("Firestore permission denied. Check your security rules and project status.");
      } else {
        setConnectionError("Unable to reach the blessings database. Using offline mode.");
      }
    });

    return () => unsubscribe();
  }, []);

  const addWish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newMessage.trim()) return;
    if (isConfigPlaceholder || !db) {
      alert("Please configure your Firebase credentials in Guestbook.tsx to enable posting.");
      return;
    }

    setIsPosting(true);
    
    try {
      await addDoc(collection(db, 'wishes'), {
        name: newName.trim(),
        message: newMessage.trim(),
        createdAt: serverTimestamp()
      });

      setNewName('');
      setNewMessage('');
    } catch (error: any) {
      console.error("Error adding wish:", error);
      alert(`Failed to post blessing: ${error.message || 'Check your connection'}`);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-2 mb-2">
          <h2 className="font-serif text-3xl text-gray-800">Guestbook</h2>
          {isLive && !isConfigPlaceholder && (
            <motion.div 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-full border border-green-100"
            >
              <Radio className="w-2.5 h-2.5 text-green-500" />
              <span className="text-[8px] font-black text-green-600 uppercase tracking-tighter">Live</span>
            </motion.div>
          )}
        </div>
        <div className="w-12 h-[1px] bg-[#B0727B]/20 mx-auto mb-3"></div>
        <p className="text-gray-400 text-sm italic font-serif">Leave your blessings for the couple</p>
      </div>

      <div className="flex flex-col gap-10">
        {/* DEVELOPER NOTICE IF PLACEHOLDERS ARE DETECTED */}
        {isConfigPlaceholder && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-amber-50 border border-amber-200 p-6 rounded-[24px] flex items-start gap-4 shadow-sm"
          >
            <Settings className="w-6 h-6 text-amber-500 mt-1 flex-shrink-0" />
            <div className="text-left">
              <h4 className="text-amber-800 font-bold text-xs uppercase tracking-wider mb-1">Setup Required</h4>
              <p className="text-amber-700 text-[11px] leading-relaxed">
                The Guestbook is using placeholder Firebase credentials. To enable real-time blessings, please:
                <br /><br />
                1. Create a project on <b>console.firebase.google.com</b>
                <br />2. Enable <b>Firestore Database</b>
                <br />3. Replace the <b>firebaseConfig</b> in <code className="bg-amber-100 px-1 rounded">Guestbook.tsx</code>
              </p>
            </div>
          </motion.div>
        )}

        {/* CONNECTION ERROR BANNER */}
        {connectionError && !isConfigPlaceholder && (
          <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-3">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <p className="text-red-600 text-[10px] font-bold uppercase tracking-tight">{connectionError}</p>
          </div>
        )}

        {/* Wish Form */}
        <div className={`glass p-6 md:p-8 rounded-[32px] shadow-sm border border-white/60 ${isConfigPlaceholder ? 'opacity-50 pointer-events-none grayscale' : ''}`}>
          <form onSubmit={addWish} className="space-y-4">
            <h3 className="font-serif text-lg mb-2 flex items-center gap-2 text-gray-700">
              <MessageSquareQuote className="w-4 h-4 text-[#B0727B]" />
              Write a wish
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full bg-white/40 border border-white/40 focus:border-[#B0727B]/20 rounded-xl py-3 px-4 text-xs outline-none transition-all placeholder:text-gray-300 font-medium"
                required
              />
              <textarea
                rows={3}
                placeholder="Your heartfelt words..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="w-full bg-white/40 border border-white/40 focus:border-[#B0727B]/20 rounded-2xl py-4 px-5 text-xs outline-none transition-all resize-none placeholder:text-gray-300 font-medium"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isPosting || isConfigPlaceholder}
              className={`w-full bg-[#B0727B] text-white py-4 rounded-xl font-bold tracking-[0.2em] text-[10px] uppercase hover:bg-[#965E66] transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg ${isPosting ? 'opacity-70' : ''}`}
            >
              {isPosting ? 'Posting...' : (
                <>Post Blessing <Heart className="w-3.5 h-3.5 fill-white" /></>
              )}
            </button>
          </form>
        </div>

        {/* Wishes Display */}
        <div className="space-y-4 max-h-[600px] overflow-y-auto no-scrollbar pr-1">
          <AnimatePresence initial={false}>
            {wishes.map((wish) => (
              <motion.div
                key={wish.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass p-6 rounded-2xl border border-white/40 relative group overflow-hidden"
              >
                <div className="absolute top-[-10px] right-[-10px] text-[#B0727B] opacity-5 pointer-events-none">
                  <Heart className="w-20 h-20 fill-current" />
                </div>
                <div className="flex justify-between items-start mb-3 relative z-10">
                  <div>
                    <p className="text-[12px] font-black text-gray-800 tracking-wide uppercase">{wish.name}</p>
                    <div className="w-6 h-[1.5px] bg-[#B0727B]/20 mt-1"></div>
                  </div>
                  <span className="text-[8px] uppercase tracking-[0.2em] text-gray-400 font-bold">{wish.timestamp}</span>
                </div>
                <p className="text-gray-600 text-xs leading-relaxed italic relative z-10 font-serif">"{wish.message}"</p>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {(wishes.length === 0 && !isPosting) && (
            <div className="text-center py-10 opacity-30">
              <p className="font-serif italic text-sm">
                {isConfigPlaceholder 
                  ? "Connect to Firebase to see global blessings." 
                  : "No wishes yet. Be the first to bless the couple!"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Guestbook;
