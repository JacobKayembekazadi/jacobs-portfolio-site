import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import CoreStrengthsSection from './components/CoreStrengthsSection';
import PortfolioBentoGrid from './components/PortfolioBentoGrid';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import BrandExplorationSection from './components/BrandExplorationSection';
import FAQSection from './components/FAQSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import AINetworkBackground from './components/AINetworkBackground';
import CaseStudyPage from './components/CaseStudyPage';
import CaseStudiesGenerator from './components/CaseStudiesGenerator';
import { MAIN_BG_COLOR, TEXT_COLOR_LIGHT } from './constants';

const MainContent = () => (
  <>
    <Header />
    <main className="pt-12 md:pt-16 relative z-20">
      <HeroSection />
      <CoreStrengthsSection />
      <PortfolioBentoGrid />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <BrandExplorationSection />
      <FAQSection />
      <CTASection />
    </main>
    <div className="relative z-20">
      <Footer />
    </div>
  </>
);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className={`min-h-screen font-sans ${MAIN_BG_COLOR} ${TEXT_COLOR_LIGHT} relative`}>
        <div className="aurora-bg"></div>
        <div className="grid-pattern"></div>
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/case-study/:id" element={<CaseStudyPage />} />
          <Route path="/case-studies" element={<CaseStudiesGenerator />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
