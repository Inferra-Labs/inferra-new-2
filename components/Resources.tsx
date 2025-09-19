import React from 'react';
// FIX: Corrected import path.
import { Resource, ResourceCategory } from '../types';
import Card from './common/Card';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const ResourceTypeIcon: React.FC<{ type: Resource['type'] }> = ({ type }) => {
  const iconMap = {
    'Roadmap': <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>,
    'Notes': <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    'GitHub': <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>,
    'Article': <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 1V4a2 2 0 00-2-2h-7.586a1 1 0 00-.707.293l-2.414 2.414A1 1 0 006 6.414V18a2 2 0 002 2h11m-3-4h.01m-6.01 0h.01M12 12h.01" /></svg>,
  };
  return iconMap[type] || null;
};

interface ResourcesProps {
  resources: ResourceCategory[];
}

const Resources: React.FC<ResourcesProps> = ({ resources }) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div 
      ref={ref} 
      className={`py-20 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-foreground/80 dark:from-dark-accent dark:to-dark-foreground/80">Resources & Learning Materials</h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">
            A curated collection of roadmaps, notes, and study guides to help you on your learning journey.
          </p>
        </div>
        
        <div className="space-y-16">
          {resources.map((categoryData) => (
            <div key={categoryData.category}>
              <h3 className="text-2xl font-bold text-foreground dark:text-dark-foreground mb-6 border-l-4 border-accent dark:border-dark-accent pl-4">{categoryData.category}</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryData.resources.map((resource) => (
                  <Card key={resource.name} className="flex flex-col h-full">
                    <div className="flex items-center mb-2 text-accent dark:text-dark-accent">
                        <ResourceTypeIcon type={resource.type} />
                        <span className="text-sm font-semibold">{resource.type}</span>
                    </div>
                    <h4 className="text-xl font-semibold text-card-foreground dark:text-dark-card-foreground mb-2 flex-grow">{resource.name}</h4>
                    <p className="text-muted-foreground mb-4 flex-grow">{resource.description}</p>
                    <a 
                      href={resource.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center font-semibold text-accent dark:text-dark-accent hover:opacity-80 transition-opacity duration-300 mt-auto"
                    >
                      Access Resource
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;
