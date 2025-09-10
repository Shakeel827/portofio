import React, { useEffect, useState } from 'react';
import { Download, ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

// Typewriter effect component
const TypewriterText = ({ text, delay = 0, speed = 100 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }
    }, delay + currentIndex * speed);

    return () => clearTimeout(timer);
  }, [currentIndex, text, delay, speed]);

  return (
    <span>
      {displayText}
      <motion.span
        className="inline-block w-0.5 h-6 bg-cyan-400 ml-1"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </span>
  );
};

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showTypewriter, setShowTypewriter] = useState(false);

  const roles = [
    'AI/ML Engineer',
    'Machine Learning Developer',
    'Data Scientist',
    'AI Job Seeker'
  ];

  const name = "Shaik Shakeel";
  const subtitle = "Build the future with AI";

  // Letter animation variants
  const letterVariants = {
    initial: { 
      y: 50, 
      opacity: 0, 
      scale: 0.5,
      rotate: -10 
    },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: "backOut"
      }
    }),
    hover: {
      y: -10,
      scale: 1.2,
      rotate: [0, -5, 5, 0],
      color: ["#00f3ff", "#9d4edd", "#ff006e", "#00f3ff"],
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    },
    dance: (i: number) => ({
      y: [0, -20, 0, -10, 0],
      rotate: [0, 5, -5, 2, 0],
      scale: [1, 1.1, 0.95, 1.05, 1],
      transition: {
        delay: i * 0.1,
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 3
      }
    })
  };

  const subtitleVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 2 + i * 0.05,
        duration: 0.6,
        ease: "easeOut"
      }
    }),
    wave: (i: number) => ({
      y: [0, -8, 0],
      color: [
        "#9ca3af",
        "#00f3ff",
        "#9d4edd",
        "#ff006e",
        "#9ca3af"
      ],
      transition: {
        delay: i * 0.1,
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 4
      }
    })
  };
  useEffect(() => {
    setIsVisible(true);
    
    // Start typewriter effect after name animation
    setTimeout(() => {
      setShowTypewriter(true);
    }, 3000);

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.5, 1],
            x: [0, 100, 0],
            y: [0, -50, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -80, 0],
            y: [0, 60, 0],
            opacity: [0.1, 0.25, 0.1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl"
          animate={{
            scale: [1, 2, 1],
            rotate: [0, 360],
            opacity: [0.1, 0.4, 0.1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating orbs */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 200 - 100, 0],
              scale: [0, 1, 0],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              delay: Math.random() * 3
            }}
          />
        ))}
      </div>

      {/* Cursor follow glow */}
      <motion.div
        className="fixed w-96 h-96 pointer-events-none z-10"
        style={{
          background: "radial-gradient(circle, rgba(0, 243, 255, 0.1) 0%, transparent 70%)",
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
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

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Main Name with Glowing Effect */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 relative">
            <div className="flex flex-wrap justify-center gap-1 md:gap-2">
              {name.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 cursor-pointer"
                  variants={letterVariants}
                  initial="initial"
                  animate={["animate", "dance"]}
                  whileHover="hover"
                  custom={index}
                  style={{
                    textShadow: "0 0 20px currentColor",
                    filter: "drop-shadow(0 0 10px rgba(0, 243, 255, 0.3))"
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </div>
            
            {/* Glow effect behind text */}
            <div className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 blur-sm opacity-30 animate-pulse pointer-events-none">
              {name}
            </div>
          </h1>

          {/* Animated Role Subtitle */}
          <div className="h-16 mb-8 flex items-center justify-center">
            <h2 className="text-xl md:text-2xl lg:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
              {showTypewriter ? (
                <TypewriterText text={subtitle} delay={0} speed={80} />
              ) : (
                <div className="flex flex-wrap justify-center gap-1">
                  {subtitle.split('').map((letter, index) => (
                    <motion.span
                      key={index}
                      className="inline-block"
                      variants={subtitleVariants}
                      initial="initial"
                      animate={["animate", "wave"]}
                      custom={index}
                    >
                      {letter === ' ' ? '\u00A0' : letter}
                    </motion.span>
                  ))}
                </div>
              )}
            </h2>
          </div>

          {/* Description */}
          <motion.p 
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 1 }}
          >
            {showTypewriter ? (
              <TypewriterText 
                text="Driven by artificial intelligence, I build tools that turn ideas into smart solutions and meaningful outcomes. With solid knowledge, I can create anything using AI while exploring opportunities for innovation."
                delay={2000}
                speed={30}
              />
            ) : (
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  background: "linear-gradient(90deg, #9ca3af, #00f3ff, #9d4edd, #ff006e, #9ca3af)",
                  backgroundSize: "200% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}
              >
                Driven by artificial intelligence, I build tools that turn ideas into smart solutions and meaningful outcomes. 
                With solid knowledge, I can create anything using AI while exploring opportunities for innovation.
              </motion.span>
            )}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center mb-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 3.5, duration: 0.8, ease: "backOut" }}
          >
            <motion.button
              onClick={scrollToProjects}
              className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 transform"
              whileHover={{ 
                scale: 1.1,
                boxShadow: "0 20px 40px rgba(0, 243, 255, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => {
                // Button hover sound effect could be added here
              }}
            >
              <span className="flex items-center justify-center gap-2 relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-lg opacity-0"
                  whileHover={{ opacity: 0.2 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  animate={{
                    y: [0, -2, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  View Projects
                </motion.span>
                <motion.div
                  animate={{
                    y: [0, 5, 0],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <ArrowDown className="w-5 h-5" />
                </motion.div>
              </span>
            </motion.button>
            
            <motion.button 
              className="group px-8 py-4 border border-cyan-500 rounded-lg font-semibold hover:bg-cyan-500/10 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 transform relative overflow-hidden"
              whileHover={{ 
                scale: 1.1,
                borderColor: "#ff006e",
                boxShadow: "0 20px 40px rgba(255, 0, 110, 0.2)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <span className="flex items-center justify-center gap-2">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Download className="w-5 h-5" />
                </motion.div>
                <a href="https://drive.google.com/drive/folders/1YI52DYy-PbfwZd0GJ6hO7b_BXPVVsnUo?usp=sharing" target="_blank" rel="noopener noreferrer">
                  Download Resume
                </a>
              </span>
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            className="flex justify-center gap-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4, duration: 0.8 }}
          >
            <motion.a
              href="https://github.com/Shakeel827"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 rounded-full border border-gray-700 hover:border-cyan-500 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/25 relative overflow-hidden"
              whileHover={{ 
                scale: 1.2,
                rotate: 360,
                borderColor: "#00f3ff",
                boxShadow: "0 0 30px rgba(0, 243, 255, 0.5)"
              }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-transparent rounded-full opacity-0"
                whileHover={{ opacity: 1, rotate: 180 }}
                transition={{ duration: 0.5 }}
              />
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Github className="w-6 h-6 group-hover:text-cyan-400 transition-colors duration-300" />
              </motion.div>
            </motion.a>
            
            <motion.a
              href="https://www.linkedin.com/in/shaik-mohammad-shakeel-ba5a771b1/"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 rounded-full border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/25 relative overflow-hidden"
              whileHover={{ 
                scale: 1.2,
                rotate: -360,
                borderColor: "#9d4edd",
                boxShadow: "0 0 30px rgba(157, 78, 221, 0.5)"
              }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-transparent rounded-full opacity-0"
                whileHover={{ opacity: 1, rotate: -180 }}
                transition={{ duration: 0.5 }}
              />
              <motion.div
                animate={{
                  y: [0, -3, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Linkedin className="w-6 h-6 group-hover:text-purple-400 transition-colors duration-300" />
              </motion.div>
            </motion.a>
            
            <motion.a
              href="mailto:skshakeel9086@gmail.com"
              className="group p-3 rounded-full border border-gray-700 hover:border-pink-500 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/25 relative overflow-hidden"
              whileHover={{ 
                scale: 1.2,
                rotate: 180,
                borderColor: "#ff006e",
                boxShadow: "0 0 30px rgba(255, 0, 110, 0.5)"
              }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-transparent rounded-full opacity-0"
                whileHover={{ opacity: 1, rotate: 90 }}
                transition={{ duration: 0.5 }}
              />
              <motion.div
                animate={{
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Mail className="w-6 h-6 group-hover:text-pink-400 transition-colors duration-300" />
              </motion.div>
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Floating Animation Arrow */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, -10, 0],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <ArrowDown className="w-8 h-8 text-cyan-400" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
