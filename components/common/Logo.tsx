import React from 'react';
// FIX: Corrected import path.
import type { Theme } from '../../App';
import LogoLight from './LogoLight';
import LogoDark from './LogoDark';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
  theme: Theme;
}

const Logo: React.FC<LogoProps> = ({ width = 32, height = 32, className = '', theme }) => {
  if (theme === 'dark') {
    return <LogoDark width={width} height={height} className={`text-dark-primary ${className}`} />;
  }
  return <LogoLight width={width} height={height} className={`text-primary ${className}`} />;
};

export default Logo;
