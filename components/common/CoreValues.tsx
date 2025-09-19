import React from 'react';

const CoreValues: React.FC = () => {
  return (
    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-center font-exo tracking-wide py-4 md:py-6">
      <span className="text-[#00AEEF]">Innovation</span>
      <span className="text-muted-foreground dark:text-dark-muted-foreground mx-2 md:mx-4">|</span>
      <span className="text-[#041E42] dark:text-[#7DA0CA]">Discipline</span>
      <span className="text-muted-foreground dark:text-dark-muted-foreground mx-2 md:mx-4">|</span>
      <span className="text-[#E30613]">Excellence</span>
    </div>
  );
};

export default CoreValues;