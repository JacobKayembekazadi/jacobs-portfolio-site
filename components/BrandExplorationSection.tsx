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
  // Transform existing data to new carousel format
  const carouselProjects: CarouselProject[] = [
    {
      id: 'brand1',
      imageUrl: '/images/brand/aethel-headphones.jpg.jpg',
      category: 'Product Design - AI Generated',
      title: 'AETHEL AUDIO LIFESTYLE',
      description: 'AI-assisted product photography for premium headphones.',
      altText: 'Premium headphones on a wooden table with coffee and plant',
    },
    {
      id: 'brand2',
      imageUrl: '/images/brand/earth-day-island.jpg.jpg',
      category: 'Environmental Campaign - AI Imagery',
      title: 'HAPPY EARTH DAY CAMPAIGN',
      description: 'AI-generated imagery for environmental awareness and conservation.',
      altText: 'Heart-shaped island with lush greenery surrounded by ocean and wildlife',
    },
    {
      id: 'brand3',
      imageUrl: '/images/brand/mangrove-website.jpg.jpg',
      category: 'Web Design - AI Concepts',
      title: 'NATURE BREATHES WEBSITE',
      description: 'Environmental website design featuring AI-generated mangrove conservation visuals.',
      altText: 'Website design showing mangrove trees on an island',
    },
    {
      id: 'brand4',
      imageUrl: '/images/brand/mangrove-illustration.jpg.jpg',
      category: 'Illustrative Design - AI Art',
      title: 'ECO-DESIGN',
      description: 'Artistic representation of ecological ecosystems with AI-generated illustrations.',
      altText: 'Illustrated mangrove trees on a small island surrounded by water',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hoveredImageIndex, setHoveredImageIndex] = useState<number | null>(null);

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
    }, 10000); // Change every 10 seconds

    return () => clearInterval(timer);
  }, [activeIndex]);

  const currentProject = carouselProjects[activeIndex];

  return (
    <section id="brand-explorations" className="relative w-full h-screen overflow-hidden">
      {/* Dynamic Background */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out ${isTransitioning ? 'scale-110' : 'scale-100'}`}
        style={{
          backgroundImage: `url(${currentProject.imageUrl})`,
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        {/* Gradient overlay from left */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>
      </div>

      {/* Hover Image Preview */}
      {hoveredImageIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="relative">
            <div 
              className="w-96 h-64 rounded-xl overflow-hidden shadow-2xl transform transition-all duration-300 scale-110"
              style={{
                backgroundImage: `url(${carouselProjects[hoveredImageIndex].imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-semibold text-lg mb-1">
                  {carouselProjects[hoveredImageIndex].title}
                </h3>
                <p className="text-white/80 text-sm">
                  {carouselProjects[hoveredImageIndex].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Container */}
      <div className="relative z-10 h-full flex">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          
          {/* Left Content Area - Prominent like reference */}
          <div className="flex-1 max-w-2xl mr-8">
            <div className={`transform transition-all duration-600 ${isTransitioning ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
              
              {/* Category Text - Small and subtle like reference */}
              <div className="text-white/80 text-sm font-medium tracking-wider uppercase mb-2 flex items-center">
                <div className="w-8 h-px bg-white/60 mr-3"></div>
                {currentProject.category}
              </div>
              
              {/* Main Title - Large and bold like "SAINT ANTONIEN" */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
                {currentProject.title}
              </h1>
              
              {/* Description - Readable paragraph */}
              <p className="text-white/90 text-lg md:text-xl mb-8 leading-relaxed max-w-lg font-light">
                {currentProject.description}
              </p>
              
              {/* CTA Button - Prominent like reference */}
              <button className="group inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105">
                <span>DISCOVER PROJECT</span>
                <svg className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Thumbnail Area - Horizontal like reference */}
          <div className="flex-shrink-0">
            <div className="flex flex-col items-end">
              
              {/* Horizontal Thumbnails Row - Made Bigger */}
              <div className="flex space-x-5 mb-8">
                {carouselProjects.map((project, index) => (
                  <div
                    key={project.id}
                    className={`
                      relative w-44 h-32 md:w-52 md:h-36 rounded-xl overflow-hidden cursor-pointer
                      transition-all duration-400 transform
                      ${index === activeIndex 
                        ? 'scale-100 ring-3 ring-white/70 shadow-2xl' 
                        : 'scale-90 opacity-70 hover:opacity-90 hover:scale-95'
                      }
                    `}
                    onClick={() => handleProjectChange(index)}
                    onMouseEnter={() => setHoveredImageIndex(index)}
                    onMouseLeave={() => setHoveredImageIndex(null)}
                  >
                    <img
                      src={project.imageUrl}
                      alt={project.altText}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    {/* Overlay for inactive items */}
                    {index !== activeIndex && (
                      <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 hover:bg-black/20"></div>
                    )}
                    {/* Project title overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                      <div className="text-white text-sm font-medium text-center">
                        {project.title.split(' ').slice(0, 2).join(' ')}
                      </div>
                    </div>
                    {/* Hover indicator */}
                    <div className="absolute top-3 right-3 opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Controls - Positioned like reference */}
              <div className="flex items-center space-x-6">
                {/* Arrow Navigation */}
                <div className="flex space-x-4">
                  <button
                    onClick={handlePrevious}
                    className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white rounded-full transition-all duration-200 hover:scale-110"
                    aria-label="Previous project"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={handleNext}
                    className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white rounded-full transition-all duration-200 hover:scale-110"
                    aria-label="Next project"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Progress Indicator - Large like "01" in reference */}
                <div className="text-white text-right">
                  <div className="text-4xl font-light tracking-wider">
                    {String(activeIndex + 1).padStart(2, '0')}
                  </div>
                  <div className="text-xs text-white/60 tracking-wider">
                    / {String(carouselProjects.length).padStart(2, '0')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Header - Positioned at top with better styling */}
      <div className="absolute top-8 left-0 right-0 z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-light text-white/90 mb-2 tracking-wide">
              AI-Powered Brand Explorations
            </h2>
            <p className="text-white/70 text-sm md:text-base max-w-2xl mx-auto font-light">
              A showcase of unique brand concepts and visual identities generated with AI.
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator (Optional) */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center text-white/60">
          <div className="text-xs tracking-wider mb-2">SCROLL</div>
          <div className="w-px h-8 bg-white/40"></div>
        </div>
      </div>
    </section>
  );
};

export default BrandExplorationSection;