import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import MainPage from './pages/MainPage';
import ProfilePage from './pages/ProfilePage';
import InterviewPracticePage from './pages/InterviewPracticePage';
import JobSearchPage from './pages/JobSearchPage';
import ResumeBuilderPage from './pages/ResumeBuilderPage';
import CommunityPage from './pages/CommunityPage';
import { AuthProvider, useAuth } from './context/AuthContext';

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route 
        path="/main" 
        element={isAuthenticated ? <MainPage /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/profile" 
        element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/interview-practice" 
        element={isAuthenticated ? <InterviewPracticePage /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/job-search" 
        element={isAuthenticated ? <JobSearchPage /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/resume-builder" 
        element={isAuthenticated ? <ResumeBuilderPage /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/community" 
        element={isAuthenticated ? <CommunityPage /> : <Navigate to="/login" />} 
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;