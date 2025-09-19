import React from 'react';

interface SkeletonLoaderProps {
  className?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ className = '' }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-md bg-muted dark:bg-dark-muted ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/30 dark:via-dark-background/30 to-transparent animate-shimmer" />
    </div>
  );
};

export default SkeletonLoader;