import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Build Your Future
              <span className="block text-blue-300">With Us</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Join a team of innovators, creators, and problem-solvers who are passionate about 
              making a difference. Discover opportunities that will challenge and inspire you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center justify-center group">
                View Open Positions
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 border-2 border-blue-300 text-blue-100 rounded-lg hover:bg-blue-600 hover:border-blue-600 transition-all duration-200 flex items-center justify-center">
                <Play className="mr-2 h-5 w-5" />
                Watch Our Story
              </button>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Team collaboration"
              className="rounded-lg shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;