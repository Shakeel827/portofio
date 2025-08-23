import React, { useEffect, useRef, useState } from 'react';
import {
  Code2, Shield, Users, LineChart, PenTool, FileCode, ShieldCheck, MessageSquare, BrainCircuit, Users2, Award,
  Figma, Framer, GitMerge, Lock, Search, Palette, Puzzle
} from 'lucide-react';

// --- TYPES --- //
interface Skill {
  name: string;
  percentage: number;
  icon: React.ReactNode;
}

interface Category {
  id: string;
  title: string;
  color: string;
  shadow: string;
  gradient: { from: string; to: string };
  icon: React.ReactNode;
  skills: Skill[];
}

// --- DATA --- //
const skillsData: Category[] = [
  {
    id: 'ops',
    title: 'Operations & Analysis',
    color: 'from-blue-400 to-cyan-500',
    shadow: 'shadow-cyan-500/50',
    gradient: { from: '#60a5fa', to: '#06b6d4' },
    icon: <LineChart className="w-6 h-6" />,
    skills: [
      { name: 'Data Analysis', percentage: 85, icon: <LineChart size={18} /> },
      { name: 'Process Optimization', percentage: 78, icon: <GitMerge size={18} /> },
      { name: 'Research & Reporting', percentage: 82, icon: <FileCode size={18} /> },
      { name: 'Quality Assurance', percentage: 75, icon: <ShieldCheck size={18} /> },
    ],
  },
  {
    id: 'uiux',
    title: 'UI/UX Design',
    color: 'from-purple-400 to-fuchsia-500',
    shadow: 'shadow-fuchsia-500/50',
    gradient: { from: '#c084fc', to: '#d946ef' },
    icon: <Palette className="w-6 h-6" />,
    skills: [
      { name: 'Figma', percentage: 88, icon: <Figma size={18} /> },
      { name: 'Wireframing', percentage: 85, icon: <PenTool size={18} /> },
      { name: 'Prototyping', percentage: 80, icon: <Puzzle size={18} /> },
      { name: 'User Research', percentage: 75, icon: <Search size={18} /> },
    ],
  },
  {
    id: 'tech',
    title: 'Technical Skills',
    color: 'from-green-400 to-emerald-500',
    shadow: 'shadow-emerald-500/50',
    gradient: { from: '#4ade80', to: '#10b981' },
    icon: <Code2 className="w-6 h-6" />,
    skills: [
      { name: 'HTML/CSS/JS', percentage: 90, icon: <FileCode size={18} /> },
      { name: 'Python', percentage: 85, icon: <Code2 size={18} /> },
      { name: 'React', percentage: 80, icon: <Framer size={18} /> },
      { name: 'Git/GitHub', percentage: 88, icon: <GitMerge size={18} /> },
    ],
  },
  {
    id: 'cyber',
    title: 'Cybersecurity',
    color: 'from-pink-400 to-rose-500',
    shadow: 'shadow-rose-500/50',
    gradient: { from: '#f472b6', to: '#f43f5e' },
    icon: <Shield className="w-6 h-6" />,
    skills: [
      { name: 'Security Analysis', percentage: 82, icon: <ShieldCheck size={18} /> },
      { name: 'Vulnerability Assessment', percentage: 78, icon: <Search size={18} /> },
      { name: 'Risk Management', percentage: 75, icon: <LineChart size={18} /> },
      { name: 'Security Protocols', percentage: 80, icon: <Lock size={18} /> },
    ],
  },
  {
    id: 'soft',
    title: 'Soft Skills',
    color: 'from-orange-400 to-yellow-500',
    shadow: 'shadow-yellow-500/50',
    gradient: { from: '#fb923c', to: '#eab308' },
    icon: <Users className="w-6 h-6" />,
    skills: [
      { name: 'Communication', percentage: 92, icon: <MessageSquare size={18} /> },
      { name: 'Problem Solving', percentage: 88, icon: <BrainCircuit size={18} /> },
      { name: 'Teamwork', percentage: 85, icon: <Users2 size={18} /> },
      { name: 'Leadership', percentage: 80, icon: <Award size={18} /> },
    ],
  },
];

// --- COMPONENTS --- //
const SkillProgressBar: React.FC<{ 
  name: string; 
  percentage: number; 
  icon: React.ReactNode; 
  color: string; 
  isInView: boolean 
}> = ({ name, percentage, icon, color, isInView }) => {
  return (
    <div className="mb-5 w-full">
      <div className="flex items-center gap-4 mb-1.5">
        {/* Skill Name */}
        <div className="flex items-center gap-2 w-40">
          <span className="text-gray-300 font-medium text-sm whitespace-nowrap">
            {name}
          </span>
        </div>

        {/* Progress bar */}
        <div className="flex-1 relative">
          <div className="h-3 bg-gray-800/50 rounded-full overflow-hidden relative">
            {/* Fill bar */}
            <div
              className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-1000 ease-out`}
              style={{
                width: isInView ? `${percentage}%` : '0%',
              }}
            />

            {/* Moving badge (icon + percentage) */}
            <div
              className="absolute top-1/2 -translate-y-1/2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-900/80 border border-gray-700 text-xs text-white transition-all duration-1000 ease-out"
              style={{
                left: isInView ? `${percentage}%` : '0%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              {React.cloneElement(icon as React.ReactElement, {
                size: 14,
                className: "text-current"
              })}
              <span>{percentage}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CategoryAverage: React.FC<{ percentage: number; color: string }> = ({ percentage, color }) => (
  <div className="text-center">
    <p className={`text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${color}`}>
      {percentage}%
    </p>
    <p className="text-gray-400 text-sm uppercase tracking-widest">Average</p>
  </div>
);

const SkillCard: React.FC<{ category: Category; isInView: boolean }> = ({ category, isInView }) => {
  const average = Math.round(category.skills.reduce((sum, skill) => sum + skill.percentage, 0) / category.skills.length);
  const fromColor = category.gradient.from;

  return (
    <div 
      className={`bg-gray-900/50 rounded-2xl p-6 border border-gray-700/50 transition-all duration-300 hover:border-gray-500/80 hover:shadow-lg ${category.shadow}`}
      style={{ '--color-from': fromColor } as React.CSSProperties}
    >
      <div className="flex items-center gap-4 mb-6">
        <div className={`p-2 rounded-lg bg-gradient-to-br ${category.color} text-white shadow-md`}>
          {category.icon}
        </div>
        <h3 className={`text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${category.color}`}>
          {category.title}
        </h3>
      </div>
      <div className="mb-6">
        {category.skills.map((skill) => (
          <SkillProgressBar key={skill.name} {...skill} color={category.color} isInView={isInView} />
        ))}
      </div>
      <div className="pt-6 mt-6 border-t border-gray-700/50 flex flex-col items-center text-center">
        <CategoryAverage percentage={average} color={category.color} />
      </div>
    </div>
  );
};

const SkillsSection: React.FC = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (sectionRef.current) {
            observer.unobserve(sectionRef.current);
          }
        }
      },
      { threshold: 0.1 }
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

  return (
    <section id="skills" className="py-20 bg-black relative overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      {/* Add particle effect container here if desired */}
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            A comprehensive skill set built through hands-on experience and continuous learning
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {skillsData.map((category) => (
            <SkillCard key={category.id} category={category} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
