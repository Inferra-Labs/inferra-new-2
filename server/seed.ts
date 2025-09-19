// server/seed.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { MOCK_DATA } from '../mockData';
import { 
    User, Department, Project, TeamMember, Event, Alumnus, Notification, 
    Applicant, RecruitmentDate, GalleryCategory, ResourceCategory, 
    KnowledgeHubPost, RecruitmentEvent, Achievement, Partner 
} from './models';
import { AdminRole } from '../types';

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
    console.error("FATAL ERROR: DATABASE_URL is not defined.");
    process.exit(1);
}

const seedUsers = [
    { username: 'admin', password: 'admin123', role: 'FullAccess' as AdminRole },
    { username: 'editor', password: 'editor123', role: 'ContentManager' as AdminRole },
    { username: 'recruiter', password: 'recruiter123', role: 'RecruitmentManager' as AdminRole },
    { username: 'viewer', password: 'viewer123', role: 'ViewOnly' as AdminRole },
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(DATABASE_URL);
        console.log('Database connection successful for seeding!');

        console.log('Deleting existing data...');
        await Promise.all([
            User.deleteMany({}), Department.deleteMany({}), Project.deleteMany({}),
            TeamMember.deleteMany({}), Event.deleteMany({}), Alumnus.deleteMany({}),
            Notification.deleteMany({}), Applicant.deleteMany({}), RecruitmentDate.deleteMany({}),
            GalleryCategory.deleteMany({}), ResourceCategory.deleteMany({}), KnowledgeHubPost.deleteMany({}),
            RecruitmentEvent.deleteMany({}), Achievement.deleteMany({}), Partner.deleteMany({})
        ]);
        console.log('Existing data deleted.');

        console.log('Seeding new data...');
        await Promise.all([
            User.create(seedUsers),
            Department.create(MOCK_DATA.departments),
            Project.create(MOCK_DATA.projects),
            TeamMember.create(MOCK_DATA.teamMembers),
            Event.create(MOCK_DATA.events),
            Alumnus.create(MOCK_DATA.alumni),
            Notification.create(MOCK_DATA.notifications),
            Applicant.create(MOCK_DATA.registeredUsers),
            RecruitmentDate.create(MOCK_DATA.recruitmentDates),
            GalleryCategory.create(MOCK_DATA.galleryData),
            ResourceCategory.create(MOCK_DATA.resources),
            KnowledgeHubPost.create(MOCK_DATA.knowledgeHubPosts),
            RecruitmentEvent.create([...MOCK_DATA.recruitmentHistory.upcoming, ...MOCK_DATA.recruitmentHistory.past]),
            Achievement.create([...MOCK_DATA.achievements.hackathons, ...MOCK_DATA.achievements.cp]),
            Partner.create([...MOCK_DATA.partners.sponsors, ...MOCK_DATA.partners.collaborations])
        ]);
        console.log('✅ Data seeded successfully!');

    } catch (err) {
        console.error('❌ Seeding failed:', err);
    } finally {
        await mongoose.disconnect();
        console.log('Database connection closed.');
    }
};

seedDatabase();
