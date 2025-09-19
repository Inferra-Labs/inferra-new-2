import React from 'react';
// FIX: Corrected import path.
import { Alumnus } from '../types';
import Card from './common/Card';
import Tooltip from './common/Tooltip';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const AlumniCard: React.FC<{ alumnus: Alumnus }> = ({ alumnus }) => (
    <Card className="flex flex-col items-center text-center h-full">
        <img src={alumnus.imageUrl} alt={alumnus.name} className="w-32 h-32 object-cover border-4 border-muted dark:border-dark-muted shadow-lg rounded-3xl" />
        <h3 className="mt-4 text-xl font-semibold text-card-foreground dark:text-dark-card-foreground">{alumnus.name}</h3>
        <p className="text-accent dark:text-dark-accent font-medium">{alumnus.currentRole} at {alumnus.company}</p>
        <p className="text-sm text-muted-foreground mt-3 flex-grow italic">"{alumnus.testimonial}"</p>
        <div className="w-full border-t border-border dark:border-dark-border pt-4 mt-4">
            <Tooltip text="Connect on LinkedIn" position="top">
                <a href={alumnus.linkedinUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-muted-foreground hover:text-accent dark:hover:text-dark-accent transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    Connect on LinkedIn
                </a>
            </Tooltip>
        </div>
    </Card>
);

interface AlumniProps {
  alumni: Alumnus[];
}

const Alumni: React.FC<AlumniProps> = ({ alumni }) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div 
      ref={ref} 
      className={`py-20 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-foreground/80 dark:from-dark-accent dark:to-dark-foreground/80">Alumni Connect</h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">
            Our alumni are making an impact at leading companies worldwide. We are proud of their journey and their continued connection to the club.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {alumni.map((alumnus) => (
            <AlumniCard key={alumnus.id} alumnus={alumnus} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Alumni;
