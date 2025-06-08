import React from 'react';
import { SKILLS_DATA, TEXT_COLOR_HEADLINE, TEXT_COLOR_MUTED, ACCENT_COLOR_PRIMARY, CARD_BG_COLOR } from '../constants';
import { SkillCategory } from '../types';

const SkillTag: React.FC<{ skill: string }> = ({ skill }) => (
  <span className={`inline-block bg-gray-700 bg-opacity-70 text-gray-300 text-sm px-4 py-2 rounded-full shadow-sm hover:bg-${ACCENT_COLOR_PRIMARY} hover:text-white transition-all duration-200 cursor-default`}>
    {skill}
  </span>
);

const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 md:mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold ${TEXT_COLOR_HEADLINE} mb-4`}>Skills & Expertise</h2>
          <p className={`${TEXT_COLOR_MUTED} text-lg max-w-2xl`}>
            A versatile skill set honed to deliver innovative and impactful digital solutions across the product design process.
          </p>
        </div>
        <div className="space-y-12">
          {SKILLS_DATA.map((category: SkillCategory) => (
            <div key={category.name} className={`${CARD_BG_COLOR} p-6 md:p-8 rounded-2xl shadow-xl border border-gray-800`}>
              <h3 className={`text-2xl font-semibold ${TEXT_COLOR_HEADLINE} mb-6 border-b border-gray-700 pb-4`}>{category.name}</h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill: string) => (
                  <SkillTag key={skill} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;