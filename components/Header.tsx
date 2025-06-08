import React, { useState, useEffect } from 'react';
import { NAV_ITEMS, PERSONAL_INFO, ACCENT_COLOR_PRIMARY } from '../constants';
import { NavItem } from '../types';
import { MenuIcon, XIcon } from './icons/InterfaceIcons';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerClasses = `fixed w-full z-50 transition-all duration-300 ease-in-out ${
    isScrolled || isOpen ? 'bg-dark bg-opacity-90 backdrop-blur-md border-b border-gray-800' : 'bg-transparent'
  }`;

  const closeMobileMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  const openMobileMenu = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  }

  return (
    <header className={headerClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="text-2xl font-bold gradient-text">
            {PERSONAL_INFO.initials}
          </a>
          <nav className="hidden md:flex space-x-8 items-center">
            {NAV_ITEMS.map((item: NavItem) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
            <a
              href="#contact"
              className={`bg-${ACCENT_COLOR_PRIMARY} hover:bg-opacity-90 text-white font-medium px-6 py-2.5 rounded-full transition-colors duration-200 text-sm shadow-md hover:shadow-lg`}
            >
              Get in Touch
            </a>
          </nav>
          <div className="md:hidden flex items-center">
            <button
              onClick={isOpen ? closeMobileMenu : openMobileMenu}
              className="text-gray-300 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Athos Style */}
      <div 
        id="mobile-menu" 
        className={`fixed inset-0 bg-black bg-opacity-80 z-40 flex justify-end 
                    transition-transform duration-300 ease-in-out md:hidden
                    ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        onClick={closeMobileMenu} // Close if clicking on overlay
      >
        <div 
          className="bg-darker w-3/4 h-full p-4 flex flex-col shadow-2xl"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside menu
        >
          <div className="flex justify-between items-center mb-10">
            <span className="text-xl font-bold gradient-text">{PERSONAL_INFO.initials}</span>
            <button onClick={closeMobileMenu} className="text-gray-300 focus:outline-none">
              <XIcon className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col space-y-6">
            {NAV_ITEMS.map((item: NavItem) => (
              <a
                key={item.name}
                href={item.href}
                onClick={closeMobileMenu}
                className="text-gray-300 hover:text-white text-xl transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
            {/* Adding FAQ if it was removed from main NAV_ITEMS for mobile */}
            <a href="#faq" onClick={closeMobileMenu} className="text-gray-300 hover:text-white text-xl transition-colors duration-200">FAQ</a>

            <a
              href="#contact"
              onClick={closeMobileMenu}
              className={`mt-6 bg-${ACCENT_COLOR_PRIMARY} hover:bg-opacity-90 text-white font-medium px-6 py-3 rounded-full transition-colors duration-200 w-full text-center text-lg shadow-md`}
            >
              Get in Touch
            </a>
          </nav>
          {/* Optional: Add social links here if desired for mobile menu */}
        </div>
      </div>
    </header>
  );
};

export default Header;