import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useTheme, Theme } from './hooks/useTheme';
import { useToast } from './hooks/useToast';
import * as api from './api';
import type { Page, AdminUser, Notification as NotificationType, Department, Project, TeamMember, Event, Alumnus, GalleryCategory, ResourceCategory, KnowledgeHubPost, RecruitmentEvent, Achievement, Partner, RegisteredUser, RecruitmentDate } from './types';

// Import all page components
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import About from './components/About';
import Departments from './components/Departments';
import Projects from './components/Projects';
import Committee from './components/Team';
import Events from './components/Events';
import Contact from './components/Contact';
import JoinUs from './components/JoinUs';
import AdminLoginPage from './components/AdminLoginPage';
import AdminPanel from './components/AdminPanel';
import Resources from './components/Resources';
import KnowledgeHub from './components/KnowledgeHub';
import Gallery from './components/Gallery';
import RecruitmentHistory from './components/RecruitmentHistory';
import Achievements from './components/Achievements';
import Partnerships from './components/Partnerships';
import Alumni from './components/Alumni';
import SidePanel from './components/SidePanel';
import NotificationPanel, { NotificationPanelRef } from './components/NotificationPanel';
import FloatingControls from './components/FloatingControls';
import FloatingNav from './components/FloatingNav';
import MemberDirectory from './components/MemberDirectory';

// Export types for other components to use
export type { Page, Theme };

const App: React.FC = () => {
  const [theme, toggleTheme] = useTheme();
  const [activePage, setActivePage] = useState<Page>('home');
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [siteData, setSiteData] = useState<any>({});
  
  const { addToast } = useToast();
  const notificationButtonRef = useRef<HTMLButtonElement>(null);
  const notificationPanelRef = useRef<NotificationPanelRef>(null);

  const navigateTo = useCallback((page: Page) => {
    setActivePage(page);
    setIsSidePanelOpen(false);
    window.scrollTo(0, 0);
  }, []);

  const handleAdminLogin = (user: AdminUser) => {
    setAdminUser(user);
    navigateTo('admin-dashboard');
    addToast(`Welcome, ${user.username}!`, 'success');
  };

  const handleAdminLogout = () => {
    api.adminLogout();
    setAdminUser(null);
    navigateTo('home');
    addToast('You have been logged out.', 'info');
  };

  const fetchInitialData = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await api.getInitialData();
      setSiteData(data);
      setNotifications(data.notifications || []);
    } catch (error) {
      addToast(error instanceof Error ? error.message : 'Failed to load site data.', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [addToast]);
  
  useEffect(() => {
    fetchInitialData();
    const storedUser = localStorage.getItem('admin_user');
    if (storedUser) {
      setAdminUser(JSON.parse(storedUser));
    }
  }, [fetchInitialData]);

  useEffect(() => {
    setHasUnreadNotifications(notifications.some(n => !n.isRead));
  }, [notifications]);

  const onMarkAllAsRead = () => {
    setNotifications(currentNotifications => 
      currentNotifications.map(n => ({ ...n, isRead: true }))
    );
    addToast('All notifications marked as read.', 'info');
  };

  const renderPage = () => {
    if (isLoading && activePage !== 'admin-login') {
      return <div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>;
    }

    switch (activePage) {
      case 'home': return <Hero navigateTo={navigateTo} theme={theme} />;
      case 'about': return <About />;
      case 'departments': return <Departments departments={siteData.departments || []} />;
      case 'projects': return <Projects projects={siteData.projects || []} />;
      case 'events': return <Events events={siteData.events || []} />;
      case 'gallery': return <Gallery galleryData={siteData.galleryData || []} />;
      case 'committee': return <Committee facultyCoordinators={siteData.facultyCoordinators || []} coreCommittee={siteData.coreCommittee || []} />;
      case 'member-directory': return <MemberDirectory teamMembers={siteData.teamMembers || []} />;
      case 'achievements': return <Achievements achievements={siteData.achievements || { hackathons: [], cp: [] }} />;
      case 'partnerships': return <Partnerships partners={siteData.partners || { sponsors: [], collaborations: [] }} />;
      case 'alumni': return <Alumni alumni={siteData.alumni || []} />;
      case 'resources': return <Resources resources={siteData.resources || []} />;
      case 'knowledge-hub': return <KnowledgeHub posts={siteData.knowledgeHubPosts || []} />;
      case 'recruitment-history': return <RecruitmentHistory history={siteData.recruitmentHistory || { upcoming: [], past: [] }} />;
      case 'contact': return <Contact />;
      case 'join-us': 
          const recruitmentOpen = (siteData.recruitmentDates || []).some((d: RecruitmentDate) => 
              new Date() >= new Date(d.startDate) && new Date() <= new Date(d.endDate)
          );
          return <JoinUs isRecruitmentOpen={recruitmentOpen} onUserRegistered={fetchInitialData} departments={(siteData.departments || []).map((d: Department) => d.name)} />;
      case 'admin-login': return <AdminLoginPage onLoginSuccess={handleAdminLogin} theme={theme} />;
      case 'admin-dashboard':
        return adminUser ? <AdminPanel adminUser={adminUser} onLogout={handleAdminLogout} /> : <AdminLoginPage onLoginSuccess={handleAdminLogin} theme={theme} />;
      default: return <Hero navigateTo={navigateTo} theme={theme} />;
    }
  };

  return (
    <div className={`bg-background text-foreground dark:bg-dark-background dark:text-dark-foreground transition-colors duration-300 font-sans`}>
      <Header
        activePage={activePage}
        navigateTo={navigateTo}
        toggleSidePanel={() => setIsSidePanelOpen(!isSidePanelOpen)}
        isSidePanelOpen={isSidePanelOpen}
        toggleNotificationPanel={() => setIsNotificationPanelOpen(!isNotificationPanelOpen)}
        notificationButtonRef={notificationButtonRef}
        hasUnreadNotifications={hasUnreadNotifications}
        theme={theme}
      />
      <SidePanel
        activePage={activePage}
        navigateTo={navigateTo}
        isOpen={isSidePanelOpen}
        onClose={() => setIsSidePanelOpen(false)}
        theme={theme}
        adminUser={adminUser}
        onAdminLogout={handleAdminLogout}
      />
      <FloatingNav activePage={activePage} navigateTo={navigateTo} />
       {isNotificationPanelOpen && (
        <NotificationPanel
          ref={notificationPanelRef}
          onClose={() => setIsNotificationPanelOpen(false)}
          notifications={notifications}
          notificationButtonRef={notificationButtonRef}
          onMarkAllAsRead={onMarkAllAsRead}
          isLoading={isLoading}
        />
      )}
      <main className="pt-16">
        {renderPage()}
      </main>
      <FloatingControls navigateTo={navigateTo} toggleTheme={toggleTheme} theme={theme} />
      <Footer navigateTo={navigateTo} theme={theme} />
    </div>
  );
};

export default App;
