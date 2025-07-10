import React, { useState } from 'react';
import { PERSONAL_INFO, TEXT_COLOR_HEADLINE, TEXT_COLOR_MUTED, TECH_STACK_HERO_ITEMS, TEXT_COLOR_LIGHT, MAIN_BG_COLOR } from '../constants';
import LeadQualificationSystem from './LeadQualificationSystem';
import TypingEffect from './TypingEffect';

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
          src="/images/jacob-3d-avater.png"
          alt={PERSONAL_INFO.name}
          className="w-32 h-32 md:w-36 md:h-36 rounded-full object-cover shadow-2xl border-4 border-gray-700"
        />
        {/* Subtle glow effect around image */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl -z-10"></div>
      </div>

      {/* Main Headline with Neon Aurora Design */}
      <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold ${TEXT_COLOR_HEADLINE} leading-tight mb-6 max-w-3xl`}>
        <span className="text-[#a855f7] neon-glow-primary">{PERSONAL_INFO.heroHeadline.gradient1}</span>
      </h1>
      
      {/* Sub-headline */}
      <p className={`${TEXT_COLOR_MUTED} text-lg md:text-xl mb-10 max-w-xl`}>
        {PERSONAL_INFO.heroSubheadline}
      </p>

      {/* Action Buttons with Neon Design */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <button
          onClick={() => setShowQualification(true)}
          className="neon-button hover:neon-glow-primary flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <span>Get Marketing Strategies Now</span>
        </button>
        <a
          href="#projects"
          className="neon-button hover:neon-glow-secondary"
        >
          View My Work
        </a>
      </div>

      {/* Tech Stack Icons with Neon Design */}
      <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 md:gap-x-8">
        {TECH_STACK_HERO_ITEMS.map((item, index) => (
          <div 
            key={index} 
            title={item.name}
            className="p-3 bg-[#111827] border border-[#374151] rounded-full hover:neon-glow-primary transition-all duration-300"
          >
            <item.Icon className={`w-7 h-7 md:w-8 md:h-8 text-[#A3A3B5] hover:text-[#a855f7] transition-colors`} />
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