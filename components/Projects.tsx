import React from 'react';
// FIX: Corrected import path.
import { Project } from '../types';
import Card from './common/Card';
import Button from './common/Button';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface ProjectsProps {
  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div 
      ref={ref} 
      className={`py-20 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-foreground/80 dark:from-dark-accent dark:to-dark-foreground/80">Flagship Projects & Research</h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">
            Innovation in action. Here are some of the projects our members are passionately building.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden p-0 flex flex-col">
              <img src={project.imageUrl} alt={project.name} className="w-full h-56 object-cover" />
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-card-foreground dark:text-dark-card-foreground">{project.name}</h3>
                <div className="flex flex-wrap gap-2 my-3">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs font-semibold bg-accent/10 text-accent dark:bg-dark-accent/20 dark:text-dark-accent-foreground px-2 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 flex-grow">{project.description}</p>
                <div className="flex flex-wrap gap-4 mt-auto">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent dark:text-dark-accent hover:opacity-80 transition-opacity duration-300 flex items-center text-sm">
                        View on GitHub
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      </a>
                    )}
                    {project.videoUrl && (
                        <a href={project.videoUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent dark:text-dark-accent hover:opacity-80 transition-opacity duration-300 flex items-center text-sm">
                            Watch Demo
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </a>
                    )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
