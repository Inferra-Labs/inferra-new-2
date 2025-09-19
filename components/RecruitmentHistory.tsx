import React from 'react';
// FIX: Corrected import path.
import { RecruitmentEvent } from '../types';
import Card from './common/Card';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const RecruitmentTimelineItem: React.FC<{ event: RecruitmentEvent, align: 'left' | 'right' }> = ({ event, align }) => {
    const statusColors = {
        'Upcoming': 'bg-blue-500/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-300',
        'Open': 'bg-green-500/10 text-green-600 dark:bg-green-400/10 dark:text-green-300',
        'Closed': 'bg-red-500/10 text-red-600 dark:bg-red-400/10 dark:text-red-300',
    };

    const alignmentClasses = align === 'right' 
      ? 'sm:ml-auto sm:pl-16' 
      : 'sm:mr-auto sm:pr-16 sm:text-right';
      
    const arrowClasses = align === 'right'
      ? 'sm:left-[-8px]'
      : 'sm:right-[-8px]';

    return (
        <div className={`relative sm:w-1/2 ${alignmentClasses}`}>
             <div className={`hidden sm:block absolute top-5 w-4 h-4 bg-card dark:bg-dark-card rotate-45 ${arrowClasses}`}></div>
            <Card>
                <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full mb-2 ${statusColors[event.status]}`}>
                    {event.status}
                </span>
                <h3 className="text-xl font-bold text-foreground dark:text-dark-foreground">{event.title}</h3>
                <time className="text-sm font-semibold text-accent dark:text-dark-accent my-1 block">{event.period}</time>
                <p className="text-muted-foreground">{event.description}</p>
            </Card>
        </div>
    );
};

interface RecruitmentHistoryProps {
    history: {
        upcoming: RecruitmentEvent[];
        past: RecruitmentEvent[];
    };
}

const RecruitmentHistory: React.FC<RecruitmentHistoryProps> = ({ history }) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

    return (
        <div 
          ref={ref} 
          className={`py-20 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-foreground/80 dark:from-dark-accent dark:to-dark-foreground/80">Recruitment History</h2>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">
                        Tracking our journey of growth and community building through our recruitment cycles.
                    </p>
                </div>

                <div className="relative">
                    {/* Centerline */}
                    <div className="hidden sm:block absolute top-0 bottom-0 left-1/2 w-0.5 bg-border dark:bg-dark-border -translate-x-1/2"></div>

                    <div className="space-y-12 sm:space-y-0">
                         {history.upcoming.map((event, index) => (
                           <div key={event.title} className="relative flex items-center sm:my-6">
                               <div className="hidden sm:block absolute top-1/2 left-1/2 w-5 h-5 bg-accent dark:bg-dark-accent rounded-full -translate-x-1/2 -translate-y-1/2 ring-8 ring-background dark:ring-dark-background"></div>
                               <RecruitmentTimelineItem event={event} align={index % 2 === 0 ? 'left' : 'right'} />
                           </div>
                        ))}
                         {history.past.map((event, index) => (
                           <div key={event.title} className="relative flex items-center sm:my-6">
                               <div className="hidden sm:block absolute top-1/2 left-1/2 w-4 h-4 bg-muted dark:bg-dark-muted rounded-full -translate-x-1/2 -translate-y-1/2 ring-4 ring-background dark:ring-dark-background"></div>
                               <RecruitmentTimelineItem event={event} align={(history.upcoming.length + index) % 2 === 0 ? 'left' : 'right'} />
                           </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecruitmentHistory;
