// FIX: Corrected import path.
import type { Department, Project, TeamMember, Event, Alumnus, Notification, RegisteredUser, RecruitmentDate, GalleryCategory, ResourceCategory, KnowledgeHubPost, RecruitmentEvent, Achievement, Partner } from './types';

const DEPARTMENTS_DATA: Department[] = [
    {
      id: 'ai',
      name: 'Artificial Intelligence',
      description: 'Exploring the frontiers of machine learning, deep learning, and neural networks to create intelligent systems.',
      lead: 'Dr. Priya Sharma',
      coLead: 'Rohan Verma',
      icon: 'Ai',
      projects: ['Sentiment Analysis Bot', 'Image Recognition Model'],
    },
    {
      id: 'ds',
      name: 'Data Science',
      description: 'Leveraging data to extract insights and drive decisions through statistical analysis, visualization, and predictive modeling.',
      lead: 'Dr. Anil Kumar',
      coLead: 'Anjali Singh',
      icon: 'DataScience',
      projects: ['Market Basket Analysis', 'COVID-19 Data Visualization'],
    },
    {
      id: 'webdev',
      name: 'Website Development',
      description: 'Building modern, responsive, and high-performance websites and web applications using the latest technologies.',
      lead: 'Prof. Sameer Khan',
      coLead: 'Vikram Mehta',
      icon: 'WebDev',
      projects: ['Inferra Labs Official Site', 'E-commerce Platform'],
    },
    {
      id: 'appdev',
      name: 'Application Development',
      description: 'Crafting intuitive and powerful mobile applications for both Android and iOS platforms.',
      lead: 'Prof. Nisha Desai',
      coLead: 'Pooja Reddy',
      icon: 'AppDev',
      projects: ['Campus Navigation App', 'Event Management App'],
    },
    {
      id: 'cyber',
      name: 'Cyber Security',
      description: 'Focusing on ethical hacking, network security, and cryptography to protect digital assets from threats.',
      lead: 'Dr. Rajendra Patil',
      coLead: 'Amit Joshi',
      icon: 'CyberSecurity',
      projects: ['Vulnerability Scanner', 'Secure Chat Application'],
    },
    {
      id: 'iot',
      name: 'Embedded Systems & IoT',
      description: 'Connecting the physical and digital worlds by designing smart devices and IoT solutions.',
      lead: 'Dr. Suresh Iyer',
      coLead: 'Fatima Ali',
      icon: 'IoT',
      projects: ['Smart Home Automation', 'Weather Monitoring System'],
    },
    {
        id: 'cp',
        name: 'Competitive Programming',
        description: 'Sharpening problem-solving and algorithmic skills through rigorous training and participation in coding competitions.',
        lead: 'Prof. Aditi Rao',
        coLead: 'Karthik Nair',
        icon: 'CP',
        projects: ['ICPC Training Portal', 'Algorithm Visualizer'],
    },
    {
        id: 'research',
        name: 'Research & Innovation',
        description: 'Conducting cutting-edge research, publishing papers, and developing innovative solutions to complex problems.',
        lead: 'Dr. Meenakshi Sundaram',
        coLead: 'Ishaan Gupta',
        icon: 'Research',
        projects: ['Quantum Computing Simulation', 'NLP for Indian Languages'],
    },
    {
      id: 'devops',
      name: 'DevOps & Cloud Computing',
      description: 'Streamlining development and operations with CI/CD pipelines, containerization, and cloud infrastructure management.',
      lead: 'Mr. Anand Raj',
      coLead: 'Divya Sharma',
      icon: 'DevOps',
      projects: ['Automated Deployment Pipeline', 'Serverless API Architecture'],
    },
    {
      id: 'web3',
      name: 'Web3 & Decentralized Systems',
      description: 'Exploring blockchain technology, smart contracts, and decentralized applications (dApps) for the next generation of the internet.',
      lead: 'Mr. Arjun Bala',
      coLead: 'Meera Krishnan',
      icon: 'Web3',
      projects: ['Decentralized Voting System', 'NFT Marketplace'],
    },
    {
      id: 'events_media',
      name: 'Events & Media',
      description: 'The creative and organizational powerhouse of the club, responsible for managing events, communications, and outreach.',
      lead: 'Prof. Geeta Menon',
      coLead: 'Siddharth Roy',
      icon: 'EventsMedia',
      projects: ['Annual Tech Fest', 'Workshop Series Promotion'],
      cells: [
          { name: 'Events Management Cell', description: 'Planning and executing all club events, from workshops to hackathons.', lead: 'Riya Chavan' },
          { name: 'Media & Communication Cell', description: 'Managing social media, creating content, and ensuring clear communication.', lead: 'Leo Das' },
          { name: 'Outreach Cell', description: 'Building partnerships with other clubs, colleges, and industry sponsors.', lead: 'Zara Khan' },
      ]
    }
];

const PROJECTS_DATA: Project[] = [
    {
      id: 'proj1',
      name: 'Project Pathfinder',
      description: 'An AI-powered recommendation engine that suggests projects to students based on their skills and interests, helping them find meaningful work within the club.',
      imageUrl: '/images/projects/project-1.jpg',
      tags: ['AI', 'React', 'Node.js', 'Recommendation Systems'],
      githubUrl: 'https://github.com/Inferra-labs',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    },
    {
      id: 'proj2',
      name: 'InferraBot',
      description: 'A multi-functional Discord bot for the club server, featuring event reminders, resource sharing, automated role assignments, and fun community commands.',
      imageUrl: '/images/projects/project-2.jpg',
      tags: ['Discord.js', 'TypeScript', 'Community Tool'],
      githubUrl: 'https://github.com/Inferra-labs',
    },
    {
      id: 'proj3',
      name: 'SecureVote',
      description: 'A blockchain-based e-voting system designed to ensure transparent and tamper-proof elections for student bodies and internal club polls.',
      imageUrl: '/images/projects/project-3.jpg',
      tags: ['Web3', 'Solidity', 'Blockchain', 'Next.js'],
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    },
    {
      id: 'proj4',
      name: 'CampusConnect IoT',
      description: 'An IoT network of smart sensors deployed across campus to monitor air quality, noise levels, and room occupancy, providing real-time data on a public dashboard.',
      imageUrl: '/images/projects/project-4.jpg',
      tags: ['IoT', 'Raspberry Pi', 'Python', 'Data Visualization'],
      githubUrl: 'https://github.com/Inferra-labs',
    }
];

// FIX: Changed all numeric IDs to strings to match the 'TeamMember' type.
const TEAM_MEMBERS_DATA: TeamMember[] = [
    // Faculty
    { id: '1', name: 'Dr. Evelyn Reed', role: 'Faculty Coordinator', imageUrl: '/images/team/faculty-1.jpg', description: 'Guiding the club with her extensive experience in AI and academic research.', isFaculty: true, linkedinUrl: 'https://linkedin.com' },
    { id: '2', name: 'Prof. Marcus Chen', role: 'Faculty Coordinator', imageUrl: '/images/team/faculty-2.jpg', description: 'A veteran software architect providing invaluable industry insights and mentorship.', isFaculty: true, linkedinUrl: 'https://linkedin.com' },
    // Core Committee
    { id: '3', name: 'Aarav Sharma', role: 'President', imageUrl: '/images/team/member-1.jpg', description: 'Visionary leader driving the club\'s mission and strategic direction.', isCoreCommittee: true, linkedinUrl: 'https://linkedin.com' },
    { id: '4', name: 'Diya Patel', role: 'Vice President', imageUrl: '/images/team/member-2.jpg', description: 'Manages internal operations and ensures seamless collaboration between departments.', isCoreCommittee: true, linkedinUrl: 'https://linkedin.com' },
    { id: '5', name: 'Rohan Gupta', role: 'Technical Head', imageUrl: '/images/team/member-3.jpg', description: 'Oversees all technical projects, ensuring high standards and fostering innovation.', isCoreCommittee: true, linkedinUrl: 'https://linkedin.com' },
    { id: '6', name: 'Aditi Singh', role: 'Concept & Project Manager', imageUrl: '/images/team/member-4.jpg', description: 'Bridges the gap between ideas and execution, managing project lifecycles and timelines.', isCoreCommittee: true, linkedinUrl: 'https://linkedin.com' },
    { id: '7', name: 'Sneha Reddy', role: 'Treasurer', imageUrl: '/images/team/member-5.jpg', description: 'Manages the club\'s finances, budgeting, and sponsorship acquisitions.', isCoreCommittee: true, linkedinUrl: 'https://linkedin.com' },
    { id: '8', name: 'Nikhil Rao', role: 'Documentation Manager', imageUrl: '/images/team/member-6.jpg', description: 'Maintains records, documents projects, and ensures knowledge is preserved and shared.', isCoreCommittee: true, linkedinUrl: 'https://linkedin.com' },
    // Other Members for Directory
    { id: '9', name: 'Rohan Verma', role: 'AI Co-Lead', imageUrl: '/images/team/member-7.jpg', description: 'Passionate about deep learning and computer vision.', skills: ['Python', 'TensorFlow', 'PyTorch'], githubUrl: 'https://github.com' },
    { id: '10', name: 'Anjali Singh', role: 'Data Science Co-Lead', imageUrl: '/images/team/member-8.jpg', description: 'Expert in statistical modeling and data visualization.', skills: ['R', 'Pandas', 'Tableau'], linkedinUrl: 'https://linkedin.com' },
    { id: '11', name: 'Vikram Mehta', role: 'Web Dev Co-Lead', imageUrl: '/images/team/member-9.jpg', description: 'Full-stack developer with a love for clean code and UX.', skills: ['React', 'Node.js', 'GraphQL'], githubUrl: 'https://github.com' },
];

// FIX: Changed all numeric IDs to strings to match the 'Event' type.
const EVENTS_DATA: Event[] = [
    { id: '1', name: 'Web3 & Blockchain Workshop', description: 'A hands-on session on building your first smart contract.', imageUrl: '/images/events/event-1.jpg', date: 'Dec 15, 2024', isUpcoming: true, googleCalendarUrl: 'https://calendar.google.com/calendar/r' },
    { id: '2', name: 'HackInferra 2024', description: 'Our flagship 24-hour hackathon with exciting prizes.', imageUrl: '/images/events/event-2.jpg', date: 'Nov 20, 2024', isUpcoming: true, googleCalendarUrl: 'https://calendar.google.com/calendar/r' },
    { id: '3', name: 'Intro to AI/ML', description: 'A beginner-friendly talk on the fundamentals of Artificial Intelligence.', imageUrl: '/images/events/event-3.jpg', date: 'Oct 05, 2024', isUpcoming: false },
    { id: '4', name: 'UI/UX Design Sprint', description: 'A week-long design challenge for aspiring product designers.', imageUrl: '/images/events/event-4.jpg', date: 'Sep 18, 2024', isUpcoming: false },
];

// FIX: Changed all numeric IDs to strings to match the 'Alumnus' type.
const ALUMNI_DATA: Alumnus[] = [
    { id: '1', name: 'Priya Mehta', imageUrl: '/images/alumni/alumni-1.jpg', currentRole: 'Software Engineer', company: 'Google', testimonial: 'Inferra Labs was the launchpad for my career. The hands-on projects were invaluable.', linkedinUrl: 'https://linkedin.com' },
    { id: '2', name: 'Rajesh Kumar', imageUrl: '/images/alumni/alumni-2.jpg', currentRole: 'Data Scientist', company: 'Microsoft', testimonial: 'The collaborative environment and mentorship I received were second to none.', linkedinUrl: 'https://linkedin.com' },
    { id: '3', name: 'Aisha Khan', imageUrl: '/images/alumni/alumni-3.jpg', currentRole: 'Cyber Security Analyst', company: 'Amazon', testimonial: 'I learned more about practical security here than in any of my classes. It was transformative.', linkedinUrl: 'https://linkedin.com' },
];

// FIX: Changed all numeric IDs to strings to match the 'Notification' type.
const NOTIFICATIONS_DATA: Notification[] = [
    { id: '1', title: 'Recruitment Drive Fall 2024 is Now Open!', description: 'Ready to join us? Applications are open until Oct 30. Apply now through the Join Us page.', type: 'recruitment', timestamp: '2 hours ago', isRead: false, pinned: true },
    { id: '2', title: 'Workshop: Intro to Smart Contracts', description: 'Join our Web3 department for a hands-on workshop this Saturday. RSVP on the events page.', type: 'event', timestamp: '1 day ago', isRead: false },
    { id: '3', title: 'New Project Showcase: SecureVote', description: 'Check out the new blockchain voting system project by our Web3 team on the projects page.', type: 'general', timestamp: '3 days ago', isRead: true, fileLink: '#' },
    { id: '4', title: 'General Body Meeting Announcement', description: 'The monthly general body meeting will be held this Friday at 5 PM in the main auditorium.', type: 'announcement', timestamp: '5 days ago', isRead: true },
];

// FIX: Changed all numeric IDs to strings to match the 'RegisteredUser' and 'Note' types.
const REGISTERED_USERS_DATA: RegisteredUser[] = [
    { id: '1', fullName: 'Sanjay Kumar', email: 'sanjay@test.com', phone: '9876543210', department: 'Artificial Intelligence', collegeId: 'C12345', status: 'Shortlisted', notes: [{id: '1', text: 'Strong resume, good project experience.', timestamp: '2 days ago'}] },
    { id: '2', fullName: 'Meera Desai', email: 'meera@test.com', phone: '9876543211', department: 'Website Development', collegeId: 'C12346', status: 'Applied', notes: [] },
    { id: '3', fullName: 'Vijay Singh', email: 'vijay@test.com', phone: '9876543212', department: 'Data Science', collegeId: 'C12347', status: 'Hired', notes: [{id: '2', text: 'Excellent interview. A great fit for the team.', timestamp: '1 week ago'}] },
];

// FIX: Changed all numeric IDs to strings to match the 'RecruitmentDate' type.
const RECRUITMENT_DATES_DATA: RecruitmentDate[] = [
    { id: '1', startDate: '2024-10-01', endDate: '2024-10-30' },
];

// FIX: Changed all numeric IDs to strings to match the 'GalleryCategory' and 'GalleryImage' types.
const GALLERY_DATA: GalleryCategory[] = [
    { id: '1', name: 'HackInferra 2023', images: [
        { id: '1', title: 'Opening Ceremony', description: 'Kickstarting the hackathon', imageUrl: '/images/gallery/hackathon-1.jpg'},
        { id: '2', title: 'Late Night Coding', description: 'Teams working through the night', imageUrl: '/images/gallery/hackathon-2.jpg'},
        { id: '3', title: 'Winning Team', description: 'Celebrating the winners', imageUrl: '/images/gallery/hackathon-3.jpg'},
    ]},
    { id: '2', name: 'Workshops', images: [
        { id: '4', title: 'AI Workshop', description: 'Deep dive into neural networks', imageUrl: '/images/gallery/workshop-1.jpg'},
        { id: '5', title: 'Web Dev Session', description: 'Learning about modern frameworks', imageUrl: '/images/gallery/workshop-2.jpg'},
    ]},
];

const RESOURCES_DATA: ResourceCategory[] = [
    { category: 'Web Development', resources: [
        { name: 'Full Stack Developer Roadmap', description: 'A complete guide to becoming a full stack developer in 2024.', type: 'Roadmap', url: '#' },
        { name: 'React Best Practices', description: 'Official documentation and style guide for writing clean React code.', type: 'Article', url: '#' },
        { name: 'Awesome JavaScript Libraries', description: 'A curated list of top-tier JavaScript libraries for various tasks.', type: 'GitHub', url: '#' },
    ]},
    { category: 'Artificial Intelligence', resources: [
        { name: 'AI/ML Engineer Roadmap', description: 'Step-by-step guide to mastering AI and Machine Learning concepts.', type: 'Roadmap', url: '#' },
        { name: 'PyTorch Tutorials', description: 'Hands-on tutorials for building deep learning models with PyTorch.', type: 'Notes', url: '#' },
    ]}
];

const KNOWLEDGE_HUB_DATA: KnowledgeHubPost[] = [
    { title: 'Understanding Transformers in NLP', imageUrl: '/images/knowledge/kh-1.jpg', date: 'Oct 10, 2024', author: 'AI Department', tags: ['NLP', 'AI', 'Tutorial'], excerpt: 'A deep dive into the architecture that powers models like GPT and BERT.', url: '#' },
    { title: 'The Rise of Serverless: A Practical Guide', imageUrl: '/images/knowledge/kh-2.jpg', date: 'Sep 25, 2024', author: 'DevOps Department', tags: ['Cloud', 'DevOps', 'Architecture'], excerpt: 'Learn how to build and deploy scalable applications without managing servers.', url: '#' },
];

const RECRUITMENT_HISTORY_DATA: { upcoming: RecruitmentEvent[], past: RecruitmentEvent[] } = {
    upcoming: [{ title: 'Fall Recruitment 2024', period: 'Oct 1 - Oct 30, 2024', description: 'Join us for our biggest recruitment drive of the year. Exciting opportunities await!', status: 'Open' }],
    past: [
        { title: 'Spring Recruitment 2024', period: 'Feb 15 - Mar 10, 2024', description: 'Welcomed 40 new members across all departments.', status: 'Closed' },
        { title: 'Fall Recruitment 2023', period: 'Oct 1 - Oct 30, 2023', description: 'Onboarded the founding members of our new Web3 department.', status: 'Closed' }
    ],
};

// FIX: Added string 'id' properties to match the 'Achievement' type.
const ACHIEVEMENTS_DATA: { hackathons: Achievement[], cp: Achievement[] } = {
    hackathons: [{ id: 'ach1', event: 'Smart India Hackathon 2023', title: 'AgriTech Solution', placing: '1st Place Winner', date: 'Dec 2023', members: ['Anjali Singh', 'Vikram Mehta'] }],
    cp: [{ id: 'ach2', event: 'ICPC Regionals 2024', title: 'Team CodeBreakers', placing: 'Top 10 Finish', date: 'Feb 2024', members: ['Karthik Nair', 'Siddharth Roy'] }]
};

// FIX: Added string 'id' properties to match the 'Partner' type.
const PARTNERS_DATA: { sponsors: Partner[], collaborations: Partner[] } = {
    sponsors: [{ id: 'p1', name: 'TechCorp', logoUrl: '/images/partners/techcorp.png', description: 'Powering our annual hackathon.' }],
    collaborations: [{ id: 'p2', name: 'Innovate Inc.', logoUrl: '/images/partners/innovate.png', description: 'Industry mentorship program.' }]
};

export const MOCK_DATA = {
    departments: DEPARTMENTS_DATA,
    projects: PROJECTS_DATA,
    teamMembers: TEAM_MEMBERS_DATA,
    events: EVENTS_DATA,
    alumni: ALUMNI_DATA,
    notifications: NOTIFICATIONS_DATA,
    registeredUsers: REGISTERED_USERS_DATA,
    recruitmentDates: RECRUITMENT_DATES_DATA,
    galleryData: GALLERY_DATA,
    resources: RESOURCES_DATA,
    knowledgeHubPosts: KNOWLEDGE_HUB_DATA,
    recruitmentHistory: RECRUITMENT_HISTORY_DATA,
    achievements: ACHIEVEMENTS_DATA,
    partners: PARTNERS_DATA
};
