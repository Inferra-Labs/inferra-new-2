import React, { useState } from 'react';
// FIX: Corrected import path.
import { Event } from '../types';
import Card from './common/Card';
import Button from './common/Button';
import { useToast } from '../hooks/useToast';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface EventsProps {
  events: Event[];
}

const Events: React.FC<EventsProps> = ({ events }) => {
  // FIX: Changed Set to hold strings to match the event ID type.
  const [rsvpedEvents, setRsvpedEvents] = useState<Set<string>>(new Set());
  const { addToast } = useToast();
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  const handleRsvp = (event: Event) => {
    setRsvpedEvents(prev => {
        const newSet = new Set(prev);
        if (newSet.has(event.id)) {
            newSet.delete(event.id);
            addToast(`Your RSVP for "${event.name}" has been cancelled.`, 'info');
        } else {
            newSet.add(event.id);
            addToast(`Successfully RSVP'd for "${event.name}"!`, 'success');
        }
        return newSet;
    });
  };

  const upcomingEvents = events.filter(event => event.isUpcoming);
  const pastEvents = events.filter(event => !event.isUpcoming);

  return (
    <div 
      ref={ref} 
      className={`py-20 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-foreground/80 dark:from-dark-accent dark:to-dark-foreground/80">Events & Workshops</h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">
            Join us for insightful talks, hands-on workshops, and exciting competitions.
          </p>
        </div>
        
        {upcomingEvents.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-foreground dark:text-dark-foreground text-center mb-8">Upcoming Events</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {upcomingEvents.map((event) => {
                const isRsvped = rsvpedEvents.has(event.id);
                return (
                    <Card key={event.id} className="overflow-hidden p-0 flex flex-col">
                      <img src={event.imageUrl} alt={event.name} className="w-full h-56 object-cover" />
                      <div className="p-6 flex flex-col flex-grow">
                        <span className="text-sm font-semibold text-accent dark:text-dark-accent mb-1">{event.date}</span>
                        <h4 className="text-xl font-semibold text-card-foreground dark:text-dark-card-foreground">{event.name}</h4>
                        <p className="text-muted-foreground my-3 flex-grow">{event.description}</p>
                        <div className="flex flex-wrap gap-3 mt-auto">
                            <Button variant={isRsvped ? 'secondary' : 'primary'} onClick={() => handleRsvp(event)}>
                                {isRsvped ? 'Cancel RSVP' : 'RSVP Now'}
                            </Button>
                            {event.googleCalendarUrl && (
                                <a href={event.googleCalendarUrl} target="_blank" rel="noopener noreferrer">
                                    <Button variant="secondary" className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        Add to Calendar
                                    </Button>
                                </a>
                            )}
                        </div>
                      </div>
                    </Card>
                )
              })}
            </div>
          </div>
        )}

        {pastEvents.length > 0 && (
           <div>
            <h3 className="text-2xl font-bold text-foreground dark:text-dark-foreground text-center mb-8">Past Events</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden">
                   <img src={event.imageUrl} alt={event.name} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <span className="text-sm font-semibold text-muted-foreground">{event.date}</span>
                    <h4 className="text-lg font-semibold text-card-foreground dark:text-dark-card-foreground mt-1">{event.name}</h4>
                    <p className="text-muted-foreground text-sm mt-2">{event.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
