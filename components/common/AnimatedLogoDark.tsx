import React from 'react';
import LogoDark from './LogoDark';

interface AnimatedLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const AnimatedLogoDark: React.FC<AnimatedLogoProps> = ({ width = 80, height = 80, className = '' }) => {
  // The animation is now handled by the parent container's CSS. This component just displays the new static logo.
  return <LogoDark width={width} height={height} className={className} />;
};

export default AnimatedLogoDark;