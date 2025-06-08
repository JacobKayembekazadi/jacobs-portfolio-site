import React, { useState } from 'react';
import { PERSONAL_INFO, TEXT_COLOR_HEADLINE, TEXT_COLOR_MUTED, TECH_STACK_HERO_ITEMS, TEXT_COLOR_LIGHT, MAIN_BG_COLOR } from '../constants';
import { VerifiedBadgeIcon } from './icons/InterfaceIcons'; // New Icon for badge
import LeadQualificationSystem from './LeadQualificationSystem';
import { LeadQualification } from '../types';

const HeroSection: React.FC = () => {
  const [showQualification, setShowQualification] = useState(false);

  const handleLeadQualified = (lead: LeadQualification) => {
    console.log('New lead qualified from hero:', lead);
  };
  return (
    <section className={`py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center flex flex-col items-center justify-center min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-80px)] ${MAIN_BG_COLOR}`}>
      
      {/* Profile Image */}
      <img
        src={PERSONAL_INFO.profileImageUrl}
        alt={PERSONAL_INFO.name}
        className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover mb-4 border-2 border-gray-700 shadow-lg"
      />

      {/* Verified Expert Badge */}
      <div className="flex items-center bg-gray-800 bg-opacity-80 text-light px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-6 shadow">
        <VerifiedBadgeIcon className="w-4 h-4 mr-1.5 text-primary" />
        Verified Expert
        <span className="mx-1.5 text-gray-500">|</span> 
        <a href={`https://${PERSONAL_INFO.contraUrl}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            {PERSONAL_INFO.contraUrl}
        </a>
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
      <div className="flex flex-wrap justify-center gap-4 mb-16">
        <button
          onClick={() => setShowQualification(true)}
          className={`px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium shadow-xl hover:shadow-blue-500/40 transform hover:scale-105 flex items-center space-x-2`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <span>Tell My AI About Your Project</span>
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
        onLeadQualified={handleLeadQualified}
      />
    </section>
  );
};

export default HeroSection;