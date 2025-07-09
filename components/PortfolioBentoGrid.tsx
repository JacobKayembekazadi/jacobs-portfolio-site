import React from 'react';
import { BENTO_COLORS } from '../constants';

interface BentoGridData {
  id: string;
  size: '1x1' | '2x1' | '1x2' | '2x2';
  type: 'image-cell' | 'text-overlay-cell' | 'typographic-cell' | 'stat-cell';
  content: {
    image?: string;
    text?: string;
    number?: string;
    label?: string;
  };
}

const BENTO_DATA: BentoGridData[] = [
  {
    id: 'cell-1',
    size: '2x2',
    type: 'image-cell',
    content: {
      image: '/images/project-showcase-1.jpg'
    }
  },
  {
    id: 'cell-2',
    size: '1x1',
    type: 'image-cell',
    content: {
      image: '/images/project-showcase-5.jpg'
    }
  },
  {
    id: 'cell-3',
    size: '1x1',
    type: 'image-cell',
    content: {
      image: '/images/project-showcase-6.jpg'
    }
  },
  {
    id: 'cell-4',
    size: '2x1',
    type: 'image-cell',
    content: {
      image: '/images/whisk-1.jpg',
    }
  },
  {
    id: 'cell-5',
    size: '1x1',
    type: 'image-cell',
    content: {
      image: '/images/project-showcase-2.jpg'
    }
  },
  {
    id: 'cell-6',
    size: '1x1',
    type: 'image-cell',
    content: {
      image: '/images/project-showcase-7.jpg'
    }
  },
  {
    id: 'cell-7',
    size: '1x2',
    type: 'image-cell',
    content: {
      image: '/images/project-showcase-3.jpg',
    }
  },
  {
    id: 'cell-8',
    size: '1x1',
    type: 'image-cell',
    content: {
      image: '/images/whisk-2.jpg'
    }
  },
  {
    id: 'cell-9',
    size: '2x1',
    type: 'image-cell',
    content: {
      image: '/images/project-showcase-8.jpg'
    }
  },
  {
    id: 'cell-10',
    size: '1x1',
    type: 'image-cell',
    content: {
      image: '/images/project-showcase-9.jpg'
    }
  },
  {
    id: 'cell-11',
    size: '1x1',
    type: 'image-cell',
    content: {
      image: '/images/whisk-3.jpg'
    }
  },
  {
    id: 'cell-12',
    size: '1x1',
    type: 'image-cell',
    content: {
      image: '/images/project-showcase-4.jpg',
    }
  },
  {
    id: 'cell-13',
    size: '2x1',
    type: 'image-cell',
    content: {
      image: '/images/whisk-4.jpg'
    }
  },
  {
    id: 'cell-14',
    size: '1x1',
    type: 'image-cell',
    content: {
      image: '/images/project-showcase-10.jpg'
    }
  },
  {
    id: 'cell-15',
    size: '1x1',
    type: 'image-cell',
    content: {
      image: '/images/brand-image-2.png'
    }
  },
  {
    id: 'cell-16',
    size: '1x2',
    type: 'image-cell',
    content: {
      image: '/images/project-showcase-12.jpg',
    }
  },
  {
    id: 'cell-17',
    size: '1x1',
    type: 'image-cell',
    content: {
      image: '/images/brand-image-5.png'
    }
  },
  {
    id: 'cell-18',
    size: '1x1',
    type: 'image-cell',
    content: {
      image: '/images/project-showcase-11.jpg'
    }
  },
  {
    id: 'cell-19',
    size: '2x1',
    type: 'image-cell',
    content: {
      image: '/images/project-showcase-13.jpg',
    }
  },
  {
    id: 'cell-20',
    size: '1x1',
    type: 'image-cell',
    content: {
      image: '/images/brand-image-6.png'
    }
  },
  {
    id: 'cell-21',
    size: '1x1',
    type: 'image-cell',
    content: {
      image: '/images/project-showcase-14.jpg'
    }
  },
  {
    id: 'cell-22',
    size: '1x1',
    type: 'image-cell',
    content: {
      image: '/images/project-showcase-15.jpg'
    }
  },
  {
    id: 'cell-23',
    size: '1x1',
    type: 'image-cell',
    content: {
      image: '/images/project-showcase-16.jpg'
    }
  },
  {
    id: 'cell-24',
    size: '1x1',
    type: 'image-cell',
    content: {
      image: '/images/project-showcase-17.jpg'
    }
  }
];

const PortfolioBentoGrid: React.FC = () => {
  const getGridSpanClass = (size: string) => {
    const spanMap: { [key: string]: string } = {
      '1x1': 'col-span-1 row-span-1',
      '2x1': 'col-span-2 row-span-1',
      '1x2': 'col-span-1 row-span-2',
      '2x2': 'col-span-2 row-span-2'
    };
    return spanMap[size] || 'col-span-1 row-span-1';
  };

  const getResponsiveSpanClass = (size: string) => {
    const responsiveMap: { [key: string]: string } = {
      '1x1': 'md:col-span-1 md:row-span-1 sm:col-span-1 sm:row-span-1',
      '2x1': 'md:col-span-2 md:row-span-1 sm:col-span-1 sm:row-span-1',
      '1x2': 'md:col-span-1 md:row-span-2 sm:col-span-1 sm:row-span-1',
      '2x2': 'md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-1'
    };
    return responsiveMap[size] || 'md:col-span-1 md:row-span-1 sm:col-span-1 sm:row-span-1';
  };

  const renderCell = (item: BentoGridData) => {
    const baseClasses = `
      bento-cell relative overflow-hidden cursor-pointer transition-transform duration-300 ease-in-out
      hover:scale-[1.03] hover:z-10
      ${getGridSpanClass(item.size)}
      lg:${getGridSpanClass(item.size)}
      ${getResponsiveSpanClass(item.size)}
    `;

    switch (item.type) {
      case 'image-cell':
        return (
          <div
            key={item.id}
            className={`${baseClasses} p-0`}
            style={{
              backgroundColor: BENTO_COLORS.CARD_BACKGROUND,
              borderRadius: '8px',
              backgroundImage: `url(${item.content.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        );


      default:
        return null;
    }
  };

  return (
    <section 
      id="portfolio-bento-grid" 
      className="py-20 px-4 md:px-8 lg:px-16"
      style={{ backgroundColor: BENTO_COLORS.BACKGROUND_MAIN }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 
            className="text-4xl md:text-6xl font-bold mb-4"
            style={{
              color: BENTO_COLORS.TEXT_PRIMARY_LIGHT,
              fontFamily: "'Helvetica Neue', 'Arial', sans-serif",
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '-0.02em'
            }}
          >
            PORTFOLIO
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{
              color: BENTO_COLORS.TEXT_SECONDARY_GRAY,
              fontFamily: "'Helvetica Neue', 'Arial', sans-serif"
            }}
          >
            A curated selection of work showcasing design systems, 
            automation, and digital transformation projects.
          </p>
        </div>

        {/* Bento Grid */}
        <div 
          className="bento-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridAutoRows: 'minmax(200px, auto)',
            gap: '16px'
          }}
        >
          {BENTO_DATA.map(renderCell)}
        </div>
      </div>
    </section>
  );
};

export default PortfolioBentoGrid;
