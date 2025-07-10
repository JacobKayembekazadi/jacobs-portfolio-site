import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface ImageData {
  filename: string;
  path: string;
  directory: string;
  category: string;
  project: string;
  tags: string[];
  extension: string;
  description: string;
  similar: string[];
}

interface ImageProfile {
  generated: string;
  totalImages: number;
  categories: string[];
  projects: string[];
  extensions: string[];
  images: ImageData[];
}

interface ProjectCaseStudy {
  projectName: string;
  category: string;
  images: ImageData[];
  description: string;
  tags: string[];
  totalImages: number;
}

const CaseStudiesGenerator: React.FC = () => {
  const [imageProfile, setImageProfile] = useState<ImageProfile | null>(null);
  const [caseStudies, setCaseStudies] = useState<ProjectCaseStudy[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load image profile
    fetch('/image-profile.json')
      .then(response => response.json())
      .then((data: ImageProfile) => {
        setImageProfile(data);
        generateCaseStudies(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading image profile:', error);
        setLoading(false);
      });
  }, []);

  const generateCaseStudies = (profile: ImageProfile) => {
    const projectGroups = new Map<string, ImageData[]>();
    
    // Group images by project
    profile.images.forEach(image => {
      if (!projectGroups.has(image.project)) {
        projectGroups.set(image.project, []);
      }
      projectGroups.get(image.project)!.push(image);
    });

    // Create case studies
    const studies: ProjectCaseStudy[] = Array.from(projectGroups.entries()).map(([projectName, images]) => {
      const allTags = [...new Set(images.flatMap(img => img.tags))];
      const primaryCategory = images[0]?.category || 'general';
      
      return {
        projectName,
        category: primaryCategory,
        images,
        description: generateProjectDescription(projectName, images),
        tags: allTags,
        totalImages: images.length
      };
    });

    // Sort by image count (most comprehensive first)
    studies.sort((a, b) => b.totalImages - a.totalImages);
    setCaseStudies(studies);
  };

  const generateProjectDescription = (projectName: string, images: ImageData[]): string => {
    const sampleDesc = images[0]?.description || '';
    const tagString = [...new Set(images.flatMap(img => img.tags))].slice(0, 5).join(', ');
    
    if (projectName.includes('Showcase')) {
      return `${projectName} featuring ${images.length} portfolio pieces demonstrating expertise in ${tagString}. This collection represents a comprehensive view of design capabilities and creative solutions.`;
    }
    
    return `${sampleDesc}. This project includes ${images.length} visual assets showcasing ${tagString} and represents a complete design system and implementation.`;
  };

  const renderCaseStudyPreview = (study: ProjectCaseStudy) => (
    <div key={study.projectName} className="bg-[#18181b] rounded-lg p-6 mb-6 border border-gray-700">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">{study.projectName}</h3>
          <p className="text-gray-300 text-sm mb-2">Category: {study.category}</p>
          <p className="text-gray-400 text-sm">{study.totalImages} images • {study.tags.slice(0, 4).join(', ')}</p>
        </div>
        <button
          onClick={() => setSelectedProject(selectedProject === study.projectName ? '' : study.projectName)}
          className="px-4 py-2 bg-[#a855f7] text-white rounded hover:bg-[#9333ea] transition-colors"
        >
          {selectedProject === study.projectName ? 'Collapse' : 'View Study'}
        </button>
      </div>
      
      <p className="text-gray-300 mb-4">{study.description}</p>
      
      {/* Image grid preview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
        {study.images.slice(0, 8).map((image, idx) => (
          <div key={idx} className="aspect-square rounded-lg overflow-hidden bg-gray-800">
            <img
              src={image.path}
              alt={image.description}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
        {study.images.length > 8 && (
          <div className="aspect-square rounded-lg bg-gray-800 flex items-center justify-center">
            <span className="text-gray-400 text-sm">+{study.images.length - 8} more</span>
          </div>
        )}
      </div>
    </div>
  );

  const renderFullCaseStudy = (study: ProjectCaseStudy) => (
    <div className="bg-black text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => setSelectedProject('')}
            className="text-[#a855f7] hover:underline mb-4"
          >
            ← Back to All Case Studies
          </button>
          <h1 className="text-5xl font-bold mb-4">{study.projectName}</h1>
          <div className="flex flex-wrap gap-2 mb-4">
            {study.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-[#a855f7] text-white text-sm rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <p className="text-xl text-gray-300 max-w-4xl">{study.description}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#18181b] p-6 rounded-lg">
            <h3 className="text-3xl font-bold text-[#a855f7]">{study.totalImages}</h3>
            <p className="text-gray-300">Total Assets</p>
          </div>
          <div className="bg-[#18181b] p-6 rounded-lg">
            <h3 className="text-3xl font-bold text-[#a855f7]">{study.category}</h3>
            <p className="text-gray-300">Primary Category</p>
          </div>
          <div className="bg-[#18181b] p-6 rounded-lg">
            <h3 className="text-3xl font-bold text-[#a855f7]">{study.tags.length}</h3>
            <p className="text-gray-300">Unique Tags</p>
          </div>
        </div>

        {/* All Images */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Visual Assets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {study.images.map((image, idx) => (
              <div key={idx} className="bg-[#18181b] rounded-lg overflow-hidden">
                <div className="aspect-video bg-gray-800">
                  <img
                    src={image.path}
                    alt={image.description}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-white mb-2">{image.filename}</h4>
                  <p className="text-gray-400 text-sm mb-2">{image.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {image.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Similar Projects */}
        {study.images.some(img => img.similar.length > 0) && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Related Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...new Set(study.images.flatMap(img => img.similar))].slice(0, 8).map((similarFile, idx) => (
                <div key={idx} className="aspect-square rounded-lg overflow-hidden bg-gray-800">
                  <img
                    src={`/images/${similarFile}`}
                    alt={`Related work: ${similarFile}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading case studies...</div>
      </div>
    );
  }

  if (selectedProject) {
    const study = caseStudies.find(s => s.projectName === selectedProject);
    if (study) return renderFullCaseStudy(study);
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-4">Complete Case Studies</h1>
          <p className="text-xl text-gray-300 mb-2">
            Comprehensive project documentation based on {imageProfile?.totalImages} analyzed images
          </p>
          <p className="text-gray-400">
            {caseStudies.length} projects • {imageProfile?.categories.length} categories • Generated from image profile analysis
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-[#18181b] p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-[#a855f7]">{caseStudies.length}</div>
            <div className="text-gray-300">Projects</div>
          </div>
          <div className="bg-[#18181b] p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-[#a855f7]">{imageProfile?.totalImages}</div>
            <div className="text-gray-300">Total Images</div>
          </div>
          <div className="bg-[#18181b] p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-[#a855f7]">{imageProfile?.categories.length}</div>
            <div className="text-gray-300">Categories</div>
          </div>
          <div className="bg-[#18181b] p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-[#a855f7]">
              {Math.round((imageProfile?.totalImages || 0) / caseStudies.length)}
            </div>
            <div className="text-gray-300">Avg per Project</div>
          </div>
        </div>

        {/* Case Studies */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Project Case Studies</h2>
          {caseStudies.map(renderCaseStudyPreview)}
        </div>
      </div>
    </div>
  );
};

export default CaseStudiesGenerator; 