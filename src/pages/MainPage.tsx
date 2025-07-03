import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navigation from '../components/Navigation';
import CVUpload from '../components/CVUpload';
import { Bot, Upload, FileText, MessageCircle } from 'lucide-react';

const MainPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [uploadedCV, setUploadedCV] = useState<File | null>(null);
  const [cvAnalysis, setCvAnalysis] = useState<string | null>(null);

  const handleCVUpload = (file: File) => {
    setUploadedCV(file);
    // Simulate AI analysis
    setTimeout(() => {
      setCvAnalysis(`
        CV Analysis Complete! Here are my recommendations:
        
        ✅ Strengths:
        • Strong technical skills section
        • Clear work experience timeline
        • Good educational background
        
        🔧 Areas for Improvement:
        • Add more quantifiable achievements (numbers, percentages)
        • Include relevant keywords for your target industry
        • Consider adding a professional summary
        • Expand on project descriptions with specific technologies used
        
        📈 Next Steps:
        1. Update your skills section with trending technologies
        2. Add 2-3 more bullet points to your recent work experience
        3. Include any certifications or online courses
        4. Consider using action verbs to start each bullet point
      `);
    }, 2000);
  };

  const quickActions = [
    {
      icon: Upload,
      title: 'Upload CV',
      description: 'Get AI-powered analysis and improvement suggestions',
      action: () => document.getElementById('cv-upload')?.click()
    },
    {
      icon: MessageCircle,
      title: 'Practice Interview',
      description: 'Practice with AI-generated interview questions',
      action: () => navigate('/interview-practice')
    },
    {
      icon: FileText,
      title: 'Build Resume',
      description: 'Create a professional resume with our templates',
      action: () => navigate('/resume-builder')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">
            Let's continue building your career success with AI-powered tools.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className="w-full p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 text-left"
                >
                  <div className="flex items-start">
                    <action.icon className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{action.title}</h3>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* CV Upload Section */}
            <div className="mt-8">
              <CVUpload onUpload={handleCVUpload} />
              {uploadedCV && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 font-medium">
                    ✅ CV uploaded: {uploadedCV.name}
                  </p>
                  <p className="text-green-600 text-sm mt-1">
                    Analysis in progress...
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* AI Chatbot via Botpress */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center">
                  <Bot className="h-8 w-8 text-blue-600 mr-3" />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">CareerMate AI Chatbot</h2>
                    <p className="text-gray-600">Powered by Botpress</p>
                  </div>
                </div>
              </div>
              <iframe
                src="https://cdn.botpress.cloud/webchat/v3.0/shareable.html?configUrl=https://files.bpcontent.cloud/2025/05/14/13/20250514131740-06INSPT1.json"
                style={{
                  width: '100%',
                  height: '600px',
                  border: 'none',
                  borderRadius: '0 0 12px 12px',
                  overflow: 'hidden'
                }}
                title="CareerMate AI Chatbot"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
