import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

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

  const colorMap = {
    'from-cyan-500 to-blue-600': {
      gradient: 'from-cyan-500 to-blue-600',
      border: 'border-cyan-500/30',
      text: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      shadow: 'shadow-cyan-500/25'
    },
    'from-purple-500 to-pink-600': {
      gradient: 'from-purple-500 to-pink-600',
      border: 'border-purple-500/30',
      text: 'text-purple-400',
      bg: 'bg-purple-500/10',
      shadow: 'shadow-purple-500/25'
    },
    'from-green-500 to-emerald-600': {
      gradient: 'from-green-500 to-emerald-600',
      border: 'border-emerald-500/30',
      text: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      shadow: 'shadow-emerald-500/25'
    },
    'from-rose-500 to-red-600': {
      gradient: 'from-rose-500 to-red-600',
      border: 'border-rose-500/30',
      text: 'text-rose-400',
      bg: 'bg-rose-500/10',
      shadow: 'shadow-rose-500/25'
    },
    'from-amber-500 to-orange-600': {
      gradient: 'from-amber-500 to-orange-600',
      border: 'border-amber-500/30',
      text: 'text-amber-400',
      bg: 'bg-amber-500/10',
      shadow: 'shadow-amber-500/25'
    }
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

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const ProgressBar = ({ skill, level, color, index }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      if (isVisible) {
        const timer = setTimeout(() => {
          setProgress(level);
        }, index * 100);
        return () => clearTimeout(timer);
      }
    }, [isVisible, level, index]);

    return (
      <motion.div 
        className="mb-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05, duration: 0.3 }}
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-200 font-medium text-sm">{skill}</span>
          <span className="text-white font-bold text-sm">{level}%</span>
        </div>
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full bg-gradient-to-r ${color}`}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, delay: index * 0.05, ease: "easeOut" }}
          />
        </div>
      </motion.div>
    );
  };

  const RadialProgress = ({ percentage, color, size = 100 }) => {
    const radius = size / 2 - 8;
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
            strokeWidth="6"
            fill="transparent"
            className="text-gray-700"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={`transition-all duration-1000 ease-out ${color.replace('from-', 'text-').replace(' to-', '-')}`}
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-white">{percentage}%</span>
        </div>
      </div>
    );
  };

  const SkillCategoryCard = ({ category, index, isActive }) => {
    const colors = colorMap[category.color];
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.3 }}
        className={`bg-gray-800/50 backdrop-blur-sm rounded-xl border p-4 transition-all duration-300 cursor-pointer ${
          isActive ? `${colors.border} scale-105 ${colors.shadow}` : 'border-gray-700/30 hover:border-cyan-400/30'
        }`}
        onClick={() => setActiveCategory(index)}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-bold transition-colors duration-300 ${isActive ? colors.text : 'text-gray-300'}`}>
            <span className="mr-2 text-xl">{category.icon}</span>
            {category.title}
          </h3>
          <div className={`text-xs px-2 py-1 rounded-full bg-gray-700/50 ${colors.text} font-semibold`}>
            {category.average}%
          </div>
        </div>
        
        <div className="space-y-1">
          {category.skills.map((skill, skillIndex) => (
            <div key={skillIndex} className="flex items-center justify-between py-1 text-xs">
              <span className="text-gray-300">{skill.name}</span>
              <div className="flex items-center">
                <div className="w-12 h-1 bg-gray-700 rounded-full overflow-hidden mr-2">
                  <motion.div 
                    className={`h-full rounded-full bg-gradient-to-r ${category.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ delay: index * 0.1 + skillIndex * 0.05, duration: 0.8 }}
                  />
                </div>
                <span className={`${colors.text} font-bold text-xs`}>{skill.level}%</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  };

  return (
    <section id="skills" className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative" ref={containerRef}>
      {/* Simplified background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              Skills & Expertise
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full mb-4" />
          <p className="text-gray-300 text-base max-w-2xl mx-auto">
            A comprehensive skill set built through hands-on experience and continuous learning
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6 mb-12">
          {/* Active skill details */}
          <div className="lg:w-1/2">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/30 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-cyan-300">
                  {skillCategories[activeCategory].title}
                </h3>
                <div className="text-2xl">{skillCategories[activeCategory].icon}</div>
              </div>

              <div className="mb-6 flex justify-center">
                <RadialProgress 
                  percentage={skillCategories[activeCategory].average} 
                  color={skillCategories[activeCategory].color}
                />
              </div>

              <div className="space-y-3">
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
          </div>

          {/* Skill category cards */}
          <div className="lg:w-1/2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

        {/* Summary stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-r from-cyan-900/20 via-purple-900/20 to-cyan-900/20 backdrop-blur-sm rounded-xl border border-cyan-500/20 p-6 max-w-4xl mx-auto"
        >
          <h3 className="text-xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            Continuous Growth Mindset
          </h3>
          
          <p className="text-gray-300 leading-relaxed text-center mb-6">
            My diverse skill set reflects a journey of continuous learning and adaptation. 
            From technical expertise in cybersecurity and web development to creative problem-solving 
            in UI/UX design, I bring a holistic approach to every challenge.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {skillCategories.map((category, index) => (
              <motion.div 
                key={index} 
                className="text-center p-3 bg-gray-800/50 rounded-lg border border-gray-700/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.05, duration: 0.3 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <div className="text-xl mb-1">{category.icon}</div>
                <div className="text-cyan-300 font-bold text-lg">{category.average}%</div>
                <div className="text-gray-400 text-xs uppercase tracking-wide">Average</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
