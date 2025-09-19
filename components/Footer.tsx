import React from 'react';
// FIX: Corrected import paths.
import type { Page, Theme } from '../App';
import Logo from './common/Logo';
import type { AdminUser } from '../types';
import Tooltip from './common/Tooltip';

const SocialIcon: React.FC<{ href: string; children: React.ReactNode; tooltip: string }> = ({ href, children, tooltip }) => (
  <Tooltip text={tooltip} position="top">
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent dark:text-dark-muted-foreground dark:hover:text-dark-accent transition-colors duration-300">
      {children}
    </a>
  </Tooltip>
);

interface FooterProps {
  navigateTo: (page: Page) => void;
  theme: Theme;
}

const Footer: React.FC<FooterProps> = ({ navigateTo, theme }) => {
  const handleNavClick = (e: React.MouseEvent, page: Page) => {
    e.preventDefault();
    navigateTo(page);
  };

  return (
    <footer className="bg-muted/50 dark:bg-dark-card/30 backdrop-blur-md border-t border-border/50 dark:border-dark-border/50">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <a href="#" onClick={(e) => handleNavClick(e, 'home')} className="mb-4 inline-flex items-center space-x-3">
              <Logo width={48} height={48} theme={theme} />
              <span className="text-2xl font-bold text-foreground dark:text-dark-foreground font-exo">Inferra Labs</span>
            </a>
            <p className="text-sm mt-2 max-w-xs font-exo text-muted-foreground">Gateway to Decipher: A student-run tech club dedicated to fostering innovation.</p>
            <div className="flex space-x-5 mt-4">
                <SocialIcon href="https://www.instagram.com/theinferralabs" tooltip="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </SocialIcon>
                <SocialIcon href="https://www.linkedin.com/company/theinferralabs" tooltip="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </SocialIcon>
                <SocialIcon href="https://github.com/Inferra-labs" tooltip="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </SocialIcon>
            </div>
          </div>
           <div className="md:col-span-1">
            <h4 className="font-semibold text-foreground dark:text-dark-foreground tracking-wider uppercase text-sm">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-muted-foreground">
                <li><a href="#" onClick={(e) => handleNavClick(e, 'about')} className="hover:text-accent dark:hover:text-dark-accent transition-colors">About Us</a></li>
                <li><a href="#" onClick={(e) => handleNavClick(e, 'departments')} className="hover:text-accent dark:hover:text-dark-accent transition-colors">Departments</a></li>
                <li><a href="#" onClick={(e) => handleNavClick(e, 'achievements')} className="hover:text-accent dark:hover:text-dark-accent transition-colors">Achievements</a></li>
                <li><a href="#" onClick={(e) => handleNavClick(e, 'partnerships')} className="hover:text-accent dark:hover:text-dark-accent transition-colors">Partnerships</a></li>
                <li><a href="#" onClick={(e) => handleNavClick(e, 'alumni')} className="hover:text-accent dark:hover:text-dark-accent transition-colors">Alumni</a></li>
            </ul>
          </div>
          <div className="md:col-span-1">
             <h4 className="font-semibold text-foreground dark:text-dark-foreground tracking-wider uppercase text-sm">Contact Info</h4>
             <ul className="mt-4 space-y-3 text-muted-foreground">
                <li className="flex items-start"><span className="mr-3 mt-1 text-accent dark:text-dark-accent">&#9993;</span> <a href="mailto:theinferralabs@gmail.com" className="hover:text-accent dark:hover:text-dark-accent transition-colors">theinferralabs@gmail.com</a></li>
                <li className="flex items-start"><span className="mr-3 mt-1 text-accent dark:text-dark-accent">&#9742;</span> +91 7276565878</li>
                <li className="flex items-start"><span className="mr-3 mt-1 text-accent dark:text-dark-accent">&#127968;</span> Dr. D. Y. Patil Institute of Technology, Pimpri, Pune - 411018</li>
             </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border/50 dark:border-dark-border/50 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Inferra Labs. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
