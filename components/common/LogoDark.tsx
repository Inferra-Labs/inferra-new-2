import React from 'react';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const LogoDark: React.FC<LogoProps> = ({ width = 32, height = 32, className = '' }) => {
  return (
    <img
      src="/images/logo-dark.png"
      alt="Inferra Labs Logo"
      width={width}
      height={height}
      className={className}
    />
  );
};

export default LogoDark;