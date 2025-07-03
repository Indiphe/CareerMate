import React, { useState } from 'react';
import { Menu, X, Users } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600 mr-3" />
            <span className="text-2xl font-bold text-gray-900">TalentHub</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#jobs" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">Jobs</a>
            <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">About</a>
            <a href="#benefits" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">Benefits</a>
            <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">Culture</a>
            <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">Contact</a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button className="px-4 py-2 text-blue-600 hover:text-blue-700 transition-colors duration-200">
              Sign In
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Apply Now
            </button>
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#jobs" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Jobs</a>
            <a href="#about" className="block px-3 py-2 text-gray-600 hover:text-blue-600">About</a>
            <a href="#benefits" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Benefits</a>
            <a href="#testimonials" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Culture</a>
            <a href="#contact" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Contact</a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;