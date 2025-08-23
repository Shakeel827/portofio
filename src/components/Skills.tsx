import React, { useEffect, useState } from 'react';
import { 
  BarChart3, 
  Palette, 
  Code, 
  Shield, 
  MessageSquare, 
  Lightbulb, 
  Users,
  Database,
  Globe,
  Figma,
  LucideIcon
} from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  icon: LucideIcon;
}

interface SkillCategory {
  title: string;
  icon: LucideIcon;
  color: keyof typeof colorMap;
  skills: Skill[];
}

interface ColorVariant {
  gradient: string;
  border: string;
  text: string;
  bg: string;
  glow: string;
  progressBg: string;
}

const colorMap: Record<string, ColorVariant> = {
  cyan: {
    gradient: 'from-cyan-400 via-cyan-500 to-blue-500',
    border: 'border-cyan-500/30',
    text: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    glow: '#06b6d4',
    progressBg: 'from-cyan-900/20 to-cyan-800/30'
  },
  purple: {
    gradient: 'from-purple-400 via-purple-500 to-pink-500',
    border: 'border-purple-500/30',
    text: 'text-purple-400',
    bg: 'bg-purple-500/10',
    glow: '#a855f7',
    progressBg: 'from-purple-900/20 to-purple-800/30'
  },
  green: {
    gradient: 'from-green-400 via-green-500 to-emerald-500',
    border: 'border-green-500/30',
    text: 'text-green-400',
    bg: 'bg-green-500/10',
    glow: '#22c55e',
    progressBg: 'from-green-900/20 to-green-800/30'
  },
  pink: {
    gradient: 'from-pink-400 via-pink-500 to-rose-500',
    border: 'border-pink-500/30',
    text: 'text-pink-400',
    bg: 'bg-pink-500/10',
    glow: '#ec4899',
    progressBg: 'from-pink-900/20 to-pink-800/30'
  },
  orange: {
    gradient: 'from-orange-400 via-orange-500 to-red-500',
    border: 'border-orange-500/30',
    text: 'text-orange-400',
    bg: 'bg-orange-500/10',
    glow: '#f97316',
    progressBg: 'from-orange-900/20 to-orange-800/30'
  }
};

const Skills: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedSkills, setAnimatedSkills] = useState<number[]>([]);

  const skillCategories: SkillCategory[] = [
    {
      title: 'Operations & Analysis',
      icon: BarChart3,
      color: 'cyan',
      skills: [
        { name: 'Data Analysis', level: 85, icon: BarChart3 },
        { name: 'Process Optimization', level: 78, icon: Database },
        { name: 'Research & Reporting', level: 82, icon: Globe },
        { name: 'Quality Assurance', level: 75, icon: Shield }
      ]
    },
    {
      title: 'UI/UX Design',
      icon: Palette,
      color: 'purple',
      skills: [
        { name: 'Figma', level: 88, icon: Figma },
        { name: 'Wireframing', level: 85, icon: Palette },
        { name: 'Prototyping', level: 80, icon: Lightbulb },
        { name: 'User Research', level: 75, icon: Users }
      ]
    },
    {
      title: 'Technical Skills',
      icon: Code,
      color: 'green',
      skills: [
        { name: 'HTML/CSS/JS', level: 90, icon: Code },
        { name: 'Python', level: 85, icon: Code },
        { name: 'React', level: 80, icon: Globe },
        { name: 'Git/GitHub', level: 88, icon: Database }
      ]
    },
    {
      title: 'Cybersecurity',
      icon: Shield,
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
                <div className={`h-3 rounded-full relative overflow-hidden bg-gradient-to-r ${colors.progressBg} border ${colors.border} mb-1`}>
                  <div 
                    className={`h-full rounded-full bg-gradient-to-r ${colors.gradient} transition-all duration-1000 ease-out relative`}
                    style={{
                      width: animatedSkills.includes(globalIndex) ? `${skill.level}%` : '0%',
                      boxShadow: animatedSkills.includes(globalIndex) 
                        ? `0 0 10px ${colors.glow}60` 
                        : 'none'
                    }}
                  >
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                    
                    {/* Star Icon at the end of progress bar */}
                    <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex items-center justify-center">
                      <div className={`w-5 h-5 rounded-full ${colors.bg} border ${colors.border} flex items-center justify-center`}>
                        <span className="text-xs">⭐</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Category Stats */}
        <div className={`mt-6 pt-4 border-t ${colors.border} flex justify-center relative`}>
          <div className="text-center group/stats">
            {/* Animated Background Circle */}
            <div className={`absolute inset-0 w-16 h-16 rounded-full ${colors.bg} opacity-20 group-hover/stats:opacity-40 transition-opacity duration-300 -z-10`}></div>
            
            <div className={`text-2xl font-bold ${colors.text} group-hover/stats:scale-110 transition-transform duration-300`}>
              {Math.round(category.skills.reduce((sum: number, skill: Skill) => sum + skill.level, 0) / category.skills.length)}%
            </div>
            <div className="text-xs text-gray-400 uppercase tracking-wide group-hover/stats:text-gray-300 transition-colors duration-300">
              Average
            </div>
            
            {/* Floating Achievement Icons */}
            <div className="absolute -top-2 -right-2 opacity-0 group-hover/stats:opacity-100 transition-opacity duration-500">
              <div className="w-4 h-4 bg-yellow-400 rounded-full animate-bounce"></div>
            </div>
            <div className="absolute -bottom-2 -left-2 opacity-0 group-hover/stats:opacity-100 transition-opacity duration-500" style={{ animationDelay: '0.2s' }}>
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  };

  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                Skills & Expertise
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
            <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto">
              A comprehensive skill set built through hands-on experience and continuous learning
            </p>
          </div>

          <div className="flex flex-col items-center gap-8">
            <div className="grid md:grid-cols-3 gap-8">
              {firstRowSkills.map((category, index) => renderSkillCategory(category, index))}
            </div>
            <div className="grid md:grid-cols-2 gap-8 justify-center">
              {secondRowSkills.map((category, index) => renderSkillCategory(category, index, true))}
            </div>
          </div>

          {/* Overall Summary */}
          <div className="mt-16 text-center">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                Continuous Growth Mindset
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                My diverse skill set reflects a journey of continuous learning and adaptation. 
                From technical expertise in cybersecurity and web development to creative problem-solving 
                in UI/UX design, I bring a holistic approach to every challenge. My experience in operations 
                and data analysis complements my technical skills, enabling me to build solutions that are 
                both innovative and practical.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;