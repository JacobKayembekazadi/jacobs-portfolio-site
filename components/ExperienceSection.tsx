import React from 'react';
import { EXPERIENCE_DATA, CARD_BG_COLOR, TEXT_COLOR_HEADLINE, TEXT_COLOR_MUTED, ACCENT_COLOR_PRIMARY, DARKER_BG_COLOR } from '../constants';
import { ExperienceItem } from '../types';
// import { BriefcaseIcon } from './icons/InterfaceIcons';

const ExperienceCard: React.FC<{ item: ExperienceItem; index: number }> = ({ item, index }) => {
  const getCardStyle = (index: number) => {
    // Alternate card layouts for visual interest
    switch (index % 3) {
      case 0: return 'lg:col-span-2'; // Wider card
      case 1: return 'lg:col-span-1'; // Normal card
      case 2: return 'lg:col-span-1'; // Normal card
      default: return 'lg:col-span-1';
    }
  };

  const getYearFromPeriod = (period: string) => {
    // Extract the start year from period (e.g., "2022 - Present" -> "2022")
    return period.split(' ')[0];
  };

  const getIconForRole = (role: string) => {
    if (role.toLowerCase().includes('ai') || role.toLowerCase().includes('strategist')) return '🧠';
    if (role.toLowerCase().includes('digital') || role.toLowerCase().includes('operations')) return '⚙️';
    if (role.toLowerCase().includes('founder') || role.toLowerCase().includes('entrepreneur')) return '🚀';
    return '💼';
  };

  return (
    <div className={`${CARD_BG_COLOR} rounded-xl p-6 md:p-8 shadow-lg border border-gray-800 hover:border-${ACCENT_COLOR_PRIMARY} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-${ACCENT_COLOR_PRIMARY}/20 ${getCardStyle(index)} flex flex-col relative overflow-hidden`}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header with icon and period */}
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 bg-${ACCENT_COLOR_PRIMARY} bg-opacity-10 rounded-lg text-2xl`}>
            {getIconForRole(item.role)}
          </div>
          <div className="text-right">
            <div className={`text-xs ${TEXT_COLOR_MUTED} uppercase tracking-wider`}>
              {getYearFromPeriod(item.period)}
            </div>
            <div className={`text-xs ${TEXT_COLOR_MUTED} mt-1 font-medium`}>
              {item.period.includes('Present') ? 'Current' : 'Completed'}
            </div>
          </div>
        </div>

        {/* Role and Company */}
        <div className="mb-4">
          <h3 className={`text-xl md:text-2xl font-bold ${TEXT_COLOR_HEADLINE} mb-2 leading-tight`}>
            {item.role}
          </h3>
          {item.company && (
            <p className={`text-lg text-${ACCENT_COLOR_PRIMARY} font-medium`}>
              {item.company}
            </p>
          )}
        </div>

        {/* Logo if available */}
        {item.logoUrl && (
          <div className="mb-4">
            <img 
              src={item.logoUrl} 
              alt={item.company || 'company logo'} 
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-700" 
            />
          </div>
        )}

        {/* Description */}
        <div className="flex-grow">
          <p className={`${TEXT_COLOR_MUTED} text-sm leading-relaxed`}>
            {item.description}
          </p>
        </div>

        {/* Bottom accent line */}
        <div className={`mt-6 h-1 w-16 bg-${ACCENT_COLOR_PRIMARY} rounded-full`}></div>
      </div>
    </div>
  );
};

const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className={`py-20 md:py-28 ${DARKER_BG_COLOR} rounded-none md:rounded-3xl my-0 md:my-24 mx-0 md:max-w-7xl md:mx-auto`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 md:mb-16 text-center md:text-left">
          <h2 className={`text-3xl md:text-4xl font-bold ${TEXT_COLOR_HEADLINE} mb-4`}>Professional Journey</h2>
          <p className={`${TEXT_COLOR_MUTED} text-lg max-w-2xl mx-auto md:mx-0`}>
            A timeline of key roles and responsibilities that have shaped my expertise in AI integration and digital transformation.
          </p>
        </div>
        
        {/* Card Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 auto-rows-auto">
          {EXPERIENCE_DATA.map((item: ExperienceItem, index: number) => (
            <ExperienceCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;