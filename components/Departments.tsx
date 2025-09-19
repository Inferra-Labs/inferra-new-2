import React, { useState } from 'react';
// FIX: Corrected import path.
import { Department } from '../types';
import Card from './common/Card';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const DepartmentIcon: React.FC<{ iconName: string }> = ({ iconName }) => {
    const iconMap: Record<string, React.ReactNode> = {
        Ai: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-highlight" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
        WebDev: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-highlight" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
        DataScience: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-highlight" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
        CyberSecurity: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-highlight" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
        AppDev: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-highlight" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
        IoT: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-highlight" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6a6 6 0 100 12 6 6 0 000-12z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10a2 2 0 100 4 2 2 0 000-4z" /></svg>,
        CP: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-highlight" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>,
        Research: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-highlight" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.636-6.364l-.707-.707M12 21v-1m0-10a5 5 0 00-5 5h10a5 5 0 00-5-5z" /></svg>,
        EventsMedia: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-highlight" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
        Web3: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-highlight" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5zM15 17a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2z" /></svg>,
        DevOps: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-highlight" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    };
    return iconMap[iconName] || null;
}

interface DepartmentsProps {
  departments: Department[];
}

const Departments: React.FC<DepartmentsProps> = ({ departments }) => {
  const [expandedDeptId, setExpandedDeptId] = useState<string | null>(null);
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  const handleDeptClick = (deptId: string, hasCells: boolean) => {
    if (hasCells) {
      setExpandedDeptId(prevId => (prevId === deptId ? null : deptId));
    }
  };

  return (
    <div 
      ref={ref} 
      className={`py-20 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-foreground/80 dark:from-dark-accent dark:to-dark-foreground/80">Our Departments</h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">
            Inferra Labs is structured into specialized departments, each focusing on a key area of technology and innovation.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((dept) => {
            const isExpanded = expandedDeptId === dept.id;
            return (
              <Card 
                key={dept.id} 
                className={`flex flex-col transition-all duration-300 ${dept.cells ? 'cursor-pointer hover:border-accent/80 dark:hover:border-dark-accent/80' : ''}`}
                onClick={() => handleDeptClick(dept.id, !!dept.cells)}
                aria-expanded={isExpanded}
              >
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <div className="text-accent dark:text-dark-accent"><DepartmentIcon iconName={dept.icon} /></div>
                        <h3 className="ml-4 text-xl font-semibold text-card-foreground dark:text-dark-card-foreground">{dept.name}</h3>
                    </div>
                    {dept.cells && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-5 w-5 text-muted-foreground transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    )}
                </div>

                <p className="flex-grow text-muted-foreground">{dept.description}</p>
                <div className="mt-6 border-t border-border dark:border-dark-border pt-4">
                  <p className="text-sm font-medium text-card-foreground dark:text-dark-card-foreground">Lead: <span className="text-muted-foreground">{dept.lead}</span></p>
                  <p className="text-sm font-medium text-card-foreground dark:text-dark-card-foreground mt-1">Co-Lead: <span className="text-muted-foreground">{dept.coLead}</span></p>
                  <p className="text-sm font-medium text-card-foreground dark:text-dark-card-foreground mt-2">Key Projects:</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mt-1">
                    {dept.projects.map(p => <li key={p}>{p}</li>)}
                  </ul>
                </div>
                
                <div className={`overflow-hidden transition-[max-height,margin-top] duration-500 ease-in-out ${isExpanded ? 'max-h-[500px] mt-6' : 'max-h-0 mt-0'}`}>
                  {isExpanded && dept.cells && (
                      <div className="border-t border-border dark:border-dark-border pt-4 animate-fade-in-up" style={{ animationDelay: '100ms'}}>
                        <h4 className="text-lg font-semibold text-card-foreground dark:text-dark-card-foreground mb-4">Specialized Cells</h4>
                        <div className="space-y-4">
                          {dept.cells.map(cell => (
                            <div key={cell.name} className="p-3 bg-muted/50 dark:bg-dark-muted/50 rounded-lg">
                              <p className="font-semibold text-foreground dark:text-dark-foreground">{cell.name}</p>
                              <p className="text-xs font-medium text-accent dark:text-dark-accent mt-0.5">Lead: {cell.lead}</p>
                              <p className="text-sm text-muted-foreground mt-1">{cell.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                  )}
                </div>

              </Card>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default Departments;
