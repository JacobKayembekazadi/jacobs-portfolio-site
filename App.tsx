import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import CoreStrengthsSection from './components/CoreStrengthsSection';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import BrandExplorationSection from './components/BrandExplorationSection';
import FAQSection from './components/FAQSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import AINetworkBackground from './components/AINetworkBackground';
import { MAIN_BG_COLOR, TEXT_COLOR_LIGHT } from './constants';

const App: React.FC = () => {
  return (
    <div className={`min-h-screen font-sans ${MAIN_BG_COLOR} ${TEXT_COLOR_LIGHT} relative`}>
      <AINetworkBackground />
      <Header />
      <main className="pt-12 md:pt-16 relative z-20"> {/* Reduced padding top for better spacing */}
        <HeroSection />
        <ProjectsSection />
        <CoreStrengthsSection />
        <SkillsSection />
        <ExperienceSection />
        <BrandExplorationSection />
        <FAQSection />
        <CTASection />
      </main>
      <div className="relative z-20">
        <Footer />
      </div>
    </div>
  );
};

export default App;