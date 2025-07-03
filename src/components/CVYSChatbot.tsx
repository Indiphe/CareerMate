import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface CVYSChatbotProps {
  cvAnalysis: string | null;
}

const CVYSChatbot: React.FC<CVYSChatbotProps> = ({ cvAnalysis }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m CVYS, your AI career assistant. I can help you with CV analysis, interview preparation, job search strategies, and career advice. How can I assist you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (cvAnalysis) {
      const analysisMessage: Message = {
        id: Date.now().toString(),
        text: cvAnalysis,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, analysisMessage]);
    }
  }, [cvAnalysis]);

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // CV and Resume related queries
    if (lowerMessage.includes('cv') || lowerMessage.includes('resume')) {
      if (lowerMessage.includes('format') || lowerMessage.includes('structure')) {
        return 'For CV formatting, I recommend:\n\n• Use a clean, professional layout with consistent fonts\n• Keep it to 1-2 pages maximum\n• Use reverse chronological order for work experience\n• Include contact info, professional summary, experience, education, and skills\n• Use bullet points with action verbs (achieved, managed, developed)\n• Quantify achievements with numbers and percentages\n• Tailor keywords to match job descriptions\n\nWould you like specific advice for your industry?';
      }
      if (lowerMessage.includes('skills') || lowerMessage.includes('technical')) {
        return 'For the skills section:\n\n• Separate technical and soft skills\n• List programming languages, tools, and technologies you\'re proficient in\n• Include certifications and relevant coursework\n• Rate your proficiency levels (Beginner, Intermediate, Advanced)\n• Include industry-specific skills and software\n• Add languages you speak if relevant\n\nRemember to only include skills you can confidently discuss in an interview!';
      }
      return 'I can help you improve your CV! Here are some key tips:\n\n• Use action verbs to start bullet points (achieved, developed, managed)\n• Quantify your achievements with numbers and percentages\n• Tailor your CV to each job application with relevant keywords\n• Keep it concise but comprehensive (1-2 pages)\n• Include a professional summary that highlights your value proposition\n• Ensure consistent formatting and no typos\n\nWould you like me to analyze a specific section of your CV?';
    }
    
    // Interview preparation
    if (lowerMessage.includes('interview')) {
      if (lowerMessage.includes('behavioral') || lowerMessage.includes('star')) {
        return 'For behavioral interviews, use the STAR method:\n\n**S**ituation: Set the context\n**T**ask: Describe your responsibility\n**A**ction: Explain what you did\n**R**esult: Share the outcome\n\nCommon behavioral questions:\n• "Tell me about a time you overcame a challenge"\n• "Describe a situation where you had to work with a difficult team member"\n• "Give an example of when you showed leadership"\n\nPrepare 5-7 STAR stories that showcase different skills!';
      }
      if (lowerMessage.includes('technical') || lowerMessage.includes('coding')) {
        return 'For technical interviews:\n\n• Practice coding problems on platforms like LeetCode, HackerRank\n• Review fundamental concepts (data structures, algorithms)\n• Be ready to explain your thought process out loud\n• Ask clarifying questions before starting\n• Test your code with edge cases\n• Discuss time and space complexity\n• Prepare questions about the tech stack and development process\n\nWould you like specific preparation tips for your field?';
      }
      return 'Great! Interview preparation is crucial. Here\'s my comprehensive guide:\n\n• Research the company thoroughly (mission, values, recent news)\n• Practice common interview questions using the STAR method\n• Prepare thoughtful questions for the interviewer\n• Practice your body language and maintain eye contact\n• Arrive 10-15 minutes early\n• Bring multiple copies of your resume\n• Follow up with a thank-you email within 24 hours\n\nWould you like to practice some interview questions? I can generate questions based on your field!';
    }
    
    // Job search strategies
    if (lowerMessage.includes('job') || lowerMessage.includes('career') || lowerMessage.includes('search')) {
      if (lowerMessage.includes('remote') || lowerMessage.includes('work from home')) {
        return 'For remote job searching:\n\n• Use remote-specific job boards (Remote.co, We Work Remotely, FlexJobs)\n• Highlight remote work experience and self-management skills\n• Ensure you have a professional home office setup\n• Be prepared to discuss communication and collaboration tools\n• Consider time zone requirements\n• Network in online communities and virtual events\n• Emphasize results and deliverables in your applications\n\nRemote work requires strong communication and self-discipline!';
      }
      if (lowerMessage.includes('network') || lowerMessage.includes('linkedin')) {
        return 'Networking strategies:\n\n• Optimize your LinkedIn profile with a professional photo and compelling headline\n• Connect with industry professionals and engage with their content\n• Attend virtual and in-person industry events\n• Join professional associations and online communities\n• Reach out to alumni from your school\n• Offer value before asking for help\n• Follow up consistently but respectfully\n\nRemember: networking is about building genuine relationships, not just asking for jobs!';
      }
      return 'I\'d be happy to help with your job search! Here are proven strategies:\n\n• Optimize your LinkedIn profile and stay active\n• Apply to jobs that match 70-80% of requirements\n• Customize your resume and cover letter for each application\n• Network within your industry and attend events\n• Follow up on applications professionally\n• Consider remote opportunities to expand your options\n• Track your applications and follow-ups\n\nWhat specific aspect of job searching would you like help with?';
    }
    
    // Salary and negotiation
    if (lowerMessage.includes('salary') || lowerMessage.includes('negotiate') || lowerMessage.includes('compensation')) {
      return 'Salary negotiation strategies:\n\n• Research market rates using Glassdoor, PayScale, and industry reports\n• Consider the total compensation package (benefits, PTO, equity)\n• Wait for the offer before discussing salary\n• Express enthusiasm for the role first\n• Present your research and justify your request\n• Be prepared to negotiate other benefits if salary is fixed\n• Practice your negotiation conversation\n• Know your walk-away point\n\nRemember: most employers expect some negotiation, so don\'t be afraid to ask professionally!';
    }
    
    // Career development and growth
    if (lowerMessage.includes('skill') || lowerMessage.includes('learn') || lowerMessage.includes('development')) {
      return 'For career development:\n\n• Identify in-demand skills in your field\n• Take online courses (Coursera, Udemy, LinkedIn Learning)\n• Pursue relevant certifications\n• Seek mentorship from senior professionals\n• Take on stretch assignments at work\n• Build a portfolio of your best work\n• Stay updated with industry trends\n• Join professional communities and forums\n\nContinuous learning is key to career advancement. What skills are you looking to develop?';
    }
    
    // Industry-specific advice
    if (lowerMessage.includes('tech') || lowerMessage.includes('software') || lowerMessage.includes('programming')) {
      return 'For tech careers:\n\n• Build a strong GitHub portfolio with diverse projects\n• Contribute to open-source projects\n• Stay current with new technologies and frameworks\n• Practice system design for senior roles\n• Build side projects that solve real problems\n• Attend tech meetups and conferences\n• Consider specializing in high-demand areas (AI, cloud, cybersecurity)\n\nThe tech industry values continuous learning and practical experience!';
    }
    
    // Default response with helpful suggestions
    return 'I\'m here to help with your career journey! I can assist with:\n\n• **CV/Resume optimization** - formatting, content, and ATS optimization\n• **Interview preparation** - behavioral, technical, and industry-specific questions\n• **Job search strategies** - networking, applications, and remote work\n• **Career development** - skill building, certifications, and growth planning\n• **Salary negotiation** - research, strategies, and best practices\n• **Industry insights** - trends, requirements, and opportunities\n\nWhat specific area would you like to explore? Feel free to ask detailed questions!';
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-96">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`flex max-w-xs lg:max-w-md ${
                message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`flex-shrink-0 ${
                  message.sender === 'user' ? 'ml-2' : 'mr-2'
                }`}
              >
                {message.sender === 'user' ? (
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
              <div
                className={`px-4 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="text-sm whitespace-pre-line">{message.text}</p>
                <p className="text-xs mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex mr-2">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className="bg-gray-100 px-4 py-2 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex space-x-2">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask CVYS anything about your career..."
            className="flex-1 resize-none border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={1}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Send message"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CVYSChatbot;