import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
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

    return () => observer.disconnect();
  }, []);

  const ProgressBar = ({ level, color, index }) => {
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
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-200 font-medium text-sm">{level}%</span>
          <div className="flex items-center">
            <span className="text-yellow-400 mr-2 text-lg">⭐</span>
            <span className="text-white font-bold text-sm">{level}%</span>
          </div>
        </div>
        <div className="h-3 bg-gray-700 rounded-full overflow-hidden relative">
          <motion.div
            className={`h-full rounded-full bg-gradient-to-r ${color} relative`}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          </motion.div>
          <div 
            className="absolute top-0 h-full w-0.5 bg-white/80"
            style={{ left: `${level}%` }}
          ></div>
          <div 
            className="absolute top-1/2 w-5 h-5 rounded-full bg-white border-2 border-gray-800 transform -translate-y-1/2 flex items-center justify-center shadow-lg"
            style={{ left: `${level}%`, marginLeft: '-0.625rem' }}
          >
            <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  };

  const RadialProgress = ({ percentage, color, size = 120 }) => {
    const radius = size / 2 - 10;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="10"
            fill="transparent"
            className="text-gray-700"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="10"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={`transition-all duration-1500 ease-out ${color.replace('from-', 'text-').replace(' to-', '-')}`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-white">{percentage}%</span>
        </div>
      </div>
    );
  };

  const SkillCategoryCard = ({ category, index, isActive }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className={`bg-gray-800/50 backdrop-blur-md rounded-2xl border-2 p-6 transition-all duration-500 ${
          isActive ? 'border-cyan-400/50 scale-105 shadow-2xl' : 'border-gray-700/30 hover:border-cyan-400/30'
        }`}
        onClick={() => setActiveCategory(index)}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className={`text-xl font-bold ${isActive ? 'text-cyan-300' : 'text-gray-300'}`}>
            {category.icon} {category.title}
          </h3>
          <div className="text-sm px-3 py-1 rounded-full bg-gray-700/50 text-cyan-300 font-semibold">
            {category.average}% avg
          </div>
        </div>
        
        <div className="space-y-2">
          {category.skills.map((skill, skillIndex) => (
            <div key={skillIndex} className="flex items-center justify-between py-2 border-b border-gray-700/30 last:border-b-0">
              <span className="text-gray-300 text-sm">{skill.name}</span>
              <div className="flex items-center">
                <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden mr-2">
                  <div 
                    className={`h-full rounded-full bg-gradient-to-r ${category.color}`}
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <span className="text-cyan-300 font-bold text-xs">{skill.level}%</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  };

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden" ref={containerRef}>
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400/30 rounded-full"
            initial={{
              x: Math.random() * 100 + 'vw',
              y: Math.random() * 100 + 'vh',
            }}
            animate={{
              x: [null, Math.random() * 100 + 'vw'],
              y: [null, Math.random() * 100 + 'vh'],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400">
              Skills & Expertise
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-300 text-lg mt-6 max-w-2xl mx-auto">
            A comprehensive skill set built through hands-on experience and continuous learning
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 mb-16">
          <div className="lg:w-1/2">
            <div className="sticky top-24">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700/30 p-8"
                >
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-bold text-cyan-300">
                      {skillCategories[activeCategory].title}
                    </h3>
                    <div className="text-3xl">
                      {skillCategories[activeCategory].icon}
                    </div>
                  </div>

                  <div className="mb-8 flex justify-center">
                    <RadialProgress 
                      percentage={skillCategories[activeCategory].average} 
                      color={skillCategories[activeCategory].color}
                    />
                  </div>

                  <div>
                    {skillCategories[activeCategory].skills.map((skill, index) => (
                      <ProgressBar 
                        key={index}
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

        {/* Overall Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gradient-to-r from-cyan-900/30 via-purple-900/30 to-cyan-900/30 backdrop-blur-md rounded-2xl border border-cyan-500/20 p-8 max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            Continuous Growth Mindset
          </h3>
          <p className="text-gray-300 leading-relaxed text-lg text-center">
            My diverse skill set reflects a journey of continuous learning and adaptation. 
            From technical expertise in cybersecurity and web development to creative problem-solving 
            in UI/UX design, I bring a holistic approach to every challenge. My experience in operations 
            and data analysis complements my technical skills, enabling me to build solutions that are 
            both innovative and practical.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
            {skillCategories.map((category, index) => (
              <div key={index} className="text-center p-4 bg-gray-800/50 rounded-xl">
                <div className="text-2xl mb-2">{category.icon}</div>
                <div className="text-cyan-300 font-bold text-xl">{category.average}%</div>
                <div className="text-gray-400 text-xs uppercase tracking-wide mt-1">Average</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
