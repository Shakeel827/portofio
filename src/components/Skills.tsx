import React, { useEffect, useState } from 'react';
      color: 'pink',
      skills: [
        { name: 'Security Analysis', level: 82, icon: Shield },
        { name: 'Vulnerability Assessment', level: 78, icon: Shield },
        { name: 'Risk Management', level: 75, icon: Database },
        { name: 'Security Protocols', level: 80, icon: Globe }
      ]
    },
    {
      title: 'Soft Skills',
      icon: MessageSquare,
      color: 'orange',
      skills: [
        { name: 'Communication', level: 92, icon: MessageSquare },
        { name: 'Problem Solving', level: 88, icon: Lightbulb },
        { name: 'Teamwork', level: 85, icon: Users },
        { name: 'Leadership', level: 80, icon: Users }
      ]
    }
  ];

  const firstRowSkills = skillCategories.slice(0, 3);
  const secondRowSkills = skillCategories.slice(3, 5);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate skill bars with staggered delay
          let index = 0;
          skillCategories.forEach((category) => {
            category.skills.forEach((_, skillIndex) => {
              setTimeout(() => {
                setAnimatedSkills(prev => [...prev, index]);
                index++;
              }, index * 100);
            });
          });
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById('skills');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const renderSkillCategory = (category: SkillCategory, categoryIndex: number, isSecondRow: boolean = false) => {
    const colors = colorMap[category.color];
    const CategoryIcon = category.icon;
    const baseCategoryIndex = isSecondRow ? 3 : 0;

    return (
      <div 
        key={categoryIndex}
        className={`relative p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl group ${colors.border} ${colors.bg}`}
        style={{'--glow-color': colors.glow} as React.CSSProperties}
      >
        {/* Glow Effect */}
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-70 transition-opacity duration-300 blur-lg"></div>
        <div className="relative">
        {/* Category Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${colors.bg} border ${colors.border}`}>
              <CategoryIcon className={`w-6 h-6 ${colors.text}`} />
            </div>
            <h2 className={`text-xl font-bold ${colors.text}`}>
              {category.title}
            </h2>
          </div>
        </div>

        {/* Skills List */}
        <div className="space-y-5">
          {category.skills.map((skill: Skill, skillIndex: number) => {
            const globalIndex = (baseCategoryIndex + categoryIndex) * 4 + skillIndex;
            const SkillIcon = skill.icon;
            
            return (
              <div key={skillIndex} className="group/skill">
                {/* Skill Name and Percentage */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg ${colors.bg} border ${colors.border}`}>
                      <SkillIcon className={`w-4 h-4 ${colors.text}`} />
                    </div>
                    <h3 className={`text-base font-medium ${colors.text}`}>
                      {skill.name}
                    </h3>
                  </div>
                  <div className={`px-3 py-1 rounded-full ${colors.bg} border ${colors.border}`}>
                    <span className={`text-sm font-bold ${colors.text}`}>
                      {skill.level}%
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className={`h-3 rounded-full relative overflow-hidden bg-gradient-to-r ${colors.progressBg} border ${colors.border}`}>
                  <div 
                    className={`h-full rounded-full bg-gradient-to-r ${colors.gradient} transition-all duration-1000 ease-out`}
                    style={{
                      width: animatedSkills.includes(globalIndex) ? `${skill.level}%` : '0%',
                      boxShadow: animatedSkills.includes(globalIndex) 
                        ? `0 0 10px ${colors.glow}60` 
                        : 'none'
                    }}
                  >
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                  </div>
