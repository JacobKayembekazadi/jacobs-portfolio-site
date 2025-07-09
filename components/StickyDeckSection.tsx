import React, { useEffect, useState } from 'react';

interface ProjectCard {
  id: number;
  title: string;
  description: string;
  background: 'dark' | 'light';
  gradient?: string;
  imageUrl: string;
}

const projectCards: ProjectCard[] = [
  {
    id: 1,
    title: 'Mobile Banking App',
    description: 'Revolutionary fintech solution with intuitive user interface, secure transactions, and AI-powered financial insights for modern banking.',
    background: 'dark',
    gradient: 'from-purple-900 to-blue-900',
    imageUrl: '/images/product-design-1.png'
  },
  {
    id: 2,
    title: 'E-commerce Platform',
    description: 'Comprehensive shopping experience with advanced product discovery, seamless checkout flow, and personalized recommendations.',
    background: 'light',
    gradient: 'from-gray-50 to-white',
    imageUrl: '/images/product-design-2.png'
  },
  {
    id: 3,
    title: 'Healthcare Dashboard',
    description: 'Professional medical interface designed for healthcare providers with patient management, analytics, and telemedicine capabilities.',
    background: 'dark',
    gradient: 'from-emerald-900 to-teal-900',
    imageUrl: '/images/product-design-3.png'
  },
  {
    id: 4,
    title: 'Social Media Platform',
    description: 'Next-generation social networking app with enhanced privacy controls, content discovery, and community building features.',
    background: 'light',
    gradient: 'from-rose-50 to-orange-50',
    imageUrl: '/images/product-design-4.png'
  },
  {
    id: 5,
    title: 'Project Management Tool',
    description: 'Sophisticated workflow management platform with team collaboration, time tracking, and advanced project analytics.',
    background: 'dark',
    gradient: 'from-indigo-900 to-purple-900',
    imageUrl: '/images/product-design-5.png'
  },
  {
    id: 6,
    title: 'Food Delivery Service',
    description: 'Complete food ordering ecosystem with restaurant discovery, real-time tracking, and personalized dining recommendations.',
    background: 'light',
    gradient: 'from-amber-50 to-yellow-50',
    imageUrl: '/images/product-design-6.png'
  }
];

const StickyDeckSection: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sectionElement = document.getElementById('sticky-deck-section');
      if (!sectionElement) return;

      const rect = sectionElement.getBoundingClientRect();
      const sectionTop = sectionElement.offsetTop;
      const sectionHeight = sectionElement.scrollHeight;
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress within the section
      const scrollY = window.scrollY;
      const progress = Math.max(0, Math.min(1, 
        (scrollY - sectionTop) / (sectionHeight - windowHeight)
      ));
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getCardStyle = (cardIndex: number) => {
    const totalCards = projectCards.length;
    const cardProgress = scrollProgress * totalCards;
    const currentCardIndex = Math.floor(cardProgress);
    const cardLocalProgress = cardProgress - currentCardIndex;

    // Base scale for stacked effect
    const baseScale = 1 - (cardIndex * 0.05);
    
    if (cardIndex < currentCardIndex) {
      // Card has already peeled away
      return {
        transform: `scale(0.85)`,
        opacity: 0,
        zIndex: totalCards - cardIndex
      };
    } else if (cardIndex === currentCardIndex) {
      // Currently active card being peeled away
      const scale = baseScale - (cardLocalProgress * 0.15);
      const opacity = 1 - (cardLocalProgress * 1);
      return {
        transform: `scale(${scale})`,
        opacity: opacity,
        zIndex: totalCards - cardIndex
      };
    } else {
      // Cards still in the deck
      const futureScale = baseScale + ((currentCardIndex + 1 - cardIndex) * 0.05);
      return {
        transform: `scale(${Math.min(1, futureScale)})`,
        opacity: 1,
        zIndex: totalCards - cardIndex
      };
    }
  };

  return (
    <section 
      id="sticky-deck-section" 
      className="relative"
      style={{ height: `${300}vh` }} // 3x viewport height for smooth scrolling
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        <div className="relative w-full h-full max-w-4xl mx-auto px-6">
          {/* Section Title */}
          <div className="absolute top-8 left-6 z-50">
            <h2 className="text-white text-3xl md:text-4xl font-bold">
              Featured Projects
            </h2>
            <p className="text-white/70 text-sm mt-2">
              Scroll to explore our portfolio
            </p>
          </div>

          {/* Card Stack */}
          <div className="relative w-full h-full flex items-center justify-center">
            {projectCards.map((card, index) => (
              <div
                key={card.id}
                className={`absolute w-[90%] h-[80%] rounded-3xl transition-all duration-300 ease-out ${
                  card.background === 'dark' 
                    ? `bg-gradient-to-br ${card.gradient} text-white` 
                    : `bg-gradient-to-br ${card.gradient} text-gray-900`
                }`}
                style={{
                  ...getCardStyle(index),
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                  transformOrigin: 'center center'
                }}
              >
                {/* Card Content */}
                <div className="relative w-full h-full p-8 flex overflow-hidden">
                  {/* Left Side - Text Content */}
                  <div className="w-1/2 pr-8 flex flex-col justify-between relative z-10">
                    {/* Content */}
                    <div>
                      <div className="mb-6">
                        <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                          card.background === 'dark' 
                            ? 'bg-white/20 text-white' 
                            : 'bg-gray-900/10 text-gray-700'
                        }`}>
                          Project {card.id}
                        </span>
                      </div>
                      
                      <h3 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                        {card.title}
                      </h3>
                      
                      <p className={`text-base leading-relaxed ${
                        card.background === 'dark' ? 'text-white/80' : 'text-gray-600'
                      }`}>
                        {card.description}
                      </p>
                    </div>

                    {/* Bottom Action */}
                    <div className="flex items-center justify-between mt-8">
                      <button className={`px-6 py-3 rounded-xl font-medium transition-all hover:scale-105 ${
                        card.background === 'dark'
                          ? 'bg-white text-gray-900 hover:bg-gray-100'
                          : 'bg-gray-900 text-white hover:bg-gray-800'
                      }`}>
                        View Project
                      </button>
                      
                      <div className={`text-sm ${
                        card.background === 'dark' ? 'text-white/60' : 'text-gray-500'
                      }`}>
                        {card.id} of {projectCards.length}
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Product Design Image */}
                  <div className="w-1/2 relative flex items-center justify-center">
                    <div className="relative w-full h-full max-w-md max-h-[500px] flex items-center justify-center">
                      <img
                        src={card.imageUrl}
                        alt={card.title}
                        className="w-full h-full object-contain rounded-2xl shadow-2xl"
                        style={{ 
                          filter: card.background === 'dark' ? 'brightness(0.95)' : 'brightness(1.05)',
                          maxHeight: '80%'
                        }}
                      />
                      {/* Image glow effect */}
                      <div className={`absolute inset-0 rounded-2xl ${
                        card.background === 'dark' 
                          ? 'bg-gradient-to-r from-purple-500/10 to-blue-500/10' 
                          : 'bg-gradient-to-r from-gray-500/5 to-gray-600/5'
                      }`}></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Progress Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50">
            <div className="flex space-x-2">
              {projectCards.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    scrollProgress * projectCards.length > index
                      ? 'bg-white'
                      : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StickyDeckSection; 