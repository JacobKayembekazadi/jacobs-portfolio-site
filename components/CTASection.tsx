import React, { useState } from 'react';
import { TEXT_COLOR_HEADLINE, TEXT_COLOR_MUTED, ACCENT_COLOR_PRIMARY, DARKER_BG_COLOR } from '../constants';
import LeadQualificationSystem from './LeadQualificationSystem';
import AdminDashboard from './AdminDashboard';
import { LeadQualification } from '../types';

const CTASection: React.FC = () => {
  const [showQualification, setShowQualification] = useState(false);
  const [showAdminDash, setShowAdminDash] = useState(false);
  const [_leads, setLeads] = useState<LeadQualification[]>([]);

  const handleLeadQualified = (lead: LeadQualification) => {
    setLeads(prev => [...prev, lead]);
    console.log('New lead qualified:', lead);
  };

  // Admin access (hidden feature - double-click on logo/title)
  const handleAdminAccess = (e: React.MouseEvent) => {
    if (e.detail === 2) { // Double click
      setShowAdminDash(true);
    }
  };

  return (
    <>
      <section id="contact" className={`py-20 md:py-32 ${DARKER_BG_COLOR}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 
            className={`text-3xl md:text-4xl lg:text-5xl font-bold ${TEXT_COLOR_HEADLINE} mb-6 cursor-pointer`}
            onClick={handleAdminAccess}
          >
             Let's Build Something
             <br />
             <span className="gradient-text">Transformative Together</span>.
          </h2>
          <p className={`${TEXT_COLOR_MUTED} text-lg md:text-xl mb-10 max-w-2xl mx-auto`}>
          Ready to leverage AI and strategic insights for impactful results? Let's discuss how I can help elevate your next project or business initiative.
          </p>
          
          {/* Enhanced CTA Options */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            {/* AI Qualification Button */}
            <button
              onClick={() => setShowQualification(true)}
              className={`px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-lg font-medium shadow-xl hover:shadow-blue-500/40 transform hover:scale-105 flex items-center space-x-2`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span>Tell My AI About Your Project</span>
            </button>

            {/* Traditional Email */}
            <a
              href="mailto:jacob.kayembe.contact@example.com"
              className={`px-8 py-4 bg-${ACCENT_COLOR_PRIMARY} rounded-full text-white hover:bg-opacity-90 transition text-lg font-medium shadow-xl hover:shadow-${ACCENT_COLOR_PRIMARY}/40 flex items-center space-x-2`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Send Direct Email</span>
            </a>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 max-w-2xl mx-auto">
            <div className="text-left">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className={`font-semibold ${TEXT_COLOR_HEADLINE}`}>AI-Powered Qualification</h3>
              </div>
              <p className={`${TEXT_COLOR_MUTED} text-sm`}>
                Get instant, personalized project insights and recommendations tailored to your specific needs and timeline.
              </p>
            </div>
            
            <div className="text-left">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className={`font-semibold ${TEXT_COLOR_HEADLINE}`}>Priority Response</h3>
              </div>
              <p className={`${TEXT_COLOR_MUTED} text-sm`}>
                High-value projects get priority handling with detailed proposals and consultation scheduling within hours.
              </p>
            </div>
          </div>

          <p className={`${TEXT_COLOR_MUTED} text-sm`}>
              Or connect with me on <a href="#" className={`text-${ACCENT_COLOR_PRIMARY} hover:underline font-medium`}>LinkedIn</a> for a quick chat.
          </p>
        </div>
      </section>

      {/* AI Lead Qualification System */}
      <LeadQualificationSystem
        isOpen={showQualification}
        onClose={() => setShowQualification(false)}
        onLeadQualified={handleLeadQualified}
      />

      {/* Admin Dashboard (Hidden Feature) */}
      <AdminDashboard
        isOpen={showAdminDash}
        onClose={() => setShowAdminDash(false)}
      />
    </>
  );
};

export default CTASection;