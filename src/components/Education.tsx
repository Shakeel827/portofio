import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Award, BookOpen, Shield } from 'lucide-react';

const educationData = [
  {
    institution: 'Bapatla Engineering College',
    degree: 'Bachelor of Technology',
    field: 'Cybersecurity',
    duration: '2021 - 2025',
    location: 'Bapatla, Andhra Pradesh',
    description: 'Specialized in cybersecurity fundamentals, network security, ethical hacking, and digital forensics. Active participant in technical clubs and security awareness programs.',
    achievements: [
      'Relevant coursework in Network Security, Cryptography, and Ethical Hacking',
      'Participated in cybersecurity workshops and seminars',
      'Member of the Computer Science Technical Club',
      'Completed multiple security-related projects and case studies'
    ],
    color: 'cyan',
    icon: Shield
  },
  {
    institution: 'Narayana Junior College',
    degree: 'Intermediate Education',
    field: 'Mathematics, Physics, Chemistry (MPC)',
    duration: '2019 - 2021',
    location: 'Andhra Pradesh',
    description: 'Strong foundation in mathematics and sciences, developing analytical thinking and problem-solving skills that form the basis for technical expertise.',
    achievements: [
      'Excellent performance in Mathematics and Physics',
      'Developed strong analytical and logical reasoning skills',
      'Participated in science exhibitions and competitions',
      'Foundation for technical education and engineering concepts'
    ],
    color: 'purple',
    icon: BookOpen
  }
];

const colorMap = {
  cyan: {
    gradient: 'from-cyan-500 to-blue-500',
    border: 'border-cyan-500/30',
    text: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    shadow: 'shadow-cyan-500/25'
  },
  purple: {
    gradient: 'from-purple-500 to-pink-500',
    border: 'border-purple-500/30',
    text: 'text-purple-400',
    bg: 'bg-purple-500/10',
    shadow: 'shadow-purple-500/25'
  }
};

const Education: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          educationData.forEach((_, index) => {
            setTimeout(() => {
              setVisibleItems(prev => [...prev, index]);
            }, index * 300);
          });
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById('education');
    if (element) observer.observe(element);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section id="education" className="py-20 relative">
      <motion.div
        className="fixed w-96 h-96 pointer-events-none z-10"
        style={{
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)",
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              rotate: [0, 360],
              scale: [0.5, 1, 0.5],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: Math.random() * 10 + 8,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          >
            {['🎓', '📚', '🏆', '📜', '🔬', '💡', '🎯', '⭐'][i]}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                Education Journey
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
            <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto">
              Building a strong academic foundation in cybersecurity and technical disciplines
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto space-y-12">
            {educationData.map((edu, index) => {
              const colors = colorMap[edu.color as keyof typeof colorMap];
              const IconComponent = edu.icon;
              
              return (
                <div
                  key={index}
                  className={`transition-all duration-700 ${
                    visibleItems.includes(index) 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-10'
                  }`}
                >
                  <motion.div 
                    className={`bg-gray-900/50 backdrop-blur-sm rounded-2xl border ${colors.border} p-8 transition-all duration-300 group relative overflow-hidden`}
                    whileHover={{ 
                      scale: 1.03,
                      y: -10,
                      boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)"
                    }}
                    initial={{ opacity: 0, y: 50, rotateX: -15 }}
                    animate={visibleItems.includes(index) ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                    transition={{ delay: index * 0.3, duration: 0.8, ease: "backOut" }}
                  >
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-5"
                      animate={{
                        background: [
                          `linear-gradient(45deg, transparent, ${colors.bg.replace('bg-', 'rgba(').replace('/10', ', 0.1)')}, transparent)`,
                          `linear-gradient(135deg, transparent, ${colors.bg.replace('bg-', 'rgba(').replace('/10', ', 0.1)')}, transparent)`,
                          `linear-gradient(225deg, transparent, ${colors.bg.replace('bg-', 'rgba(').replace('/10', ', 0.1)')}, transparent)`,
                          `linear-gradient(315deg, transparent, ${colors.bg.replace('bg-', 'rgba(').replace('/10', ', 0.1)')}, transparent)`
                        ]
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />

                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3 relative">
                          <motion.div 
                            className="absolute left-8 md:left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500 opacity-30"
                            animate={{
                              opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                          <motion.div 
                            className="absolute -left-16 md:-left-24 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 border-4 border-black z-10 flex items-center justify-center"
                            animate={{
                              scale: [1, 1.2, 1],
                              boxShadow: [
                                "0 0 0 0 rgba(6, 182, 212, 0.4)",
                                "0 0 0 10px rgba(6, 182, 212, 0)",
                                "0 0 0 0 rgba(6, 182, 212, 0.4)"
                              ]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: index * 0.5
                            }}
                          >
                            <motion.div 
                              className="w-2 h-2 bg-white rounded-full"
                              animate={{
                                scale: [1, 1.5, 1]
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: index * 0.3
                              }}
                            />
                          </motion.div>
                          
                          <motion.div 
                            className={`p-3 rounded-xl ${colors.bg} ${colors.border} border transition-transform duration-300`}
                            whileHover={{ scale: 1.15, rotate: 5 }}
                            animate={{
                              rotate: [0, 5, -5, 0]
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            <motion.div
                              animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 10, -10, 0]
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: index * 0.4
                              }}
                            >
                              <IconComponent className={`w-6 h-6 ${colors.text}`} />
                            </motion.div>
                          </motion.div>
                          <div>
                            <motion.h3 
                              className={`text-2xl font-bold ${colors.text} group-hover:text-white transition-colors duration-300`}
                              whileHover={{
                                scale: 1.05,
                                x: 5
                              }}
                            >
                              {edu.institution}
                            </motion.h3>
                            <motion.p 
                              className="text-white font-semibold text-lg"
                              animate={{
                                opacity: [0.8, 1, 0.8]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            >
                              {edu.degree}
                            </motion.p>
                            <motion.p 
                              className={`${colors.text} font-medium`}
                              animate={{
                                color: [
                                  colors.text.replace('text-', '#'),
                                  "#ffffff",
                                  colors.text.replace('text-', '#')
                                ]
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            >
                              {edu.field}
                            </motion.p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-6 text-gray-400 mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span className="font-medium">{edu.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span className="font-medium">{edu.location}</span>
                          </div>
                        </div>
                      </div>

                      <motion.div 
                        className={`${colors.bg} ${colors.border} border rounded-full px-4 py-2 flex items-center gap-2 mt-4 lg:mt-0`}
                        whileHover={{ scale: 1.1, y: -2 }}
                        animate={{
                          boxShadow: [
                            "0 0 0 0 rgba(6, 182, 212, 0.2)",
                            "0 0 0 8px rgba(6, 182, 212, 0)",
                            "0 0 0 0 rgba(6, 182, 212, 0.2)"
                          ]
                        }}
                        transition={{
                          boxShadow: {
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.6
                          }
                        }}
                      >
                        <motion.div
                          animate={{
                            rotate: [0, 15, -15, 0],
                            scale: [1, 1.2, 1]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <GraduationCap className={`w-4 h-4 ${colors.text}`} />
                        </motion.div>
                        <motion.span 
                          className={`text-sm font-semibold ${colors.text}`}
                          animate={{
                            color: [
                              colors.text.replace('text-', '#'),
                              "#ffffff",
                              colors.text.replace('text-', '#')
                            ]
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          {index === 0 ? 'Current' : 'Completed'}
                        </motion.span>
                      </motion.div>
                    </div>

                    <motion.p 
                      className="text-gray-300 leading-relaxed mb-6 text-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={visibleItems.includes(index) ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: index * 0.3 + 0.2, duration: 0.6 }}
                    >
                      {edu.description}
                    </motion.p>

                    <div>
                      <motion.h4 
                        className="flex items-center gap-2 text-lg font-semibold text-gray-200 mb-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={visibleItems.includes(index) ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: index * 0.3 + 0.4, duration: 0.6 }}
                      >
                        <motion.div
                          animate={{
                            rotate: [0, 20, -20, 0],
                            scale: [1, 1.3, 1]
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <Award className={`w-5 h-5 ${colors.text}`} />
                        </motion.div>
                        Key Highlights
                      </motion.h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        {edu.achievements.map((achievement, achievementIndex) => (
                          <motion.div
                            key={achievementIndex}
                            className="flex items-start gap-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-colors duration-300"
                            initial={{ opacity: 0, x: -30 }}
                            animate={visibleItems.includes(index) ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: index * 0.3 + 0.6 + achievementIndex * 0.1, duration: 0.5 }}
                            whileHover={{ 
                              x: 5, 
                              backgroundColor: "rgba(31, 41, 55, 0.8)",
                              scale: 1.02
                            }}
                          >
                            <motion.div 
                              className={`w-2 h-2 rounded-full ${colors.bg} ${colors.border} border mt-2 flex-shrink-0`}
                              animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.7, 1, 0.7]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: achievementIndex * 0.3
                              }}
                            />
                            <motion.span 
                              className="text-gray-300 text-sm leading-relaxed"
                              whileHover={{
                                color: "#ffffff"
                              }}
                            >
                              {achievement}
                            </motion.span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          <motion.div 
            className="mt-16 grid md:grid-cols-3 gap-6 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <motion.div 
              className="text-center p-6 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-cyan-500/30"
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                borderColor: "rgba(6, 182, 212, 0.6)",
                boxShadow: "0 10px 25px rgba(6, 182, 212, 0.2)"
              }}
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(6, 182, 212, 0.2)",
                  "0 0 0 8px rgba(6, 182, 212, 0)",
                  "0 0 0 0 rgba(6, 182, 212, 0.2)"
                ]
              }}
              transition={{
                boxShadow: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              <motion.div 
                className="text-3xl font-bold text-cyan-400 mb-2"
                animate={{
                  scale: [1, 1.1, 1],
                  color: ["#06b6d4", "#8b5cf6", "#06b6d4"]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                4+
              </motion.div>
              <div className="text-gray-400 text-sm uppercase tracking-wide">Years of Study</div>
            </motion.div>
            
            <motion.div 
              className="text-center p-6 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-purple-500/30"
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                borderColor: "rgba(139, 92, 246, 0.6)",
                boxShadow: "0 10px 25px rgba(139, 92, 246, 0.2)"
              }}
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(139, 92, 246, 0.2)",
                  "0 0 0 8px rgba(139, 92, 246, 0)",
                  "0 0 0 0 rgba(139, 92, 246, 0.2)"
                ]
              }}
              transition={{
                boxShadow: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }
              }}
            >
              <motion.div 
                className="text-3xl font-bold text-purple-400 mb-2"
                animate={{
                  scale: [1, 1.1, 1],
                  color: ["#8b5cf6", "#ec4899", "#8b5cf6"]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                B.Tech
              </motion.div>
              <div className="text-gray-400 text-sm uppercase tracking-wide">Current Degree</div>
            </motion.div>
            
            <motion.div 
              className="text-center p-6 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-pink-500/30"
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                borderColor: "rgba(236, 72, 153, 0.6)",
                boxShadow: "0 10px 25px rgba(236, 72, 153, 0.2)"
              }}
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(236, 72, 153, 0.2)",
                  "0 0 0 8px rgba(236, 72, 153, 0)",
                  "0 0 0 0 rgba(236, 72, 153, 0.2)"
                ]
              }}
              transition={{
                boxShadow: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }
              }}
            >
              <motion.div 
                className="text-3xl font-bold text-pink-400 mb-2"
                animate={{
                  scale: [1, 1.1, 1],
                  color: ["#ec4899", "#06b6d4", "#ec4899"]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                2025
              </motion.div>
              <div className="text-gray-400 text-sm uppercase tracking-wide">Expected Graduation</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;
