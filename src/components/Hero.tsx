import React, { useEffect, useState } from 'react';
import { Download, ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const name = "Shaik Shakeel";
  const subtitle = "Build the future with AI";

  // Simplified letter animation variants
  const letterVariants = {
    initial: { 
      y: 30, 
      opacity: 0, 
      scale: 0.8
    },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -5,
      scale: 1.1,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Simplified background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.08, 0.05]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className={`transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Main Name */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 relative">
            <div className="flex flex-wrap justify-center gap-1">
              {name.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 cursor-pointer"
                  variants={letterVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  custom={index}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </div>
          </h1>

          {/* Subtitle */}
          <motion.h2 
            className="text-lg md:text-xl lg:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {subtitle}
          </motion.h2>

          {/* Description */}
          <motion.p 
            className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            Driven by artificial intelligence, I build tools that turn ideas into smart solutions and meaningful outcomes. 
            With solid knowledge, I can create anything using AI while exploring opportunities for innovation.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <motion.button
              onClick={scrollToProjects}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center justify-center gap-2">
                View Projects
                <ArrowDown className="w-4 h-4" />
              </span>
            </motion.button>
            
            <motion.button 
              className="px-6 py-3 border border-cyan-500 rounded-lg font-semibold hover:bg-cyan-500/10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                <a href="https://drive.google.com/drive/folders/1YI52DYy-PbfwZd0GJ6hO7b_BXPVVsnUo?usp=sharing" target="_blank" rel="noopener noreferrer">
                  Download Resume
                </a>
              </span>
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            className="flex justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            <motion.a
              href="https://github.com/Shakeel827"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-gray-700 hover:border-cyan-500 transition-all duration-300"
              whileHover={{ scale: 1.1, borderColor: "#00f3ff" }}
              whileTap={{ scale: 0.9 }}
            >
              <Github className="w-5 h-5 hover:text-cyan-400 transition-colors duration-300" />
            </motion.a>
            
            <motion.a
              href="https://www.linkedin.com/in/shaik-mohammad-shakeel-ba5a771b1/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-gray-700 hover:border-purple-500 transition-all duration-300"
              whileHover={{ scale: 1.1, borderColor: "#9d4edd" }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin className="w-5 h-5 hover:text-purple-400 transition-colors duration-300" />
            </motion.a>
            
            <motion.a
              href="mailto:skshakeel9086@gmail.com"
              className="p-3 rounded-full border border-gray-700 hover:border-pink-500 transition-all duration-300"
              whileHover={{ scale: 1.1, borderColor: "#ff006e" }}
              whileTap={{ scale: 0.9 }}
            >
              <Mail className="w-5 h-5 hover:text-pink-400 transition-colors duration-300" />
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, -8, 0],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <ArrowDown className="w-6 h-6 text-cyan-400" />
      </motion.div>
    </section>
  );
};

export default Hero;
