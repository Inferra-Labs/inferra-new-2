import type { Department, Project, TeamMember, Event, Alumnus, Notification, RegisteredUser, RecruitmentDate, GalleryCategory, ResourceCategory, KnowledgeHubPost, RecruitmentEvent, Achievement, Partner } from './types';
export declare const MOCK_DATA: {
    departments: Department[];
    projects: Project[];
    teamMembers: TeamMember[];
    events: Event[];
    alumni: Alumnus[];
    notifications: Notification[];
    registeredUsers: RegisteredUser[];
    recruitmentDates: RecruitmentDate[];
    galleryData: GalleryCategory[];
    resources: ResourceCategory[];
    knowledgeHubPosts: KnowledgeHubPost[];
    recruitmentHistory: {
        upcoming: RecruitmentEvent[];
        past: RecruitmentEvent[];
    };
    achievements: {
        hackathons: Achievement[];
        cp: Achievement[];
    };
    partners: {
        sponsors: Partner[];
        collaborations: Partner[];
    };
};
//# sourceMappingURL=mockData.d.ts.map