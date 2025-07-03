import React from 'react';
import { Heart, Plane, GraduationCap, Home, Coffee, Shield } from 'lucide-react';

const Benefits = () => {
  const benefits = [
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive health, dental, and vision coverage for you and your family.',
      color: 'bg-red-100 text-red-600'
    },
    {
      icon: Plane,
      title: 'Flexible PTO',
      description: 'Unlimited paid time off to recharge and spend time with loved ones.',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: GraduationCap,
      title: 'Learning & Development',
      description: '$5,000 annual budget for courses, conferences, and skill development.',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: Home,
      title: 'Remote Work',
      description: 'Work from anywhere with flexible hours and home office stipend.',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Coffee,
      title: 'Perks & Amenities',
      description: 'Free meals, snacks, coffee, and fully stocked kitchen in all offices.',
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      icon: Shield,
      title: 'Financial Security',
      description: 'Competitive salary, equity options, and 401(k) matching.',
      color: 'bg-indigo-100 text-indigo-600'
    }
  ];

  return (
    <section id="benefits" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Join TalentHub?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We believe in taking care of our team members with comprehensive benefits 
            and perks that support your personal and professional growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className={`inline-flex items-center justify-center w-16 h-16 ${benefit.color} rounded-full mb-6`}>
                <benefit.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Join Our Team?</h3>
          <p className="text-xl mb-8 opacity-90">
            Discover opportunities that match your skills and passion. 
            Take the next step in your career journey with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Browse All Jobs
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;