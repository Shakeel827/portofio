import React, { useState, useRef, useEffect } from 'react';

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
      skills: ["Data Analysis", "Process Optimization", "Research & Reporting", "Quality Assurance"],
      average: 80,
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "UI/UX Design",
      skills: ["Figma", "Wireframing", "Prototyping", "User Research"],
      average: 82,
      color: "from-purple-500 to-purple-600"
    },
    {
      name: "Technical Skills",
      skills: ["HTML/CSS/JS", "Python", "React", "Git/GitHub"],
      average: 86,
      color: "from-amber-500 to-amber-600"
    },
    {
      name: "Cybersecurity",
      skills: ["Security Analysis", "Vulnerability Assessment", "Risk Management", "Security Protocols"],
      average: 79,
      color: "from-green-500 to-green-600"
    },
    {
      name: "Soft Skills",
      skills: ["Communication", "Problem Solving", "Teamwork", "Leadership"],
      average: 86,
      color: "from-rose-500 to-rose-600"
    }
  ];

  const SkillProgressBar = ({ skill, percentage, color, isInView }) => {
    return (
      <div className="mb-5">
        <div className="flex justify-between items-center mb-1">
          <span className="text-gray-300 text-sm">{skill}</span>
        </div>
        <div className="h-2.5 bg-gray-800 rounded-full overflow-hidden relative">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-1000 ease-out`}
            style={{ width: isInView ? `${percentage}%` : '0%' }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 h-5 w-5 flex items-center justify-center rounded-full bg-white shadow-md">
              <span className="text-xs font-bold text-gray-800">{percentage}%</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section ref={sectionRef} className="py-12 px-6 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-2 text-center">Skills & Proficiencies</h2>
        <p className="text-gray-400 text-center mb-10">A visual representation of my skill levels</p>
        
        <div className="space-y-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-gray-800/40 p-6 rounded-xl border border-gray-700/50">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <span className="w-3 h-3 rounded-full bg-blue-500 mr-3"></span>
                {category.name}
              </h3>
              
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <SkillProgressBar 
                    key={skillIndex}
                    skill={skill}
                    percentage={category.average}
                    color={category.color}
                    isInView={isInView}
                  />
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-700 flex justify-between items-center">
                <span className="text-gray-400 text-sm uppercase tracking-wider">Average</span>
                <span className={`text-xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                  {category.average}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
