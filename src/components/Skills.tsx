import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const skillCategories = [
    {
      title: 'Operations & Analysis',
      icon: '📊',
      color: 'from-cyan-500 to-blue-600',
      skills: [
        { name: 'Data Analysis', level: 85 },
        { name: 'Process Optimization', level: 78 },
        { name: 'Research & Reporting', level: 82 },
        { name: 'Quality Assurance', level: 75 }
      ],
      average: 80
    },
    {
      title: 'UI/UX Design',
      icon: '🎨',
      color: 'from-purple-500 to-pink-600',
      skills: [
        { name: 'Figma', level: 88 },
        { name: 'Wireframing', level: 85 },
        { name: 'Prototyping', level: 80 },
        { name: 'User Research', level: 75 }
      ],
      average: 82
    },
    {
      title: 'Technical Skills',
      icon: '💻',
      color: 'from-green-500 to-emerald-600',
      skills: [
        { name: 'HTML/CSS/JS', level: 90 },
        { name: 'Python', level: 85 },
        { name: 'React', level: 80 },
        { name: 'Git/GitHub', level: 88 }
      ],
      average: 86
    },
    {
      title: 'Cybersecurity',
      icon: '🔒',
      color: 'from-rose-500 to-red-600',
      skills: [
        { name: 'Security Analysis', level: 82 },
        { name: 'Vulnerability Assessment', level: 78 },
        { name: 'Risk Management', level: 75 },
        { name: 'Security Protocols', level: 80 }
      ],
      average: 79
    },
    {
      title: 'Soft Skills',
      icon: '🤝',
      color: 'from-amber-500 to-orange-600',
      skills: [
        { name: 'Communication', level: 92 },
        { name: 'Problem Solving', level: 88 },
        { name: 'Teamwork', level: 85 },
        { name: 'Leadership', level: 80 }
      ],
      average: 86
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const ProgressBar = ({ skill, level, color, index }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      if (isVisible) {
        const timer = setTimeout(() => {
          setProgress(level);
        }, index * 200);
        return () => clearTimeout(timer);
      }
    }, [isVisible, level, index]);

    return (
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1, duration: 0.6 }}
        whileHover={{ scale: 1.02, x: 10 }}
      >
        <div className="flex justify-between items-center mb-3">
          <motion.span 
            className="text-gray-200 font-medium text-sm"
            animate={{ 
              color: ["#e5e7eb", "#00f3ff", "#e5e7eb"]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              delay: index * 0.5 
            }}
          >
            {skill}
          </motion.span>
          <div className="flex items-center">
            <motion.span 
              className="text-yellow-400 mr-2 text-lg"
              animate={{ 
                rotate: [0, 15, -15, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                delay: index * 0.3 
              }}
            >
              ⭐
            </motion.span>
            <motion.span 
              className="text-white font-bold text-sm"
              animate={{
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.4
              }}
            >
              {level}%
            </motion.span>
          </div>
        </div>
        <div className="h-3 bg-gray-700 rounded-full overflow-hidden relative">
          <motion.div
            className={`h-full rounded-full bg-gradient-to-r ${color} relative`}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </motion.div>
          <motion.div 
            className="absolute top-1/2 w-5 h-5 rounded-full bg-white border-2 border-gray-800 transform -translate-y-1/2 flex items-center justify-center shadow-lg"
            style={{ left: `${level}%`, marginLeft: '-0.625rem' }}
            animate={{
              scale: [1, 1.3, 1],
              boxShadow: [
                "0 0 0 0 rgba(255, 255, 255, 0.4)",
                "0 0 0 10px rgba(255, 255, 255, 0)",
                "0 0 0 0 rgba(255, 255, 255, 0.4)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.2
            }}
          >
            <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  const RadialProgress = ({ percentage, color, size = 120 }) => {
    const radius = size / 2 - 10;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <motion.div 
        className="relative" 
        style={{ width: size, height: size }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        animate={{
          rotate: [0, 360]
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" }
        }}
      >
        <svg className="w-full h-full transform -rotate-90">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-700"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={`transition-all duration-1500 ease-out ${color.replace('from-', 'text-').replace(' to-', '-')}`}
            strokeLinecap="round"
            filter="url(#glow)"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        </svg>
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <span className="text-2xl font-bold text-white">{percentage}%</span>
        </motion.div>
      </motion.div>
    );
  };

  const SkillCategoryCard = ({ category, index, isActive }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: index * 0.1, duration: 0.6, ease: "backOut" }}
        className={`bg-gray-800/50 backdrop-blur-md rounded-2xl border-2 p-6 transition-all duration-500 cursor-pointer ${
          isActive ? 'border-cyan-400/50 scale-105 shadow-2xl shadow-cyan-500/20' : 'border-gray-700/30 hover:border-cyan-400/30'
        }`}
        onClick={() => setActiveCategory(index)}
        whileHover={{ 
          scale: 1.05, 
          y: -5,
          boxShadow: "0 20px 40px rgba(0, 243, 255, 0.2)"
        }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className={`text-xl font-bold transition-colors duration-300 ${isActive ? 'text-cyan-300' : 'text-gray-300'}`}>
            <motion.span
              className="mr-3 text-2xl inline-block"
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.3
              }}
            >
              {category.icon}
            </motion.span>
            <motion.span
              animate={isActive ? {
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              } : {}}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              style={isActive ? {
                background: "linear-gradient(90deg, #67e8f9, #a78bfa, #67e8f9)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              } : {}}
            >
              {category.title}
            </motion.span>
          </h3>
          <motion.div 
            className="text-sm px-3 py-1 rounded-full bg-gray-700/50 text-cyan-300 font-semibold"
            animate={{
              scale: [1, 1.1, 1],
              boxShadow: [
                "0 0 0 0 rgba(103, 232, 249, 0.4)",
                "0 0 0 8px rgba(103, 232, 249, 0)",
                "0 0 0 0 rgba(103, 232, 249, 0.4)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.4
            }}
          >
            {category.average}% avg
          </motion.div>
        </div>
        
        <div className="space-y-2">
          {category.skills.map((skill, skillIndex) => (
            <motion.div 
              key={skillIndex} 
              className="flex items-center justify-between py-2 border-b border-gray-700/30 last:border-b-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
              whileHover={{ x: 5, backgroundColor: "rgba(103, 232, 249, 0.1)" }}
            >
              <span className="text-gray-300 text-sm">{skill.name}</span>
              <div className="flex items-center">
                <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden mr-2">
                  <motion.div 
                    className={`h-full rounded-full bg-gradient-to-r ${category.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ delay: index * 0.2 + skillIndex * 0.1, duration: 1 }}
                  />
                </div>
                <motion.span 
                  className="text-cyan-300 font-bold text-xs"
                  animate={{
                    color: ["#67e8f9", "#a78bfa", "#67e8f9"]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: skillIndex * 0.2
                  }}
                >
                  {skill.level}%
                </motion.span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden" ref={containerRef}>
      {/* Enhanced animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 40, 0],
            opacity: [0.1, 0.25, 0.1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>
      
      {/* Enhanced floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: [null, Math.random() * window.innerWidth],
              y: [null, Math.random() * window.innerHeight],
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: Math.random() * 8 + 5,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 3
            }}
          />
        ))}
      </div>

      {/* Cursor follow glow effect */}
      <motion.div
        className="fixed w-96 h-96 pointer-events-none z-10"
        style={{
          background: "radial-gradient(circle, rgba(103, 232, 249, 0.1) 0%, transparent 70%)",
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

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundSize: "200% 100%"
              }}
            >
              Skills & Expertise
            </motion.span>
          </h2>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full mb-4"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ delay: 0.5, duration: 1 }}
          />
          <motion.p 
            className="text-gray-300 text-lg mt-6 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            A comprehensive skill set built through hands-on experience and continuous learning
          </motion.p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 mb-16">
          {/* Left side - Active skill details */}
          <div className="lg:w-1/2">
            <div className="sticky top-24">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, x: -50, rotateY: -15 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  exit={{ opacity: 0, x: 50, rotateY: 15 }}
                  transition={{ duration: 0.6, ease: "backOut" }}
                  className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700/30 p-8 shadow-2xl"
                  style={{
                    background: "linear-gradient(135deg, rgba(31, 41, 55, 0.8), rgba(17, 24, 39, 0.9))"
                  }}
                >
                  <div className="flex items-center justify-between mb-8">
                    <motion.h3 
                      className="text-2xl font-bold text-cyan-300"
                      animate={{
                        textShadow: [
                          "0 0 10px rgba(103, 232, 249, 0.5)",
                          "0 0 20px rgba(103, 232, 249, 0.8)",
                          "0 0 10px rgba(103, 232, 249, 0.5)"
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {skillCategories[activeCategory].title}
                    </motion.h3>
                    <motion.div 
                      className="text-3xl"
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{
                        rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                        scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                      }}
                    >
                      {skillCategories[activeCategory].icon}
                    </motion.div>
                  </div>

                  <div className="mb-8 flex justify-center">
                    <RadialProgress 
                      percentage={skillCategories[activeCategory].average} 
                      color={skillCategories[activeCategory].color}
                    />
                  </div>

                  <div className="space-y-4">
                    {skillCategories[activeCategory].skills.map((skill, index) => (
                      <ProgressBar 
                        key={`${activeCategory}-${index}`}
                        skill={skill.name}
                        level={skill.level} 
                        color={skillCategories[activeCategory].color}
                        index={index}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right side - Skill category cards */}
          <div className="lg:w-1/2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skillCategories.map((category, index) => (
                <SkillCategoryCard 
                  key={index}
                  category={category}
                  index={index}
                  isActive={activeCategory === index}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Overall Summary */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "backOut" }}
          className="bg-gradient-to-r from-cyan-900/30 via-purple-900/30 to-cyan-900/30 backdrop-blur-md rounded-2xl border border-cyan-500/20 p-8 max-w-4xl mx-auto relative overflow-hidden"
          whileHover={{ scale: 1.02, y: -5 }}
        >
          {/* Animated background pattern */}
          <motion.div
            className="absolute inset-0 opacity-10"
            animate={{
              background: [
                "linear-gradient(45deg, transparent, rgba(103, 232, 249, 0.1), transparent)",
                "linear-gradient(135deg, transparent, rgba(167, 139, 250, 0.1), transparent)",
                "linear-gradient(225deg, transparent, rgba(103, 232, 249, 0.1), transparent)",
                "linear-gradient(315deg, transparent, rgba(167, 139, 250, 0.1), transparent)"
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          <motion.h3 
            className="text-2xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundSize: "200% 100%"
            }}
          >
            Continuous Growth Mindset
          </motion.h3>
          
          <motion.p 
            className="text-gray-300 leading-relaxed text-lg text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            My diverse skill set reflects a journey of continuous learning and adaptation. 
            From technical expertise in cybersecurity and web development to creative problem-solving 
            in UI/UX design, I bring a holistic approach to every challenge. My experience in operations 
            and data analysis complements my technical skills, enabling me to build solutions that are 
            both innovative and practical.
          </motion.p>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {skillCategories.map((category, index) => (
              <motion.div 
                key={index} 
                className="text-center p-4 bg-gray-800/50 rounded-xl border border-gray-700/30"
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.6, ease: "backOut" }}
                whileHover={{ 
                  scale: 1.1, 
                  y: -5,
                  borderColor: "rgba(103, 232, 249, 0.5)",
                  boxShadow: "0 10px 25px rgba(103, 232, 249, 0.2)"
                }}
              >
                <motion.div 
                  className="text-2xl mb-2"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.3
                  }}
                >
                  {category.icon}
                </motion.div>
                <motion.div 
                  className="text-cyan-300 font-bold text-xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    color: ["#67e8f9", "#a78bfa", "#67e8f9"]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2
                  }}
                >
                  {category.average}%
                </motion.div>
                <div className="text-gray-400 text-xs uppercase tracking-wide mt-1">Average</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
