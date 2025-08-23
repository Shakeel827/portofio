import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, User } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const AIPortfolioBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [hasGreeted, setHasGreeted] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !hasGreeted) {
      setTimeout(() => {
        addBotMessage("👋 Hi! I'm Shakku AI, your personal guide. Want me to explore Shakeel's projects or know more about him?");
        setHasGreeted(true);
      }, 500);
    }
  }, [isOpen, hasGreeted]);

  const addBotMessage = (text: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        text,
        isBot: true,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1000);
  };

  const addUserMessage = (text: string) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      text,
      isBot: false,
      timestamp: new Date()
    }]);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('project') || input.includes('work') || input.includes('portfolio')) {
      return "🚀 Shakeel's top projects include:\n\n• **PandascanFlow** - AI Vulnerability Scanner (scans ports, XSS, SQLi, generates reports)\n• **ResumeFlow** - AI Resume & Portfolio Builder\n• **Random Chatting Platform** - Real-time chat app\n• **AI Art Style Transfer** - Apply Van Gogh/Picasso styles to images\n\nWant to see them? Check the Projects section above! 📊";
    }
    
    if (input.includes('about') || input.includes('who') || input.includes('shakeel')) {
      return "👨‍💻 Shakeel is an AI Creator passionate about building solutions with Artificial Intelligence, Cybersecurity, and UI/UX design. He turns ideas into smart solutions and meaningful outcomes!";
    }
    
    if (input.includes('skill') || input.includes('technology') || input.includes('tech')) {
      return "⚡ Shakeel's skills include:\n\n• **AI Building** - Creating intelligent solutions\n• **Cybersecurity** - Security analysis & vulnerability assessment\n• **UI/UX Design** - Figma, wireframing, prototyping\n• **Full Stack** - Flask, Tailwind, React, Python\n\nAll skills are world-class level! 🌟";
    }
    
    if (input.includes('contact') || input.includes('email') || input.includes('reach')) {
      return "📩 You can reach Shakeel at:\n\n• **Email**:  skshakeel9086@gmail.com\n• **Phone**: +91 8074015276\n• **Location**: Bapatla, Andhra Pradesh\n\nOr scroll down to the Contact section for more options! 📞";
    }
    
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return "👋 Hello there! I'm Shakku AI, here to help you explore Shakeel's amazing portfolio. You can ask me about his projects, skills, background, or how to contact him. What would you like to know? 🤖";
    }
    
    if (input.includes('experience') || input.includes('work') || input.includes('job')) {
      return "💼 Shakeel has experience at:\n\n• **Flipkart** - Junior Research Analyst\n• **Travelplus** - Operations Intern\n• **Cognifyz Technologies** - UI/UX Intern\n• **Codsoft** - UI/UX Intern\n\nCheck the Experience section for more details! 🏢";
    }
    
    // Default response for unclear queries
    return "🤖 I'm here to help you learn about Shakeel! You can ask me about:\n\n• **Projects** - His amazing AI and web projects\n• **Skills** - Technical expertise and abilities\n• **About** - Background and passion\n• **Contact** - How to reach him\n• **Experience** - Work history\n\nWhat interests you most? 😊";
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    addUserMessage(inputValue);
    const response = getBotResponse(inputValue);
    
    setTimeout(() => {
      addBotMessage(response);
    }, 1000);
    
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 ${
          isOpen ? 'hidden' : 'block'
        }`}
      >
        <Bot className="w-6 h-6 text-white" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 md:w-96 h-96 bg-gray-900/95 backdrop-blur-md rounded-2xl border border-cyan-500/30 shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-b border-gray-700/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Shakku AI</h3>
                <p className="text-xs text-gray-400">Your AI Guide 🤖</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-gray-700/50 rounded-lg transition-colors duration-200"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`flex items-start gap-2 max-w-[80%] ${message.isBot ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`p-2 rounded-full ${message.isBot ? 'bg-cyan-500/20' : 'bg-purple-500/20'}`}>
                    {message.isBot ? (
                      <Bot className="w-4 h-4 text-cyan-400" />
                    ) : (
                      <User className="w-4 h-4 text-purple-400" />
                    )}
                  </div>
                  <div
                    className={`p-3 rounded-2xl ${
                      message.isBot
                        ? 'bg-gray-800/80 text-gray-200 border border-cyan-500/20'
                        : 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line leading-relaxed">
                      {message.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2">
                  <div className="p-2 rounded-full bg-cyan-500/20">
                    <Bot className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="p-3 rounded-2xl bg-gray-800/80 border border-cyan-500/20">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-700/50">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about projects, skills, contact..."
                className="flex-1 px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 text-white placeholder-gray-400 text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="p-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIPortfolioBot;
