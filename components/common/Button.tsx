import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  // FIX: Add size prop to support different button sizes.
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  // FIX: Removed hardcoded padding and text-size from baseStyle to be handled by the new size prop.
  const baseStyle = "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:focus-visible:ring-offset-dark-background disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.97]";

  const variantStyles = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-dark-primary dark:text-dark-primary-foreground dark:hover:bg-dark-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border/50 dark:bg-dark-secondary dark:text-dark-secondary-foreground dark:hover:bg-dark-secondary/80 dark:border-dark-border/50"
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base"
  };

  return (
    <button className={`${baseStyle} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
