import React from 'react';
// FIX: Corrected import path.
import { Partner } from '../types';
import Card from './common/Card';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface PartnershipsProps {
  partners: {
    sponsors: Partner[];
    collaborations: Partner[];
  };
}

const Partnerships: React.FC<PartnershipsProps> = ({ partners }) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div 
      ref={ref} 
      className={`py-20 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-foreground/80 dark:from-dark-accent dark:to-dark-foreground/80">Sponsorships & Collaborations</h2>
          <p className="mt-4 text-lg max-w-3xl mx-auto text-muted-foreground">
            We partner with forward-thinking organizations to foster innovation and create opportunities for our student community.
          </p>
        </div>

        <div className="space-y-16">
          <div>
            <h3 className="text-2xl font-bold text-foreground dark:text-dark-foreground mb-6 border-l-4 border-accent dark:border-dark-accent pl-4">Our Sponsors</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center">
              {partners.sponsors.map((partner) => (
                <Card key={partner.name} className="p-4 text-center">
                  <img src={partner.logoUrl} alt={`${partner.name} logo`} className="h-16 mx-auto object-contain mb-4" />
                  <p className="text-sm text-muted-foreground">{partner.description}</p>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-foreground dark:text-dark-foreground mb-6 border-l-4 border-accent dark:border-dark-accent pl-4">Company Collaborations</h3>
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center">
              {partners.collaborations.map((partner) => (
                <Card key={partner.name} className="p-4 text-center">
                  <img src={partner.logoUrl} alt={`${partner.name} logo`} className="h-16 mx-auto object-contain mb-4" />
                   <p className="text-sm text-muted-foreground">{partner.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Partnerships;
