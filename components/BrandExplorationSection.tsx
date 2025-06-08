import React from 'react';
import { BRAND_EXPLORATIONS_DATA, TEXT_COLOR_HEADLINE, TEXT_COLOR_MUTED, ACCENT_COLOR_PRIMARY, CARD_BG_COLOR, MAIN_BG_COLOR } from '../constants';
import { BrandExplorationItem } from '../types';

interface BrandExplorationCardProps {
  item: BrandExplorationItem;
}

const BrandExplorationCard: React.FC<BrandExplorationCardProps> = ({ item }) => {
  return (
    <div className={`flex-shrink-0 w-72 md:w-80 rounded-xl overflow-hidden shadow-xl group border border-gray-800 hover:border-${ACCENT_COLOR_PRIMARY}/70 transition-all duration-300 ${CARD_BG_COLOR} hover:shadow-${ACCENT_COLOR_PRIMARY}/20 flex flex-col transform hover:-translate-y-1`}>
      <div className="w-full aspect-[16/10] overflow-hidden bg-gray-900">
        <img
          src={item.imageUrl}
          alt={item.altText || item.title || 'Brand Exploration'}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 md:p-5 flex flex-col flex-grow">
        {item.title && (
          <h3 className={`text-lg font-semibold ${TEXT_COLOR_HEADLINE} mb-1 truncate group-hover:text-${ACCENT_COLOR_PRIMARY} transition-colors`}>
            {item.title}
          </h3>
        )}
        {item.description && (
          <p className={`${TEXT_COLOR_MUTED} text-sm line-clamp-2 flex-grow`}>
            {item.description}
          </p>
        )}
      </div>
    </div>
  );
};

const BrandExplorationSection: React.FC = () => {
  return (
    <section id="brand-explorations" className={`py-16 md:py-24 ${MAIN_BG_COLOR}`}>
      <div className="container mx-auto px-0 sm:px-4 lg:px-8">
        <div className="text-center mb-12 md:mb-16 px-4 sm:px-0">
          <h2 className={`text-3xl md:text-4xl font-bold ${TEXT_COLOR_HEADLINE} mb-4`}>AI-Powered Brand Explorations</h2>
          <p className={`${TEXT_COLOR_MUTED} text-lg max-w-2xl mx-auto`}>
            A showcase of unique brand concepts and visual identities generated with AI.
          </p>
        </div>

        {/* Add 'overflow-x-auto' for horizontal scrolling and Tailwind classes for basic scrollbar styling if desired, or rely on browser defaults */}
        <div className="flex overflow-x-auto space-x-6 md:space-x-8 pb-8 pt-2 px-4 sm:px-6 lg:px-8 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          {BRAND_EXPLORATIONS_DATA.map((item: BrandExplorationItem) => (
            <BrandExplorationCard key={item.id} item={item} />
          ))}
          {/* Add a spacer to allow last card to be scrolled fully into view if needed */}
          <div className="flex-shrink-0 w-1"></div>
        </div>
      </div>
      {/* 
        The <style jsx global> block was removed as it's Next.js specific and caused a TypeScript error.
        For custom scrollbars in a pure React + Tailwind setup, you would typically:
        1. Rely on browser default scrollbars.
        2. Use a Tailwind plugin like `tailwind-scrollbar` (requires installation and configuration).
        3. Add global CSS in your main CSS file if you have one, or directly in index.html for very simple cases.
        The classes `scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800` are examples if using a plugin like tailwind-scrollbar.
        Without a plugin, these classes won't have an effect, and default browser scrollbars will be used.
      */}
    </section>
  );
};

export default BrandExplorationSection;