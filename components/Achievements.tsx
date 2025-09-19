import React from 'react';
// FIX: Corrected import path.
import { Achievement } from '../types';
import Card from './common/Card';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface AchievementsProps {
  achievements: {
    hackathons: Achievement[];
    cp: Achievement[];
  };
}

const Achievements: React.FC<AchievementsProps> = ({ achievements }) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div 
      ref={ref} 
      className={`py-20 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-foreground/80 dark:from-dark-accent dark:to-dark-foreground/80">Our Achievements</h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">
            Celebrating the hard work, dedication, and success of our members in various competitions and events.
          </p>
        </div>
        
        <div className="space-y-16">
          <div>
            <h3 className="text-2xl font-bold text-foreground dark:text-dark-foreground mb-6 border-l-4 border-accent dark:border-dark-accent pl-4">Hackathon Wins</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {achievements.hackathons.map((ach) => (
                <Card key={ach.title}>
                  <p className="text-sm font-semibold text-accent dark:text-dark-accent">{ach.event}</p>
                  <h4 className="text-xl font-bold text-card-foreground dark:text-dark-card-foreground mt-1">{ach.title}</h4>
                  <p className="text-lg font-semibold text-muted-foreground my-2">{ach.placing}</p>
                  <p className="text-sm text-muted-foreground">{ach.date}</p>
                  <div className="mt-4 border-t border-border dark:border-dark-border pt-3">
                    <p className="text-sm font-semibold text-card-foreground dark:text-dark-card-foreground">Team:</p>
                    <p className="text-sm text-muted-foreground">{ach.members.join(', ')}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-foreground dark:text-dark-foreground mb-6 border-l-4 border-accent dark:border-dark-accent pl-4">Competitive Programming</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {achievements.cp.map((ach) => (
                <Card key={ach.title}>
                    <p className="text-sm font-semibold text-accent dark:text-dark-accent">{ach.event}</p>
                    <h4 className="text-xl font-bold text-card-foreground dark:text-dark-card-foreground mt-1">{ach.title}</h4>
                    <p className="text-lg font-semibold text-muted-foreground my-2">{ach.placing}</p>
                    <p className="text-sm text-muted-foreground">{ach.date}</p>
                    <div className="mt-4 border-t border-border dark:border-dark-border pt-3">
                        <p className="text-sm font-semibold text-card-foreground dark:text-dark-card-foreground">Participants:</p>
                        <p className="text-sm text-muted-foreground">{ach.members.join(', ')}</p>
                    </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
