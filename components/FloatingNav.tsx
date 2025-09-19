import React from 'react';
// FIX: Corrected import path.
import type { Page } from '../App';

interface FloatingNavProps {
  activePage: Page;
  navigateTo: (page: Page) => void;
}

const NavItem: React.FC<{ page: Page; label: string; icon: React.ReactNode; isActive: boolean; onClick: () => void; }> = ({ page, label, icon, isActive, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center gap-1 w-20 h-14 rounded-lg transition-all duration-300 ${
      isActive 
      ? 'text-accent dark:text-dark-accent bg-accent/10 dark:bg-dark-accent/10' 
      : 'text-muted-foreground dark:text-dark-muted-foreground hover:bg-secondary dark:hover:bg-dark-secondary'
    }`}
  >
    {icon}
    <span className="text-xs font-medium">{label}</span>
  </button>
);

const FloatingNav: React.FC<FloatingNavProps> = ({ activePage, navigateTo }) => {
  const navItems = [
    { page: 'home' as Page, label: 'Home', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
    { page: 'about' as Page, label: 'About', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
    { page: 'contact' as Page, label: 'Contact', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
  ];

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-20 md:hidden">
      <div className="bg-card/80 dark:bg-dark-card/80 backdrop-blur-md border border-border/50 dark:border-dark-border/50 rounded-2xl shadow-lg px-2 py-2">
        <nav className="flex items-center justify-center gap-2">
          {navItems.map(item => (
            <NavItem
              key={item.page}
              page={item.page}
              label={item.label}
              icon={item.icon}
              isActive={activePage === item.page}
              onClick={() => navigateTo(item.page)}
            />
          ))}
        </nav>
      </div>
    </div>
  );
};

export default FloatingNav;
