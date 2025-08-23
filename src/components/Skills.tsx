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
    gradient: 'from-cyan-400 to-cyan-600',
    border: 'border-cyan-500/30',
    text: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    glow: '#06b6d4',
    progressBg: 'from-cyan-900/20 to-cyan-800/30'
  },
  purple: {
    gradient: 'from-purple-400 to-purple-600',
    border: 'border-purple-500/30',
    text: 'text-purple-400',
    bg: 'bg-purple-500/10',
    glow: '#a855f7',
    progressBg: 'from-purple-900/20 to-purple-800/30'
  },
  green: {
    gradient: 'from-green-400 to-green-600',
    border: 'border-green-500/30',
    text: 'text-green-400',
    bg: 'bg-green-500/10',
    glow: '#22c55e',
    progressBg: 'from-green-900/20 to-green-800/30'
  },
  pink: {
    gradient: 'from-pink-400 to-pink-600',
    border: 'border-pink-500/30',
    text: 'text-pink-400',
    bg: 'bg-pink-500/10',
    glow: '#ec4899',
    progressBg: 'from-pink-900/20 to-pink-800/30'
  },
  orange: {
    gradient: 'from-orange-400 to-orange-600',
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
        { name: 'Data Analysis', level: 80, icon: BarChart3 },
        { name: 'Process Optimization', level: 80, icon: Database },
        { name: 'Research & Reporting', level: 80, icon: Globe },
        { name: 'Quality Assurance', level: 80, icon: Shield }
      ]
    },
    {
      title: 'UI/UX Design',
      icon: Palette,
      color: 'purple',
      skills: [
        { name: 'Figma', level: 82, icon: Figma },
        { name: 'Wireframing', level: 82, icon: Palette },
        { name: 'Prototyping', level: 82, icon: Lightbulb },
        { name: 'User Research', level: 82, icon: Users }
      ]
    },
    {
      title: 'Technical Skills',
      icon: Code,
      color: 'green',
      skills: [
        { name: 'HTML/CSS/JS', level: 86, icon: Code },
        { name: 'Python', level: 86, icon: Code },
        { name: 'React', level: 86, icon: Globe },
        { name: 'Git/GitHub', level: 86, icon: Database }
      ]
    },
    {
      title: 'Cybersecurity',
      icon: Shield,
      color: 'pink',
      skills: [
        { name: 'Security Analysis', level: 79, icon: Shield },
        { name: 'Vulnerability Assessment', level: 79, icon: Shield },
        { name: 'Risk Management', level: 79, icon: Database },
        { name: 'Security Protocols', level: 79, icon: Globe }
      ]
    },
    {
      title: 'Soft Skills',
      icon: MessageSquare,
      color: 'orange',
      skills: [
        { name: 'Communication', level: 86, icon: MessageSquare },
        { name: 'Problem Solving', level: 86, icon: Lightbulb },
        { name: 'Teamwork', level: 86, icon: Users },
        { name: 'Leadership', level: 86, icon: Users }
      ]
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate skill bars with staggered delay
          let index = 0;
          const timeouts: NodeJS.Timeout[] = [];
          
          skillCategories.forEach((category) => {
            category.skills.forEach((_, skillIndex) => {
              timeouts.push(setTimeout(() => {
                setAnimatedSkills(prev => [...prev, index]);
                index++;
              }, index * 100));
            });
          });
          
          return () => timeouts.forEach(clearTimeout);
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

  const renderSkillCategory = (category: SkillCategory, categoryIndex: number) => {
    const colors = colorMap[category.color];
    const CategoryIcon = category.icon;

    return (
      <div 
        key={categoryIndex}
        className={`relative p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] ${colors.border} ${colors.bg}`}
      >
        {/* Category Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className={`p-2 rounded-lg ${colors.bg} border ${colors.border}`}>
            <CategoryIcon className={`w-6 h-6 ${colors.text}`} />
          </div>
          <h2 className={`text-xl font-bold ${colors.text}`}>
            {category.title}
          </h2>
        </div>

        {/* Skills List */}
        <div className="space-y-5">
          {category.skills.map((skill: Skill, skillIndex: number) => {
            const globalIndex = categoryIndex * 4 + skillIndex;
            const SkillIcon = skill.icon;
            
            return (
              <div key={skillIndex} className="group/skill">
                {/* Skill Name and Percentage */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg ${colors.bg} border ${colors.border}`}>
                      <SkillIcon className={`w-4 h-4 ${colors.text}`} />
                    </div>
                    <span className={`text-sm font-medium ${colors.text}`}>
                      {skill.name}
                    </span>
                  </div>
                  <span className={`text-sm font-bold ${colors.text}`}>
                    {skill.level}%
                  </span>
                </div>

                {/* Progress Bar Container */}
                <div className="relative h-2.5 mb-4">
                  {/* Background Bar */}
                  <div className={`absolute top-0 left-0 w-full h-full rounded-full ${colors.progressBg} border ${colors.border}`}></div>
                  
                  {/* Progress Fill */}
                  <div 
                    className={`absolute top-0 left-0 h-full rounded-full bg-gradient-to-r ${colors.gradient} transition-all duration-1000 ease-out`}
                    style={{
                      width: animatedSkills.includes(globalIndex) ? `${skill.level}%` : '0%',
                    }}
                  ></div>
                  
                  {/* Percentage Badge at the end of the bar */}
                  <div 
                    className={`absolute top-1/2 w-5 h-5 rounded-full ${colors.bg} border ${colors.border} flex items-center justify-center transform -translate-y-1/2 transition-all duration-1000 ease-out`}
                    style={{
                      left: animatedSkills.includes(globalIndex) ? `${skill.level}%` : '0%',
                    }}
                  >
                    <span className="text-xs">{skill.level}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Category Average */}
        <div className={`mt-6 pt-4 border-t ${colors.border} flex justify-between items-center`}>
          <span className="text-sm text-gray-400 uppercase tracking-wider">Average</span>
          <span className={`text-xl font-bold ${colors.text}`}>
            {Math.round(category.skills.reduce((sum: number, skill: Skill) => sum + skill.level, 0) / category.skills.length)}%
          </span>
        </div>
      </div>
    );
  };

  return (
    <section id="skills" className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                Skills & Expertise
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A comprehensive skill set built through hands-on experience and continuous learning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {skillCategories.map((category, index) => renderSkillCategory(category, index))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
