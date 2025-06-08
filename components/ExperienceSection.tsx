import React from 'react';
import { EXPERIENCE_DATA, CARD_BG_COLOR, TEXT_COLOR_HEADLINE, TEXT_COLOR_MUTED, ACCENT_COLOR_PRIMARY, DARKER_BG_COLOR } from '../constants';
import { ExperienceItem } from '../types';
// import { BriefcaseIcon } from './icons/InterfaceIcons';

const ExperienceCard: React.FC<{ item: ExperienceItem }> = ({ item }) => {
  return (
    <div className={`${CARD_BG_COLOR} rounded-2xl p-6 md:p-8 shadow-lg border border-gray-800 hover:border-${ACCENT_COLOR_PRIMARY}/70 transition-colors duration-300`}>
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
        <div className="mb-2 sm:mb-0">
            <h3 className={`text-xl font-semibold ${TEXT_COLOR_HEADLINE} mb-0.5`}>{item.role}</h3>
            <p className={`text-md text-${ACCENT_COLOR_PRIMARY}`}>
            {item.company}
            </p>
        </div>
        <p className={`text-sm ${TEXT_COLOR_MUTED} sm:text-right`}>{item.period}</p>
      </div>
      {item.logoUrl && (
          <img src={item.logoUrl} alt={item.company || 'company logo'} className="w-10 h-10 rounded-full object-contain my-3 border-2 border-gray-700" />
      )}
      <p className={`${TEXT_COLOR_MUTED} text-sm leading-relaxed mt-1`}>{item.description}</p>
    </div>
  );
};


const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className={`py-16 md:py-24 ${DARKER_BG_COLOR} rounded-none md:rounded-3xl my-0 md:my-20 mx-0 md:max-w-7xl md:mx-auto`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 md:mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold ${TEXT_COLOR_HEADLINE} mb-4`}>Professional Journey</h2>
          <p className={`${TEXT_COLOR_MUTED} text-lg max-w-2xl`}>
            A timeline of key roles and responsibilities that have shaped my expertise.
          </p>
        </div>
        <div className="space-y-8">
          {EXPERIENCE_DATA.map((item: ExperienceItem) => (
            <ExperienceCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;