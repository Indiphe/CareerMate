import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { FileText, Download, Eye, Save, Edit, MapPin, Calendar, User } from 'lucide-react';

const ResumeBuilderPage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [savedResumes, setSavedResumes] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentResumeId, setCurrentResumeId] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
      dateOfBirth: '',
      summary: '',
      aboutMe: ''
    },
    experience: [
      {
        title: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    ],
    education: [
      {
        degree: '',
        school: '',
        location: '',
        graduationDate: ''
      }
    ],
    skills: [''],
    references: [
      {
        name: '',
        position: '',
        company: '',
        phone: '',
        email: ''
      }
    ]
  });

  const templates = [
    { 
      id: 'modern', 
      name: 'Modern', 
      description: 'Clean and contemporary design with blue accents',
      preview: 'bg-gradient-to-br from-blue-50 to-white border-l-4 border-blue-500'
    },
    { 
      id: 'classic', 
      name: 'Classic', 
      description: 'Traditional professional layout in black and white',
      preview: 'bg-white border border-gray-300'
    },
    { 
      id: 'creative', 
      name: 'Creative', 
      description: 'Unique design with purple accents for creative roles',
      preview: 'bg-gradient-to-br from-purple-50 to-pink-50 border-l-4 border-purple-500'
    }
  ];

  const handlePersonalInfoChange = (field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const handleLocationChange = async (value: string) => {
    handlePersonalInfoChange('location', value);
    
    // Simulate Google Maps API integration
    if (value.length > 3) {
      // In a real implementation, you would use Google Places API here
      console.log('Searching for location:', value);
    }
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          title: '',
          company: '',
          location: '',
          startDate: '',
          endDate: '',
          description: ''
        }
      ]
    }));
  };

  const updateExperience = (index: number, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        {
          degree: '',
          school: '',
          location: '',
          graduationDate: ''
        }
      ]
    }));
  };

  const updateEducation = (index: number, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const addSkill = () => {
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, '']
    }));
  };

  const updateSkill = (index: number, value: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => i === index ? value : skill)
    }));
  };

  const addReference = () => {
    setResumeData(prev => ({
      ...prev,
      references: [
        ...prev.references,
        {
          name: '',
          position: '',
          company: '',
          phone: '',
          email: ''
        }
      ]
    }));
  };

  const updateReference = (index: number, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      references: prev.references.map((ref, i) => 
        i === index ? { ...ref, [field]: value } : ref
      )
    }));
  };

  const saveResume = () => {
    const resumeToSave = {
      id: currentResumeId || Date.now().toString(),
      ...resumeData,
      template: selectedTemplate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (currentResumeId) {
      setSavedResumes(prev => prev.map(resume => 
        resume.id === currentResumeId ? resumeToSave : resume
      ));
    } else {
      setSavedResumes(prev => [...prev, resumeToSave]);
      setCurrentResumeId(resumeToSave.id);
    }

    alert('Resume saved successfully!');
  };

  const loadResume = (resume: any) => {
    setResumeData({
      personalInfo: resume.personalInfo,
      experience: resume.experience,
      education: resume.education,
      skills: resume.skills,
      references: resume.references || []
    });
    setSelectedTemplate(resume.template);
    setCurrentResumeId(resume.id);
    setIsEditing(true);
  };

  const downloadPDF = () => {
    // In a real implementation, you would generate and download a PDF
    const resumeContent = generateResumeHTML();
    const blob = new Blob([resumeContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resumeData.personalInfo.name || 'resume'}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const generateResumeHTML = () => {
    const { personalInfo, experience, education, skills, references } = resumeData;
    
    const templateStyles = {
      modern: `
        <style>
          body { font-family: 'Arial', sans-serif; margin: 0; padding: 20px; background: #f8fafc; }
          .resume { max-width: 800px; margin: 0 auto; background: white; padding: 40px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .header { border-left: 4px solid #3b82f6; padding-left: 20px; margin-bottom: 30px; }
          .name { font-size: 28px; font-weight: bold; color: #1f2937; margin-bottom: 5px; }
          .contact { color: #6b7280; margin-bottom: 15px; }
          .section { margin-bottom: 25px; }
          .section-title { font-size: 18px; font-weight: bold; color: #3b82f6; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px; margin-bottom: 15px; }
          .experience-item, .education-item, .reference-item { margin-bottom: 15px; }
          .job-title { font-weight: bold; color: #1f2937; }
          .company { color: #6b7280; font-style: italic; }
          .skills { display: flex; flex-wrap: wrap; gap: 8px; }
          .skill { background: #dbeafe; color: #1e40af; padding: 4px 8px; border-radius: 4px; font-size: 14px; }
        </style>
      `,
      classic: `
        <style>
          body { font-family: 'Times New Roman', serif; margin: 0; padding: 20px; background: white; }
          .resume { max-width: 800px; margin: 0 auto; background: white; padding: 40px; border: 1px solid #000; }
          .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #000; padding-bottom: 15px; }
          .name { font-size: 24px; font-weight: bold; color: #000; margin-bottom: 5px; }
          .contact { color: #000; margin-bottom: 10px; }
          .section { margin-bottom: 25px; }
          .section-title { font-size: 16px; font-weight: bold; color: #000; text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 3px; margin-bottom: 15px; }
          .experience-item, .education-item, .reference-item { margin-bottom: 15px; }
          .job-title { font-weight: bold; color: #000; }
          .company { color: #000; }
          .skills { line-height: 1.6; }
        </style>
      `,
      creative: `
        <style>
          body { font-family: 'Arial', sans-serif; margin: 0; padding: 20px; background: linear-gradient(135deg, #fdf2f8 0%, #f3e8ff 100%); }
          .resume { max-width: 800px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%); color: white; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
          .name { font-size: 28px; font-weight: bold; margin-bottom: 5px; }
          .contact { opacity: 0.9; margin-bottom: 10px; }
          .section { margin-bottom: 25px; }
          .section-title { font-size: 18px; font-weight: bold; color: #8b5cf6; margin-bottom: 15px; position: relative; }
          .section-title::after { content: ''; position: absolute; bottom: -5px; left: 0; width: 50px; height: 3px; background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%); }
          .experience-item, .education-item, .reference-item { margin-bottom: 15px; padding: 15px; background: #faf5ff; border-radius: 6px; }
          .job-title { font-weight: bold; color: #7c3aed; }
          .company { color: #6b7280; font-style: italic; }
          .skills { display: flex; flex-wrap: wrap; gap: 8px; }
          .skill { background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%); color: white; padding: 6px 12px; border-radius: 20px; font-size: 14px; }
        </style>
      `
    };

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>${personalInfo.name} - Resume</title>
        ${templateStyles[selectedTemplate as keyof typeof templateStyles]}
      </head>
      <body>
        <div class="resume">
          <div class="header">
            <div class="name">${personalInfo.name}</div>
            <div class="contact">
              ${personalInfo.email} | ${personalInfo.phone} | ${personalInfo.location}
              ${personalInfo.dateOfBirth ? ` | DOB: ${personalInfo.dateOfBirth}` : ''}
            </div>
            ${personalInfo.summary ? `<div class="summary">${personalInfo.summary}</div>` : ''}
          </div>
          
          ${personalInfo.aboutMe ? `
          <div class="section">
            <div class="section-title">About Me</div>
            <p>${personalInfo.aboutMe}</p>
          </div>
          ` : ''}
          
          ${experience.some(exp => exp.title) ? `
          <div class="section">
            <div class="section-title">Experience</div>
            ${experience.filter(exp => exp.title).map(exp => `
              <div class="experience-item">
                <div class="job-title">${exp.title}</div>
                <div class="company">${exp.company} | ${exp.location} | ${exp.startDate} - ${exp.endDate}</div>
                <div class="description">${exp.description}</div>
              </div>
            `).join('')}
          </div>
          ` : ''}
          
          ${education.some(edu => edu.degree) ? `
          <div class="section">
            <div class="section-title">Education</div>
            ${education.filter(edu => edu.degree).map(edu => `
              <div class="education-item">
                <div class="degree">${edu.degree}</div>
                <div class="school">${edu.school} | ${edu.location} | ${edu.graduationDate}</div>
              </div>
            `).join('')}
          </div>
          ` : ''}
          
          ${skills.some(skill => skill.trim()) ? `
          <div class="section">
            <div class="section-title">Skills</div>
            <div class="skills">
              ${skills.filter(skill => skill.trim()).map(skill => `<span class="skill">${skill}</span>`).join('')}
            </div>
          </div>
          ` : ''}
          
          ${references.some(ref => ref.name) ? `
          <div class="section">
            <div class="section-title">References</div>
            ${references.filter(ref => ref.name).map(ref => `
              <div class="reference-item">
                <div class="job-title">${ref.name}</div>
                <div class="company">${ref.position} at ${ref.company}</div>
                <div class="contact">${ref.phone} | ${ref.email}</div>
              </div>
            `).join('')}
          </div>
          ` : ''}
        </div>
      </body>
      </html>
    `;
  };

  const ResumePreview = () => {
    const { personalInfo, experience, education, skills, references } = resumeData;
    
    const templateClasses = {
      modern: 'bg-white border-l-4 border-blue-500',
      classic: 'bg-white border border-gray-400',
      creative: 'bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200'
    };

    return (
      <div className={`p-6 rounded-lg ${templateClasses[selectedTemplate as keyof typeof templateClasses]} min-h-96`}>
        {/* Header */}
        <div className={`mb-6 ${selectedTemplate === 'creative' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-lg' : selectedTemplate === 'classic' ? 'text-center border-b-2 border-black pb-4' : 'border-l-4 border-blue-500 pl-4'}`}>
          <h1 className={`text-2xl font-bold ${selectedTemplate === 'creative' ? 'text-white' : selectedTemplate === 'modern' ? 'text-gray-900' : 'text-black'}`}>
            {personalInfo.name || 'Your Name'}
          </h1>
          <p className={`${selectedTemplate === 'creative' ? 'text-purple-100' : 'text-gray-600'}`}>
            {personalInfo.email} | {personalInfo.phone} | {personalInfo.location}
            {personalInfo.dateOfBirth && ` | DOB: ${personalInfo.dateOfBirth}`}
          </p>
          {personalInfo.summary && (
            <p className={`mt-2 ${selectedTemplate === 'creative' ? 'text-purple-100' : 'text-gray-700'}`}>
              {personalInfo.summary}
            </p>
          )}
        </div>

        {/* About Me */}
        {personalInfo.aboutMe && (
          <div className="mb-6">
            <h2 className={`text-lg font-bold mb-3 ${selectedTemplate === 'creative' ? 'text-purple-700' : selectedTemplate === 'modern' ? 'text-blue-600 border-b border-gray-200 pb-1' : 'text-black border-b border-black pb-1'}`}>
              ABOUT ME
            </h2>
            <p className="text-gray-700">{personalInfo.aboutMe}</p>
          </div>
        )}

        {/* Experience */}
        {experience.some(exp => exp.title) && (
          <div className="mb-6">
            <h2 className={`text-lg font-bold mb-3 ${selectedTemplate === 'creative' ? 'text-purple-700' : selectedTemplate === 'modern' ? 'text-blue-600 border-b border-gray-200 pb-1' : 'text-black border-b border-black pb-1'}`}>
              EXPERIENCE
            </h2>
            {experience.filter(exp => exp.title).map((exp, index) => (
              <div key={index} className={`mb-4 ${selectedTemplate === 'creative' ? 'bg-purple-50 p-3 rounded' : ''}`}>
                <h3 className="font-semibold">{exp.title}</h3>
                <p className="text-gray-600 italic">{exp.company} | {exp.location} | {exp.startDate} - {exp.endDate}</p>
                <p className="text-gray-700 mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.some(edu => edu.degree) && (
          <div className="mb-6">
            <h2 className={`text-lg font-bold mb-3 ${selectedTemplate === 'creative' ? 'text-purple-700' : selectedTemplate === 'modern' ? 'text-blue-600 border-b border-gray-200 pb-1' : 'text-black border-b border-black pb-1'}`}>
              EDUCATION
            </h2>
            {education.filter(edu => edu.degree).map((edu, index) => (
              <div key={index} className={`mb-3 ${selectedTemplate === 'creative' ? 'bg-purple-50 p-3 rounded' : ''}`}>
                <h3 className="font-semibold">{edu.degree}</h3>
                <p className="text-gray-600">{edu.school} | {edu.location} | {edu.graduationDate}</p>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {skills.some(skill => skill.trim()) && (
          <div className="mb-6">
            <h2 className={`text-lg font-bold mb-3 ${selectedTemplate === 'creative' ? 'text-purple-700' : selectedTemplate === 'modern' ? 'text-blue-600 border-b border-gray-200 pb-1' : 'text-black border-b border-black pb-1'}`}>
              SKILLS
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.filter(skill => skill.trim()).map((skill, index) => (
                <span key={index} className={`px-3 py-1 rounded text-sm ${
                  selectedTemplate === 'creative' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' :
                  selectedTemplate === 'modern' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-200 text-gray-800'
                }`}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* References */}
        {references.some(ref => ref.name) && (
          <div>
            <h2 className={`text-lg font-bold mb-3 ${selectedTemplate === 'creative' ? 'text-purple-700' : selectedTemplate === 'modern' ? 'text-blue-600 border-b border-gray-200 pb-1' : 'text-black border-b border-black pb-1'}`}>
              REFERENCES
            </h2>
            {references.filter(ref => ref.name).map((ref, index) => (
              <div key={index} className={`mb-3 ${selectedTemplate === 'creative' ? 'bg-purple-50 p-3 rounded' : ''}`}>
                <h3 className="font-semibold">{ref.name}</h3>
                <p className="text-gray-600">{ref.position} at {ref.company}</p>
                <p className="text-gray-600 text-sm">{ref.phone} | {ref.email}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Resume Builder</h1>
          <p className="text-gray-600">
            Create a professional resume with our templates and AI-powered suggestions
          </p>
        </div>

        {/* Saved Resumes */}
        {savedResumes.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Saved Resumes</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedResumes.map(resume => (
                  <div key={resume.id} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900">{resume.personalInfo.name || 'Untitled Resume'}</h3>
                    <p className="text-sm text-gray-600">Template: {resume.template}</p>
                    <p className="text-sm text-gray-500">Updated: {new Date(resume.updatedAt).toLocaleDateString()}</p>
                    <button
                      onClick={() => loadResume(resume)}
                      className="mt-2 flex items-center px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Resume Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Template Selection */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Choose Template</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {templates.map(template => (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`p-4 border-2 rounded-lg text-left transition-colors duration-200 ${
                        selectedTemplate === template.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`h-20 rounded mb-3 ${template.preview}`}></div>
                      <h3 className="font-semibold text-gray-900">{template.name}</h3>
                      <p className="text-sm text-gray-600">{template.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={resumeData.personalInfo.name}
                    onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={resumeData.personalInfo.email}
                    onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={resumeData.personalInfo.phone}
                    onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Location (e.g., New York, NY)"
                      value={resumeData.personalInfo.location}
                      onChange={(e) => handleLocationChange(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="date"
                      placeholder="Date of Birth"
                      value={resumeData.personalInfo.dateOfBirth}
                      onChange={(e) => handlePersonalInfoChange('dateOfBirth', e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <textarea
                    placeholder="Professional Summary"
                    value={resumeData.personalInfo.summary}
                    onChange={(e) => handlePersonalInfoChange('summary', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="mt-4">
                  <textarea
                    placeholder="About Me"
                    value={resumeData.personalInfo.aboutMe}
                    onChange={(e) => handlePersonalInfoChange('aboutMe', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Work Experience */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">Work Experience</h2>
                  <button
                    onClick={addExperience}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Add Experience
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-6">
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <input
                        type="text"
                        placeholder="Job Title"
                        value={exp.title}
                        onChange={(e) => updateExperience(index, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Company"
                        value={exp.company}
                        onChange={(e) => updateExperience(index, 'company', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Location"
                        value={exp.location}
                        onChange={(e) => updateExperience(index, 'location', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <div className="flex space-x-2">
                        <input
                          type="month"
                          placeholder="Start Date"
                          value={exp.startDate}
                          onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <input
                          type="month"
                          placeholder="End Date"
                          value={exp.endDate}
                          onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <textarea
                      placeholder="Job Description and Achievements"
                      value={exp.description}
                      onChange={(e) => updateExperience(index, 'description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">Education</h2>
                  <button
                    onClick={addEducation}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Add Education
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-6">
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Degree"
                        value={edu.degree}
                        onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="School/University"
                        value={edu.school}
                        onChange={(e) => updateEducation(index, 'school', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Location"
                        value={edu.location}
                        onChange={(e) => updateEducation(index, 'location', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="month"
                        placeholder="Graduation Date"
                        value={edu.graduationDate}
                        onChange={(e) => updateEducation(index, 'graduationDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
                  <button
                    onClick={addSkill}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Add Skill
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resumeData.skills.map((skill, index) => (
                    <input
                      key={index}
                      type="text"
                      placeholder="Skill"
                      value={skill}
                      onChange={(e) => updateSkill(index, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* References */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">References</h2>
                  <button
                    onClick={addReference}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Add Reference
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-6">
                {resumeData.references.map((ref, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Reference Name"
                        value={ref.name}
                        onChange={(e) => updateReference(index, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Position/Title"
                        value={ref.position}
                        onChange={(e) => updateReference(index, 'position', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Company"
                        value={ref.company}
                        onChange={(e) => updateReference(index, 'company', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={ref.phone}
                        onChange={(e) => updateReference(index, 'phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={ref.email}
                        onChange={(e) => updateReference(index, 'email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent md:col-span-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Preview and Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm sticky top-8">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Resume Preview</h2>
              </div>
              <div className="p-6">
                {showPreview || resumeData.personalInfo.name ? (
                  <div className="mb-6 max-h-96 overflow-y-auto">
                    <ResumePreview />
                  </div>
                ) : (
                  <div className="bg-gray-100 rounded-lg p-4 mb-6 min-h-96 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <FileText className="h-16 w-16 mx-auto mb-4" />
                      <p>Resume preview will appear here</p>
                      <p className="text-sm">Fill in the form to see your resume</p>
                    </div>
                  </div>
                )}
                
                <div className="space-y-3">
                  <button 
                    onClick={() => setShowPreview(true)}
                    className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview Resume
                  </button>
                  
                  <button 
                    onClick={downloadPDF}
                    className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </button>
                  
                  <button 
                    onClick={saveResume}
                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Resume
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilderPage;