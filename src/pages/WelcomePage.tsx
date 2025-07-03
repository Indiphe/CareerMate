import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, ArrowRight, Users, Target, Award } from 'lucide-react';

const WelcomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Bot,
      title: 'AI-Powered CV Analysis',
      description: 'Get instant feedback and improvement suggestions for your resume'
    },
    {
      icon: Users,
      title: 'Interview Practice',
      description: 'Practice with AI-generated questions tailored to your field'
    },
    {
      icon: Target,
      title: 'Job Matching',
      description: 'Find opportunities that match your skills and preferences'
    },
    {
      icon: Award,
      title: 'Career Development',
      description: 'Access resources and tools to advance your career'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
      <div className="relative min-h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto">
          <div className="mb-8">
            <Bot className="h-20 w-20 text-blue-300 mx-auto mb-6" />
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Welcome to
              <span className="block text-blue-300">Career Mate App</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed max-w-3xl mx-auto">
              Transform your career journey with AI-powered tools for CV optimization, 
              interview preparation, and personalized job matching. Your success starts here.
            </p>
          </div>

          <button
            onClick={() => navigate('/login')}
            className="inline-flex items-center px-12 py-6 bg-blue-600 text-white text-xl font-semibold rounded-xl hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-2xl"
          >
            Get Started
            <ArrowRight className="ml-3 h-6 w-6" />
          </button>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
                <feature.icon className="h-12 w-12 text-blue-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-blue-100 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;