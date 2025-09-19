import React, { useState, useMemo } from 'react';
// FIX: Corrected import path.
import type { TeamMember } from '../types';
import Card from './common/Card';
import Tooltip from './common/Tooltip';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const MemberCard: React.FC<{ member: TeamMember }> = ({ member }) => (
    <Card className="flex flex-col text-left h-full p-4">
        <div className="flex items-center">
            <img src={member.imageUrl} alt={member.name} className="w-20 h-20 object-cover border-4 border-muted dark:border-dark-muted shadow-lg rounded-2xl" />
            <div className="ml-4">
                <h3 className="text-lg font-semibold text-card-foreground dark:text-dark-card-foreground">{member.name}</h3>
                <p className="text-accent dark:text-dark-accent font-medium text-sm">{member.role}</p>
            </div>
        </div>
        <p className="text-sm text-muted-foreground mt-3 flex-grow">{member.description}</p>
        
        {member.skills && member.skills.length > 0 && (
            <div className="mt-3">
                <h4 className="font-semibold text-sm mb-2 text-card-foreground dark:text-dark-card-foreground">Skills:</h4>
                <div className="flex flex-wrap gap-2">
                    {member.skills.map(skill => (
                        <span key={skill} className="text-xs font-semibold bg-accent/10 text-accent dark:bg-dark-accent/20 dark:text-dark-accent-foreground px-2 py-1 rounded-full">{skill}</span>
                    ))}
                </div>
            </div>
        )}
        
        <div className="w-full border-t border-border dark:border-dark-border pt-3 mt-auto flex items-center space-x-4">
            {member.linkedinUrl && (
                <Tooltip text="LinkedIn" position="top">
                    <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent dark:hover:text-dark-accent">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    </a>
                </Tooltip>
            )}
            {member.githubUrl && (
                 <Tooltip text="GitHub" position="top">
                    <a href={member.githubUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent dark:hover:text-dark-accent">
                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                    </a>
                 </Tooltip>
            )}
        </div>
    </Card>
);

interface MemberDirectoryProps {
  teamMembers: TeamMember[];
}

const MemberDirectory: React.FC<MemberDirectoryProps> = ({ teamMembers }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  const filteredMembers = useMemo(() => {
    return teamMembers.filter(member =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (member.skills && member.skills.join(' ').toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [teamMembers, searchTerm]);

  return (
    <div
      ref={ref}
      className={`py-20 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-foreground/80 dark:from-dark-accent dark:to-dark-foreground/80">Member Directory</h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">
            Meet the talented individuals who make up Inferra Labs.
          </p>
        </div>

        <div className="mb-8 max-w-md mx-auto">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search by name, role, or skill..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 pl-10 bg-input/50 dark:bg-dark-input/50 border-2 border-border/50 dark:border-dark-border/50 rounded-lg shadow-sm text-foreground dark:text-dark-foreground focus:ring-1 focus:ring-ring dark:focus:border-accent transition-colors duration-300"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMembers.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
        
        {filteredMembers.length === 0 && (
            <div className="text-center col-span-full py-12">
                <p className="text-muted-foreground">No members found matching your search.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default MemberDirectory;