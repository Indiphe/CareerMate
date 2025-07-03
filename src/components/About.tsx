import React from 'react';
import { Target, Users, Award, TrendingUp } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Users, value: '500+', label: 'Team Members' },
    { icon: Target, value: '98%', label: 'Employee Satisfaction' },
    { icon: Award, value: '50+', label: 'Industry Awards' },
    { icon: TrendingUp, value: '200%', label: 'Growth Rate' }
  ];

  const values = [
    {
      title: 'Innovation First',
      description: 'We embrace new technologies and creative solutions to solve complex problems.',
      icon: '🚀'
    },
    {
      title: 'People Matter',
      description: 'Our team is our greatest asset. We invest in growth, well-being, and success.',
      icon: '❤️'
    },
    {
      title: 'Quality Excellence',
      description: 'We deliver exceptional products and services that exceed expectations.',
      icon: '⭐'
    },
    {
      title: 'Open Communication',
      description: 'Transparency and honest dialogue drive our collaborative culture.',
      icon: '💬'
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About TalentHub</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're building the future of work by connecting talented individuals with 
            meaningful opportunities and empowering teams to achieve extraordinary results.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h3>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Founded in 2020, TalentHub has grown from a small startup to a leading technology 
              company with a global presence. We're passionate about creating products that 
              make a real difference in people's lives and businesses.
            </p>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Our diverse team of innovators, creators, and problem-solvers work together 
              to push boundaries and deliver exceptional results. We believe in the power 
              of collaboration and the importance of creating an inclusive environment 
              where everyone can thrive.
            </p>
          </div>
          <div>
            <img 
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Team meeting"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <stat.icon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h4>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;