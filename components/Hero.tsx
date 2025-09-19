import React from 'react';
import Button from './common/Button';
import ParticleBackground from './ParticleBackground';
// FIX: Imported the global Page type from App.tsx for consistency.
// FIX: Corrected import path.
import { Theme, Page } from '../App';
import AnimatedLogo from './common/AnimatedLogo';
import CoreValues from './common/CoreValues';

interface HeroProps {
  navigateTo: (page: Page) => void;
  theme: Theme;
}

const HighlightCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode; }> = ({ icon, title, children }) => (
    <div className="p-4 rounded-xl bg-background/30 dark:bg-dark-background/30 backdrop-blur-sm border border-border/20 dark:border-dark-border/20">
        <div className="flex items-center">
            <div className="text-accent dark:text-dark-accent">{icon}</div>
            <h4 className="ml-3 font-semibold text-foreground dark:text-dark-foreground">{title}</h4>
        </div>
        <p className="text-sm text-muted-foreground dark:text-dark-muted-foreground mt-2">{children}</p>
    </div>
);

const Hero: React.FC<HeroProps> = ({ navigateTo, theme }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center text-center py-24">
      <ParticleBackground theme={theme} />
      <div className="relative z-10 p-4 max-w-5xl mx-auto">
        <div className="mb-4 animate-fade-in-up" style={{animationDelay: '200ms'}}>
            <CoreValues />
        </div>
        <div className="bg-background/20 dark:bg-dark-background/20 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-border/30 dark:border-dark-border/30 shadow-2xl shadow-black/[0.05] animate-fade-in-up">
            <div className="mb-6 flex justify-center">
              <AnimatedLogo theme={theme} />
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground dark:text-dark-foreground leading-tight font-exo">
                Inferra Labs
            </h1>
             <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground dark:text-dark-muted-foreground font-exo">
                Gateway to Decipher
            </p>
            <p className="mt-6 max-w-2xl mx-auto text-base md:text-lg text-muted-foreground dark:text-dark-muted-foreground">
                A student-run tech club at the forefront of innovation, fostering a community of builders, thinkers, and leaders.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="primary" onClick={() => navigateTo('join-us')} className="transform transition-transform duration-300 hover:scale-105">
                    Join Us Now
                </Button>
                <Button variant="secondary" onClick={() => navigateTo('about')} className="transform transition-transform duration-300 hover:scale-105">
                    Learn More
                </Button>
            </div>

            <div className="mt-12 grid sm:grid-cols-3 gap-6 text-left">
                <HighlightCard
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.636-6.364l-.707-.707M12 21v-1m0-10a5 5 0 00-5 5h10a5 5 0 00-5-5z" /></svg>}
                    title="Innovative Projects"
                >
                    Engage in cutting-edge projects from AI to Web3.
                </HighlightCard>
                <HighlightCard
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
                    title="Expert Workshops"
                >
                    Learn from industry experts and enhance your skills.
                </HighlightCard>
                <HighlightCard
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                    title="Vibrant Community"
                >
                    Collaborate with passionate peers and mentors.
                </HighlightCard>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
