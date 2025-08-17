import React, { useEffect, useState } from 'react';
import { MapPin, Mail, Phone, Linkedin, Globe } from 'lucide-react';

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('about');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const contactInfo = [
    { icon: MapPin, text: 'Bapatla, Andhra Pradesh, India', color: 'text-cyan-400' },
    { icon: Mail, text: 'shakeel9086@gmail.com', color: 'text-purple-400' },
    { icon: Phone, text: '+91 8074015276', color: 'text-pink-400' },
    { icon: Linkedin, text: 'linkedin.com/in/shakeel827', color: 'text-blue-400' },
    { icon: Globe, text: 'pandascanpros.in', color: 'text-green-400' },
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                About Me
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image & Stats */}
            <div className="relative">
              <div className="relative w-80 h-80 mx-auto lg:mx-0">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
                <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-full border-4 border-cyan-500/30 flex items-center justify-center overflow-hidden">
                  {/* Profile Image */}
                  <div className="w-full h-full flex items-center justify-center">
                    <img 
                      src="/aiease_1755327608838.jpg" 
                      alt="AI Ease" 
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-full"></div>
                </div>
              </div>

              {/* Floating Stats */}
              <div className="absolute top-4 -right-4 bg-gray-900/90 backdrop-blur-md rounded-lg p-4 border border-cyan-500/30 animate-float">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">4+</div>
                  <div className="text-sm text-gray-400">Internships</div>
                </div>
              </div>

              <div className="absolute bottom-8 -left-8 bg-gray-900/90 backdrop-blur-md rounded-lg p-4 border border-purple-500/30 animate-float-delayed">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">2+</div>
                  <div className="text-sm text-gray-400">Live Projects</div>
                </div>
              </div>
            </div>

            {/* About Content */}
            <div className="space-y-8">
              <div className="prose prose-lg text-gray-300">
                <p className="text-lg leading-relaxed mb-6">
                  I'm a passionate technology enthusiast currently pursuing my degree in 
                  <span className="text-cyan-400 font-semibold"> Cybersecurity</span> at 
                  Bapatla Engineering College. With a diverse skill set spanning 
                  <span className="text-purple-400 font-semibold"> Operations</span>, 
                  <span className="text-pink-400 font-semibold"> UI/UX Design</span>, and 
                  <span className="text-green-400 font-semibold"> Data Analysis</span>, 
                  I bring a unique perspective to every project.
                </p>

                <p className="text-lg leading-relaxed mb-8">
                  My journey includes hands-on experience at leading companies like 
                  <span className="text-cyan-400 font-semibold"> Flipkart</span> and 
                  <span className="text-purple-400 font-semibold"> Travelplus</span>, 
                  where I've honed my analytical and operational skills. I\'m passionate about 
                  creating secure, user-centric solutions that make a real impact.
                </p>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-6">
                  Let's Connect
                </h3>
                
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 p-3 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 group"
                    >
                      <info.icon className={`w-5 h-5 ${info.color} group-hover:scale-110 transition-transform duration-300`} />
                      <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                        {info.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;