import React, { useEffect, useRef, useState } from "react";
import {
  Code2, Shield, Users, LineChart, PenTool, FileCode,
  ShieldCheck, MessageSquare, BrainCircuit, Users2, Award,
  Figma, Framer, GitMerge, Lock, Search, Palette, Puzzle
} from "lucide-react";

// --- TYPES --- //
interface Skill {
  name: string;
  percentage: number;
  icon: JSX.Element;
}

// --- DATA --- //
const skills: Skill[] = [
  { name: "Frontend Development", percentage: 90, icon: <Code2 /> },
  { name: "Cybersecurity", percentage: 75, icon: <Shield /> },
  { name: "Team Collaboration", percentage: 85, icon: <Users /> },
  { name: "Data Analysis", percentage: 70, icon: <LineChart /> },
  { name: "UI/UX Design", percentage: 80, icon: <PenTool /> },
  { name: "Programming", percentage: 95, icon: <FileCode /> },
  { name: "Vulnerability Scanning", percentage: 88, icon: <ShieldCheck /> },
  { name: "Communication", percentage: 92, icon: <MessageSquare /> },
  { name: "AI & ML Basics", percentage: 65, icon: <BrainCircuit /> },
  { name: "Leadership", percentage: 78, icon: <Users2 /> },
  { name: "Achievements", percentage: 85, icon: <Award /> },
  { name: "Figma", percentage: 90, icon: <Figma /> },
  { name: "Framer", percentage: 80, icon: <Framer /> },
  { name: "Git & GitHub", percentage: 85, icon: <GitMerge /> },
  { name: "Network Security", percentage: 70, icon: <Lock /> },
  { name: "Problem Solving", percentage: 88, icon: <Puzzle /> },
  { name: "Research & Analysis", percentage: 75, icon: <Search /> },
  { name: "Creativity", percentage: 95, icon: <Palette /> },
];

// --- COMPONENT --- //
const SkillsProgress: React.FC = () => {
  const [progress, setProgress] = useState<number[]>(skills.map(() => 0));
  const progressRef = useRef<number[]>(skills.map(() => 0));

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) =>
        prev.map((val, i) =>
          val < skills[i].percentage ? val + 1 : val
        )
      );
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {skills.map((skill, index) => (
        <div
          key={index}
          className="p-4 rounded-2xl shadow-md bg-white flex flex-col space-y-3"
        >
          <div className="flex items-center space-x-3">
            <span className="text-blue-500">{skill.icon}</span>
            <h3 className="text-lg font-semibold">{skill.name}</h3>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-blue-500 h-3 rounded-full transition-all"
              style={{ width: `${progress[index]}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600">{progress[index]}%</p>
        </div>
      ))}
    </div>
  );
};

export default SkillsProgress;
