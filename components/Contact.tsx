import React, { useState } from 'react';
import Card from './common/Card';
import Button from './common/Button';
// FIX: Corrected import path.
import { submitContactForm } from '../api';
import { useToast } from '../hooks/useToast';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const StyledInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
    <input 
        {...props} 
        className="block w-full bg-secondary/50 dark:bg-dark-secondary/50 border-2 border-border/50 dark:border-dark-border/50 rounded-lg shadow-sm text-foreground dark:text-dark-foreground focus:ring-1 focus:ring-ring dark:focus:border-accent p-3 transition-colors duration-300 placeholder:text-muted-foreground" 
    />
);

const StyledTextarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => (
    <textarea 
        {...props} 
        rows={4}
        className="block w-full bg-secondary/50 dark:bg-dark-secondary/50 border-2 border-border/50 dark:border-dark-border/50 rounded-lg shadow-sm text-foreground dark:text-dark-foreground focus:ring-1 focus:ring-ring dark:focus:border-accent p-3 transition-colors duration-300 placeholder:text-muted-foreground"
    />
);

const SocialIcon: React.FC<{ href: string, children: React.ReactNode }> = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent dark:text-dark-muted-foreground dark:hover:text-dark-accent transition-colors duration-300">
    {children}
  </a>
);

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const { addToast } = useToast();
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      addToast('Please fill out all fields.', 'error');
      return;
    }
    
    setStatus('sending');
    
    try {
      await submitContactForm(formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('idle');
      addToast(`Submission failed: ${error instanceof Error ? error.message : 'Please try again.'}`, 'error');
    }
  };

  return (
    <div 
      ref={ref} 
      className={`py-20 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-dark-foreground">Get In Touch</h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">
            Have a question, a proposal, or just want to say hello? We’d love to hear from you.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <Card>
            <h3 className="text-2xl font-semibold text-card-foreground dark:text-dark-card-foreground mb-4">Contact Information</h3>
            <div className="space-y-4 text-muted-foreground">
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent dark:text-dark-accent mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <div className="ml-4">
                  <h4 className="font-semibold text-card-foreground dark:text-dark-card-foreground">Email</h4>
                  <a href="mailto:theinferralabs@gmail.com" className="hover:text-accent dark:hover:text-dark-accent">theinferralabs@gmail.com</a>
                </div>
              </div>
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent dark:text-dark-accent mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <div className="ml-4">
                  <h4 className="font-semibold text-card-foreground dark:text-dark-card-foreground">Phone</h4>
                  <p>+91 7276565878</p>
                </div>
              </div>
              <div className="flex items-start">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent dark:text-dark-accent mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <div className="ml-4">
                  <h4 className="font-semibold text-card-foreground dark:text-dark-card-foreground">Address</h4>
                  <p>Dr. D. Y. Patil Institute of Technology, Pimpri, Pune - 411018</p>
                </div>
              </div>
            </div>
            <div className="border-t border-border dark:border-dark-border mt-6 pt-4">
                <h4 className="font-semibold text-card-foreground dark:text-dark-card-foreground">Follow Us</h4>
                <div className="flex space-x-5 mt-3">
                    <SocialIcon href="https://www.instagram.com/theinferralabs">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    </SocialIcon>
                    <SocialIcon href="https://www.linkedin.com/company/theinferralabs">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    </SocialIcon>
                    <SocialIcon href="https://github.com/Inferra-labs">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                    </SocialIcon>
                </div>
            </div>
          </Card>
          <Card>
            {status === 'success' ? (
              <div className="text-center flex flex-col items-center justify-center h-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-2xl font-semibold mt-4 text-card-foreground dark:text-dark-card-foreground">Message Sent!</h3>
                <p className="text-muted-foreground mt-2">Thank you for reaching out! We'll get back to you soon.</p>
                 <Button onClick={() => setStatus('idle')} className="mt-4">Send Another</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="text-2xl font-semibold text-card-foreground dark:text-dark-card-foreground mb-4">Send us a Message</h3>
                <div className="space-y-4">
                   <div>
                    <label htmlFor="name" className="sr-only">Name</label>
                    <StyledInput type="text" name="name" id="name" placeholder="Your Name" required value={formData.name} onChange={handleChange} disabled={status === 'sending'} />
                  </div>
                  <div>
                    <label htmlFor="email_contact" className="sr-only">Email</label>
                    <StyledInput type="email" name="email" id="email_contact" placeholder="Your Email" required value={formData.email} onChange={handleChange} disabled={status === 'sending'} />
                  </div>
                  <div>
                    <label htmlFor="message" className="sr-only">Message</label>
                    <StyledTextarea name="message" id="message" placeholder="Your Message" required value={formData.message} onChange={handleChange} disabled={status === 'sending'} />
                  </div>
                  <Button type="submit" className="w-full" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
