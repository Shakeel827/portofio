import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, MessageCircle, User, FileText } from 'lucide-react';

const Contact: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'skshakeel9086@gmail.com',
      href: 'mailto:skshakeel9086@gmail.com',
      color: 'cyan'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 8074015276',
      href: 'tel:+918074015276',
      color: 'purple'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Bapatla, Andhra Pradesh, India',
      href: '#',
      color: 'pink'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/Shakeel827',
      color: 'gray'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/shakeel827',
      color: 'blue'
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      href: 'https://wa.me/918074015276',
      color: 'green'
    }
  ];

  const colorMap = {
    cyan: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10 hover:border-cyan-500/50',
    purple: 'text-purple-400 border-purple-500/30 bg-purple-500/10 hover:border-purple-500/50',
    pink: 'text-pink-400 border-pink-500/30 bg-pink-500/10 hover:border-pink-500/50',
    gray: 'text-gray-400 border-gray-500/30 bg-gray-500/10 hover:border-gray-500/50',
    blue: 'text-blue-400 border-blue-500/30 bg-blue-500/10 hover:border-blue-500/50',
    green: 'text-green-400 border-green-500/30 bg-green-500/10 hover:border-green-500/50'
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

    const element = document.getElementById('contact');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                Get In Touch
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
            <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto">
              Ready to collaborate? Let's discuss your next project or opportunity. I'm always excited to connect with fellow professionals and explore new possibilities.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                  Let's Connect
                </h3>
                <p className="text-gray-300 leading-relaxed mb-8">
                  I'm actively seeking opportunities in AI and Machine Learning. Whether you have a project in mind, 
                  want to discuss job opportunities, or just want to say hello, I'd love to hear from you. 
                  I'm always open to interesting conversations and collaborations in the AI field.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <a
                      key={index}
                      href={info.href}
                      className={`flex items-center gap-4 p-4 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 group ${colorMap[info.color as keyof typeof colorMap]}`}
                    >
                      <div className="p-3 rounded-lg border border-current">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-white group-hover:text-current transition-colors duration-300">
                          {info.label}
                        </div>
                        <div className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                          {info.value}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-lg font-semibold text-gray-200 mb-4">Follow Me</h4>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-3 rounded-xl border transition-all duration-300 hover:scale-110 group ${colorMap[social.color as keyof typeof colorMap]}`}
                        title={social.label}
                      >
                        <IconComponent className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Call-to-Action */}
              <div className="p-6 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-xl border border-cyan-500/20">
                <h4 className="font-semibold text-cyan-400 mb-2">AI Job Seeker - Available for Opportunities</h4>
                <p className="text-gray-300 text-sm">
                  I'm actively looking for AI/ML roles and typically respond to messages within 24 hours. 
                  For urgent matters or job opportunities, feel free to reach out via phone or WhatsApp.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-cyan-400 mb-4">Get In Touch</h3>
                  <p className="text-gray-300 mb-6">Send me a message using the form below!</p>
                </div>
                
                {/* Contact Form */}
                <form 
                  action="https://formspree.io/f/xldlkgyz" 
                  method="POST"
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 text-white placeholder-gray-400"
                          placeholder="Your full name"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 text-white placeholder-gray-400"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300">
                      Subject
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 text-white placeholder-gray-400"
                        placeholder="What's this about?"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 text-white placeholder-gray-400 resize-none"
                      placeholder="Tell me about your project, idea, or just say hello..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full group bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                      Send Message
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
