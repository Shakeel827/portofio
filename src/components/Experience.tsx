import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Building, Calendar, MapPin, ChevronRight } from 'lucide-react';

const experiences = [
  {
    company: 'Flipkart (Iriis Payroll)',
    role: 'Junior Research Analyst',
    duration: '2024 - Present',
    location: 'Remote',
    description: [
      'Analyzed large datasets to identify trends and insights for business decision-making',
      'Collaborated with cross-functional teams to optimize operational processes',
      'Developed comprehensive reports and visualizations for stakeholder presentations',
      'Implemented data-driven solutions to improve efficiency by 25%'
    ],
    color: 'cyan'
  },
  {
    company: 'Travelplus',
    role: 'Operations Intern',
    duration: '2023 - 2024',
    location: 'Hybrid',
    description: [
      'Streamlined booking processes and improved customer satisfaction metrics',
      'Managed vendor relationships and negotiated service agreements',
      'Implemented quality assurance protocols for travel operations',
      'Reduced processing time by 30% through process optimization'
    ],
    color: 'purple'
  },
  {
    company: 'Cognifyz Technologies',
    role: 'UI/UX Intern',
    duration: '2023',
    location: 'Remote',
    description: [
      'Designed user-centered interfaces for web and mobile applications',
      'Conducted user research and usability testing to inform design decisions',
      'Created wireframes, prototypes, and high-fidelity mockups using Figma',
      'Collaborated with developers to ensure pixel-perfect implementation'
    ],
    color: 'pink'
  },
  {
    company: 'Codsoft',
    role: 'UI/UX Intern',
    duration: '2023',
    location: 'Remote',
    description: [
      'Developed responsive web designs following modern design principles',
      'Created design systems and component libraries for consistency',
      'Performed competitive analysis and market research',
      'Presented design solutions to clients and stakeholders'
    ],
    color: 'green'
  }
];

const colorMap = {
  cyan: 'border-cyan-500/30 bg-cyan-500/5 hover:border-cyan-500/50',
  purple: 'border-purple-500/30 bg-purple-500/5 hover:border-purple-500/50',
  pink: 'border-pink-500/30 bg-pink-500/5 hover:border-pink-500/50',
  green: 'border-green-500/30 bg-green-500/5 hover:border-green-500/50'
};

const iconColorMap = {
  cyan: 'text-cyan-400',
  purple: 'text-purple-400',
  pink: 'text-pink-400',
  green: 'text-green-400'
};

const Experience: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          experiences.forEach((_, index) => {
            setTimeout(() => {
              setVisibleItems(prev => [...prev, index]);
            }, index * 200);
          });
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById('experience');
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
    <section id="experience" className="py-20 relative">
      <motion.div
        className="fixed w-96 h-96 pointer-events-none z-10"
        style={{
          background: "radial-gradient(circle, rgba(236, 72, 153, 0.08) 0%, transparent 70%)",
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent transform -translate-x-1/2 hidden md:block">
        <motion.div
          className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-cyan-400 to-transparent"
          animate={{
            y: [0, 200, 400, 600, 800],
            opacity: [1, 0.8, 0.6, 0.4, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                Professional Experience
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
            <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto">
              Building expertise across operations, design, and analysis through hands-on experience at leading companies
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className={`relative transition-all duration-700 ${
                    visibleItems.includes(index) 
                      ? 'opacity-100 translate-x-0' 
                      : `opacity-0 ${index % 2 === 0 ? '-translate-x-10' : 'translate-x-10'}`
                  }`}
                >
                  <div className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-center`}>
                    <motion.div 
                      className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 border-4 border-black z-10 flex items-center justify-center"
                      animate={{
                        scale: [1, 1.3, 1],
                        boxShadow: [
                          "0 0 0 0 rgba(6, 182, 212, 0.4)",
                          "0 0 0 15px rgba(6, 182, 212, 0)",
                          "0 0 0 0 rgba(6, 182, 212, 0.4)"
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3
                      }}
                      whileHover={{
                        scale: 1.5,
                        rotate: 180
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
                          delay: index * 0.2
                        }}
                      />
                    </motion.div>

                    <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                      <motion.div 
                        className={`p-6 rounded-xl border backdrop-blur-sm transition-all duration-300 group ${colorMap[exp.color as keyof typeof colorMap]} relative overflow-hidden`}
                        whileHover={{ 
                          scale: 1.05,
                          y: -10,
                          boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)"
                        }}
                        initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100 }}
                        animate={visibleItems.includes(index) ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: index * 0.2, duration: 0.8, ease: "backOut" }}
                      >
                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover:opacity-10"
                          animate={{
                            background: [
                              "linear-gradient(45deg, transparent, rgba(6, 182, 212, 0.1), transparent)",
                              "linear-gradient(135deg, transparent, rgba(139, 92, 246, 0.1), transparent)",
                              "linear-gradient(225deg, transparent, rgba(236, 72, 153, 0.1), transparent)",
                              "linear-gradient(315deg, transparent, rgba(6, 182, 212, 0.1), transparent)"
                            ]
                          }}
                          transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        />

                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <motion.h3 
                              className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300"
                              whileHover={{
                                scale: 1.05,
                                x: 5
                              }}
                            >
                              {exp.company}
                            </motion.h3>
                            <motion.p 
                              className={`font-semibold mt-1 ${iconColorMap[exp.color as keyof typeof iconColorMap]}`}
                              animate={{
                                color: [
                                  iconColorMap[exp.color as keyof typeof iconColorMap].replace('text-', '#'),
                                  "#ffffff",
                                  iconColorMap[exp.color as keyof typeof iconColorMap].replace('text-', '#')
                                ]
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            >
                              {exp.role}
                            </motion.p>
                          </div>
                          <motion.div
                            animate={{
                              rotate: [0, 10, -10, 0],
                              scale: [1, 1.1, 1]
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            <Building className={`w-6 h-6 ${iconColorMap[exp.color as keyof typeof iconColorMap]} opacity-80 group-hover:opacity-100 transition-opacity duration-300`} />
                          </motion.div>
                        </div>

                        <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{exp.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{exp.location}</span>
                          </div>
                        </div>

                        <ul className="space-y-2">
                          {exp.description.map((item, idx) => (
                            <motion.li 
                              key={idx} 
                              className="flex items-start gap-2 text-gray-300 text-sm leading-relaxed"
                              initial={{ opacity: 0, x: -20 }}
                              animate={visibleItems.includes(index) ? { opacity: 1, x: 0 } : {}}
                              transition={{ delay: index * 0.2 + idx * 0.1, duration: 0.5 }}
                              whileHover={{ x: 5, color: "#ffffff" }}
                            >
                              <motion.div
                                animate={{
                                  rotate: [0, 90, 0],
                                  scale: [1, 1.2, 1]
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: idx * 0.3
                                }}
                              >
                                <ChevronRight className={`w-4 h-4 mt-0.5 ${iconColorMap[exp.color as keyof typeof iconColorMap]} flex-shrink-0`} />
                              </motion.div>
                              <motion.span
                                whileHover={{
                                  color: "#ffffff"
                                }}
                              >
                                {item}
                              </motion.span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
