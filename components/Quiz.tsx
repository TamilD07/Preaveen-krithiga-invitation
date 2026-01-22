import React, { useState } from 'react';
import { motion as motionBase, AnimatePresence } from 'framer-motion';
import { QUIZ_QUESTIONS } from '../constants.tsx';
import confetti from 'canvas-confetti';

const motion = motionBase as any;

const Quiz: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleSelect = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    
    const isCorrect = idx === QUIZ_QUESTIONS[currentIdx].correctIndex;
    if (isCorrect) {
      setScore(s => s + 1);
    }

    setTimeout(() => {
      if (currentIdx < QUIZ_QUESTIONS.length - 1) {
        setCurrentIdx(c => c + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
        if (score + (isCorrect ? 1 : 0) === QUIZ_QUESTIONS.length) {
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#880E4F', '#D4AF37', '#FCE4EC']
          });
        }
      }
    }, 1200);
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="font-serif text-4xl text-[#880E4F] mb-2">Fun & Blessings Quiz</h2>
        <p className="text-gray-500 italic">How much do you know about our union?</p>
      </div>

      <div className="glass p-8 md:p-12 rounded-[50px] shadow-2xl min-h-[450px] flex flex-col justify-center border border-pink-50">
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="space-y-8"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#880E4F] bg-pink-50 px-3 py-1 rounded-full">
                  Question {currentIdx + 1} / {QUIZ_QUESTIONS.length}
                </span>
                <span className="text-[10px] font-medium text-gray-400">Current Score: {score}</span>
              </div>
              <h3 className="font-serif text-2xl text-gray-800 leading-snug">
                {QUIZ_QUESTIONS[currentIdx].question}
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {QUIZ_QUESTIONS[currentIdx].options.map((option, idx) => {
                  const isCorrect = idx === QUIZ_QUESTIONS[currentIdx].correctIndex;
                  const isSelected = selectedOption === idx;
                  let stateStyle = "bg-white/80 hover:bg-pink-50 border-transparent text-gray-700";
                  if (selectedOption !== null) {
                    if (isCorrect) stateStyle = "bg-green-100 border-green-300 text-green-800";
                    else if (isSelected) stateStyle = "bg-red-100 border-red-300 text-red-800";
                    else stateStyle = "bg-white/40 opacity-50 border-transparent text-gray-400";
                  }
                  return (
                    <motion.button
                      key={idx}
                      whileHover={selectedOption === null ? { scale: 1.02 } : {}}
                      whileTap={selectedOption === null ? { scale: 0.98 } : {}}
                      onClick={() => handleSelect(idx)}
                      disabled={selectedOption !== null}
                      className={`w-full text-left p-5 rounded-3xl text-sm font-medium border-2 transition-all duration-300 ${stateStyle} shadow-sm`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{option}</span>
                        {selectedOption !== null && isCorrect && <span className="text-lg">✨</span>}
                        {selectedOption !== null && isSelected && !isCorrect && <span className="text-lg">🙏</span>}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <div className="text-7xl mb-6">
                {score === QUIZ_QUESTIONS.length ? '💍' : score > 0 ? '✨' : '💖'}
              </div>
              <h3 className="font-serif text-3xl text-[#880E4F]">Quiz Completed!</h3>
              <p className="text-gray-600 font-medium">Your Score: {score} / {QUIZ_QUESTIONS.length}</p>
              <p className="font-serif italic text-gray-400 px-6 leading-relaxed">
                {score === QUIZ_QUESTIONS.length 
                  ? "A perfect match for a perfect couple! We can't wait to see you." 
                  : "Thank you for participating! Your blessings are the ultimate prize."}
              </p>
              <button
                onClick={resetQuiz}
                className="mt-6 bg-[#880E4F] text-white px-10 py-4 rounded-full text-sm font-bold hover:bg-[#AD1457] transition-all shadow-xl"
              >
                Play Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Quiz;