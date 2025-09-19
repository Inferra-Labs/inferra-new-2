import React, { useState } from 'react';
import Card from './common/Card';
import Button from './common/Button';
// FIX: Corrected import path.
import { adminLogin } from '../api';
import { useToast } from '../hooks/useToast';
import AnimatedLogo from './common/AnimatedLogo';
// FIX: Corrected import path.
import type { Theme } from '../App';
// FIX: Corrected import path.
import type { AdminUser } from '../types';
import Tooltip from './common/Tooltip';
import ParticleBackground from './ParticleBackground';

const INPUT_CLASSES = "block w-full bg-input/50 dark:bg-dark-input/50 border-2 border-border/50 dark:border-dark-border/50 rounded-lg shadow-sm text-foreground dark:text-dark-foreground focus:ring-1 focus:ring-ring dark:focus:border-accent p-3 transition-colors duration-300 placeholder:text-muted-foreground disabled:opacity-50";

interface AdminLoginPageProps {
  onLoginSuccess: (user: AdminUser) => void;
  theme: Theme;
}

const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onLoginSuccess, theme }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      addToast('Username and password are required.', 'error');
      return;
    }
    setIsLoading(true);
    try {
      const user = await adminLogin(username, password);
      onLoginSuccess(user);
    } catch (err) {
      addToast(err instanceof Error ? err.message : 'An unknown error occurred.', 'error');
      setUsername('');
      setPassword('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] w-full flex items-center justify-center p-4 overflow-hidden">
        <ParticleBackground theme={theme} />
        <div className="relative z-10 w-full max-w-sm">
          <Card className="bg-card/60 dark:bg-dark-card/50 backdrop-blur-md">
            <div className="flex flex-col items-center mb-6">
              <AnimatedLogo theme={theme} />
              <h2 className="text-2xl font-bold text-card-foreground dark:text-dark-card-foreground mt-4 font-exo">Admin Portal</h2>
              <p className="text-muted-foreground text-sm mt-1">Secure access for club management.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="admin-username" className="block text-sm font-medium text-muted-foreground mb-1">Username</label>
                <input
                  id="admin-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={INPUT_CLASSES}
                  autoFocus
                  disabled={isLoading}
                  placeholder="Enter username"
                />
              </div>
              <div>
                <label htmlFor="admin-password" className="block text-sm font-medium text-muted-foreground mb-1">Password</label>
                <div className="relative">
                  <input
                    id="admin-password"
                    type={isPasswordVisible ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`${INPUT_CLASSES} pr-10`}
                    disabled={isLoading}
                    placeholder="Enter password"
                  />
                  <Tooltip text={isPasswordVisible ? 'Hide password' : 'Show password'} position="left">
                    <button
                      type="button"
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      className="absolute inset-y-0 right-0 flex items-center justify-center w-10 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
                    >
                      <div className="relative h-5 w-5">
                          {/* Eye Icon (Show) */}
                          <svg xmlns="http://www.w3.org/2000/svg" className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${isPasswordVisible ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                              <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                          </svg>
                          {/* Eye Off Icon (Hide) */}
                          <svg xmlns="http://www.w3.org/2000/svg" className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${isPasswordVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                              <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674" />
                              <path d="M12 18c.995 0 1.95 -.136 2.864 -.39" />
                              <path d="M21 12c-.749 -1.46 -1.898 -2.805 -3.344 -3.897" />
                              <path d="M12 5c.254 0 .503 .014 .748 .04" />
                              <path d="M3 3l18 18" />
                          </svg>
                      </div>
                    </button>
                  </Tooltip>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Logging In...' : 'Login'}
              </Button>
            </form>
          </Card>
        </div>
    </div>
  );
};

export default AdminLoginPage;
