import React, { createContext, useState, useCallback, useContext, ReactNode, useEffect } from 'react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
    id: number;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    addToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// --- Toast Components (kept in the same file for simplicity) ---

const ToastMessage: React.FC<{ toast: Toast; onClose: () => void }> = ({ toast, onClose }) => {
    const [isExiting, setIsExiting] = useState(false);

    // FIX: Wrapped handleClose in useCallback and added it to the useEffect dependency array to prevent stale closures and follow React hook rules. Also moved it before useEffect for clarity.
    const handleClose = useCallback(() => {
        setIsExiting(true);
        setTimeout(onClose, 300); // match animation duration
    }, [onClose]);

    useEffect(() => {
        const timer = setTimeout(() => {
            handleClose();
        }, 5000); // Auto-close after 5 seconds

        return () => clearTimeout(timer);
    }, [handleClose]);

    const icons = {
        success: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
        error: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
        info: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    };

    return (
        <div 
          className={`
            bg-card/80 dark:bg-dark-card/80 backdrop-blur-md 
            border border-border/50 dark:border-dark-border/50 
            rounded-xl shadow-lg
            flex items-start p-4 w-full
            transition-all duration-300
            ${isExiting ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}
            animate-fade-in-up
          `}
          style={{animationDuration: '0.3s'}}
          role="alert"
        >
            <div className="flex-shrink-0">{icons[toast.type]}</div>
            <div className="ml-3 flex-1 pt-0.5">
                <p className="text-sm font-medium text-card-foreground dark:text-dark-card-foreground">{toast.message}</p>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
                <button onClick={handleClose} className="inline-flex rounded-md p-1 text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-accent">
                    <span className="sr-only">Close</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

const ToastContainer: React.FC<{ toasts: Toast[]; removeToast: (id: number) => void; }> = ({ toasts, removeToast }) => {
    return (
        <div className="fixed top-5 right-5 z-[100] w-full max-w-sm space-y-3">
            {toasts.map(toast => (
                <ToastMessage key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
            ))}
        </div>
    );
};


// --- Provider and Hook ---

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((message: string, type: ToastType) => {
        const id = Date.now() + Math.random();
        setToasts(prevToasts => [...prevToasts, { id, message, type }]);
    }, []);

    const removeToast = useCallback((id: number) => {
        setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
    }, []);
    
    const value = { addToast };

    return (
        <ToastContext.Provider value={value}>
            {children}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};