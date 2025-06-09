import React, { useState } from 'react';
import { PERSONAL_INFO, TEXT_COLOR_HEADLINE, TEXT_COLOR_MUTED, TECH_STACK_HERO_ITEMS, TEXT_COLOR_LIGHT, MAIN_BG_COLOR } from '../constants';
import LeadQualificationSystem from './LeadQualificationSystem';

const HeroSection: React.FC = () => {
  const [showQualification, setShowQualification] = useState(false);

  const handleAdviceComplete = (data: any) => {
    console.log('Marketing advice session completed:', data);
  };
  return (
    <section className={`py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center flex flex-col items-center justify-center min-h-[calc(100vh-100px)] ${MAIN_BG_COLOR}`}>
      
      {/* Profile Image - Updated with new image */}
      <div className="relative mb-6">
        <img
          src="/images/jacob-avatar.png.png"
          alt={PERSONAL_INFO.name}
          className="w-32 h-32 md:w-36 md:h-36 rounded-full object-cover shadow-2xl border-4 border-gray-700"
        />
        {/* Subtle glow effect around image */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl -z-10"></div>
      </div>

      {/* Main Headline with Gradient */}
      <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold ${TEXT_COLOR_HEADLINE} leading-tight mb-6 max-w-3xl`}>
        {PERSONAL_INFO.heroHeadline.part1}
        <span className="gradient-text">{PERSONAL_INFO.heroHeadline.gradient1}</span>
        {PERSONAL_INFO.heroHeadline.part2}
        <span className="gradient-text">{PERSONAL_INFO.heroHeadline.gradient2}</span>
        {PERSONAL_INFO.heroHeadline.part3}
      </h1>
      
      {/* Sub-headline */}
      <p className={`${TEXT_COLOR_MUTED} text-lg md:text-xl mb-10 max-w-xl`}>
        {PERSONAL_INFO.heroSubheadline}
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <button
          onClick={() => setShowQualification(true)}
          className={`px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium shadow-xl hover:shadow-blue-500/40 transform hover:scale-105 flex items-center space-x-2`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <span>Get Marketing Strategies Now</span>
        </button>
        <a
          href="#projects"
          className={`px-8 py-3 border border-gray-700 rounded-full ${TEXT_COLOR_LIGHT} hover:bg-gray-800 hover:border-gray-600 transition font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark focus:ring-gray-500`}
        >
          View My Work
        </a>
      </div>

      {/* Tech Stack Icons */}
      <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 md:gap-x-8">
        {TECH_STACK_HERO_ITEMS.map((item, index) => (
          <div 
            key={index} 
            title={item.name}
            className="p-3 bg-gray-800 bg-opacity-50 rounded-full shadow-md hover:bg-gray-700 transition-colors"
          >
            <item.Icon className={`w-7 h-7 md:w-8 md:h-8 ${TEXT_COLOR_MUTED} group-hover:text-light transition-colors`} />
          </div>
        ))}
      </div>

      {/* AI Lead Qualification System */}
      <LeadQualificationSystem
        isOpen={showQualification}
        onClose={() => setShowQualification(false)}
        onLeadQualified={handleAdviceComplete}
      />
    </section>
  );
};

export default HeroSection;