// types.ts

// Theming
export type Theme = 'light' | 'dark';

// Navigation
export type Page = 
  'home' | 'about' | 'contact' | 'join-us' | 'admin-login' | 'admin-dashboard' |
  'departments' | 'projects' | 'events' | 'gallery' | 'committee' |
  'member-directory' | 'achievements' | 'partnerships' | 'alumni' |
  'resources' | 'knowledge-hub' | 'recruitment-history';

// Data Models
export interface DepartmentCell {
    name: string;
    description: string;
    lead: string;
}

export interface Department {
    id: string;
    name: string;
    description: string;
    lead: string;
    coLead: string;
    icon: string;
    projects: string[];
    cells?: DepartmentCell[];
}

export interface Project {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    tags: string[];
    githubUrl?: string;
    videoUrl?: string;
}

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    imageUrl: string;
    description: string;
    isFaculty?: boolean;
    isCoreCommittee?: boolean;
    linkedinUrl?: string;
    githubUrl?: string;
    email?: string;
    phone?: string;
    skills?: string[];
}

export interface Event {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    date: string;
    isUpcoming: boolean;
    googleCalendarUrl?: string;
}

export interface Alumnus {
    id: string;
    name: string;
    imageUrl: string;
    currentRole: string;
    company: string;
    testimonial: string;
    linkedinUrl: string;
}

export interface Notification {
    id: string;
    title: string;
    description: string;
    type: 'recruitment' | 'event' | 'announcement' | 'general';
    timestamp: string;
    isRead: boolean;
    pinned?: boolean;
    fileLink?: string;
}

export interface Note {
    id: string;
    text: string;
    timestamp: string;
}

export type UserStatus = 'Applied' | 'Reviewed' | 'Shortlisted' | 'Interviewed' | 'Hired' | 'Rejected';

export interface RegisteredUser {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    department: string;
    collegeId?: string;
    resume?: File | null;
    resumeUrl?: string;
    status: UserStatus;
    notes?: Note[];
}

export interface RecruitmentDate {
    id: string;
    startDate: string;
    endDate: string;
}

export interface GalleryImage {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
}

export interface GalleryCategory {
    id: string;
    name: string;
    images: GalleryImage[];
}

export interface Resource {
    name: string;
    description: string;
    type: 'Roadmap' | 'Article' | 'GitHub' | 'Notes';
    url: string;
}

export interface ResourceCategory {
    category: string;
    resources: Resource[];
}

export interface KnowledgeHubPost {
    title: string;
    imageUrl: string;
    date: string;
    author: string;
    tags: string[];
    excerpt: string;
    url: string;
}

export interface RecruitmentEvent {
    title: string;
    period: string;
    description: string;
    status: 'Upcoming' | 'Open' | 'Closed';
}

export interface Achievement {
    id: string;
    event: string;
    title: string;
    placing: string;
    date: string;
    members: string[];
}

export interface Partner {
    id: string;
    name: string;
    logoUrl: string;
    description: string;
}

// Admin & Auth
export type AdminRole = 'FullAccess' | 'ViewOnly' | 'ContentManager' | 'RecruitmentManager';

export interface AdminUser {
    id: string;
    username: string;
    role: AdminRole;
}
