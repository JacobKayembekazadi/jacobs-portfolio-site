import React, { useState } from 'react';
import { FAQ_DATA, DARKER_BG_COLOR, TEXT_COLOR_HEADLINE, TEXT_COLOR_MUTED, ACCENT_COLOR_PRIMARY } from '../constants'; // Using DARKER_BG_COLOR for section
import { FAQ } from '../types';
import { ChevronDownIcon, ChevronUpIcon } from './icons/InterfaceIcons';

const FAQItem: React.FC<{ faq: FAQ; isOpen: boolean; onClick: () => void }> = ({ faq, isOpen, onClick }) => {
  return (
    <div className={`border-b border-gray-800 last:border-b-0`}>
      <button
        onClick={onClick}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.id}`}
        className="w-full flex justify-between items-center py-5 md:py-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-${ACCENT_COLOR_PRIMARY} rounded"
      >
        <span className={`text-lg font-medium ${TEXT_COLOR_HEADLINE} group-hover:text-${ACCENT_COLOR_PRIMARY} transition-colors`}>{faq.question}</span>
        {isOpen ? <ChevronUpIcon className={`w-5 h-5 text-${ACCENT_COLOR_PRIMARY}`} /> : <ChevronDownIcon className={`w-5 h-5 ${TEXT_COLOR_MUTED} group-hover:text-${ACCENT_COLOR_PRIMARY} transition-colors`} />}
      </button>
      {isOpen && (
        <div id={`faq-answer-${faq.id}`} className="pb-5 md:pb-6 pr-6">
          <p className={`${TEXT_COLOR_MUTED} text-base leading-relaxed`}>{faq.answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQSection: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section id="faq" className={`py-16 md:py-24 ${DARKER_BG_COLOR}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold ${TEXT_COLOR_HEADLINE} mb-4`}>Frequently Asked Questions</h2>
          <p className={`${TEXT_COLOR_MUTED} text-lg max-w-2xl mx-auto`}>
            Common queries about my services, approach, and expertise.
          </p>
        </div>
        <div className="bg-dark p-0 md:p-2 rounded-xl"> {/* Athos FAQs are often on a slightly different or same dark bg, not heavily carded */}
          {FAQ_DATA.map((faq: FAQ) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isOpen={openFAQ === faq.id}
              onClick={() => handleToggle(faq.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;