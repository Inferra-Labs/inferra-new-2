import React from 'react';
// FIX: Corrected import path.
import type { Page, Theme } from '../App';
import Tooltip from './common/Tooltip';

interface FloatingControlsProps {
  navigateTo: (page: Page) => void;
  toggleTheme: () => void;
  theme: Theme;
}

const ControlButton = React.forwardRef<HTMLButtonElement, { onClick: () => void; 'aria-label': string; children: React.ReactNode }>(
    ({ onClick, 'aria-label': ariaLabel, children }, ref) => (
    <button
        ref={ref}
        onClick={onClick}
        aria-label={ariaLabel}
        className="group p-3 rounded-xl bg-card/80 dark:bg-dark-card/70 backdrop-blur-md shadow-lg border border-border/50 dark:border-dark-border/50 transition-all duration-300 text-foreground dark:text-dark-foreground hover:bg-card dark:hover:bg-dark-card"
    >
        {children}
    </button>
));
ControlButton.displayName = 'ControlButton';

const FloatingControls: React.FC<FloatingControlsProps> = ({ navigateTo, toggleTheme, theme }) => {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col space-y-3">
      <Tooltip text="Join Us" position="left">
        <ControlButton onClick={() => navigateTo('join-us')} aria-label="Join Us">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
        </ControlButton>
      </Tooltip>
      
      <Tooltip text="Toggle Theme" position="left">
        <ControlButton onClick={toggleTheme} aria-label="Toggle Theme">
          <div className="relative w-6 h-6">
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 absolute transition-all duration-300 transform ${theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 absolute transition-all duration-300 transform ${theme === 'light' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          </div>
        </ControlButton>
      </Tooltip>
    </div>
  );
};

export default FloatingControls;
