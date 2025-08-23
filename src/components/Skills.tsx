import React, { useEffect, useState } from "react";
import {
  Code2, Shield, Users, LineChart, PenTool, FileCode,
  ShieldCheck, MessageSquare, BrainCircuit, Users2, Award,
  Lock, Search, Palette, Puzzle
} from "lucide-react";

// --- TYPES --- //
interface Skill {
  name: string;
  percentage: number;
  icon: JSX.Element;
}

// --- DATA --- //
const skills: Skill[] = [
  { name: "Frontend Development", percentage: 85, icon: <Code2 className="w-5 h-5" /> },
  { name: "Cybersecurity", percentage: 75, icon: <Shield className="w-5 h-5" /> },
  { name: "Team Collaboration", percentage: 90, icon: <Users className="w-5 h-5" /> },
  { name: "Data Analysis", percentage: 70, icon: <LineChart className="w-5 h-5" /> },
  { name: "UI/UX Design", percentage: 80, icon: <PenTool className="w-5 h-5" /> },
  { name: "Full Stack Development", percentage: 78, icon: <FileCode className="w-5 h-5" /> },
  { name: "Vulnerability Testing", percentage: 72, icon: <ShieldCheck className="w-5 h-5" /> },
  { name: "Communication", percentage: 88, icon: <MessageSquare className="w-5 h-5" /> },
  { name: "AI & ML", percentage: 65, icon: <BrainCircuit className="w-5 h-5" /> },
  { name: "Leadership", percentage: 82, icon: <Users2 className="w-5 h-5" /> },
  { name: "Achievements", percentage: 60, icon: <Award className="w-5 h-5" /> },
  { name: "Ethical Hacking", percentage: 76, icon: <Lock className="w-5 h-5" /> },
  { name: "Problem Solving", percentage: 84, icon: <Puzzle className="w-5 h-5" /> },
  { name: "Research", percentage: 73, icon: <Search className="w-5 h-5" /> },
  { name: "Creativity", percentage: 79, icon: <Palette className="w-5 h-5" /> },
];

// --- COMPONENT --- //
const SkillsShowcase: React.FC = () => {
  const [progress, setProgress] = useState<number[]>(skills.map(() => 0));

  useEffect(() => {
    const timers = skills.map((skill, index) =>
      setTimeout(() => {
        setProgress(prev => {
          const updated = [...prev];
          updated[index] = skill.percentage;
          return updated;
        });
      }, 300 * index)
    );

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {skills.map((skill, index) => (
        <div
          key={skill.name}
          className="p-5 bg-white rounded-2xl shadow-md border border-gray-100 relative overflow-hidden"
        >
          {/* Top Row */}
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-indigo-500">{skill.icon}</span>
              <h3 className="text-gray-800 font-medium text-sm md:text-base">
                {skill.name}
              </h3>
            </div>
            {/* Power symbol — centered */}
            <div className="w-5 h-5 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 text-xs">
              ⏻
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000 ease-out"
              style={{ width: `${progress[index]}%` }}
            />
          </div>

          {/* Percentage */}
          <p className="text-xs text-gray-500 mt-2">
            {progress[index]}%
          </p>
        </div>
      ))}
    </div>
  );
};

export default SkillsShowcase;
