import React from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  position?: 'top' | 'left' | 'bottom' | 'right';
}

const Tooltip: React.FC<TooltipProps> = ({ text, children, position = 'top' }) => {
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2 origin-bottom',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2 origin-right',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2 origin-top',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2 origin-left',
  };

  return (
    <div className="relative flex items-center group">
      {children}
      <div 
        className={`absolute whitespace-nowrap px-3 py-1.5 
                   bg-neutral-800/90 dark:bg-black/80 backdrop-blur-sm
                   text-sm font-medium text-white 
                   rounded-md shadow-lg z-50
                   opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 
                   transition-all duration-200 delay-300 pointer-events-none
                   transform scale-95 group-hover:scale-100
                   ${positionClasses[position]}`}
        role="tooltip"
      >
        {text}
      </div>
    </div>
  );
};

export default Tooltip;