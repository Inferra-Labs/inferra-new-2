import React from 'react';
// FIX: Corrected import path.
import type { Theme } from '../../App';
import AnimatedLogoLight from './AnimatedLogoLight';
import AnimatedLogoDark from './AnimatedLogoDark';

interface AnimatedLogoProps {
  width?: number;
  height?: number;
  className?: string;
  theme: Theme;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ width = 80, height = 80, className = '', theme }) => {
  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {theme === 'dark' ? (
        <AnimatedLogoDark width={width} height={height} className="text-dark-primary" />
      ) : (
        <AnimatedLogoLight width={width} height={height} className="text-primary" />
      )}
    </div>
  );
};

export default AnimatedLogo;
