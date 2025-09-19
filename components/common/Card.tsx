import React from 'react';

// FIX: Extended CardProps to include standard HTML attributes like onClick, allowing the Card to be interactive.
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
  return (
    <div {...props} className={`
      bg-card dark:bg-dark-card
      border border-border/50 dark:border-dark-border/50 
      rounded-2xl
      shadow-xl shadow-black/[0.05] dark:shadow-black/[0.1]
      transition-all duration-300 
      p-6
      ${className}
    `}>
      {children}
    </div>
  );
};

export default Card;