import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Volume2, VolumeX, AlertCircle, RefreshCw } from 'lucide-react';
import { motion as motionBase, AnimatePresence } from 'framer-motion';

const motion = motionBase as any;

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Use the correct Cloudinary version v1738973160 (The previous v1768 was invalid)
  const musicUrl = "https://res.cloudinary.com/dyiugn2kx/video/upload/v1768974538/Idicha_Pacharasi_Official_Video_Song_Uthama_Puthiran_Dhanush_Genelia_frvx5b.mp3";

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleCanPlay = () => {
      setIsLoading(false);
      setError(false);
    };

    const handleError = (e: any) => {
      console.error("Audio error event:", e);
      setError(true);
      setIsLoading(false);
      setIsPlaying(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    // Reset error when component mounts or source changes
    setError(false);

    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = useCallback(async () => {
    if (!audioRef.current) return;
    
    setHasInteracted(true);
    setError(false);

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        setIsLoading(true);
        // Modern browsers require a user interaction to play audio. 
        // This function is called via onClick, satisfying that requirement.
        await audioRef.current.play();
        setIsPlaying(true);
        setIsLoading(false);
      } catch (err) {
        console.error("Playback failed:", err);
        setError(true);
        setIsPlaying(false);
        setIsLoading(false);
      }
    }
  }, [isPlaying]);

  const retryLoad = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      setError(false);
      setIsLoading(true);
      audioRef.current.load();
      // Wait a short duration for the buffer to start filling before trying to play
      setTimeout(() => {
        togglePlay();
      }, 300);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-3">
      <AnimatePresence>
        {!hasInteracted && !error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 10 }}
            className="glass px-4 py-2.5 rounded-2xl text-right pointer-events-none mb-1 shadow-2xl border-white/80"
          >
            <p className="text-[10px] font-black text-[#B0727B] uppercase tracking-[0.2em]">Music Ceremony</p>
            <p className="text-[8px] text-gray-400 mt-0.5 uppercase tracking-widest font-bold">Tap to Play Soundtrack</p>
          </motion.div>
        )}

        {error && (
          <motion.button
            onClick={retryLoad}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass px-3 py-2 rounded-xl flex items-center gap-2 border-red-100 shadow-xl active:scale-95 group bg-white/90"
          >
            <AlertCircle className="w-3.5 h-3.5 text-red-400 group-hover:rotate-12 transition-transform" />
            <span className="text-[9px] text-red-500 font-black uppercase tracking-widest whitespace-nowrap">Load Error - Tap to Retry</span>
          </motion.button>
        )}
      </AnimatePresence>

      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={togglePlay}
          className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${
            isPlaying ? 'bg-[#B0727B] text-white' : 'bg-white text-[#B0727B]'
          } border-4 border-white relative z-10 overflow-hidden group`}
        >
          {isLoading ? (
            <RefreshCw className="w-6 h-6 animate-spin opacity-50" />
          ) : isPlaying ? (
            <Volume2 className="w-6 h-6" />
          ) : (
            <VolumeX className="w-6 h-6" />
          )}
          
          <motion.div 
            className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </motion.button>

        {/* Ambient Pulsing Rings when playing */}
        <AnimatePresence>
          {isPlaying && !isLoading && (
            <>
              <motion.div 
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 1.8, opacity: 0 }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
                className="absolute inset-0 rounded-full border-2 border-[#B0727B] -z-10"
              />
              <motion.div 
                initial={{ scale: 1, opacity: 0.3 }}
                animate={{ scale: 2.2, opacity: 0 }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeOut", delay: 0.5 }}
                className="absolute inset-0 rounded-full border border-[#B0727B] -z-20"
              />
            </>
          )}
        </AnimatePresence>
      </div>

      <audio 
        ref={audioRef}
        src={musicUrl}
        loop
        preload="auto"
      />
    </div>
  );
};

export default MusicPlayer;