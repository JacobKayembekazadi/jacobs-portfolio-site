import React from 'react';
import { PERSONAL_INFO, FOOTER_SOCIAL_LINKS, TEXT_COLOR_MUTED, FOOTER_NAV_LINKS_COLUMN1, FOOTER_NAV_LINKS_COLUMN2, ACCENT_COLOR_PRIMARY } from '../constants';
import { SocialLink, NavItem } from '../types';

const FooterLinkColumn: React.FC<{ title: string, links: NavItem[] }> = ({ title, links }) => (
  <div>
    <h3 className="text-lg font-medium text-light mb-6">{title}</h3>
    <ul className="space-y-3">
      {links.map(link => (
        <li key={link.name}>
          <a href={link.href} className={`${TEXT_COLOR_MUTED} hover:text-light transition-colors duration-200`}>
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-800 bg-darker">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Personal Info & Copyright */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <img src={PERSONAL_INFO.profileImageUrl} alt={PERSONAL_INFO.name} className="w-12 h-12 rounded-full object-cover border-2 border-gray-700"/>
              <div>
                <p className="font-medium text-light">{PERSONAL_INFO.name}</p>
                <p className={`${TEXT_COLOR_MUTED} text-sm`}>AI Full Stack Marketer</p>
              </div>
            </div>
            <p className={`${TEXT_COLOR_MUTED} text-sm`}>
              &copy; {currentYear} {PERSONAL_INFO.initials}. All rights reserved.
            </p>
             <p className={`${TEXT_COLOR_MUTED} text-xs mt-2`}>
                Inspired by modern portfolio aesthetics.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <FooterLinkColumn title="Navigate" links={FOOTER_NAV_LINKS_COLUMN1} />

          {/* Column 3: More Navigation or Connect */}
          <FooterLinkColumn title="Explore" links={FOOTER_NAV_LINKS_COLUMN2} />
          
          {/* Column 4: Connect/Social */}
          <div>
            <h3 className="text-lg font-medium text-light mb-6">Connect</h3>
            <ul className="space-y-3 mb-6">
                <li><a href="mailto:jacob.kayembe.contact@example.com" className={`${TEXT_COLOR_MUTED} hover:text-light transition`}>Email Me</a></li>
                {/* Add other relevant links like resume, etc. */}
            </ul>
            <div className="flex space-x-5">
              {FOOTER_SOCIAL_LINKS.map((link: SocialLink) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className={`${TEXT_COLOR_MUTED} hover:text-${ACCENT_COLOR_PRIMARY} transition-colors duration-200`}
                >
                  <link.Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;