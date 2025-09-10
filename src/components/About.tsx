import React, { useEffect, useState } from 'react';
import { MapPin, Mail, Phone, Linkedin, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const title = "About Me";
  
  const letterVariants = {
    initial: { 
      y: 100, 
      opacity: 0, 
      rotate: -20,
      scale: 0.5
    },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: "backOut"
      }
    }),
    hover: {
      y: -15,
      rotate: [0, -10, 10, 0],
      scale: 1.3,
      color: ["#06b6d4", "#8b5cf6", "#ec4899", "#06b6d4"],
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    },
    dance: (i: number) => ({
      y: [0, -25, 0, -15, 0],
      rotate: [0, 8, -8, 4, 0],
      scale: [1, 1.15, 0.9, 1.1, 1],
      transition: {
        delay: i * 0.15,
        duration: 2.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 4
      }
    })
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('about');
    if (element) {
      observer.observe(element);
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const contactInfo = [
    { icon: MapPin, text: 'Bapatla, Andhra Pradesh, India', color: 'text-cyan-400' },
    { icon: Mail, text: 'skshakeel9086@gmail.com', color: 'text-purple-400' },
    { icon: Phone, text: '+91 8074015276', color: 'text-pink-400' },
    { icon: Linkedin, text: 'linkedin.com/in/shakeel827', color: 'text-blue-400' },
    { icon: Globe, text: 'pandascanpros.in', color: 'text-green-400' },
  ];

  return (
    <section id="about" className="py-20 relative">
      {/* Cursor follow glow */}
      <motion.div
        className="fixed w-96 h-96 pointer-events-none z-10"
        style={{
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)",
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 100 - 50, 0],
              scale: [0, 1, 0],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Infinity,
              delay: Math.random() * 4
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 relative">
              <div className="flex justify-center gap-2 flex-wrap">
                {title.split('').map((letter, index) => (
                  <motion.span
                    key={index}
                    className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 cursor-pointer"
                    variants={letterVariants}
                    initial="initial"
                    animate={isVisible ? ["animate", "dance"] : "initial"}
                    whileHover="hover"
                    custom={index}
                    style={{
                      textShadow: "0 0 20px currentColor",
                      filter: "drop-shadow(0 0 10px rgba(6, 182, 212, 0.3))"
                    }}
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                  </motion.span>
                ))}
              </div>
            </h2>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"
              initial={{ width: 0, opacity: 0 }}
              animate={isVisible ? { width: 96, opacity: 1 } : {}}
              transition={{ delay: 1, duration: 1, ease: "easeOut" }}
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image & Stats */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: -100 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <div className="relative w-80 h-80 mx-auto lg:mx-0">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-xl opacity-30"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-full border-4 border-cyan-500/30 flex items-center justify-center overflow-hidden">
                  {/* Profile Image */}
                  <div className="w-full h-full flex items-center justify-center">
                    <motion.img 
                      src="/aiease_1755327608838.jpg" 
                      alt="AI Ease" 
                      className="w-full h-full object-cover rounded-full"
                      whileHover={{ 
                        scale: 1.1,
                        filter: "brightness(1.2) contrast(1.1)"
                      }}
                      transition={{ duration: 0.5 }}
                      animate={{
                        filter: [
                          "brightness(1) contrast(1)",
                          "brightness(1.05) contrast(1.02)",
                          "brightness(1) contrast(1)"
                        ]
                      }}
                      style={{
                        transition: "filter 3s ease-in-out infinite"
                      }}
                    />
                  </div>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-full"
                    animate={{
                      background: [
                        "linear-gradient(45deg, rgba(6, 182, 212, 0.1), rgba(139, 92, 246, 0.1))",
                        "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))",
                        "linear-gradient(225deg, rgba(236, 72, 153, 0.1), rgba(6, 182, 212, 0.1))",
                        "linear-gradient(315deg, rgba(6, 182, 212, 0.1), rgba(139, 92, 246, 0.1))"
                      ]
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </div>
              </div>

              {/* Floating Stats */}
              <motion.div 
                className="absolute top-4 -right-4 bg-gray-900/90 backdrop-blur-md rounded-lg p-4 border border-cyan-500/30"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                whileHover={{ scale: 1.1, rotate: 10 }}
              >
                <div className="text-center">
                  <motion.div 
                    className="text-2xl font-bold text-cyan-400"
                    animate={{
                      scale: [1, 1.3, 1],
                      color: ["#06b6d4", "#8b5cf6", "#ec4899", "#06b6d4"],
                      textShadow: [
                        "0 0 10px rgba(6, 182, 212, 0.5)",
                        "0 0 20px rgba(139, 92, 246, 0.8)",
                        "0 0 15px rgba(236, 72, 153, 0.6)",
                        "0 0 10px rgba(6, 182, 212, 0.5)"
                      ]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    4+
                  </motion.div>
                  <div className="text-sm text-gray-400">Internships</div>
                </div>
              </motion.div>

              <motion.div 
                className="absolute bottom-8 -left-8 bg-gray-900/90 backdrop-blur-md rounded-lg p-4 border border-purple-500/30"
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, -5, 5, 0],
                  scale: [1, 1.08, 1]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                whileHover={{ scale: 1.1, rotate: -10 }}
              >
                <div className="text-center">
                  <motion.div 
                    className="text-2xl font-bold text-purple-400"
                    animate={{
                      scale: [1, 1.4, 1],
                      color: ["#8b5cf6", "#ec4899", "#06b6d4", "#8b5cf6"],
                      textShadow: [
                        "0 0 10px rgba(139, 92, 246, 0.5)",
                        "0 0 20px rgba(236, 72, 153, 0.8)",
                        "0 0 15px rgba(6, 182, 212, 0.6)",
                        "0 0 10px rgba(139, 92, 246, 0.5)"
                      ]
                    }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    5+
                  </motion.div>
                  <div className="text-sm text-gray-400">Live Projects</div>
                </div>
              </motion.div>
            </motion.div>

            {/* About Content */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: 100 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.8, duration: 1 }}
            >
              <div className="prose prose-lg text-gray-300">
                <motion.p 
                  className="text-lg leading-relaxed mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.2, duration: 0.8 }}
                >
                  I'm a passionate technology enthusiast currently pursuing my degree in 
                  <span className="text-cyan-400 font-semibold"> Cybersecurity</span> at 
                  Bapatla Engineering College. With a diverse skill set spanning 
                  <span className="text-purple-400 font-semibold"> Operations</span>, 
                  <span className="text-pink-400 font-semibold"> UI/UX Design</span>, and 
                  <span className="text-green-400 font-semibold"> Data Analysis</span>, 
                  I bring a unique perspective to every project.
                </motion.p>

                <motion.p 
                  className="text-lg leading-relaxed mb-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.5, duration: 0.8 }}
                >
                  My journey includes hands-on experience at leading companies like 
                  <span className="text-cyan-400 font-semibold"> Flipkart</span> and 
                  <span className="text-purple-400 font-semibold"> Travelplus</span>, 
                  where I've honed my analytical and operational skills. I'm passionate about 
                  creating secure, user-centric solutions that make a real impact.
                </motion.p>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <motion.h3 
                  className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1.8, duration: 0.6 }}
                >
                  <motion.span
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{
                      background: "linear-gradient(90deg, #06b6d4, #8b5cf6, #ec4899, #06b6d4)",
                      backgroundSize: "200% 100%",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text"
                    }}
                  >
                    Let's Connect
                  </motion.span>
                </motion.h3>
                
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-4 p-3 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 group"
                      initial={{ opacity: 0, x: -50 }}
                      animate={isVisible ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 2 + index * 0.1, duration: 0.6 }}
                      whileHover={{ 
                        scale: 1.05,
                        x: 10,
                        borderColor: "rgba(6, 182, 212, 0.5)",
                        backgroundColor: "rgba(6, 182, 212, 0.05)"
                      }}
                    >
                      <motion.div
                        animate={{
                          rotate: [0, 15, -15, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.5
                        }}
                      >
                        <info.icon className={`w-5 h-5 ${info.color} group-hover:scale-125 transition-all duration-300`} />
                      </motion.div>
                      <motion.span 
                        className="text-gray-300 group-hover:text-white transition-colors duration-300"
                        whileHover={{
                          x: 5,
                          color: "#ffffff"
                        }}
                      >
                        {info.text}
                      </motion.span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
