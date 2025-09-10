import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen: React.FC = () => {
  const [animationPhase, setAnimationPhase] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const phases = [
      { delay: 0, phase: 0 },      // Circle appears
      { delay: 800, phase: 1 },    // Circle morphs to face
      { delay: 1500, phase: 2 },   // Smile appears
      { delay: 2200, phase: 3 },   // Face shakes/nods
      { delay: 3000, phase: 4 },   // Text animation starts
      { delay: 4500, phase: 5 },   // World element appears
      { delay: 5500, phase: 6 },   // Final expansion
    ];

    phases.forEach(({ delay, phase }) => {
      setTimeout(() => setAnimationPhase(phase), delay);
    });

    setTimeout(() => setIsComplete(true), 6500);
  }, []);

  const portfolioName = "SHAKEEL";
  const subtitle = "AI Creator";

  // Circle to face morphing animation
  const faceVariants = {
    circle: {
      d: "M50 10 A40 40 0 1 1 50 90 A40 40 0 1 1 50 10",
      transition: { duration: 0.8, ease: "easeInOut" }
    },
    face: {
      d: "M50 15 C70 15 85 30 85 50 C85 70 70 85 50 85 C30 85 15 70 15 50 C15 30 30 15 50 15",
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  };

  // Eye animations
  const eyeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.4, ease: "backOut" }
    },
    blink: {
      scaleY: [1, 0.1, 1],
      transition: { duration: 0.3, times: [0, 0.5, 1] }
    }
  };

  // Smile animation
  const smileVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // Face shake/nod animation
  const faceShakeVariants = {
    shake: {
      rotate: [0, -2, 2, -1, 1, 0],
      y: [0, -2, 0, -1, 0],
      transition: { duration: 1.2, ease: "easeInOut" }
    }
  };

  // Letter dancing animation
  const letterVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.5 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "backOut"
      }
    }),
    dance: (i: number) => ({
      y: [0, -20, 0, -10, 0],
      rotate: [0, 5, -5, 2, 0],
      scale: [1, 1.2, 0.9, 1.1, 1],
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 2
      }
    })
  };

  // World/globe animation
  const worldVariants = {
    hidden: { scale: 0, rotate: 0, opacity: 0 },
    visible: {
      scale: 1,
      rotate: 360,
      opacity: 0.8,
      transition: {
        scale: { duration: 0.5, ease: "backOut" },
        rotate: { duration: 2, ease: "linear", repeat: Infinity },
        opacity: { duration: 0.5 }
      }
    }
  };

  // Background gradient animation
  const backgroundVariants = {
    initial: {
      background: "linear-gradient(45deg, #000000, #111111)"
    },
    animate: {
      background: [
        "linear-gradient(45deg, #000000, #111111)",
        "linear-gradient(45deg, #0f0f23, #1a1a2e)",
        "linear-gradient(45deg, #16213e, #0f3460)",
        "linear-gradient(45deg, #533483, #7209b7)",
        "linear-gradient(45deg, #2d1b69, #11998e)",
        "linear-gradient(45deg, #000000, #111111)"
      ],
      transition: {
        duration: 6,
        ease: "easeInOut",
        repeat: Infinity
      }
    }
  };

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          variants={backgroundVariants}
          initial="initial"
          animate="animate"
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ exit: { duration: 1, ease: "easeInOut" } }}
        >
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  opacity: 0
                }}
                animate={{
                  y: [null, Math.random() * window.innerHeight],
                  opacity: [0, 0.8, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>

          {/* Main content container */}
          <div className="relative flex flex-col items-center">
            {/* Morphing face animation */}
            <motion.div
              className="relative mb-8"
              variants={faceShakeVariants}
              animate={animationPhase >= 3 ? "shake" : ""}
            >
              <svg width="120" height="120" viewBox="0 0 100 100" className="relative z-10">
                {/* Glow effect */}
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  <linearGradient id="faceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00f3ff" />
                    <stop offset="50%" stopColor="#9d4edd" />
                    <stop offset="100%" stopColor="#ff006e" />
                  </linearGradient>
                </defs>

                {/* Face outline */}
                <motion.path
                  variants={faceVariants}
                  initial="circle"
                  animate={animationPhase >= 1 ? "face" : "circle"}
                  fill="none"
                  stroke="url(#faceGradient)"
                  strokeWidth="3"
                  filter="url(#glow)"
                />

                {/* Eyes */}
                <motion.circle
                  cx="38"
                  cy="42"
                  r="3"
                  fill="#00f3ff"
                  variants={eyeVariants}
                  initial="hidden"
                  animate={animationPhase >= 2 ? "visible" : "hidden"}
                />
                <motion.circle
                  cx="62"
                  cy="42"
                  r="3"
                  fill="#00f3ff"
                  variants={eyeVariants}
                  initial="hidden"
                  animate={animationPhase >= 2 ? "visible" : "hidden"}
                />

                {/* Smile */}
                <motion.path
                  d="M35 60 Q50 75 65 60"
                  fill="none"
                  stroke="#ff006e"
                  strokeWidth="3"
                  strokeLinecap="round"
                  variants={smileVariants}
                  initial="hidden"
                  animate={animationPhase >= 2 ? "visible" : "hidden"}
                />
              </svg>

              {/* Pulsing glow around face */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(0,243,255,0.2) 0%, transparent 70%)"
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* Dancing portfolio name */}
            <div className="flex items-center justify-center mb-4 space-x-1">
              {portfolioName.split('').map((letter, i) => (
                <motion.span
                  key={i}
                  className="text-4xl md:text-6xl font-bold"
                  style={{
                    background: "linear-gradient(45deg, #00f3ff, #9d4edd, #ff006e, #8338ec, #3a86ff)",
                    backgroundSize: "300% 300%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}
                  variants={letterVariants}
                  initial="hidden"
                  animate={
                    animationPhase >= 4 
                      ? animationPhase >= 5 ? "dance" : "visible"
                      : "hidden"
                  }
                  custom={i}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Animated subtitle */}
            <motion.div
              className="text-lg md:text-xl text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={animationPhase >= 4 ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {subtitle.split('').map((letter, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  animate={{
                    color: [
                      "#9ca3af",
                      "#00f3ff",
                      "#9d4edd",
                      "#ff006e",
                      "#9ca3af"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.1
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </motion.div>

            {/* Floating world element */}
            <motion.div
              className="absolute top-0 right-0 w-16 h-16 opacity-30"
              variants={worldVariants}
              initial="hidden"
              animate={animationPhase >= 5 ? "visible" : "hidden"}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#00f3ff"
                  strokeWidth="2"
                />
                <path
                  d="M20 50 Q50 20 80 50 Q50 80 20 50"
                  fill="none"
                  stroke="#9d4edd"
                  strokeWidth="1.5"
                />
                <path
                  d="M50 5 Q25 50 50 95 Q75 50 50 5"
                  fill="none"
                  stroke="#ff006e"
                  strokeWidth="1.5"
                />
                <circle cx="50" cy="50" r="3" fill="#00f3ff" />
              </svg>
            </motion.div>

            {/* Progress indicator */}
            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="flex space-x-2">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-gray-600"
                    animate={{
                      backgroundColor: animationPhase >= i ? "#00f3ff" : "#374151",
                      scale: animationPhase >= i ? [1, 1.3, 1] : 1
                    }}
                    transition={{
                      backgroundColor: { duration: 0.3 },
                      scale: { duration: 0.4, repeat: animationPhase >= i ? Infinity : 0, repeatDelay: 1 }
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Loading text */}
            <motion.p
              className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-gray-400 text-sm tracking-wider"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.5 }}
            >
              <motion.span
                animate={{
                  opacity: [1, 0.5, 1]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Crafting Experience...
              </motion.span>
            </motion.p>
          </div>

          {/* Final expansion overlay */}
          {animationPhase >= 6 && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1.2 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
