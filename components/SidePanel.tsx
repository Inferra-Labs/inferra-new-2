import React from 'react';
// FIX: Corrected import paths.
import type { Page, Theme } from '../App';
import Logo from './common/Logo';
import Tooltip from './common/Tooltip';
import type { AdminUser } from '../types';

interface SidePanelProps {
  activePage: Page;
  navigateTo: (page: Page) => void;
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
  adminUser: AdminUser | null;
  onAdminLogout: () => void;
}

const SidePanel: React.FC<SidePanelProps> = ({ activePage, navigateTo, isOpen, onClose, theme, adminUser, onAdminLogout }) => {
    const sidePanelNavItems = {
      explore: [
        { page: 'departments' as Page, label: 'Departments', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg> },
        { page: 'projects' as Page, label: 'Projects', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg> },
        { page: 'events' as Page, label: 'Events', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
        { page: 'gallery' as Page, label: 'Gallery', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
      ],
      community: [
        { page: 'committee' as Page, label: 'Committee', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg> },
        { page: 'member-directory' as Page, label: 'Member Directory', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
        { page: 'achievements' as Page, label: 'Achievements', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" /></svg> },
        { page: 'partnerships' as Page, label: 'Partnerships', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
        { page: 'alumni' as Page, label: 'Alumni Connect', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
      ],
      knowledge: [
        { page: 'resources' as Page, label: 'Resources', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg> },
        { page: 'knowledge-hub' as Page, label: 'Knowledge Hub', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.636-6.364l-.707-.707M12 21v-1m0-10a5 5 0 00-5 5h10a5 5 0 00-5-5z" /></svg> },
        { page: 'recruitment-history' as Page, label: 'Recruitment', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg> },
      ]
  };

  const renderSidePanelSection = (title: string, items: { page: Page; label: string; icon: JSX.Element }[]) => (
    <div>
      <h5 className="px-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">{title}</h5>
      <ul className="mt-2 space-y-1">
        {items.map(item => (
          <li key={item.page}>
            <button 
              onClick={() => navigateTo(item.page)}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                activePage === item.page
                  ? 'bg-secondary dark:bg-dark-secondary text-foreground dark:text-dark-foreground'
                  : 'text-muted-foreground dark:text-dark-muted-foreground hover:bg-secondary dark:hover:bg-dark-secondary hover:text-foreground dark:hover:text-dark-foreground'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
  
  const headingId = `side-panel-title-${React.useId()}`;

  return (
    <aside 
      className={`fixed top-4 left-4 z-50 w-72 h-[calc(100vh-2rem)] bg-background/80 dark:bg-dark-background/80 backdrop-blur-md border border-border/50 dark:border-dark-border/50 shadow-2xl flex flex-col rounded-xl overflow-hidden transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-[calc(100%+1rem)]'}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={headingId}
      aria-hidden={!isOpen}
    >
       <div className="p-4 border-b border-border/50 dark:border-dark-border/50 flex items-center justify-between flex-shrink-0">
           <div className="flex items-center">
             <Logo theme={theme} />
             <div className="ml-3">
                <p id={headingId} className="font-bold text-foreground dark:text-dark-foreground">Inferra Labs</p>
                <p className="text-xs text-muted-foreground">Gateway to Decipher</p>
             </div>
           </div>
           <Tooltip text="Close Menu" position="right">
            <button 
                  onClick={onClose} 
                  className="p-2 rounded-full hover:bg-muted dark:hover:bg-dark-muted transition-colors text-muted-foreground"
                  aria-label="Close menu"
              >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
              </button>
            </Tooltip>
       </div>
       
       <nav className="flex-grow p-4 space-y-6 overflow-y-auto custom-scrollbar">
          {renderSidePanelSection('Explore', sidePanelNavItems.explore)}
          {renderSidePanelSection('Community', sidePanelNavItems.community)}
          {renderSidePanelSection('Knowledge', sidePanelNavItems.knowledge)}
       </nav>

       <div className="p-4 border-t border-border/50 dark:border-dark-border/50 flex-shrink-0 space-y-4">
          <div className="flex items-start text-xs text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            <p className="ml-2">Dr. D. Y. Patil Institute of Technology, Pimpri, Pune - 411018</p>
          </div>
          
          {adminUser ? (
            <div className="space-y-2">
                <p className="text-xs text-muted-foreground px-3">Welcome, <span className="font-semibold">{adminUser.username}</span></p>
                <button
                  onClick={() => navigateTo('admin-dashboard')}
                  className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 bg-muted/50 dark:bg-dark-muted/50 text-muted-foreground dark:text-dark-muted-foreground hover:bg-secondary dark:hover:bg-dark-secondary hover:text-foreground dark:hover:text-dark-foreground"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  Admin Dashboard
                </button>
                <button
                  onClick={onAdminLogout}
                  className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 bg-muted/50 dark:bg-dark-muted/50 text-muted-foreground dark:text-dark-muted-foreground hover:bg-secondary dark:hover:bg-dark-secondary hover:text-foreground dark:hover:text-dark-foreground"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                  Logout
                </button>
            </div>
          ) : (
            <button
              onClick={() => navigateTo('admin-login')}
              className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 bg-muted/50 dark:bg-dark-muted/50 text-muted-foreground dark:text-dark-muted-foreground hover:bg-secondary dark:hover:bg-dark-secondary hover:text-foreground dark:hover:text-dark-foreground"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              Admin Portal
            </button>
          )}

          <div className="flex items-center justify-around pt-2">
               <Tooltip text="Instagram" position="top">
                 <a href="https://www.instagram.com/theinferralabs" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full text-muted-foreground hover:text-accent dark:hover:text-dark-accent transition-colors" aria-label="Instagram">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                 </a>
               </Tooltip>
               <Tooltip text="LinkedIn" position="top">
                 <a href="https://www.linkedin.com/company/theinferralabs" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full text-muted-foreground hover:text-accent dark:hover:text-dark-accent transition-colors" aria-label="LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                 </a>
               </Tooltip>
                <Tooltip text="GitHub" position="top">
                 <a href="https://github.com/Inferra-labs" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full text-muted-foreground hover:text-accent dark:hover:text-dark-accent transition-colors" aria-label="GitHub">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                 </a>
               </Tooltip>
          </div>
       </div>
    </aside>
  );
};

export default SidePanel;
