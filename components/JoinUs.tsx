import React, { useState, useRef, useEffect } from 'react';
// FIX: Corrected import path.
import { RegisteredUser } from '../types';
import Card from './common/Card';
import Button from './common/Button';
// FIX: Corrected import path.
import { submitRecruitmentForm } from '../api';
import { useToast } from '../hooks/useToast';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

// Custom Select Component
interface CustomSelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  id: string;
  disabled?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, value, onChange, placeholder, id, disabled }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const selectRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const optionsRef = useRef<(HTMLLIElement | null)[]>([]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (!isOpen) setActiveIndex(-1);
    }, [isOpen]);
    
    useEffect(() => {
        if (activeIndex > -1 && optionsRef.current[activeIndex]) {
            optionsRef.current[activeIndex]?.scrollIntoView({ block: 'nearest' });
        }
    }, [activeIndex]);

    const handleOptionClick = (option: string) => {
        onChange(option);
        setIsOpen(false);
        buttonRef.current?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (disabled) return;
        if (['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(e.key)) {
            e.preventDefault();
            if (!isOpen) {
                setIsOpen(true);
                return;
            }
        }

        switch (e.key) {
            case 'ArrowDown':
                setActiveIndex(prev => (prev < options.length - 1 ? prev + 1 : 0));
                break;
            case 'ArrowUp':
                setActiveIndex(prev => (prev > 0 ? prev - 1 : options.length - 1));
                break;
            case 'Enter':
            case ' ':
                if (activeIndex > -1) {
                    handleOptionClick(options[activeIndex]);
                } else {
                    setIsOpen(false);
                }
                break;
            case 'Escape':
                setIsOpen(false);
                buttonRef.current?.focus();
                break;
        }
    };

    return (
        <div className="relative" ref={selectRef}>
            <button
                id={id}
                ref={buttonRef}
                type="button"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                onKeyDown={handleKeyDown}
                role="combobox"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-controls={`${id}-listbox`}
                aria-activedescendant={activeIndex > -1 ? `${id}-option-${activeIndex}` : undefined}
                className="relative w-full text-left bg-input/50 dark:bg-dark-input/50 border-2 border-border/50 dark:border-dark-border/50 rounded-lg shadow-sm p-3 text-foreground dark:text-dark-foreground focus:ring-1 focus:ring-ring dark:focus:border-accent transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={disabled}
            >
                <span className={`block truncate ${value ? 'text-foreground dark:text-dark-foreground' : 'text-muted-foreground'}`}>
                    {value || placeholder}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                        className={`h-5 w-5 text-muted-foreground transform transition-transform duration-300 ${isOpen ? '-rotate-180' : 'rotate-0'}`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </span>
            </button>
            <div className={`absolute z-10 w-full mt-1 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                <ul
                    id={`${id}-listbox`}
                    role="listbox"
                    aria-labelledby={id}
                    className="w-full bg-popover/95 dark:bg-dark-popover/95 backdrop-blur-md shadow-lg max-h-60 rounded-lg py-1 text-base ring-1 ring-border dark:ring-dark-border overflow-auto focus:outline-none sm:text-sm"
                >
                    {options.map((option, index) => (
                        <li
                            key={option}
                            id={`${id}-option-${index}`}
                            ref={el => { optionsRef.current[index] = el; }}
                            onClick={() => handleOptionClick(option)}
                            onMouseOver={() => setActiveIndex(index)}
                            role="option"
                            aria-selected={activeIndex === index || value === option}
                            className={`cursor-pointer select-none relative py-2 pl-4 pr-9 text-popover-foreground dark:text-dark-popover-foreground ${activeIndex === index ? 'bg-accent/20 dark:bg-dark-accent/20' : ''}`}
                        >
                            <span className="font-normal block truncate">{option}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

interface JoinUsProps {
  isRecruitmentOpen: boolean;
  onUserRegistered: () => Promise<void>;
  departments: string[];
}

const StyledInput = ({ ...props }) => (
    <input 
        {...props} 
        className="block w-full bg-input/50 dark:bg-dark-input/50 border-2 border-border/50 dark:border-dark-border/50 rounded-lg shadow-sm text-foreground dark:text-dark-foreground focus:ring-1 focus:ring-ring dark:focus:border-accent p-3 transition-colors duration-300 placeholder:text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed" 
    />
);

const JoinUs: React.FC<JoinUsProps> = ({ isRecruitmentOpen, onUserRegistered, departments }) => {
  const [formData, setFormData] = useState<Omit<RegisteredUser, 'id' | 'status' | 'notes'>>({
    fullName: '',
    email: '',
    phone: '',
    department: '',
    collegeId: '',
    resume: null,
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const { addToast } = useToast();
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  const validate = (): boolean => {
    const errors: Partial<Record<keyof typeof formData, string>> = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full Name is required';
    if (!formData.email.trim()) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Email address is invalid';
    }
    if (!formData.phone.trim()) {
        errors.phone = 'Phone number is required';
    } else if (!/^\+?(\d[\d-. ]+)?(\([\d-. ]+\))?[\d-. ]+\d$/.test(formData.phone)) {
        errors.phone = 'Phone number is invalid';
    }
    if (!formData.department) errors.department = 'Please select a department';
    if (!formData.collegeId?.trim()) errors.collegeId = 'College ID is required';
    if (!formData.resume) {
        errors.resume = 'Resume is required (PDF, JPG, PNG).';
    } else if (formData.resume.size > 5 * 1024 * 1024) { // 5MB limit
        errors.resume = 'File size must be less than 5MB.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
        setFormData(prev => ({...prev, resume: e.target.files![0]}));
    }
  }

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, department: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setStatus('submitting');
      setFormErrors({});
      try {
        await submitRecruitmentForm(formData);
        setStatus('success');
        await onUserRegistered();
      } catch (error) {
        setStatus('idle');
        addToast(`Submission failed: ${error instanceof Error ? error.message : 'Please try again.'}`, 'error');
        console.error("Submission failed:", error);
      }
    }
  };
  
  const isLoading = status === 'submitting';

  return (
    <div 
      ref={ref} 
      className={`py-20 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground dark:text-dark-foreground">Join Our Community</h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">
            Become a part of Inferra Labs and start your journey of innovation and collaboration.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <Card>
            {isRecruitmentOpen ? (
              status === 'success' ? (
                 <div className="text-center p-8">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-2xl font-semibold mt-4 text-card-foreground dark:text-dark-card-foreground">Registration Successful!</h3>
                    <p className="text-muted-foreground mt-2">Thank you for your interest. We have received your application and will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-muted-foreground mb-1">Full Name</label>
                    <StyledInput type="text" name="fullName" id="fullName" value={formData.fullName} onChange={handleChange} required placeholder="e.g. John Doe" disabled={isLoading} />
                    {formErrors.fullName && <p className="text-red-500 text-sm mt-1">{formErrors.fullName}</p>}
                  </div>
                   <div>
                    <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">Email</label>
                    <StyledInput type="email" name="email" id="email" value={formData.email} onChange={handleChange} required placeholder="e.g. john.doe@example.com" disabled={isLoading} />
                     {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                  </div>
                   <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-muted-foreground mb-1">Phone Number</label>
                    <StyledInput type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} required placeholder="e.g. +91 98765 43210" disabled={isLoading} />
                     {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
                  </div>
                  <div>
                    <label htmlFor="collegeId" className="block text-sm font-medium text-muted-foreground mb-1">College ID</label>
                    <StyledInput type="text" name="collegeId" id="collegeId" value={formData.collegeId ?? ''} onChange={handleChange} required placeholder="e.g. C1234567" disabled={isLoading} />
                    {formErrors.collegeId && <p className="text-red-500 text-sm mt-1">{formErrors.collegeId}</p>}
                  </div>
                  <div>
                    <label htmlFor="department" className="block text-sm font-medium text-muted-foreground mb-1">Preferred Department</label>
                    <CustomSelect
                        id="department"
                        options={departments}
                        value={formData.department}
                        onChange={handleSelectChange}
                        placeholder="Select a department"
                        disabled={isLoading}
                    />
                    {formErrors.department && <p className="text-red-500 text-sm mt-1">{formErrors.department}</p>}
                  </div>
                  <div>
                     <label htmlFor="resume" className="block text-sm font-medium text-muted-foreground mb-1">Upload Resume</label>
                     <label htmlFor="resume" className="relative cursor-pointer bg-input/50 dark:bg-dark-input/50 border-2 border-dashed border-border/50 dark:border-dark-border/50 rounded-lg text-foreground dark:text-dark-foreground p-3 transition-colors duration-300 flex items-center justify-center hover:border-accent dark:hover:border-dark-accent">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                        <span className="text-muted-foreground text-sm">{formData.resume ? formData.resume.name : "Choose a file (PDF, JPG, PNG)"}</span>
                     </label>
                     <input type="file" name="resume" id="resume" onChange={handleFileChange} required className="sr-only" accept=".pdf,.jpg,.jpeg,.png" disabled={isLoading} />
                     {formErrors.resume && <p className="text-red-500 text-sm mt-1">{formErrors.resume}</p>}
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Submitting...' : 'Register'}
                  </Button>
                </form>
              )
            ) : (
              <div className="text-center p-8">
                <h3 className="text-2xl font-semibold text-card-foreground dark:text-dark-card-foreground">Recruitment is Currently Closed</h3>
                <p className="text-muted-foreground mt-2">Please check back later for updates on our next recruitment cycle. Stay connected with us on social media!</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
