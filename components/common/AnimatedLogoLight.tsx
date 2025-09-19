import React from 'react';
import LogoLight from './LogoLight';

interface AnimatedLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const AnimatedLogoLight: React.FC<AnimatedLogoProps> = ({ width = 80, height = 80, className = '' }) => {
  // The animation is now handled by the parent container's CSS. This component just displays the new static logo.
  return <LogoLight width={width} height={height} className={className} />;
};

export default AnimatedLogoLight;