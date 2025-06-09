import React, { useState, useEffect } from 'react';
import { BRAND_EXPLORATIONS_DATA, TEXT_COLOR_HEADLINE, TEXT_COLOR_MUTED, MAIN_BG_COLOR } from '../constants';
import { BrandExplorationItem } from '../types';

interface CarouselProject {
  id: string;
  imageUrl: string;
  category: string;
  title: string;
  description: string;
  altText: string;
}

const BrandExplorationSection: React.FC = () => {
  // Transform existing data to new carousel format with enhanced content
  const carouselProjects: CarouselProject[] = [
    {
      id: 'brand1',
      imageUrl: '/images/brand/aethel-headphones.jpg.jpg',
      category: 'PRODUCT DESIGN - AI GENERATED',
      title: 'AETHEL AUDIO LIFESTYLE',
      description: 'AI-assisted product photography for premium headphones, showcasing sophisticated brand positioning through automated content generation.',
      altText: 'Premium headphones on a wooden table with coffee and plant',
    },
    {
      id: 'brand2',
      imageUrl: '/images/brand/earth-day-island.jpg.jpg',
      category: 'ENVIRONMENTAL CAMPAIGN - AI IMAGERY',
      title: 'HAPPY EARTH DAY CAMPAIGN',
      description: 'AI-generated imagery for environmental awareness and conservation, creating compelling visual narratives for sustainability initiatives.',
      altText: 'Heart-shaped island with lush greenery surrounded by ocean and wildlife',
    },
    {
      id: 'brand3',
      imageUrl: '/images/brand/mangrove-website.jpg.jpg',
      category: 'WEB DESIGN - AI CONCEPTS',
      title: 'NATURE BREATHES WEBSITE',
      description: 'Environmental website design featuring AI-generated mangrove conservation visuals, blending technical excellence with environmental advocacy.',
      altText: 'Website design showing mangrove trees on an island',
    },
    {
      id: 'brand4',
      imageUrl: '/images/brand/mangrove-illustration.jpg.jpg',
      category: 'ILLUSTRATIVE DESIGN - AI ART',
      title: 'ECO-DESIGN ILLUSTRATION',
      description: 'Artistic representation of ecological ecosystems with AI-generated illustrations, demonstrating the fusion of technology and environmental storytelling.',
      altText: 'Illustrated mangrove trees on a small island surrounded by water',
    },
    {
      id: 'brand5',
      imageUrl: '/images/brand/mobile-island-ar.jpg.jpg',
      category: 'AR EXPERIENCE - AI INNOVATION',
      title: 'PLANT HOPE AR EXPERIENCE',
      description: 'Augmented reality concept for environmental awareness on mobile platforms, merging digital innovation with conservation messaging.',
      altText: 'Mobile phone displaying an AR island with mangroves emerging from screen',
    },
    {
      id: 'brand6',
      imageUrl: '/images/brand/salt-conversation.jpg.jpg',
      category: 'UI/UX CONCEPTS - AI DESIGN',
      title: 'CONVERSATIONAL UI CONCEPTS',
      description: 'Exploring AI-driven user interface design for interactive experiences, demonstrating creative approaches to digital communication.',
      altText: 'Creative composition with salt shakers and miniature figures with chat bubble',
    },
    {
      id: 'brand7',
      imageUrl: '/images/brand/salt-comment.jpg.png',
      category: 'SOCIAL ENGAGEMENT - AI CREATIVITY',
      title: 'SOCIAL ENGAGEMENT DESIGN',
      description: 'Interactive social media concepts with playful visual metaphors, showcasing AI-generated content for digital engagement strategies.',
      altText: 'Salt shaker with miniature figure and comment bubble',
    },
    {
      id: 'brand8',
      imageUrl: '/images/brand/sync-dinner.jpg.png',
      category: 'APP BRANDING - AI VISUALS',
      title: 'SYNC FOOD DELIVERY',
      description: 'Modern food delivery app branding with AI-enhanced progress visualization, demonstrating brand innovation in the digital marketplace.',
      altText: 'Food delivery concept showing curry dish with loading bar design',
    },
    {
      id: 'brand9',
      imageUrl: '/images/brand/billboard-tide.jpg.png',
      category: 'OUTDOOR ADVERTISING - AI CAMPAIGNS',
      title: 'HOLD BACK THE TIDE BILLBOARD',
      description: 'Impactful outdoor advertising for environmental conservation, utilizing AI-generated visuals for powerful public awareness campaigns.',
      altText: 'Billboard showing dramatic wave around island with conservation message',
    },
    {
      id: 'brand10',
      imageUrl: '/images/brand/building-wave.jpg.png',
      category: 'URBAN INSTALLATIONS - AI ART',
      title: 'URBAN ENVIRONMENTAL CAMPAIGN',
      description: 'Building-scale environmental awareness installation, demonstrating AI-powered visual storytelling for urban conservation initiatives.',
      altText: 'Building corner with large-scale wave and island projection for mangrove restoration',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Carousel display logic - show 4 cards at a time like reference
  const cardsToShow = 4;
  const getVisibleCards = () => {
    const visibleCards = [];
    for (let i = 0; i < cardsToShow; i++) {
      const index = (activeIndex + i) % carouselProjects.length;
      visibleCards.push({
        ...carouselProjects[index],
        originalIndex: index,
        displayIndex: i
      });
    }
    return visibleCards;
  };

  const handleProjectChange = (newIndex: number) => {
    if (newIndex === activeIndex || isTransitioning) return;
    
    setIsTransitioning(true);
    setActiveIndex(newIndex);
    
    // Reset transition state after animation
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const handlePrevious = () => {
    const newIndex = activeIndex === 0 ? carouselProjects.length - 1 : activeIndex - 1;
    handleProjectChange(newIndex);
  };

  const handleNext = () => {
    const newIndex = activeIndex === carouselProjects.length - 1 ? 0 : activeIndex + 1;
    handleProjectChange(newIndex);
  };

  // Auto-advance carousel (optional)
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 15000); // Change every 15 seconds

    return () => clearInterval(timer);
  }, [activeIndex]);

  const currentProject = carouselProjects[activeIndex];
  const visibleCards = getVisibleCards();

  return (
    <section id="brand-explorations" className="relative w-full h-screen overflow-hidden">
      {/* Dynamic Background - Full Coverage */}
      <div 
        className={`absolute inset-0 bg-contain bg-center bg-no-repeat transition-all duration-1000 ease-in-out ${isTransitioning ? 'scale-110' : 'scale-100'}`}
        style={{
          backgroundImage: `url(${currentProject.imageUrl})`,
        }}
      >
        {/* Background fill for areas not covered by the image */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black -z-10"></div>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        {/* Gradient overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"></div>
      </div>

      {/* Section Header - Top Center */}
      <div className="absolute top-8 left-0 right-0 z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-light text-white/95 mb-3 tracking-wide">
              AI-Powered Brand Explorations
            </h2>
            <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto font-light">
              A showcase of unique brand concepts and visual identities generated with AI
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Container - Full Width for Carousel */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Carousel Cards Area - Centered and Larger */}
        <div className="flex-1 flex items-center justify-center">
          <div className="flex space-x-6 px-8">
            {visibleCards.map((card, displayIndex) => (
              <div
                key={`${card.id}-${card.originalIndex}`}
                className={`
                  relative cursor-pointer rounded-2xl overflow-hidden shadow-2xl
                  transition-all duration-500 ease-out transform
                  ${displayIndex === 0 
                    ? 'w-80 h-96 md:w-96 md:h-[28rem] scale-105 shadow-white/40' 
                    : displayIndex === 1
                    ? 'w-72 h-88 md:w-80 md:h-96 scale-100 hover:scale-105'
                    : 'w-64 h-80 md:w-72 md:h-88 scale-95 hover:scale-100 opacity-90'
                  }
                `}
                onClick={() => handleProjectChange(card.originalIndex)}
              >
                {/* Background Image - Full Display */}
                <img
                  src={card.imageUrl}
                  alt={card.altText}
                  className="absolute inset-0 w-full h-full object-contain transition-transform duration-500"
                />
                
                {/* Background fill for better presentation */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black -z-10"></div>
                
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                
                {/* Card Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  {/* Main Title */}
                  <h3 className={`
                    text-white font-bold tracking-tight leading-tight mb-2
                    ${displayIndex === 0 
                      ? 'text-2xl md:text-3xl' 
                      : displayIndex === 1
                      ? 'text-xl md:text-2xl'
                      : 'text-lg md:text-xl'
                    }
                  `}>
                    {card.title}
                  </h3>
                  
                  {/* Category Subtitle */}
                  <div className={`
                    text-white/85 text-sm md:text-base font-medium tracking-wide uppercase
                    ${displayIndex === 0 ? 'opacity-100' : 'opacity-85'}
                  `}>
                    {card.category.split(' - ')[0]}
                  </div>
                </div>
                
                {/* Active indicator */}
                {displayIndex === 0 && (
                  <div className="absolute top-6 left-6 w-3 h-3 bg-white rounded-full shadow-lg"></div>
                )}
                
                {/* Hover effect for non-active cards */}
                {displayIndex !== 0 && (
                  <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-all duration-300"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Controls - Bottom Center */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-30">
          <div className="flex items-center space-x-8">
            {/* Arrow Navigation */}
            <button
              onClick={handlePrevious}
              className="w-14 h-14 bg-white/20 backdrop-blur-sm border border-white/40 hover:bg-white/30 text-white rounded-full transition-all duration-300 hover:scale-110 flex items-center justify-center"
              aria-label="Previous project"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={handleNext}
              className="w-14 h-14 bg-white/20 backdrop-blur-sm border border-white/40 hover:bg-white/30 text-white rounded-full transition-all duration-300 hover:scale-110 flex items-center justify-center"
              aria-label="Next project"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Progress Indicator - Bottom Right */}
        <div className="absolute bottom-20 right-10 z-30">
          <div className="text-white text-right">
            <div className="text-6xl font-light tracking-wider leading-none">
              {String(activeIndex + 1).padStart(2, '0')}
            </div>
            <div className="text-base text-white/70 tracking-wider mt-2">
              / {String(carouselProjects.length).padStart(2, '0')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandExplorationSection;