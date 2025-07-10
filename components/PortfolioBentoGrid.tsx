import React, { useMemo } from 'react';
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

// --- Dynamic image selection helpers ---
const ALL_IMAGE_PATHS: string[] = [
  // Brand Images
  '/images/brand-image-1.png',
  '/images/brand-image-2.png',
  '/images/brand-image-3.png',
  '/images/brand-image-4.png',
  '/images/brand-image-5.png',
  '/images/brand-image-6.png',
  '/images/brand-image-7.png',
  // Misc project showcase
  '/images/project-showcase-89.png',
  '/images/project-showcase-147.png',
  '/images/project-showcase-214.png',
  '/images/project-showcase-215.png',
  '/images/project-showcase-152.jpg',
  '/images/project-showcase-43.jpg',
  '/images/project-showcase-38.jpg',
  // Whisk series
  '/images/whisk-1.jpg',
  '/images/whisk-2.jpg',
  '/images/whisk-3.jpg',
  '/images/whisk-4.jpg',
  // Light on campus series
  '/images/light-on-campus-1.png',
  '/images/light-on-campus-7.jpg',
  '/images/light-on-campus-8.jpg'
];

// Helper to get prefix before second dash so "project-showcase-25.jpg" -> "project-showcase"
const getPrefix = (path: string): string => {
  const file = path.split('/').pop() || '';
  const parts = file.split('-');
  return parts.length > 2 ? `${parts[0]}-${parts[1]}` : parts[0];
};

// Build a shuffled list of unique image paths (excluding product-design-) sized to grid length
const buildUniqueImageSet = (desiredCount: number): string[] => {
  const filtered = ALL_IMAGE_PATHS.filter(img => !img.includes('/product-design-'));
  const shuffled = [...filtered].sort(() => 0.5 - Math.random());
  // Ensure we have at least desiredCount unique images
  return shuffled.slice(0, Math.min(desiredCount, shuffled.length));
};

// Custom grid packing algorithm
function packBentoGrid(
  cellSizes: Array<'1x1' | '2x1' | '1x2' | '2x2'>,
  images: string[],
  columns: number = 4,
  maxRows: number = 6
): any[] {
  // cellSizes: array of '1x1', '2x1', etc
  // images: array of unique image paths
  // returns: array of {id, size, type, content, gridColumn, gridRow}
  const grid = Array.from({ length: maxRows }, () => Array(columns).fill(false));
  const result = [];
  let imgIdx = 0;
  let cellId = 1;

  function canPlace(row: number, col: number, w: number, h: number): boolean {
    if (row + h > maxRows || col + w > columns) return false;
    for (let r = row; r < row + h; r++) {
      for (let c = col; c < col + w; c++) {
        if (grid[r][c]) return false;
      }
    }
    return true;
  }
  function place(row: number, col: number, w: number, h: number): void {
    for (let r = row; r < row + h; r++) {
      for (let c = col; c < col + w; c++) {
        grid[r][c] = true;
      }
    }
  }
  // Map size string to width/height
  const sizeMap = { '1x1': [1, 1], '2x1': [2, 1], '1x2': [1, 2], '2x2': [2, 2] };
  for (let i = 0; i < cellSizes.length && imgIdx < images.length; i++) {
    const [w, h] = sizeMap[cellSizes[i]];
    let placed = false;
    for (let row = 0; row < maxRows && !placed; row++) {
      for (let col = 0; col < columns && !placed; col++) {
        if (canPlace(row, col, w, h)) {
          place(row, col, w, h);
          result.push({
            id: `cell-${cellId++}`,
            size: cellSizes[i],
            type: 'image-cell',
            content: { image: images[imgIdx++] },
            gridColumn: col + 1,
            gridRow: row + 1,
            gridColumnEnd: col + 1 + w,
            gridRowEnd: row + 1 + h
          });
          placed = true;
        }
      }
    }
  }
  return result;
}

const CELL_SIZES: Array<'1x1' | '2x1' | '1x2' | '2x2'> = [
  '2x2', '1x1', '1x1', '2x1', '1x1',
  '1x1', '1x2', '1x1', '2x1', '1x1',
  '1x1', '1x1', '2x1', '1x1', '1x1',
  '1x2', '1x1', '1x1', '2x1', '1x1'
];

const generateBentoData = () => {
  // Filter out product-design images and duplicates
  const filtered = ALL_IMAGE_PATHS.filter(img => !img.includes('/product-design-'));
  const unique = Array.from(new Set(filtered));
  const shuffled = unique.sort(() => 0.5 - Math.random());
  return packBentoGrid(CELL_SIZES, shuffled, 4, 6);
};

const PortfolioBentoGrid: React.FC = () => {
  const BENTO_DATA = useMemo(() => generateBentoData(), []);

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

  const renderCell = (item: BentoGridData & { gridColumn: number, gridRow: number, gridColumnEnd: number, gridRowEnd: number }) => {
    const baseClasses = `
      bento-cell relative overflow-hidden cursor-pointer transition-transform duration-300 ease-in-out
      hover:scale-[1.03] hover:z-10
    `;
    if (item.type === 'image-cell') {
      return (
        <div
          key={item.id}
          className={`${baseClasses} p-0`}
          style={{
            backgroundColor: BENTO_COLORS.CARD_BACKGROUND,
            borderRadius: '8px',
            backgroundImage: `url(${item.content.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            gridColumn: `${item.gridColumn} / ${item.gridColumnEnd}`,
            gridRow: `${item.gridRow} / ${item.gridRowEnd}`
          }}
        />
      );
    }
    return null;
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
            gap: '16px',
            gridAutoFlow: 'dense'
          }}
        >
          {BENTO_DATA.map(renderCell)}
        </div>
      </div>
    </section>
  );
};

export default PortfolioBentoGrid;
