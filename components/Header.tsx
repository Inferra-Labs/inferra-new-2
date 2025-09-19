import React from 'react';
// FIX: Corrected import path for App types.
import type { Page, Theme } from '../App';
import Logo from './common/Logo';
import Tooltip from './common/Tooltip';

interface HeaderProps {
  activePage: Page;
  navigateTo: (page: Page) => void;
  toggleSidePanel: () => void;
  isSidePanelOpen: boolean;
  toggleNotificationPanel: () => void;
  notificationButtonRef: React.RefObject<HTMLButtonElement>;
  hasUnreadNotifications: boolean;
  theme: Theme;
}

const Header: React.FC<HeaderProps> = ({ activePage, navigateTo, toggleSidePanel, isSidePanelOpen, toggleNotificationPanel, notificationButtonRef, hasUnreadNotifications, theme }) => {

  const mainNavItems: { page: Page; label: string }[] = [
    { page: 'home', label: 'Home' },
    { page: 'about', label: 'About' },
    { page: 'contact', label: 'Contact' },
  ];
  
  const handleNav = (page: Page) => {
    navigateTo(page);
  }

  const formatPageName = (page: Page) => {
    return page
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
  };

  return (
    <header className="fixed top-0 z-30 w-full bg-background/80 dark:bg-dark-background/80 backdrop-blur-md border-b border-border/50 dark:border-dark-border/50 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-[auto_1fr_auto] items-center h-16">
        
        {/* Left: Hamburger Menu & Status */}
        <div className="flex items-center justify-start gap-4">
          <button 
              onClick={toggleSidePanel} 
              className="p-2 rounded-lg hover:bg-secondary dark:hover:bg-dark-secondary transition-colors text-foreground dark:text-dark-foreground"
              aria-label={isSidePanelOpen ? "Close menu" : "Open menu"}
              aria-expanded={isSidePanelOpen}
          >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span aria-hidden="true" className={`block absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${isSidePanelOpen ? 'rotate-45' : '-translate-y-1.5'}`}></span>
                  <span aria-hidden="true" className={`block absolute h-0.5 w-5 bg-current transform transition duration-300 ease-in-out ${isSidePanelOpen ? 'opacity-0' : ''}`}></span>
                  <span aria-hidden="true" className={`block absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${isSidePanelOpen ? '-rotate-45' : 'translate-y-1.5'}`}></span>
              </div>
          </button>
          <div className="hidden md:flex items-center gap-2">
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span key={activePage} className="text-sm font-medium text-muted-foreground dark:text-dark-muted-foreground whitespace-nowrap animate-fade-in-up" style={{animationDuration: '0.3s'}}>
                {formatPageName(activePage)}
            </span>
          </div>
        </div>
        
        {/* Center: Logo */}
        <div className="flex items-center justify-center">
           <a href="#home" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} className="flex items-center space-x-2.5">
              <Logo theme={theme} />
              <span className="text-xl font-bold text-foreground dark:text-dark-foreground font-exo">Inferra Labs</span>
          </a>
        </div>
        
        {/* Right: Nav */}
        <div className="flex items-center justify-end">
          <nav className="flex items-center">
              <div className="hidden md:flex items-center space-x-1">
                {mainNavItems.map(item => (
                    <button
                        key={item.page}
                        onClick={() => handleNav(item.page)}
                        className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                            activePage === item.page
                            ? 'text-accent dark:text-dark-accent'
                            : 'text-muted-foreground dark:text-dark-muted-foreground hover:text-foreground dark:hover:text-dark-foreground'
                        }`}
                    >
                        {item.label}
                    </button>
                ))}
              </div>
               <Tooltip text="Notifications" position="bottom">
                <button ref={notificationButtonRef} onClick={toggleNotificationPanel} aria-label="Notifications" className="p-2 rounded-lg hover:bg-secondary dark:hover:bg-dark-secondary transition-colors relative ml-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-foreground dark:text-dark-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-5-5.917V5a1 1 0 00-2 0v.083A6 6 0 006 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  {hasUnreadNotifications && (
                    <span className="absolute top-2.5 right-2.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-background dark:ring-dark-background"></span>
                  )}
                </button>
              </Tooltip>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
