import React from 'react';
// FIX: Corrected import path.
import { TeamMember } from '../types';
import Card from './common/Card';
import Tooltip from './common/Tooltip';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => (
    <Card className="flex flex-col items-center text-center h-full">
        <img src={member.imageUrl} alt={member.name} className="w-32 h-32 md:w-40 md:h-40 object-cover border-4 border-muted dark:border-dark-muted shadow-lg rounded-3xl" />
        <h3 className="mt-4 text-xl font-semibold text-card-foreground dark:text-dark-card-foreground">{member.name}</h3>
        <p className="text-accent dark:text-dark-accent font-medium">{member.role}</p>
        <p className="text-sm text-muted-foreground mt-2 max-w-xs flex-grow">{member.description}</p>
        
        <div className="w-full border-t border-border dark:border-dark-border pt-4 mt-4 space-y-3">
            {member.linkedinUrl && (
                <Tooltip text="View LinkedIn Profile" position="top">
                    <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center text-sm text-muted-foreground hover:text-accent dark:hover:text-dark-accent transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 flex-shrink-0"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                        <span>LinkedIn Profile</span>
                    </a>
                </Tooltip>
            )}
            {member.email && (
                <div className="flex items-center justify-center text-sm text-muted-foreground truncate">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 flex-shrink-0"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    <a href={`mailto:${member.email}`} className="truncate hover:text-accent dark:hover:text-dark-accent">{member.email}</a>
                </div>
            )}
            {member.phone && (
                <div className="flex items-center justify-center text-sm text-muted-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 flex-shrink-0"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    <a href={`tel:${member.phone}`} className="hover:text-accent dark:hover:text-dark-accent">{member.phone}</a>
                </div>
            )}
        </div>
    </Card>
);

interface CommitteeProps {
    facultyCoordinators: TeamMember[];
    coreCommittee: TeamMember[];
}

const Committee: React.FC<CommitteeProps> = ({ facultyCoordinators, coreCommittee }) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div 
      ref={ref} 
      className={`py-20 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-foreground/80 dark:from-dark-accent dark:to-dark-foreground/80">Our Committee</h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">
            The driving force behind Inferra Labs—a dedicated team of leaders, innovators, and mentors.
          </p>
        </div>
        
        <h3 className="text-2xl font-bold text-foreground dark:text-dark-foreground text-center mb-10">Faculty Coordinators</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-20 max-w-3xl mx-auto">
            {facultyCoordinators.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
            ))}
        </div>

        <h3 className="text-2xl font-bold text-foreground dark:text-dark-foreground text-center mb-10">Core Committee</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {coreCommittee.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Committee;
