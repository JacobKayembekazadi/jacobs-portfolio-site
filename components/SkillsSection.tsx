import React from 'react';
import { SKILLS_DATA, TEXT_COLOR_HEADLINE, TEXT_COLOR_MUTED, ACCENT_COLOR_PRIMARY, CARD_BG_COLOR } from '../constants';
import { SkillCategory } from '../types';

const ToolIcon: React.FC<{ tool: string; bgColor?: string }> = ({ tool, bgColor = 'bg-gray-700' }) => {
  const getToolIcon = (toolName: string) => {
    const lowerTool = toolName.toLowerCase();
    if (lowerTool.includes('openai') || lowerTool.includes('gpt')) return '🤖';
    if (lowerTool.includes('figma')) return '🎨';
    if (lowerTool.includes('zapier') || lowerTool.includes('make')) return '⚡';
    if (lowerTool.includes('framer')) return '🖼️';
    if (lowerTool.includes('webflow')) return '🌐';
    if (lowerTool.includes('wordpress')) return '📝';
    if (lowerTool.includes('analytics')) return '📊';
    if (lowerTool.includes('automation')) return '🔄';
    if (lowerTool.includes('prompt')) return '💭';
    if (lowerTool.includes('ai')) return '🧠';
    return '⚙️';
  };

  return (
    <div className={`w-8 h-8 ${bgColor} rounded-lg flex items-center justify-center text-sm`}>
      {getToolIcon(tool)}
    </div>
  );
};

const SkillCategoryCard: React.FC<{ category: SkillCategory; index: number }> = ({ category, index }) => {
  const getCategoryConfig = (categoryName: string, index: number) => {
    const configs = {
      'AI & Emerging Technologies': {
        gradient: 'from-blue-500/20 to-purple-500/20',
        border: 'border-blue-400/30',
        shadow: 'shadow-blue-500/10',
        icon: '🤖',
        description: 'Cutting-edge AI tools and automation systems for intelligent workflow orchestration.',
        featured: ['OpenAI API', 'AI Agent Building', 'Prompt Engineering', 'Midjourney']
      },
      'Website & Digital Expertise': {
        gradient: 'from-green-500/20 to-teal-500/20',
        border: 'border-green-400/30',
        shadow: 'shadow-green-500/10',
        icon: '💻',
        description: 'Full-stack web development and design expertise for conversion-focused experiences.',
        featured: ['Framer', 'Webflow', 'WordPress', 'Figma']
      },
      'Marketing & Brand Communications': {
        gradient: 'from-orange-500/20 to-red-500/20',
        border: 'border-orange-400/30',
        shadow: 'shadow-orange-500/10',
        icon: '📢',
        description: 'Strategic communications and brand development for digital transformation.',
        featured: ['Brand Strategy', 'Copywriting', 'Social Media', 'Content Development']
      },
      'Tools & Software Proficiency': {
        gradient: 'from-purple-500/20 to-pink-500/20',
        border: 'border-purple-400/30',
        shadow: 'shadow-purple-500/10',
        icon: '🛠️',
        description: 'Professional toolkit mastery for seamless project execution and collaboration.',
        featured: ['Zapier', 'Make.com', 'Google Analytics', 'HubSpot']
      },
      'Core Project Management': {
        gradient: 'from-indigo-500/20 to-blue-500/20',
        border: 'border-indigo-400/30',
        shadow: 'shadow-indigo-500/10',
        icon: '📊',
        description: 'End-to-end project leadership with agile methodologies and strategic oversight.',
        featured: ['Asana', 'Scrum/Kanban', 'Risk Management', 'Stakeholder Communication']
      }
    };
    
    return configs[categoryName as keyof typeof configs] || configs['Tools & Software Proficiency'];
  };

  const config = getCategoryConfig(category.name, index);
  const isLargeCard = index === 0 || index === 2; // Make certain cards larger for visual interest

  return (
    <div className={`
      ${CARD_BG_COLOR} rounded-2xl p-6 shadow-xl border ${config.border} 
      hover:border-${ACCENT_COLOR_PRIMARY} transition-all duration-300 transform hover:-translate-y-2 
      hover:shadow-2xl hover:${config.shadow} bg-gradient-to-br ${config.gradient}
      ${isLargeCard ? 'md:col-span-2 lg:col-span-1' : ''} h-full flex flex-col relative overflow-hidden
    `}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl"></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header with icon */}
        <div className="mb-4">
          <div className={`w-16 h-16 bg-${ACCENT_COLOR_PRIMARY}/10 rounded-2xl flex items-center justify-center text-3xl mb-4 backdrop-blur-sm`}>
            {config.icon}
          </div>
          <h3 className={`text-xl font-bold ${TEXT_COLOR_HEADLINE} mb-2 leading-tight`}>
            {category.name}
          </h3>
          <p className={`${TEXT_COLOR_MUTED} text-sm leading-relaxed`}>
            {config.description}
          </p>
        </div>

        {/* Featured tools/skills showcase */}
        <div className="mb-4 flex-grow">
          <div className="grid grid-cols-2 gap-3">
            {config.featured.map((tool, idx) => (
              <div key={idx} className="flex items-center space-x-2 p-2 bg-gray-800/30 rounded-lg backdrop-blur-sm border border-gray-700/50">
                <ToolIcon tool={tool} bgColor="bg-gray-600/50" />
                <span className="text-xs text-gray-300 font-medium truncate">{tool}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Additional skills count */}
        <div className="mt-auto pt-4 border-t border-gray-700/50">
          <div className="flex items-center justify-between">
            <span className={`text-xs ${TEXT_COLOR_MUTED}`}>
              {category.skills.length} total skills
  </span>
            <div className="flex space-x-1">
              {Array.from({ length: Math.min(5, Math.ceil(category.skills.length / 2)) }).map((_, i) => (
                <div key={i} className={`w-1.5 h-1.5 bg-${ACCENT_COLOR_PRIMARY}/60 rounded-full`}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 md:mb-16 text-center">
          <h2 className={`text-3xl md:text-4xl font-bold ${TEXT_COLOR_HEADLINE} mb-4`}>Skills & Expertise</h2>
          <p className={`${TEXT_COLOR_MUTED} text-lg max-w-2xl mx-auto`}>
            A comprehensive toolkit spanning AI integration, digital marketing, and strategic project leadership 
            — designed to drive transformation for modern businesses.
          </p>
        </div>
        
        {/* Enhanced Card Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {SKILLS_DATA.map((category: SkillCategory, index: number) => (
            <SkillCategoryCard key={category.name} category={category} index={index} />
          ))}
        </div>

        {/* Bottom section with overall expertise summary */}
        <div className="mt-16 text-center">
          <div className={`${CARD_BG_COLOR} rounded-2xl p-8 border border-gray-800 bg-gradient-to-r from-blue-500/5 to-purple-500/5`}>
            <h3 className={`text-2xl font-bold ${TEXT_COLOR_HEADLINE} mb-4`}>
              AI-Enabled Full Stack Marketer
            </h3>
            <p className={`${TEXT_COLOR_MUTED} text-base max-w-3xl mx-auto leading-relaxed`}>
              Bridging the gap between innovative AI tools and real-world business solutions. 
              My expertise spans from strategic planning to technical implementation, 
              creating automated systems that scale impact for creators, marketers, and growing teams.
            </p>
            <div className="flex justify-center items-center space-x-6 mt-6">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 bg-${ACCENT_COLOR_PRIMARY} rounded-full`}></div>
                <span className="text-sm text-gray-400">5+ Years Experience</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 bg-green-400 rounded-full`}></div>
                <span className="text-sm text-gray-400">50+ Tools Mastered</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 bg-orange-400 rounded-full`}></div>
                <span className="text-sm text-gray-400">AI-First Approach</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;