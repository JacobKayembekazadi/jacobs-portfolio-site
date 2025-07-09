import React from 'react';
import { Link } from 'react-router-dom';

interface CarouselProject {
  id: string;
  imageUrl?: string;
  videoUrl?: string;
  title: string;
  altText: string;
}

const carouselProjects: CarouselProject[] = [
  {
    id: 'brand1',
    videoUrl: '/videos/project-video-1.mp4',
    title: 'Premium Audio Design',
    altText: 'Premium headphones on a wooden table with coffee and plant',
  },
  {
    id: 'brand2',
    videoUrl: '/videos/project-video-2.mp4',
    title: 'Environmental Conservation',
    altText: 'Billboard showing dramatic wave around island with conservation message',
  },
  {
    id: 'brand3',
    videoUrl: '/videos/project-video-3.mp4',
    title: 'Nature Illustration',
    altText: 'Illustrated mangrove trees on a small island surrounded by water',
  },
  {
    id: 'brand4',
    videoUrl: '/videos/project-video-4.mp4',
    title: 'AR Mobile Experience',
    altText: 'Mobile phone displaying an AR island with mangroves emerging from screen',
  },
  {
    id: 'brand5',
    videoUrl: '/videos/project-video-5.mp4',
    title: 'Sustainable Web Design',
    altText: 'Website design featuring mangrove conservation themes',
  },
  {
    id: 'brand6',
    videoUrl: '/videos/project-video-6.mp4',
    title: 'Earth Day Campaign',
    altText: 'Earth Day themed island visualization with environmental messaging',
  },
  {
    id: 'brand7',
    imageUrl: '/images/brand/salt-conversation.jpg',
    title: 'Social Media Strategy',
    altText: 'Social media conversation interface with engagement metrics',
  },
  {
    id: 'brand8',
    imageUrl: '/images/brand/building-wave.jpg',
    title: 'Urban Sustainability',
    altText: 'Modern building with wave-inspired architectural elements',
  },
  {
    id: 'brand9',
    imageUrl: '/images/brand/salt-comment.jpg',
    title: 'Community Engagement',
    altText: 'Comment system interface showing user interactions',
  },
  {
    id: 'brand10',
    imageUrl: '/images/brand/sync-dinner.jpg',
    title: 'Food Tech Innovation',
    altText: 'Synchronized dinner planning application interface',
  },
];

const BrandExplorationSection: React.FC = () => {
  return (
    <section id="brand-explorations" className="w-full bg-black py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title Restored */}
        <div className="flex justify-between items-start mb-10">
          <h2 className="text-white text-4xl md:text-5xl font-bold leading-tight tracking-tight text-left">
            AI-Powered Brand Explorations
          </h2>
          <a href="#" className="text-white/80 text-base font-medium mt-2 hover:underline hidden md:block">
            Follow us on Instagram &rarr;
          </a>
        </div>
        {/* Cards Row */}
        <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide brand-carousel">
          {carouselProjects.map((card) => (
            <Link
              key={card.id}
              to={`/case-study/${card.id}`}
              className="relative flex-shrink-0 w-72 md:w-80 aspect-[4/5] rounded-2xl overflow-hidden bg-[#18181b] shadow-lg group focus:outline-none focus:ring-2 focus:ring-[#a855f7] brand-carousel-item"
              style={{ minWidth: '18rem', maxWidth: '20rem' }}
            >
              {/* Video or Image */}
              {card.videoUrl ? (
                <video
                  src={card.videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <img
                  src={card.imageUrl}
                  alt={card.altText}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}
              {/* Card Title */}
              <div className="absolute left-0 bottom-0 w-full p-4 bg-gradient-to-t from-black/70 via-black/10 to-transparent">
                <span className="text-white text-lg font-medium drop-shadow-lg">
                  {card.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandExplorationSection;
