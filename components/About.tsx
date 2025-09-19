import React from 'react';
import Card from './common/Card';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import Button from './common/Button';

const About: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div 
      ref={ref} 
      className={`py-20 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-foreground/80 dark:from-dark-accent dark:to-dark-foreground/80">About Inferra Labs</h2>
          <p className="mt-4 text-lg max-w-3xl mx-auto text-muted-foreground">
            We are more than just a tech club; we are a thriving community of creators, innovators, and problem-solvers at Dr. D. Y. Patil Institute of Technology, Pune.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-3 space-y-12">
                <div className="flex flex-col sm:flex-row gap-8 items-start">
                    <img src="/images/about-us.jpg" alt="Team collaborating" className="w-full sm:w-1/3 h-auto object-cover rounded-xl shadow-lg"/>
                    <div className="space-y-4">
                        <h3 className="text-2xl font-semibold text-foreground dark:text-dark-foreground">Our Mission</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Our mission is to cultivate a vibrant ecosystem of learning, collaboration, and creation. We bridge the gap between academic theory and real-world application by providing a platform for students to explore diverse tech domains, develop practical, in-demand skills, and build a portfolio of impactful projects.
                        </p>
                    </div>
                </div>
                 <div>
                    <h3 className="text-2xl font-semibold text-foreground dark:text-dark-foreground">Our Vision</h3>
                    <p className="text-muted-foreground leading-relaxed mt-3">
                        To be a nationally recognized hub of student-led technological innovation, where every member is empowered to become a leader and problem-solver, shaping the future of technology and making a tangible impact on society.
                    </p>
                </div>
                <div>
                    <h3 className="text-2xl font-semibold text-foreground dark:text-dark-foreground">What We Do</h3>
                    <p className="text-muted-foreground leading-relaxed mt-3 mb-4">
                       From competitive programming and web development to artificial intelligence and cybersecurity, Inferra Labs covers a wide spectrum of the tech landscape. We achieve this through:
                    </p>
                    <ul className="space-y-3">
                        {[
                            { title: 'Hands-on Workshops', text: 'Practical sessions led by senior members and industry experts on cutting-edge technologies.' },
                            { title: 'Expert Seminars', text: 'Insightful talks from professionals at the forefront of the tech industry.' },
                            { title: 'Competitive Arenas', text: 'Active training and participation in prestigious hackathons and coding competitions.' },
                            { title: 'Open-Source Projects', text: 'Collaborative development of real-world applications and tools that solve tangible problems.' }
                        ].map(item => (
                            <li key={item.title} className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-1 text-accent dark:text-dark-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <div>
                                    <h4 className="font-semibold text-foreground dark:text-dark-foreground">{item.title}</h4>
                                    <p className="text-muted-foreground">{item.text}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            
            <div className="lg:col-span-2 lg:sticky lg:top-24">
                 <Card>
                    <h3 className="text-xl font-semibold text-card-foreground dark:text-dark-card-foreground mb-4 border-b border-border/50 pb-3">Our Home: DIT Pimpri</h3>
                    <img src="/images/institute.jpg" alt="Dr. D. Y. Patil Institute of Technology" className="rounded-lg mb-4 shadow-md" />
                    
                    <div className="space-y-6 text-sm">
                        <div className="flex items-start gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 text-accent dark:text-dark-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                            <p><strong className="block text-card-foreground dark:text-dark-card-foreground">Institute:</strong> <span className="text-muted-foreground">Dr. D. Y. Patil Institute of Technology, Pimpri</span></p>
                        </div>
                        <div className="flex items-start gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 text-accent dark:text-dark-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20" /></svg>
                            <p><strong className="block text-card-foreground dark:text-dark-card-foreground">Affiliation:</strong> <span className="text-muted-foreground">Savitribai Phule Pune University (SPPU)</span></p>
                        </div>

                         <div>
                            <h4 className="font-semibold text-card-foreground dark:text-dark-card-foreground mb-2">Key Highlights</h4>
                            <ul className="space-y-2 text-muted-foreground">
                                <li className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> NAAC A++ Accreditation</li>
                                <li className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> NBA Accredited Programs</li>
                                <li className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> Ranked in Top 200 by NIRF</li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 className="font-semibold text-card-foreground dark:text-dark-card-foreground mb-2">From the Principal's Desk</h4>
                            <blockquote className="border-l-4 border-accent/50 pl-4 italic text-muted-foreground">
                                "We are committed to providing an environment that fosters critical thinking and innovation. Clubs like Inferra Labs are the heartbeat of this institution."
                            </blockquote>
                        </div>
                    </div>
                     <Button onClick={() => window.open('https://www.dypit.ac.in/', '_blank')} className="w-full mt-6">
                        Visit Institute Website
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </Button>
                </Card>
            </div>
        </div>
      </div>
    </div>
  );
};

export default About;