import React from 'react';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const LogoLight: React.FC<LogoProps> = ({ width = 32, height = 32, className = '' }) => {
  return (
    <img
      src="/images/logo-light.png"
      alt="Inferra Labs Logo"
      width={width}
      height={height}
      className={className}
    />
  );
};

export default LogoLight;