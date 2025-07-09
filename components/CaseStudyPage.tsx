import React from 'react';
import { useParams, Link } from 'react-router-dom';

const caseStudies = [
  {
    id: 'brand1',
    imageUrl: '/images/brand/aethel-headphones.jpg',
    title: 'Premium Audio Design',
    description: 'Created a sophisticated brand identity for a premium headphone company, focusing on minimalist aesthetics and superior audio quality messaging.',
    services: 'Brand Design',
    website: ''
  },
  {
    id: 'brand2',
    imageUrl: '/images/brand/billboard-tide.jpg.png',
    title: 'Environmental Conservation Campaign',
    description: 'Developed a powerful visual campaign highlighting ocean conservation, featuring dramatic wave imagery to communicate urgency and beauty of marine ecosystems.',
    services: 'Campaign Design',
    website: ''
  },
  {
    id: 'brand3',
    imageUrl: '/images/brand/mangrove-illustration.jpg',
    title: 'Nature Illustration Series',
    description: 'Created detailed illustrations of mangrove ecosystems to support environmental education and conservation awareness initiatives.',
    services: 'Illustration',
    website: ''
  },
  {
    id: 'brand4',
    imageUrl: '/images/brand/mobile-island-ar.jpg',
    title: 'AR Mobile Experience',
    description: 'Designed an innovative augmented reality mobile application that brings environmental education to life through interactive island ecosystems.',
    services: 'AR/UX Design',
    website: ''
  },
  {
    id: 'brand5',
    imageUrl: '/images/brand/mangrove-website.jpg',
    title: 'Sustainable Web Design',
    description: 'Built a comprehensive website for mangrove conservation, combining stunning visuals with educational content and donation functionality.',
    services: 'Web Development',
    website: ''
  },
  {
    id: 'brand6',
    imageUrl: '/images/brand/earth-day-island.jpg',
    title: 'Earth Day Campaign',
    description: 'Designed a compelling Earth Day campaign featuring island visualizations to promote environmental awareness and action.',
    services: 'Campaign Design',
    website: ''
  },
  {
    id: 'brand7',
    imageUrl: '/images/brand/salt-conversation.jpg',
    title: 'Social Media Strategy',
    description: 'Developed a comprehensive social media strategy platform with advanced conversation tracking and engagement analytics.',
    services: 'Social Strategy',
    website: ''
  },
  {
    id: 'brand8',
    imageUrl: '/images/brand/building-wave.jpg.png',
    title: 'Urban Sustainability',
    description: 'Created architectural visualizations that blend modern urban design with natural wave patterns to promote sustainable building practices.',
    services: 'Architecture Viz',
    website: ''
  },
  {
    id: 'brand9',
    imageUrl: '/images/brand/salt-comment.jpg.png',
    title: 'Community Engagement Platform',
    description: 'Built an interactive comment system that enhances community engagement through thoughtful UI design and real-time interaction features.',
    services: 'Platform Design',
    website: ''
  },
  {
    id: 'brand10',
    imageUrl: '/images/brand/sync-dinner.jpg.png',
    title: 'Food Tech Innovation',
    description: 'Designed a synchronized dinner planning application that connects families and friends through shared meal experiences and smart coordination.',
    services: 'App Design',
    website: ''
  },
];

const CaseStudyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const study = caseStudies.find(cs => cs.id === id);

  if (!study) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-black">
        <h1 className="text-3xl font-bold mb-4">Case Study Not Found</h1>
        <Link to="/" className="text-[#a855f7] underline">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#18181b] flex flex-col">
      {/* Back link */}
      <div className="w-full px-4 py-4 bg-[#18181b]">
        <Link to="/" className="text-gray-300 underline text-base">Back to main page</Link>
      </div>
      {/* Hero Image */}
      <div className="flex-1 flex items-stretch justify-center bg-black">
        <img
          src={study.imageUrl}
          alt={study.title}
          className="w-full h-full object-cover object-center"
        />
      </div>
      {/* Bottom Bar */}
      <div className="w-full bg-[#18181b] text-white flex flex-col md:flex-row items-start md:items-end justify-between px-4 md:px-8 py-6 gap-6" style={{ fontFamily: 'Inter, sans-serif' }}>
        <div className="flex-1 min-w-[120px] text-base md:text-lg font-normal mb-2 md:mb-0">{study.title}</div>
        <div className="flex-[2] min-w-[200px] text-sm md:text-base font-normal mb-2 md:mb-0">
          {study.description}
        </div>
        <div className="flex-1 min-w-[120px] text-base md:text-lg font-normal mb-2 md:mb-0">{study.services}</div>
        <div className="flex-1 min-w-[120px] text-base md:text-lg font-normal text-right">
          {study.website ? (
            <a href={study.website} target="_blank" rel="noopener noreferrer" className="underline text-gray-300 hover:text-white">Visit Website</a>
          ) : (
            <span className="text-gray-500">Visit Website</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseStudyPage;
