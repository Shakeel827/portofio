import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Bot } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, when: 'beforeChildren' },
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.5, when: 'afterChildren' },
    }
  };

  const mascotVariants: Variants = {
    initial: { y: 0, scale: 1 },
    animate: {
      y: [-10, 10],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      },
    },
  };

  const progressCircleVariants: Variants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: { duration: 2, ease: 'easeInOut' },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 bg-gray-950 flex flex-col items-center justify-center z-50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="relative w-48 h-48 flex items-center justify-center">
        <svg className="absolute w-full h-full" viewBox="0 0 100 100">
            {/* Background Circle */}
            <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#27272a" // zinc-800
                strokeWidth="4"
                fill="transparent"
            />
            {/* Progress Circle */}
            <motion.circle
                cx="50"
                cy="50"
                r="45"
                stroke="url(#loading-gradient)"
                strokeWidth="4"
                fill="transparent"
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
                variants={progressCircleVariants}
            />
            <defs>
                <linearGradient id="loading-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22d3ee" /> {/* cyan-400 */}
                    <stop offset="100%" stopColor="#c084fc" /> {/* purple-400 */}
                </linearGradient>
            </defs>
        </svg>

        <motion.div variants={mascotVariants} initial="initial" animate="animate">
          <Bot className="w-20 h-20 text-gray-400" />
        </motion.div>
      </div>
      <motion.p 
        className="text-gray-400 text-lg mt-8 font-medium tracking-wider"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.5 } }}
      >
        Getting things ready...
      </motion.p>
    </motion.div>
  );
};

export default LoadingScreen;
