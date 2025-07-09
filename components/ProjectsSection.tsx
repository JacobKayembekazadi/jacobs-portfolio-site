import React, { useState, useEffect } from 'react';
import { PROJECTS_DATA, TEXT_COLOR_HEADLINE, TEXT_COLOR_MUTED, ACCENT_COLOR_PRIMARY, CARD_BG_COLOR } from '../constants';
import { Project, ProjectFeature, WorkflowNode } from '../types';

const FeatureColumn: React.FC<{ feature: ProjectFeature }> = ({ feature }) => (
  <div className="flex-1 p-2 md:p-3">
    <div className="flex items-center mb-1">
      {feature.icon && <feature.icon className={`w-4 h-4 text-${ACCENT_COLOR_PRIMARY} mr-2`} />}
      <h4 className="text-sm font-semibold text-light">{feature.title}</h4>
    </div>
    <p className={`text-xs ${TEXT_COLOR_MUTED} opacity-90 leading-relaxed`}>{feature.description}</p>
  </div>
);

const WorkflowNodeDisplay: React.FC<{ 
  node: WorkflowNode, 
  isLastInRow?: boolean,
  isConditional?: boolean,
  nodeIndex?: number 
}> = ({ node, isLastInRow, isConditional, nodeIndex = 0 }) => {
  
  const getNodeStyle = () => {
    if (node.isPlaceholder) {
      return 'border-2 border-dashed border-blue-400/50 bg-blue-500/5 hover:border-blue-400 hover:bg-blue-500/10';
    }
    if (isConditional) {
      return 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/50 shadow-lg shadow-purple-500/10';
    }
    
    // Different gradient styles based on node position
    const gradients = [
      'bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-400/50 shadow-lg shadow-blue-500/10',
      'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-400/50 shadow-lg shadow-green-500/10',
      'bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-400/50 shadow-lg shadow-orange-500/10',
      'bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-400/50 shadow-lg shadow-indigo-500/10'
    ];
    
    return gradients[nodeIndex % gradients.length];
  };

  const getIconColor = () => {
    if (node.isPlaceholder) return 'text-blue-400';
    if (isConditional) return 'text-purple-300';
    
    const colors = ['text-blue-300', 'text-green-300', 'text-orange-300', 'text-indigo-300'];
    return colors[nodeIndex % colors.length];
  };

  return (
    <div className={`flex items-center ${node.isPlaceholder ? 'self-stretch' : ''}`}>
      <div className={`
        backdrop-blur-sm rounded-xl p-3 text-center w-32 h-28 flex flex-col justify-center items-center 
        transition-all duration-500 hover:scale-105 hover:shadow-xl relative overflow-hidden
        ${getNodeStyle()}
        ${node.isPlaceholder ? 'cursor-pointer flex-grow' : ''}
      `}>
        {/* Animated background dots */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-2 left-2 w-1 h-1 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-4 right-3 w-1 h-1 bg-white rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-3 left-3 w-1 h-1 bg-white rounded-full animate-pulse delay-1500"></div>
        </div>
        
        {node.isPlaceholder ? (
          <node.icon className="w-8 h-8 text-blue-400" />
        ) : (
          <>
            <div className={`w-10 h-10 rounded-full ${getIconColor().replace('text-', 'bg-').replace('300', '500/20')} flex items-center justify-center mb-2`}>
              <node.icon className={`w-5 h-5 ${getIconColor()}`} />
            </div>
            <p className="text-xs font-semibold text-white leading-tight mb-1">{node.label}</p>
            {node.subLabel && <p className="text-[10px] text-gray-300/80">{node.subLabel}</p>}
          </>
        )}
      </div>
      
      {!isLastInRow && !node.isPlaceholder && (
        <div className="flex items-center mx-3">
          {/* Modern connection line with gradient */}
          <div className="relative">
            <div className="w-8 h-px bg-gradient-to-r from-blue-400/50 to-cyan-400/50"></div>
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-cyan-400/30 rounded-full animate-pulse"></div>
            <div className="absolute -top-0.5 right-0 w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
          </div>
        </div>
      )}
    </div>
  );
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const cardContent = (
    <div className={`${CARD_BG_COLOR} rounded-2xl overflow-hidden shadow-xl border border-gray-700 hover:border-${ACCENT_COLOR_PRIMARY} transition-all duration-700 group flex flex-col relative hover:shadow-${ACCENT_COLOR_PRIMARY}/20 w-full max-w-2xl mx-auto`}>
      <div className="relative z-10 flex flex-col">
        {/* Features Header - More Compact */}
        <div className="bg-gray-800 bg-opacity-50 flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-gray-700">
          {project.features.map((feature, index) => (
            <FeatureColumn key={index} feature={feature} />
          ))}
        </div>

        {/* Conditional Rendering: Image or Workflow */}
        {project.imageUrl ? (
          <div className="relative aspect-video">
            <img src={project.imageUrl} alt={project.mainTitle} className="object-cover w-full h-full"/>
          </div>
        ) : project.workflow ? (
          <div className="flex-grow p-4 md:p-6 relative">
            {/* Background with modern gradient and pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800"></div>
            <div className="absolute inset-0 opacity-10" 
                 style={{ 
                   backgroundImage: `
                     radial-gradient(circle at 25% 25%, #3b82f6 2px, transparent 2px),
                     radial-gradient(circle at 75% 75%, #06b6d4 2px, transparent 2px)
                   `, 
                   backgroundSize: "50px 50px, 30px 30px" 
                 }}>
            </div>
            
            <div className="relative z-10 space-y-4 flex flex-col justify-center">
              {/* Main workflow line */}
              <div className="flex items-center justify-start pb-2">
                {project.workflow?.line1.map((node, index) => (
                  <WorkflowNodeDisplay 
                    key={node.id} 
                    node={node} 
                    nodeIndex={index}
                    isLastInRow={index === (project.workflow?.line1.length ?? 0) - 1} 
                  />
                ))}
              </div>

              {/* Conditional node with modern connecting lines */}
              {project.workflow?.conditionalNode && (
                <div className="flex justify-center">
                  <div className="flex flex-col items-center">
                    {/* Vertical connector with glow effect */}
                    <div className="relative">
                      <div className="w-px h-6 bg-gradient-to-b from-blue-400/50 to-purple-400/50"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-purple-400/50 rounded-full animate-pulse"></div>
                    </div>
                  <div className="w-3 h-3 bg-purple-400 rounded-full mb-2 shadow-lg shadow-purple-400/50"></div>
                  <WorkflowNodeDisplay 
                    node={project.workflow.conditionalNode} 
                    isConditional={true}
                    isLastInRow={true}
                  />
                </div>
              </div>
            )}
            
            {/* True branch with enhanced styling */}
            {project.workflow?.line2TrueBranch && project.workflow?.conditionalNode && (
               <div className="flex justify-center">
                 <div className="flex items-center">
                   {/* Enhanced branch connector */}
                     <div className="flex items-center mr-4">
                       <div className="w-3 h-3 bg-green-400 rounded-full shadow-lg shadow-green-400/50"></div>
                       <div className="relative mx-2">
                         <div className="h-px w-12 bg-gradient-to-r from-green-400/50 to-emerald-400/50"></div>
                         <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-[10px] text-green-300 font-medium bg-green-500/20 px-2 py-1 rounded">
                           ✓ true
                         </span>
                       </div>
                     </div>
                     
                   <div className="flex items-center space-x-4">
                     {project.workflow.line2TrueBranch.map((node, index) => (
                       <WorkflowNodeDisplay 
                         key={node.id} 
                         node={node} 
                         nodeIndex={index + 10} // Offset for different colors
                         isLastInRow={index === (project.workflow?.line2TrueBranch?.length ?? 0) - 1} 
                       />
                     ))}
                   </div>
                 </div>
               </div>
            )}
            </div>
          </div>
        ) : null}

        {/* Enhanced project title section - More Compact */}
        <div className={`p-4 md:p-5 ${CARD_BG_COLOR} border-t border-gray-700/80 relative`}>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"></div>
          <h3 className={`text-lg md:text-xl font-bold ${TEXT_COLOR_HEADLINE} group-hover:text-${ACCENT_COLOR_PRIMARY} transition-colors duration-400 mb-2`}>
            {project.mainTitle}
          </h3>
          {/* Add workflow completion indicator */}
          <div className="flex items-center space-x-2 mt-2">
            <div className="flex space-x-1">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="w-2 h-2 bg-blue-400/30 rounded-full group-hover:bg-blue-400/60 transition-colors duration-500"></div>
              ))}
            </div>
            <span className="text-xs text-gray-400">Automated Workflow</span>
          </div>
        </div>
      </div>
    </div>
  );

  return project.url ? (
    <a href={project.url} target="_blank" rel="noopener noreferrer" className="block group w-full">
      {cardContent}
    </a>
  ) : (
    <div className="group w-full">{cardContent}</div>
  );
};

// Navigation Arrow Components
const ArrowButton: React.FC<{ direction: 'left' | 'right'; onClick: () => void; disabled?: boolean }> = ({ 
  direction, 
  onClick, 
  disabled = false 
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    aria-label={`Go to ${direction === 'left' ? 'previous' : 'next'} project`}
    className={`
      p-3 rounded-full backdrop-blur-sm border transition-all duration-300 z-10
      ${disabled 
        ? 'bg-gray-800/50 border-gray-600 text-gray-500 cursor-not-allowed' 
        : 'bg-gray-900/80 border-gray-600 text-white hover:border-purple-400 hover:bg-gray-800/90 hover:shadow-lg hover:shadow-purple-400/20'
      }
    `}
  >
    <svg 
      className="w-6 h-6" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d={direction === 'left' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} 
      />
    </svg>
  </button>
);

const ProjectsSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = PROJECTS_DATA.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="projects" className="py-20 md:py-28 bg-[#02010a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 md:mb-16 text-center">
          <h2 className={`text-3xl md:text-4xl font-bold ${TEXT_COLOR_HEADLINE} mb-4`}>Featured Work</h2>
          <p className={`${TEXT_COLOR_MUTED} text-lg max-w-2xl mx-auto`}>
            Selected case studies showcasing automated workflows and strategic AI applications that drive business results.
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20">
            <ArrowButton 
              direction="left" 
              onClick={prevSlide} 
              disabled={currentSlide === 0}
            />
          </div>
          
          <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20">
            <ArrowButton 
              direction="right" 
              onClick={nextSlide} 
              disabled={currentSlide === totalSlides - 1}
            />
          </div>

          {/* Slides Container */}
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {PROJECTS_DATA.map((project, index) => (
                <div 
                  key={project.id} 
                  className="w-full flex-shrink-0 px-8"
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {PROJECTS_DATA.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`
                  w-3 h-3 rounded-full transition-all duration-300
                  ${index === currentSlide 
                    ? 'bg-purple-400 shadow-lg shadow-purple-400/50' 
                    : 'bg-gray-600 hover:bg-gray-500'
                  }
                `}
              />
            ))}
          </div>

          {/* Slide Counter */}
          <div className="text-center mt-4">
            <span className="text-gray-400 text-sm">
              {currentSlide + 1} of {totalSlides}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
