// server/controllers/publicController.ts
import express from 'express';
const { Request, Response } = express;
import catchAsync from '../utils/catchAsync.ts';
import { 
    Department, Project, TeamMember, Event, Alumnus, Notification, 
    GalleryCategory, ResourceCategory, KnowledgeHubPost, RecruitmentEvent, 
    Achievement, Partner, RecruitmentDate
} from '../models.ts';

const getInitialDataHandler = async (req: Request, res: Response) => {
    const [
        departments, projects, teamMembers, events, alumni, notifications,
        galleryData, resources, knowledgeHubPosts, recruitmentHistoryEvents,
        achievements, partners, recruitmentDates
    ] = await Promise.all([
        Department.find(),
        Project.find(),
        TeamMember.find(),
        Event.find().sort({ date: -1 }),
        Alumnus.find(),
        Notification.find().sort({ timestamp: -1 }),
        GalleryCategory.find(),
        ResourceCategory.find(),
        KnowledgeHubPost.find(),
        RecruitmentEvent.find(),
        Achievement.find(),
        Partner.find(),
        RecruitmentDate.find()
    ]);

    // Process data as expected by the frontend
    const facultyCoordinators = teamMembers.filter(m => m.isFaculty);
    const coreCommittee = teamMembers.filter(m => m.isCoreCommittee);
    const regularMembers = teamMembers.filter(m => !m.isFaculty && !m.isCoreCommittee);
    
    const upcomingRecruitment = recruitmentHistoryEvents.filter(e => e.status === 'Upcoming' || e.status === 'Open');
    const pastRecruitment = recruitmentHistoryEvents.filter(e => e.status === 'Closed');

    res.status(200).json({
        departments,
        projects,
        teamMembers: regularMembers,
        facultyCoordinators,
        coreCommittee,
        events,
        alumni,
        notifications,
        galleryData,
        resources,
        knowledgeHubPosts,
        recruitmentHistory: { upcoming: upcomingRecruitment, past: pastRecruitment },
        achievements: { hackathons: achievements, cp: [] }, // Assuming all are hackathons for now
        partners: { sponsors: partners, collaborations: [] }, // Assuming all are sponsors for now
        recruitmentDates,
        // registeredUsers is admin-only data, not sent here
    });
};

export const getInitialData = catchAsync(getInitialDataHandler);
