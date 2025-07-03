import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { MessageCircle, Play, Settings, RefreshCw } from 'lucide-react';

const InterviewPracticePage = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [customPreferences, setCustomPreferences] = useState('');
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const jobTitleOptions = [
    'Software Developer',
    'Data Scientist',
    'Product Manager',
    'UX/UI Designer',
    'Marketing Manager',
    'Sales Representative',
    'Business Analyst',
    'Project Manager',
    'DevOps Engineer',
    'Customer Success Manager',
    'Financial Analyst',
    'Human Resources',
    'Graphic Designer',
    'Content Writer',
    'Operations Manager',
    'Other'
  ];

  const questionBank = {
    'Software Developer': [
      'Tell me about a challenging bug you had to fix and how you approached it.',
      'How do you stay updated with new programming languages and technologies?',
      'Describe your experience with version control systems like Git.',
      'How do you approach code reviews and giving feedback to team members?',
      'What\'s your process for debugging a complex application?',
      'Explain the difference between object-oriented and functional programming.',
      'How do you ensure code quality and maintainability in your projects?',
      'Describe a time when you had to optimize application performance.',
      'How do you handle technical debt in your codebase?',
      'What testing strategies do you use in your development process?',
      'How do you approach learning a new programming framework?',
      'Describe your experience with database design and optimization.',
      'How do you handle conflicting requirements from different stakeholders?',
      'What\'s your approach to documenting your code and APIs?',
      'How do you ensure security best practices in your applications?',
      'Describe a time when you had to refactor legacy code.',
      'How do you handle deployment and CI/CD processes?',
      'What\'s your experience with cloud platforms and services?',
      'How do you approach scalability in your applications?',
      'Describe a project where you had to work with a tight deadline.',
      'How do you handle errors and exceptions in your code?',
      'What\'s your experience with microservices architecture?',
      'How do you approach API design and development?',
      'Describe your experience with agile development methodologies.',
      'How do you handle cross-browser compatibility issues?',
      'What\'s your approach to mobile-first development?',
      'How do you ensure accessibility in your applications?',
      'Describe a time when you had to mentor a junior developer.',
      'How do you handle technical disagreements with team members?',
      'What motivates you to continue learning and growing as a developer?'
    ],
    'Data Scientist': [
      'How do you handle missing data in your datasets?',
      'Explain the difference between supervised and unsupervised learning.',
      'Describe a project where you had to communicate complex findings to non-technical stakeholders.',
      'How do you validate the accuracy of your machine learning models?',
      'What tools and programming languages do you prefer for data analysis?',
      'How do you approach feature engineering and selection?',
      'Describe your experience with A/B testing and experimental design.',
      'How do you handle imbalanced datasets?',
      'What\'s your process for data cleaning and preprocessing?',
      'How do you choose the right algorithm for a specific problem?',
      'Describe a time when your model performed poorly and how you improved it.',
      'How do you ensure reproducibility in your data science projects?',
      'What\'s your experience with big data technologies like Spark or Hadoop?',
      'How do you approach time series analysis and forecasting?',
      'Describe your experience with deep learning frameworks.',
      'How do you handle overfitting in your models?',
      'What\'s your approach to model deployment and monitoring?',
      'How do you stay current with new developments in data science?',
      'Describe a project where you had to work with unstructured data.',
      'How do you approach dimensionality reduction techniques?',
      'What\'s your experience with natural language processing?',
      'How do you handle ethical considerations in data science?',
      'Describe your experience with cloud-based data platforms.',
      'How do you approach collaborative data science projects?',
      'What\'s your process for model interpretation and explainability?',
      'How do you handle real-time data processing requirements?',
      'Describe a time when you had to pivot your analysis approach.',
      'How do you ensure data privacy and security in your projects?',
      'What\'s your experience with data visualization tools?',
      'How do you approach building data pipelines and workflows?'
    ],
    'Product Manager': [
      'How do you prioritize features when you have limited development resources?',
      'Describe a time when you had to make a difficult product decision.',
      'How do you gather and incorporate user feedback into product development?',
      'What metrics do you use to measure product success?',
      'How do you handle conflicts between different stakeholder requirements?',
      'Describe your experience with product roadmap planning.',
      'How do you conduct market research and competitive analysis?',
      'What\'s your approach to user story writing and acceptance criteria?',
      'How do you work with engineering teams to estimate development effort?',
      'Describe a product launch you managed from start to finish.',
      'How do you handle feature requests that don\'t align with product strategy?',
      'What\'s your experience with A/B testing and product experimentation?',
      'How do you communicate product vision to different audiences?',
      'Describe a time when you had to pivot a product strategy.',
      'How do you balance technical debt with new feature development?',
      'What\'s your approach to pricing strategy and monetization?',
      'How do you handle product failures or setbacks?',
      'Describe your experience with agile and scrum methodologies.',
      'How do you ensure product-market fit?',
      'What\'s your process for conducting user interviews and research?',
      'How do you work with design teams to create user experiences?',
      'Describe a time when you had to advocate for the user against business pressure.',
      'How do you handle international product considerations?',
      'What\'s your experience with mobile product management?',
      'How do you approach product analytics and data-driven decisions?',
      'Describe your experience with platform or API products.',
      'How do you manage product backlogs and sprint planning?',
      'What\'s your approach to stakeholder management and communication?',
      'How do you handle product security and compliance requirements?',
      'Describe a time when you had to learn a new industry or domain quickly.'
    ],
    'UX/UI Designer': [
      'Walk me through your design process from research to final implementation.',
      'How do you approach user research and what methods do you prefer?',
      'Describe a time when you had to advocate for the user against business constraints.',
      'How do you handle feedback and criticism of your designs?',
      'What\'s your experience with accessibility and inclusive design?',
      'How do you stay updated with current design trends and best practices?',
      'Describe a project where you had to design for multiple platforms.',
      'How do you approach information architecture and user flows?',
      'What\'s your process for creating and maintaining design systems?',
      'How do you collaborate with developers to ensure design implementation?',
      'Describe a time when user testing revealed unexpected insights.',
      'How do you balance aesthetics with functionality in your designs?',
      'What\'s your experience with prototyping tools and techniques?',
      'How do you approach designing for different user personas?',
      'Describe a challenging design problem you solved recently.',
      'How do you handle tight deadlines while maintaining design quality?',
      'What\'s your approach to mobile-first and responsive design?',
      'How do you measure the success of your design solutions?',
      'Describe your experience with design thinking methodologies.',
      'How do you handle stakeholder disagreements about design decisions?',
      'What\'s your process for conducting usability testing?',
      'How do you approach designing for emerging technologies?',
      'Describe a time when you had to redesign an existing product.',
      'How do you ensure consistency across different product touchpoints?',
      'What\'s your experience with motion design and micro-interactions?',
      'How do you approach designing for international markets?',
      'Describe your experience with design collaboration tools.',
      'How do you handle design handoffs to development teams?',
      'What\'s your approach to creating wireframes and mockups?',
      'How do you stay inspired and creative in your design work?'
    ],
    'Marketing Manager': [
      'How do you develop and execute a comprehensive marketing strategy?',
      'Describe a successful marketing campaign you led and its results.',
      'How do you measure marketing ROI and campaign effectiveness?',
      'What\'s your experience with digital marketing channels and tools?',
      'How do you approach target audience research and segmentation?',
      'Describe a time when a marketing campaign didn\'t perform as expected.',
      'How do you stay current with marketing trends and technologies?',
      'What\'s your approach to content marketing and storytelling?',
      'How do you collaborate with sales teams to generate qualified leads?',
      'Describe your experience with marketing automation platforms.',
      'How do you handle budget allocation across different marketing channels?',
      'What\'s your approach to brand positioning and messaging?',
      'How do you use data and analytics to inform marketing decisions?',
      'Describe your experience with social media marketing strategies.',
      'How do you approach customer lifecycle marketing?',
      'What\'s your experience with influencer and partnership marketing?',
      'How do you handle crisis communication and reputation management?',
      'Describe a time when you had to pivot marketing strategy quickly.',
      'How do you approach international marketing and localization?',
      'What\'s your experience with event marketing and trade shows?',
      'How do you ensure marketing compliance and legal requirements?',
      'Describe your approach to competitive analysis and positioning.',
      'How do you work with creative teams to develop marketing assets?',
      'What\'s your experience with email marketing and nurturing campaigns?',
      'How do you approach customer retention and loyalty programs?',
      'Describe your experience with product launch marketing.',
      'How do you handle marketing attribution and multi-touch campaigns?',
      'What\'s your approach to marketing personalization and customization?',
      'How do you manage marketing vendor relationships and partnerships?',
      'Describe a time when you had to market a product in a saturated market.'
    ],
    'Other': [
      'Tell me about yourself and your professional background.',
      'What interests you about this role and our company?',
      'Describe a challenging situation you faced at work and how you handled it.',
      'Where do you see yourself in 5 years?',
      'What are your greatest strengths and how do they apply to this role?',
      'What is your biggest weakness and how are you working to improve it?',
      'Why are you looking to leave your current position?',
      'Describe a time when you had to work with a difficult colleague.',
      'How do you handle stress and pressure in the workplace?',
      'What motivates you in your work?',
      'Describe a time when you had to learn something new quickly.',
      'How do you prioritize your work when you have multiple deadlines?',
      'Tell me about a time when you made a mistake and how you handled it.',
      'Describe a situation where you had to work as part of a team.',
      'How do you handle constructive criticism?',
      'What do you know about our company and industry?',
      'Describe a time when you went above and beyond in your role.',
      'How do you stay organized and manage your time effectively?',
      'Tell me about a goal you set and achieved.',
      'Describe a time when you had to adapt to a significant change.',
      'How do you approach problem-solving in your work?',
      'What questions do you have about this role or our company?',
      'Describe your ideal work environment.',
      'How do you handle competing priorities?',
      'Tell me about a time when you had to persuade someone.',
      'What do you consider your most significant professional achievement?',
      'How do you continue learning and developing professionally?',
      'Describe a time when you had to work with limited resources.',
      'What type of work environment brings out your best performance?',
      'How do you ensure quality in your work?'
    ]
  };

  const generateQuestions = async () => {
    setIsGenerating(true);
    
    // Simulate AI question generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    let selectedQuestions: string[] = [];
    
    if (jobTitle === 'Other' && customPreferences.trim()) {
      // Generate custom questions based on preferences
      const customQuestionTemplates = [
        `Tell me about your experience with ${customPreferences}.`,
        `How do you approach challenges related to ${customPreferences}?`,
        `Describe a project where you used ${customPreferences} skills.`,
        `What interests you most about working in ${customPreferences}?`,
        `How do you stay updated with trends in ${customPreferences}?`,
        `Describe a time when you had to learn ${customPreferences} quickly.`,
        `What tools or methods do you use for ${customPreferences}?`,
        `How do you measure success in ${customPreferences} projects?`,
        `Describe a challenging ${customPreferences} problem you solved.`,
        `What motivates you to work in ${customPreferences}?`
      ];
      
      // Combine custom questions with general ones
      selectedQuestions = [
        ...customQuestionTemplates,
        ...questionBank['Other'].slice(0, 20)
      ];
    } else if (jobTitle && jobTitle !== 'Other') {
      selectedQuestions = questionBank[jobTitle as keyof typeof questionBank] || questionBank['Other'];
    } else {
      selectedQuestions = questionBank['Other'];
    }

    setQuestions(selectedQuestions);
    setCurrentQuestionIndex(0);
    setIsGenerating(false);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Interview Practice</h1>
          <p className="text-gray-600">
            Practice with AI-generated interview questions tailored to your field
          </p>
        </div>

        {/* Configuration Section */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center">
              <Settings className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Interview Setup</h2>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title
                </label>
                <select
                  id="jobTitle"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a job title</option>
                  {jobTitleOptions.map((title) => (
                    <option key={title} value={title}>{title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="customPreferences" className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Preferences {jobTitle === 'Other' && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="text"
                  id="customPreferences"
                  value={customPreferences}
                  onChange={(e) => setCustomPreferences(e.target.value)}
                  placeholder={jobTitle === 'Other' ? 'Required: e.g., healthcare, education, finance' : 'Optional: e.g., focus on technical questions, behavioral questions'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required={jobTitle === 'Other'}
                />
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={generateQuestions}
                disabled={!jobTitle || isGenerating || (jobTitle === 'Other' && !customPreferences.trim())}
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="animate-spin h-5 w-5 mr-2" />
                    Generating 30 Questions...
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5 mr-2" />
                    Generate 30 Interview Questions
                  </>
                )}
              </button>
              {jobTitle === 'Other' && !customPreferences.trim() && (
                <p className="text-red-500 text-sm mt-2">
                  Custom preferences are required when "Other" is selected
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Questions Section */}
        {questions.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MessageCircle className="h-6 w-6 text-green-600 mr-3" />
                  <h2 className="text-xl font-semibold text-gray-900">Interview Questions</h2>
                </div>
                <span className="text-sm text-gray-500">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">
                  Interview Question:
                </h3>
                <p className="text-blue-800 text-lg leading-relaxed">
                  {questions[currentQuestionIndex]}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Tips for answering:</h4>
                <ul className="text-gray-700 space-y-2">
                  <li>• Take a moment to think before responding</li>
                  <li>• Use the STAR method (Situation, Task, Action, Result) for behavioral questions</li>
                  <li>• Be specific and provide concrete examples</li>
                  <li>• Keep your answer focused and relevant</li>
                  <li>• Practice speaking clearly and confidently</li>
                </ul>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={previousQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous Question
                </button>
                
                <button
                  onClick={nextQuestion}
                  disabled={currentQuestionIndex === questions.length - 1}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next Question
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Additional Resources */}
        <div className="mt-8 bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Interview Resources</h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Body Language Tips</h3>
                <p className="text-blue-800 text-sm">
                  Learn about maintaining eye contact, proper posture, and confident gestures
                </p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">STAR Method</h3>
                <p className="text-green-800 text-sm">
                  Master the Situation, Task, Action, Result framework for behavioral questions
                </p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">Follow-up Questions</h3>
                <p className="text-purple-800 text-sm">
                  Prepare thoughtful questions to ask your interviewer
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPracticePage;