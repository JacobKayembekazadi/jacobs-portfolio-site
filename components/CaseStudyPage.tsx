import React from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';

interface CaseStudy {
  id: string;
  imageUrl?: string;
  videoUrl?: string;
  title: string;
  description: string;
  services: string;
  website: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: 'brand1',
    videoUrl: '/videos/project-video-1.mp4',
    imageUrl: '/images/brand/aethel-headphones.jpg',
    title: 'Aesthetic Synthesis',
    description: 'Where form meets function in perfect harmony. This exploration pushes the boundaries of visual language, creating experiences that resonate on both conscious and subconscious levels.',
    services: 'Creative Direction',
    website: ''
  },
  {
    id: 'brand2',
    videoUrl: '/videos/project-video-2.mp4',
    imageUrl: '/images/brand/billboard-tide.jpg.png',
    title: 'Elemental Narratives',
    description: 'Capturing the raw poetry of natural forces. A study in movement and stillness, where every frame tells a story of transformation and the delicate balance between power and grace.',
    services: 'Visual Storytelling',
    website: ''
  },
  {
    id: 'brand3',
    videoUrl: '/videos/project-video-3.mp4',
    imageUrl: '/images/brand/mangrove-illustration.jpg',
    title: 'Organic Complexity',
    description: 'Exploring the intricate patterns found at the intersection of nature and design. Each detail serves as both aesthetic element and functional component in a larger ecosystem of meaning.',
    services: 'Conceptual Design',
    website: ''
  },
  {
    id: 'brand4',
    videoUrl: '/videos/project-video-4.mp4',
    imageUrl: '/images/brand/mobile-island-ar.jpg',
    title: 'Digital Horizons',
    description: 'Bridging physical and virtual realms through immersive experiences. This work challenges perceptions of reality, creating spaces where imagination and technology converge.',
    services: 'Experience Design',
    website: ''
  },
  {
    id: 'brand5',
    videoUrl: '/videos/project-video-5.mp4',
    imageUrl: '/images/brand/mangrove-website.jpg',
    title: 'Sustainable Futures',
    description: 'Design as a catalyst for positive change. Merging aesthetic excellence with purposeful innovation to create solutions that inspire action and foster meaningful connections.',
    services: 'Strategic Design',
    website: ''
  },
  {
    id: 'brand6',
    videoUrl: '/videos/project-video-6.mp4',
    imageUrl: '/images/brand/earth-day-island.jpg',
    title: 'Temporal Landscapes',
    description: 'Moments frozen in time that speak to larger truths. This collection explores the ephemeral nature of existence through carefully crafted visual metaphors.',
    services: 'Art Direction',
    website: ''
  },
  {
    id: 'brand7',
    imageUrl: '/images/brand/salt-conversation.jpg',
    title: 'Human Connections',
    description: 'Designing for the spaces between us. An exploration of how digital interfaces can enhance rather than replace genuine human interaction and community building.',
    services: 'Interaction Design',
    website: ''
  },
  {
    id: 'brand8',
    imageUrl: '/images/brand/building-wave.jpg.png',
    title: 'Fluid Architecture',
    description: 'Where built environments dance with natural rhythms. This project reimagines the relationship between structure and flow, creating spaces that breathe with life.',
    services: 'Spatial Design',
    website: ''
  },
  {
    id: 'brand9',
    imageUrl: '/images/brand/salt-comment.jpg.png',
    title: 'Collective Voice',
    description: 'Amplifying individual perspectives within a unified whole. A meditation on community, dialogue, and the power of shared narratives in shaping our digital landscapes.',
    services: 'Systems Design',
    website: ''
  },
  {
    id: 'brand10',
    imageUrl: '/images/brand/sync-dinner.jpg.png',
    title: 'Synchronized Moments',
    description: 'Celebrating the rituals that bind us together. This work explores how technology can enhance rather than diminish the intimate moments that define human experience.',
    services: 'Experience Craft',
    website: ''
  },
];

const CaseStudyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const clickedImage = searchParams.get('image');
  
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
      {/* Hero Media */}
      <div className="flex-1 relative bg-black flex items-center justify-center">
        {clickedImage ? (
          // Show the clicked image from bento grid
          <img
            src={clickedImage}
            alt={study.title}
            className="absolute inset-0 w-full h-full object-contain object-center"
          />
        ) : study.videoUrl ? (
          // Show video if no clicked image and video exists
          <video
            src={study.videoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-contain object-center"
          />
        ) : (
          // Show default image
          <img
            src={study.imageUrl}
            alt={study.title}
            className="absolute inset-0 w-full h-full object-contain object-center"
          />
        )}
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
