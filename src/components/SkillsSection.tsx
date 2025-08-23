import React, { useEffect, useRef, useState } from 'react';

const SkillsSection = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const skillCategories = [
    {
      name: "Operations & Analysis",
      skills: [
        { name: "Data Analysis", percentage: 80 },
        { name: "Process Optimization", percentage: 80 },
        { name: "Research & Reporting", percentage: 80 },
        { name: "Quality Assurance", percentage: 80 },
      ],
      average: 80,
      color: "from-blue-500 to-cyan-500",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      name: "UI/UX Design",
      skills: [
        { name: "Figma", percentage: 82 },
        { name: "Wireframing", percentage: 82 },
        { name: "Prototyping", percentage: 82 },
        { name: "User Research", percentage: 82 },
      ],
      average: 82,
      color: "from-purple-500 to-pink-500",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      )
    },
    {
      name: "Technical Skills",
      skills: [
        { name: "HTML/CSS/JS", percentage: 86 },
        { name: "Python", percentage: 86 },
        { name: "React", percentage: 86 },
        { name: "Git/GitHub", percentage: 86 },
      ],
      average: 86,
      color: "from-amber-500 to-orange-500",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      name: "Cybersecurity",
      skills: [
        { name: "Security Analysis", percentage: 79 },
        { name: "Vulnerability Assessment", percentage: 79 },
        { name: "Risk Management", percentage: 79 },
        { name: "Security Protocols", percentage: 79 },
      ],
      average: 79,
      color: "from-green-500 to-teal-500",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      name: "Soft Skills",
      skills: [
        { name: "Communication", percentage: 86 },
        { name: "Problem Solving", percentage: 86 },
        { name: "Teamwork", percentage: 86 },
        { name: "Leadership", percentage: 86 },
      ],
      average: 86,
      color: "from-rose-500 to-red-500",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];

  const SkillProgressBar = ({ name, percentage, color, isInView }) => {
    return (
      <div className="mb-5 w-full">
        <div className="flex items-center gap-4 mb-1.5">
          <div className="flex items-center gap-2 w-40">
            <span className="text-gray-300 font-medium text-sm whitespace-nowrap">
              {name}
            </span>
          </div>

          <div className="flex-1 relative">
            <div className="h-3 bg-gray-800/50 rounded-full overflow-hidden relative">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-1000 ease-out`}
                style={{
                  width: isInView ? `${percentage}%` : '0%',
                }}
              />

              <div
                className="absolute top-1/2 -translate-y-1/2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-900/80 border border-gray-700 text-xs text-white transition-all duration-1000 ease-out"
                style={{
                  left: isInView ? `${percentage}%` : '0%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <span>{percentage}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section ref={sectionRef} className="py-16 px-6 bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Skills & Expertise
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div 
              key={categoryIndex} 
              className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-gray-500/80 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${category.color} text-white shadow-md`}>
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold text-white">{category.name}</h3>
              </div>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <SkillProgressBar 
                    key={skillIndex} 
                    name={skill.name} 
                    percentage={skill.percentage} 
                    color={category.color}
                    isInView={isInView}
                  />
                ))}
              </div>
              
              <div className="pt-6 mt-6 border-t border-gray-700/50 flex flex-col items-center text-center">
                <p className={`text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${category.color}`}>
                  {category.average}%
                </p>
                <p className="text-gray-400 text-sm uppercase tracking-widest mt-1">Average</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
