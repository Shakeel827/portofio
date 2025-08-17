import React, { useEffect, useState } from 'react';
import { Building, Calendar, MapPin, ChevronRight } from 'lucide-react';

const Experience: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate items with staggered delay
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
                  className={`relative transition-all duration-700 delay-${index * 100} ${
                    visibleItems.includes(index) 
                      ? 'opacity-100 translate-x-0' 
                      : `opacity-0 ${index % 2 === 0 ? '-translate-x-10' : 'translate-x-10'}`
                  }`}
                >
                  <div className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-center`}>
                    {/* Timeline Node */}
                    <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 border-4 border-black z-10 animate-pulse flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>

                    {/* Content Card */}
                    <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                      <div className={`p-6 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl group ${colorMap[exp.color as keyof typeof colorMap]}`}>
                        {/* Company Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                              {exp.company}
                            </h3>
                            <p className={`font-semibold mt-1 ${iconColorMap[exp.color as keyof typeof iconColorMap]}`}>
                              {exp.role}
                            </p>
                          </div>
                          <Building className={`w-6 h-6 ${iconColorMap[exp.color as keyof typeof iconColorMap]} opacity-80`} />
                        </div>

                        {/* Meta Information */}
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

                        {/* Description */}
                        <ul className="space-y-2">
                          {exp.description.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm leading-relaxed">
                              <ChevronRight className={`w-4 h-4 mt-0.5 ${iconColorMap[exp.color as keyof typeof iconColorMap]} flex-shrink-0`} />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
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