import React, { useEffect, useState } from 'react';
import { GraduationCap, Calendar, MapPin, Award, BookOpen, Shield } from 'lucide-react';

const Education: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate items with staggered delay
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
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 relative">
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
                  <div className={`bg-gray-900/50 backdrop-blur-sm rounded-2xl border ${colors.border} p-8 hover:shadow-2xl hover:${colors.shadow} transition-all duration-300 group hover:scale-[1.02]`}>
                    {/* Header Section */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3 relative">
                        {/* Timeline Node */}
                        <div className="absolute left-8 md:left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500 opacity-30"></div>
                        <div className="absolute -left-16 md:-left-24 top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 border-4 border-black z-10 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        </div>
                          <div className={`p-3 rounded-xl ${colors.bg} ${colors.border} border group-hover:scale-110 transition-transform duration-300`}>
                            <IconComponent className={`w-6 h-6 ${colors.text}`} />
                          </div>
                          <div>
                            <h3 className={`text-2xl font-bold ${colors.text} group-hover:text-white transition-colors duration-300`}>
                              {edu.institution}
                            </h3>
                            <p className="text-white font-semibold text-lg">
                              {edu.degree}
                            </p>
                            <p className={`${colors.text} font-medium`}>
                              {edu.field}
                            </p>
                          </div>
                        </div>

                        {/* Meta Information */}
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

                      {/* Academic Status Badge */}
                      <div className={`${colors.bg} ${colors.border} border rounded-full px-4 py-2 flex items-center gap-2 mt-4 lg:mt-0`}>
                        <GraduationCap className={`w-4 h-4 ${colors.text}`} />
                        <span className={`text-sm font-semibold ${colors.text}`}>
                          {index === 0 ? 'Current' : 'Completed'}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                      {edu.description}
                    </p>

                    {/* Achievements */}
                    <div>
                      <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-200 mb-4">
                        <Award className={`w-5 h-5 ${colors.text}`} />
                        Key Highlights
                      </h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        {edu.achievements.map((achievement, achievementIndex) => (
                          <div
                            key={achievementIndex}
                            className="flex items-start gap-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-colors duration-300"
                          >
                            <div className={`w-2 h-2 rounded-full ${colors.bg} ${colors.border} border mt-2 flex-shrink-0`}></div>
                            <span className="text-gray-300 text-sm leading-relaxed">
                              {achievement}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Academic Stats Summary */}
          <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center p-6 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-cyan-500/30">
              <div className="text-3xl font-bold text-cyan-400 mb-2">4+</div>
              <div className="text-gray-400 text-sm uppercase tracking-wide">Years of Study</div>
            </div>
            
            <div className="text-center p-6 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-purple-500/30">
              <div className="text-3xl font-bold text-purple-400 mb-2">B.Tech</div>
              <div className="text-gray-400 text-sm uppercase tracking-wide">Current Degree</div>
            </div>
            
            <div className="text-center p-6 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-pink-500/30">
              <div className="text-3xl font-bold text-pink-400 mb-2">2025</div>
              <div className="text-gray-400 text-sm uppercase tracking-wide">Expected Graduation</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;