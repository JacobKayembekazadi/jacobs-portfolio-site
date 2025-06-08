import React from 'react';
import { CORE_STRENGTHS_DATA, CARD_BG_COLOR, TEXT_COLOR_HEADLINE, TEXT_COLOR_MUTED, ACCENT_COLOR_PRIMARY, DARKER_BG_COLOR } from '../constants';
import { Strength } from '../types';

const StrengthCard: React.FC<{ strength: Strength }> = ({ strength }) => {
  return (
    <div className={`${CARD_BG_COLOR} rounded-xl p-6 md:p-8 shadow-lg border border-gray-800 hover:border-${ACCENT_COLOR_PRIMARY} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-${ACCENT_COLOR_PRIMARY}/20`}>
      {strength.icon && (
        <div className={`mb-4 inline-block p-3 bg-${ACCENT_COLOR_PRIMARY} bg-opacity-10 rounded-lg`}>
          <strength.icon className={`w-8 h-8 text-${ACCENT_COLOR_PRIMARY}`} />
        </div>
      )}
      <h3 className={`text-xl font-semibold ${TEXT_COLOR_HEADLINE} mb-3`}>{strength.title}</h3>
      <p className={`${TEXT_COLOR_MUTED} text-sm`}>{strength.description}</p>
    </div>
  );
};

const CoreStrengthsSection: React.FC = () => {
  return (
    <section id="strengths" className={`py-16 md:py-24 ${DARKER_BG_COLOR} rounded-none md:rounded-3xl my-0 md:my-20 mx-0 md:max-w-7xl md:mx-auto`}> {/* Athos "About" section style */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 md:mb-16 text-center md:text-left">
          <h2 className={`text-3xl md:text-4xl font-bold ${TEXT_COLOR_HEADLINE} mb-4`}>About Me & Core Strengths</h2>
          <p className={`${TEXT_COLOR_MUTED} text-lg max-w-2xl mx-auto md:mx-0`}>
            Driving transformation through a unique blend of strategic insight, AI fluency, and operational excellence.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CORE_STRENGTHS_DATA.map((strength: Strength) => (
            <StrengthCard key={strength.id} strength={strength} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreStrengthsSection;