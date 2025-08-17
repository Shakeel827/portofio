import React, { useEffect, useState } from 'react';
import { ExternalLink, Github, Shield, FileText, Zap } from 'lucide-react';

const Projects: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    {
      title: 'PandascanFlow',
      subtitle: 'Web Vulnerability Scanner',
      description: 'Advanced web vulnerability scanner with real-time threat detection, comprehensive security analysis, and detailed reporting capabilities. Built with modern web technologies for cybersecurity professionals.',
      tech: ['Python', 'Flask', 'Security APIs', 'Real-time Analysis'],
      liveUrl: 'https://pandascanpro-4.onrender.com',
      githubUrl: 'https://github.com/Shakeel827/pandascanpro',
      icon: Shield,
      color: 'cyan',
      features: [
        'Real-time vulnerability scanning',
        'Comprehensive security reports',
        'Multi-threaded scanning engine',
        'RESTful API integration'
      ]
    },
    {
      title: 'ResumeFlow',
      subtitle: 'AI Resume & Portfolio Builder',
      description: 'Intelligent resume and portfolio builder powered by AI algorithms. Features smart content suggestions, professional templates, and automated formatting for creating standout resumes.',
      tech: ['React', 'Node.js', 'AI/ML APIs', 'PDF Generation'],
      liveUrl: 'https://resumeflow.pandascanpros.in',
      githubUrl: 'https://github.com/Shakeel827/resume',
      icon: FileText,
      color: 'purple',
      features: [
        'AI-powered content suggestions',
        'Professional template library',
        'Real-time preview & editing',
        'PDF export functionality'
      ]
    }
  ];

  const colorMap = {
    cyan: {
      gradient: 'from-cyan-500 to-blue-500',
      border: 'border-cyan-500/30',
      shadow: 'shadow-cyan-500/25',
      text: 'text-cyan-400',
      bg: 'bg-cyan-500/10'
    },
    purple: {
      gradient: 'from-purple-500 to-pink-500',
      border: 'border-purple-500/30',
      shadow: 'shadow-purple-500/25',
      text: 'text-purple-400',
      bg: 'bg-purple-500/10'
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById('projects');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                Featured Projects
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
            <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto">
              Innovative solutions built with cutting-edge technologies, focusing on security, user experience, and performance
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => {
              const colors = colorMap[project.color as keyof typeof colorMap];
              const IconComponent = project.icon;
              
              return (
                <div
                  key={index}
                  className={`group relative bg-gray-900/50 backdrop-blur-sm rounded-2xl border ${colors.border} overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:${colors.shadow} ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                  onMouseEnter={() => setHoveredProject(index)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {/* Animated Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  {/* Floating Icon */}
                  <div className={`absolute top-6 right-6 p-3 rounded-full ${colors.bg} ${colors.border} border backdrop-blur-sm group-hover:scale-110 transition-all duration-300`}>
                    <IconComponent className={`w-6 h-6 ${colors.text}`} />
                  </div>

                  <div className="relative p-8">
                    {/* Project Header */}
                    <div className="mb-6">
                      <h3 className={`text-2xl font-bold mb-2 group-hover:${colors.text} transition-colors duration-300`}>
                        {project.title}
                      </h3>
                      <p className={`${colors.text} font-medium text-lg`}>
                        {project.subtitle}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Features List */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">Key Features</h4>
                      <div className="space-y-2">
                        {project.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-2 text-sm text-gray-300">
                            <div className={`w-1.5 h-1.5 rounded-full ${colors.bg} ${colors.border} border`}></div>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-8">
                      <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className={`px-3 py-1 text-xs rounded-full ${colors.bg} ${colors.text} border ${colors.border} font-medium`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r ${colors.gradient} rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:${colors.shadow} group/btn`}
                      >
                        <ExternalLink className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
                        Live Demo
                      </a>
                      
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center gap-2 px-6 py-3 border ${colors.border} rounded-lg font-semibold ${colors.text} hover:${colors.bg} transition-all duration-300 hover:scale-105 group/btn`}
                      >
                        <Github className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
                        Code
                      </a>
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div 
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                      hoveredProject === index ? 'animate-pulse' : ''
                    }`}
                  >
                    <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${colors.gradient}`}></div>
                    <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r ${colors.gradient}`}></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <p className="text-gray-400 text-lg mb-6">
              Interested in seeing more of my work?
            </p>
            <a
              href="https://github.com/Shakeel827"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-lg font-semibold text-white hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300 hover:scale-105 group"
            >
              <Github className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              View All Projects on GitHub
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;