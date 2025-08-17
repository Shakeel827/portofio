import React, { useEffect, useState } from 'react';
import { Download, ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);

  const roles = [
    'AI/ML Engineer',
    'Machine Learning Developer',
    'Data Scientist',
    'AI Job Seeker'
  ];

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl animate-ping"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Main Name with Glowing Effect */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-gradient-x">
                Shaik Shakeel
              </span>
              <div className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 blur-sm opacity-50 animate-pulse">
                Shaik Shakeel
              </div>
            </span>
          </h1>

          {/* Animated Role Subtitle */}
          <div className="h-16 mb-8 flex items-center justify-center">
            <h2 className="text-xl md:text-2xl lg:text-3xl text-gray-300">
              <span className="relative inline-block min-w-[200px] md:min-w-[300px]">
                <span
                  key={currentRole}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-fade-in"
                >
                  Build the future with AI
                </span>
              </span>
            </h2>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            Driven by artificial intelligence, I build tools that turn ideas into smart solutions and meaningful outcomes. 
            With solid knowledge, I can create anything using AI while exploring opportunities for innovation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <button
              onClick={scrollToProjects}
              className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 transform"
            >
              <span className="flex items-center justify-center gap-2">
                View Projects
                <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
              </span>
            </button>
            
            <button className="group px-8 py-4 border border-cyan-500 rounded-lg font-semibold hover:bg-cyan-500/10 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 transform">
              <span className="flex items-center justify-center gap-2">
                <Download className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <a href="https://drive.google.com/drive/folders/1YI52DYy-PbfwZd0GJ6hO7b_BXPVVsnUo?usp=sharing" target="_blank" rel="noopener noreferrer">
                  Download Resume
                </a>
              </span>
            </button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6">
            <a
              href="https://github.com/Shakeel827"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 rounded-full border border-gray-700 hover:border-cyan-500 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/25"
            >
              <Github className="w-6 h-6 group-hover:text-cyan-400 transition-colors duration-300" />
            </a>
            
            <a
              href="https://linkedin.com/in/shakeel827"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 rounded-full border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/25"
            >
              <Linkedin className="w-6 h-6 group-hover:text-purple-400 transition-colors duration-300" />
            </a>
            
            <a
              href="mailto:shakeel9086@gmail.com"
              className="group p-3 rounded-full border border-gray-700 hover:border-pink-500 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/25"
            >
              <Mail className="w-6 h-6 group-hover:text-pink-400 transition-colors duration-300" />
            </a>
          </div>
        </div>
      </div>

      {/* Floating Animation Arrow */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-8 h-8 text-cyan-400 opacity-70" />
      </div>
    </section>
  );
};

export default Hero;