import React from "react";
import {
  Code2,
  Shield,
  Users,
  LineChart,
  PenTool,
  FileCode,
  ShieldCheck,
  MessageSquare,
  BrainCircuit,
  Users2,
  Award,
  Figma,
  Framer,
  GitMerge,
  Lock,
  Search,
  Palette,
  Puzzle,
} from "lucide-react";

// --- TYPES --- //
interface Skill {
  name: string;
  percentage: number;
  icon: JSX.Element;
}

// --- DATA --- //
const skills: Skill[] = [
  { name: "Frontend Development", percentage: 85, icon: <Code2 size={20} /> },
  { name: "Backend Development", percentage: 75, icon: <FileCode size={20} /> },
  { name: "Cybersecurity", percentage: 80, icon: <Shield size={20} /> },
  { name: "Penetration Testing", percentage: 70, icon: <ShieldCheck size={20} /> },
  { name: "UI/UX Design", percentage: 90, icon: <PenTool size={20} /> },
  { name: "Figma", percentage: 95, icon: <Figma size={20} /> },
  { name: "Framer", percentage: 70, icon: <Framer size={20} /> },
  { name: "Git & Version Control", percentage: 85, icon: <GitMerge size={20} /> },
  { name: "Networking & Security", percentage: 78, icon: <Lock size={20} /> },
  { name: "Data Analysis", percentage: 72, icon: <LineChart size={20} /> },
  { name: "AI & ML", percentage: 65, icon: <BrainCircuit size={20} /> },
  { name: "Team Collaboration", percentage: 88, icon: <Users2 size={20} /> },
  { name: "Problem Solving", percentage: 92, icon: <Puzzle size={20} /> },
  { name: "Communication", percentage: 85, icon: <MessageSquare size={20} /> },
  { name: "Research", percentage: 80, icon: <Search size={20} /> },
  { name: "Creativity", percentage: 90, icon: <Palette size={20} /> },
  { name: "Awards & Achievements", percentage: 60, icon: <Award size={20} /> },
];

// --- COMPONENT --- //
const SkillsSection: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl">
        <h2 className="text-3xl font-bold text-center text-white mb-10">
          My Skills
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-2xl shadow-lg p-5 hover:scale-105 transition-transform"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-white">
                  {skill.icon}
                  <span className="font-semibold">{skill.name}</span>
                </div>
                <span className="text-sm text-gray-300 font-medium">
                  {skill.percentage}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-800 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full"
                  style={{ width: `${skill.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
