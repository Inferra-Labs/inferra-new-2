import React, { useRef, useEffect, useState, useImperativeHandle, forwardRef } from 'react';
// FIX: Corrected import path.
import { Notification } from '../types';
import Card from './common/Card';
import SkeletonLoader from './common/SkeletonLoader';
import Tooltip from './common/Tooltip';

const useClickOutside = (ref: React.RefObject<HTMLElement>, handler: () => void, menuButtonRef?: React.RefObject<HTMLElement>) => {
    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            if (!ref.current || ref.current.contains(event.target as Node) || (menuButtonRef?.current && menuButtonRef.current.contains(event.target as Node))) {
                return;
            }
            handler();
        };
        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);
        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler, menuButtonRef]);
};

const useFocusTrap = (ref: React.RefObject<HTMLElement>, isOpen: boolean) => {
    useEffect(() => {
        if (!isOpen || !ref.current) return;

        const focusableElements = Array.from(
            ref.current.querySelectorAll<HTMLElement>(
                'a[href], button:not([disabled]), textarea, input, select'
            )
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        firstElement.focus();

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey) { // Shift+Tab
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else { // Tab
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, ref]);
};


interface NotificationPanelProps {
    onClose: () => void;
    notifications: Notification[];
    notificationButtonRef: React.RefObject<HTMLElement>;
    onMarkAllAsRead: () => void;
    isLoading: boolean;
}

export interface NotificationPanelRef {
    handleClose: () => void;
}

const NotificationIcon: React.FC<{ type: Notification['type'] }> = ({ type }) => {
    const iconMap: Record<Notification['type'], React.ReactNode> = {
        recruitment: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
        event: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
        announcement: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" /></svg>,
        general: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.136A1.76 1.76 0 017.166 12H11m0-6.118a1.76 1.76 0 00-3.417.592l-2.147 6.136A1.76 1.76 0 007.166 12H11m0 0h5.834a1.76 1.76 0 011.729 2.053l-2.147 6.136A1.76 1.76 0 0116.417 21V5.882a1.76 1.76 0 013.417-.592l2.147-6.136A1.76 1.76 0 0019.834 8H15M11 12h4" /></svg>,
    };
    return iconMap[type] || iconMap.general;
};

const NotificationSkeleton: React.FC = () => (
    <li className="p-3 flex items-start gap-4">
        <SkeletonLoader className="h-6 w-6 rounded-full flex-shrink-0 mt-1" />
        <div className="flex-grow space-y-2">
            <SkeletonLoader className="h-4 w-3/4" />
            <SkeletonLoader className="h-4 w-full" />
            <SkeletonLoader className="h-3 w-1/4 mt-1" />
        </div>
    </li>
)

const NotificationPanel = forwardRef<NotificationPanelRef, NotificationPanelProps>(({ onClose, notifications, notificationButtonRef, onMarkAllAsRead, isLoading }, ref) => {
    const panelRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const headingId = `notification-panel-title-${React.useId()}`;

    // Entry animation
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 50);
        return () => clearTimeout(timer);
    }, []);

    useFocusTrap(panelRef, isVisible);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Match animation duration
    };
    
    useImperativeHandle(ref, () => ({
        handleClose,
    }));

    useClickOutside(panelRef, handleClose, notificationButtonRef);

    return (
        <div 
            ref={panelRef} 
            className={`fixed top-20 right-4 z-50 w-full max-w-sm transition-all duration-300 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby={headingId}
        >
            <div className="bg-popover/80 dark:bg-dark-popover/80 backdrop-blur-md border border-border/50 dark:border-dark-border/50 shadow-2xl flex flex-col max-h-[70vh] rounded-xl overflow-hidden">
                <div className="flex justify-between items-center p-4 border-b border-border/50 dark:border-dark-border/50 flex-shrink-0">
                    <h3 id={headingId} className="font-bold text-lg text-popover-foreground dark:text-dark-popover-foreground">Notifications</h3>
                    <Tooltip text="Close" position="left">
                      <button onClick={handleClose} className="p-2 rounded-full hover:bg-muted dark:hover:bg-dark-muted transition-colors" aria-label="Close notifications">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                      </button>
                    </Tooltip>
                </div>
                <div className="overflow-y-auto p-2 flex-grow">
                    {isLoading ? (
                        <ul className="divide-y divide-border dark:divide-dark-border">
                            <NotificationSkeleton />
                            <NotificationSkeleton />
                            <NotificationSkeleton />
                        </ul>
                    ) : notifications.length === 0 ? (
                        <p className="text-center p-8 text-muted-foreground">No new notifications.</p>
                    ) : (
                        <ul className="divide-y divide-border/50 dark:divide-dark-border/50">
                            {notifications.map(notif => (
                                <li key={notif.id} className="p-3 flex items-start gap-4 hover:bg-muted dark:hover:bg-dark-muted rounded-lg transition-colors">
                                    <div className="flex-shrink-0 mt-1 relative">
                                        <NotificationIcon type={notif.type} />
                                        {!notif.isRead && <span className="absolute -top-1 -right-1 block h-2.5 w-2.5 rounded-full bg-blue-500 ring-2 ring-popover dark:ring-dark-popover"></span>}
                                    </div>
                                    <div className="flex-grow">
                                        <p className="font-semibold text-popover-foreground dark:text-dark-popover-foreground flex items-center">
                                            {notif.pinned && <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-accent dark:text-dark-accent flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.789 0l-2 4A1 1 0 008 8h4a1 1 0 00.894-1.447l-2-4zM14 10a1 1 0 011 1v2.586l2.707 2.707a1 1 0 01-1.414 1.414L14 15.414V18a1 1 0 11-2 0v-2.586l-2.707 2.707a1 1 0 01-1.414-1.414L10 13.586V11a1 1 0 112 0v2.586l2-2V11a1 1 0 011-1z" /></svg>}
                                            {notif.title}
                                        </p>
                                        <p className="text-sm text-muted-foreground">{notif.description}</p>
                                        {notif.fileLink && (
                                            <a 
                                                href={notif.fileLink} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center text-xs font-bold text-accent dark:text-dark-accent mt-2 px-2 py-1 bg-accent/10 dark:bg-dark-accent/10 rounded-md hover:bg-accent/20 dark:hover:bg-dark-accent/20"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                                                  <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a3 3 0 006 0V7a1 1 0 112 0v4a5 5 0 01-10 0V7a5 5 0 0110 0v4a1 1 0 11-2 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
                                                </svg>
                                                View Attachment
                                            </a>
                                        )}
                                        <p className="text-xs text-muted-foreground/80 mt-1">{notif.timestamp}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="p-3 text-center border-t border-border/50 dark:border-dark-border/50 flex-shrink-0">
                    <button onClick={onMarkAllAsRead} className="text-sm font-semibold text-accent dark:text-dark-accent hover:underline">
                        Mark all as read
                    </button>
                </div>
            </div>
        </div>
    );
});

NotificationPanel.displayName = 'NotificationPanel';
export default NotificationPanel;
