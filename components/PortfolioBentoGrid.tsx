import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
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
  // Project showcase images (verified to exist)
  '/images/project-showcase-89.png',
  '/images/project-showcase-147.png',
  '/images/project-showcase-214.png',
  '/images/project-showcase-215.png',
  '/images/project-showcase-152.jpg',
  '/images/project-showcase-43.jpg',
  '/images/project-showcase-38.jpg',
  '/images/project-showcase-52.jpg',
  '/images/project-showcase-51.jpg',
  '/images/project-showcase-50.jpg',
  '/images/project-showcase-49.jpg',
  '/images/project-showcase-48.jpg',
  '/images/project-showcase-47.jpg',
  '/images/project-showcase-46.jpg',
  '/images/project-showcase-45.jpg',
  '/images/project-showcase-44.jpg',
  '/images/project-showcase-42.jpg',
  '/images/project-showcase-41.jpg',
  '/images/project-showcase-40.jpg',
  '/images/project-showcase-39.jpg',
  '/images/project-showcase-37.jpg',
  '/images/project-showcase-36.jpg',
  '/images/project-showcase-35.jpg',
  '/images/project-showcase-34.jpg',
  '/images/project-showcase-33.jpg',
  '/images/project-showcase-32.jpg',
  '/images/project-showcase-31.jpg',
  '/images/project-showcase-30.jpg',
  '/images/project-showcase-29.jpg',
  '/images/project-showcase-28.jpg',
  '/images/project-showcase-27.jpg',
  '/images/project-showcase-26.jpg',
  '/images/project-showcase-25.jpg',
  '/images/project-showcase-24.jpg',
  '/images/project-showcase-23.jpg',
  '/images/project-showcase-22.jpg',
  '/images/project-showcase-21.jpg',
  '/images/project-showcase-20.jpg',
  '/images/project-showcase-19.jpg',
  '/images/project-showcase-18.jpg',
  '/images/project-showcase-17.jpg',
  '/images/project-showcase-16.jpg',
  '/images/project-showcase-15.jpg',
  '/images/project-showcase-14.jpg',
  '/images/project-showcase-13.jpg',
  '/images/project-showcase-12.jpg',
  '/images/project-showcase-11.jpg',
  '/images/project-showcase-10.jpg',
  '/images/project-showcase-9.jpg',
  '/images/project-showcase-8.jpg',
  '/images/project-showcase-7.jpg',
  '/images/project-showcase-6.jpg',
  '/images/project-showcase-5.jpg',
  '/images/project-showcase-4.jpg',
  '/images/project-showcase-3.jpg',
  '/images/project-showcase-2.jpg',
  '/images/project-showcase-1.jpg',
  '/images/project-showcase-69.png',
  '/images/project-showcase-67.png',
  '/images/project-showcase-68.png',
  '/images/project-showcase-145.jpg',
  '/images/project-showcase-144.jpg',
  '/images/project-showcase-143.jpg',
  '/images/project-showcase-141.jpg',
  '/images/project-showcase-140.jpg',
  '/images/project-showcase-139.jpg',
  '/images/project-showcase-59.png',
  '/images/project-showcase-60.png',
  '/images/project-showcase-75.png',
  '/images/project-showcase-74.png',
  '/images/project-showcase-71.png',
  '/images/project-showcase-72.png',
  '/images/project-showcase-73.png',
  '/images/project-showcase-70.png',
  '/images/project-showcase-213.png',
  '/images/project-showcase-212.png',
  '/images/project-showcase-88.png',
  // Whisk series
  '/images/whisk-1.jpg',
  '/images/whisk-2.jpg',
  '/images/whisk-3.jpg',
  '/images/whisk-4.jpg',
  // AI Advertising
  '/images/ai-advertising-5.jpg',
  '/images/ai-advertising-6.jpg'
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
  const navigate = useNavigate();
  const BENTO_DATA = useMemo(() => generateBentoData(), []);

  const handleImageClick = (imagePath: string) => {
    // Extract project identifier from image path
    const filename = imagePath.split('/').pop() || '';
    
    // Map image paths to available case study IDs (brand1-brand10)
    const imageToCaseStudyMap: { [key: string]: string } = {
      // Brand images - direct mapping
      'brand-image-1.png': 'brand1',
      'brand-image-2.png': 'brand2', 
      'brand-image-3.png': 'brand3',
      'brand-image-4.png': 'brand4',
      'brand-image-5.png': 'brand5',
      'brand-image-6.png': 'brand6',
      'brand-image-7.png': 'brand7',
      
      // Whisk images - map to food-related case study
      'whisk-1.jpg': 'brand10', // Food Tech Innovation
      'whisk-2.jpg': 'brand10',
      'whisk-3.jpg': 'brand10',
      'whisk-4.jpg': 'brand10',
      
      // AI Advertising - map to brand case studies
      'ai-advertising-5.jpg': 'brand1',
      'ai-advertising-6.jpg': 'brand2',
      
      // Project showcase images - distribute across available case studies
      'project-showcase-89.png': 'brand1',
      'project-showcase-147.png': 'brand2',
      'project-showcase-214.png': 'brand3',
      'project-showcase-215.png': 'brand4',
      'project-showcase-152.jpg': 'brand5',
      'project-showcase-43.jpg': 'brand6',
      'project-showcase-38.jpg': 'brand7',
      'project-showcase-52.jpg': 'brand8',
      'project-showcase-51.jpg': 'brand9',
      'project-showcase-50.jpg': 'brand10',
      'project-showcase-49.jpg': 'brand1',
      'project-showcase-48.jpg': 'brand2',
      'project-showcase-47.jpg': 'brand3',
      'project-showcase-46.jpg': 'brand4',
      'project-showcase-45.jpg': 'brand5',
      'project-showcase-44.jpg': 'brand6',
      'project-showcase-42.jpg': 'brand7',
      'project-showcase-41.jpg': 'brand8',
      'project-showcase-40.jpg': 'brand9',
      'project-showcase-39.jpg': 'brand10',
      'project-showcase-37.jpg': 'brand1',
      'project-showcase-36.jpg': 'brand2',
      'project-showcase-35.jpg': 'brand3',
      'project-showcase-34.jpg': 'brand4',
      'project-showcase-33.jpg': 'brand5',
      'project-showcase-32.jpg': 'brand6',
      'project-showcase-31.jpg': 'brand7',
      'project-showcase-30.jpg': 'brand8',
      'project-showcase-29.jpg': 'brand9',
      'project-showcase-28.jpg': 'brand10',
      'project-showcase-27.jpg': 'brand1',
      'project-showcase-26.jpg': 'brand2',
      'project-showcase-25.jpg': 'brand3',
      'project-showcase-24.jpg': 'brand4',
      'project-showcase-23.jpg': 'brand5',
      'project-showcase-22.jpg': 'brand6',
      'project-showcase-21.jpg': 'brand7',
      'project-showcase-20.jpg': 'brand8',
      'project-showcase-19.jpg': 'brand9',
      'project-showcase-18.jpg': 'brand10',
      'project-showcase-17.jpg': 'brand1',
      'project-showcase-16.jpg': 'brand2',
      'project-showcase-15.jpg': 'brand3',
      'project-showcase-14.jpg': 'brand4',
      'project-showcase-13.jpg': 'brand5',
      'project-showcase-12.jpg': 'brand6',
      'project-showcase-11.jpg': 'brand7',
      'project-showcase-10.jpg': 'brand8',
      'project-showcase-9.jpg': 'brand9',
      'project-showcase-8.jpg': 'brand10',
      'project-showcase-7.jpg': 'brand1',
      'project-showcase-6.jpg': 'brand2',
      'project-showcase-5.jpg': 'brand3',
      'project-showcase-4.jpg': 'brand4',
      'project-showcase-3.jpg': 'brand5',
      'project-showcase-2.jpg': 'brand6',
      'project-showcase-1.jpg': 'brand7',
      'project-showcase-69.png': 'brand8',
      'project-showcase-67.png': 'brand9',
      'project-showcase-68.png': 'brand10',
      'project-showcase-145.jpg': 'brand1',
      'project-showcase-144.jpg': 'brand2',
      'project-showcase-143.jpg': 'brand3',
      'project-showcase-141.jpg': 'brand4',
      'project-showcase-140.jpg': 'brand5',
      'project-showcase-139.jpg': 'brand6',
      'project-showcase-59.png': 'brand7',
      'project-showcase-60.png': 'brand8',
      'project-showcase-75.png': 'brand9',
      'project-showcase-74.png': 'brand10',
      'project-showcase-71.png': 'brand1',
      'project-showcase-72.png': 'brand2',
      'project-showcase-73.png': 'brand3',
      'project-showcase-70.png': 'brand4',
      'project-showcase-213.png': 'brand5',
      'project-showcase-212.png': 'brand6',
      'project-showcase-88.png': 'brand7'
    };
    
    const caseStudyId = imageToCaseStudyMap[filename] || 'brand1'; // Default fallback
    // Pass the clicked image as a query parameter
    navigate(`/case-study/${caseStudyId}?image=${encodeURIComponent(imagePath)}`);
  };

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
          onClick={() => handleImageClick(item.content.image || '')}
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
