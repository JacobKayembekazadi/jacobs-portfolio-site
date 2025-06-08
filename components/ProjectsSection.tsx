import React from 'react';
import { PROJECTS_DATA, TEXT_COLOR_HEADLINE, TEXT_COLOR_MUTED, ACCENT_COLOR_PRIMARY, CARD_BG_COLOR } from '../constants';
import { Project, ProjectFeature, WorkflowNode } from '../types';
import { ArrowRightIcon } from './icons/InterfaceIcons'; // PlusIconCircle removed as it's part of workflow display

const FeatureColumn: React.FC<{ feature: ProjectFeature }> = ({ feature }) => (
  <div className="flex-1 p-3 md:p-4">
    <div className="flex items-center mb-1.5">
      {feature.icon && <feature.icon className={`w-4 h-4 text-${ACCENT_COLOR_PRIMARY} mr-2`} />}
      <h4 className="text-sm font-semibold text-light">{feature.title}</h4>
    </div>
    <p className={`text-xs ${TEXT_COLOR_MUTED} opacity-90 leading-relaxed`}>{feature.description}</p>
  </div>
);

const WorkflowNodeDisplay: React.FC<{ node: WorkflowNode, isLastInRow?: boolean }> = ({ node, isLastInRow }) => (
  <div className={`flex items-center ${node.isPlaceholder ? 'self-stretch' : ''}`}>
    <div className={`bg-slate-100 shadow-md rounded-lg p-3 text-center w-32 h-28 flex flex-col justify-center items-center 
                    ${node.isPlaceholder ? 'border-2 border-dashed border-gray-600 hover:border-primary cursor-pointer flex-grow bg-opacity-10' : 'border border-gray-300'}
                    transition-all`}>
      {node.isPlaceholder ? (
        <node.icon className="w-8 h-8 text-gray-500" />
      ) : (
        <>
          <node.icon className={`w-8 h-8 mb-1 text-gray-700`} /> {/* Icon color adjusted for light background */}
          <p className="text-xs font-medium text-gray-800 leading-tight">{node.label}</p>
          {node.subLabel && <p className="text-[10px] text-gray-600">{node.subLabel}</p>}
        </>
      )}
    </div>
    {!isLastInRow && !node.isPlaceholder && (
      <div className="flex items-center">
        <div className="w-3 h-px bg-gray-400 mx-1"></div>
        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
        <div className="w-3 h-px bg-gray-400 mx-1"></div>
      </div>
    )}
  </div>
);


const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const cardContent = (
    <div className={`${CARD_BG_COLOR} rounded-2xl overflow-hidden shadow-xl border border-gray-700 hover:border-${ACCENT_COLOR_PRIMARY} transition-all duration-300 group flex flex-col h-full relative hover:shadow-${ACCENT_COLOR_PRIMARY}/20`}>
      <div className="relative z-10 flex flex-col h-full">
        {/* Features Header - Adapted Style */}
        <div className="bg-gray-800 bg-opacity-50 flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-gray-700">
          {project.features.map((feature, index) => (
            <FeatureColumn key={index} feature={feature} />
          ))}
        </div>

        {/* Workflow Visualization Area - Background adapted */}
        <div className="flex-grow p-4 md:p-6 bg-darker bg-opacity-30" style={{ backgroundImage: "radial-gradient(circle, rgba(250,250,250,0.05) 1px, transparent 1px)", backgroundSize: "15px 15px" }}>
          <div className="space-y-4">
            <div className="flex items-center justify-start overflow-x-auto pb-2 -mb-2">
              {project.workflow.line1.map((node, index) => (
                <WorkflowNodeDisplay key={node.id} node={node} isLastInRow={index === project.workflow.line1.length - 1} />
              ))}
            </div>

            {project.workflow.conditionalNode && (
              <div className="flex items-start">
                <div className="w-32 mr-[22px]"></div> 
                <div className="w-32 mr-[22px]"></div> 
                <div className="flex flex-col items-center">
                    <div className="h-4 w-px bg-gray-600"></div>
                    <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mb-1"></div>
                    <WorkflowNodeDisplay node={project.workflow.conditionalNode} isLastInRow={true}/>
                </div>
              </div>
            )}
            
            {project.workflow.line2TrueBranch && project.workflow.conditionalNode && (
               <div className="flex items-start mt-1">
                 <div className="w-32 mr-[22px]"></div>
                 <div className="w-32 mr-[22px]"></div>
                 <div className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-1"></div>
                    <div className="h-px bg-gray-600 flex-grow w-4"></div>
                    <div className="relative">
                        <span className={`absolute -top-4 left-1 text-[10px] ${TEXT_COLOR_MUTED}`}>true</span>
                    </div>
                    {project.workflow.line2TrueBranch.map((node, index) => (
                        <WorkflowNodeDisplay key={node.id} node={node} isLastInRow={index === (project.workflow.line2TrueBranch?.length ?? 0) -1} />
                    ))}
                 </div>
               </div>
            )}
          </div>
        </div>
        <div className={`p-6 ${CARD_BG_COLOR} border-t border-gray-700/80`}>
            <h3 className={`text-xl font-bold ${TEXT_COLOR_HEADLINE} group-hover:text-${ACCENT_COLOR_PRIMARY} transition-colors duration-200 mb-2`}>{project.mainTitle}</h3>
            {/* Optional: Add short description or tags here if desired, similar to Athos cards */}
        </div>
      </div>
    </div>
  );

  return project.url ? (
    <a href={project.url} target="_blank" rel="noopener noreferrer" className="block h-full group">
      {cardContent}
    </a>
  ) : (
    <div className="h-full group">{cardContent}</div>
  );
};

const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="py-16 md:py-24 ${MAIN_BG_COLOR}"> {/* MAIN_BG_COLOR is default, can use DARKER_BG_COLOR for contrast */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 md:mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold ${TEXT_COLOR_HEADLINE} mb-4`}>Featured Work</h2>
          <p className={`${TEXT_COLOR_MUTED} text-lg max-w-2xl`}>
            Selected case studies showcasing automated workflows and strategic AI applications that drive business results.
          </p>
        </div>
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-stretch">
          {PROJECTS_DATA.map((project: Project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <div className="text-center mt-16">
            <a href="#" className={`inline-flex items-center text-lg font-medium text-${ACCENT_COLOR_PRIMARY} hover:text-opacity-80 group transition-colors`}>
                Explore All Projects
                <ArrowRightIcon className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;