import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import CoreStrengthsSection from './components/CoreStrengthsSection';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import BrandExplorationSection from './components/BrandExplorationSection';
import BlogSection from './components/BlogSection';
import FAQSection from './components/FAQSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import { MAIN_BG_COLOR, TEXT_COLOR_LIGHT } from './constants';

const App: React.FC = () => {
  return (
    <div className={`min-h-screen font-sans ${MAIN_BG_COLOR} ${TEXT_COLOR_LIGHT}`}>
      <Header />
      <main className="pt-16 md:pt-20"> {/* Adjusted padding top for fixed header */}
        <HeroSection />
        <ProjectsSection />
        <CoreStrengthsSection />
        <SkillsSection />
        <ExperienceSection />
        <BrandExplorationSection />
        <BlogSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default App;