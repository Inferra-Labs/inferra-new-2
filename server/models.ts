// server/models.ts
// FIX: Changed import to bring in mongoose namespace to correctly type HookNextFunction
import mongoose, { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
type AdminRole = 'FullAccess' | 'ViewOnly' | 'ContentManager' | 'RecruitmentManager';

// Subdocument Schemas
const resourceSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    type: { type: String, enum: ['Roadmap', 'Article', 'GitHub', 'Notes'], required: true },
    url: { type: String, required: true },
});

const departmentCellSchema = new Schema({
    name: String,
    description: String,
    lead: String,
});

const galleryImageSchema = new Schema({
    title: String,
    description: String,
    imageUrl: { type: String, required: true },
});

const noteSchema = new Schema({
    text: String,
    timestamp: { type: Date, default: Date.now }
});

// Main Document Schemas
const resourceCategorySchema = new Schema({
    category: { type: String, required: true },
    resources: [resourceSchema],
});

const recruitmentEventSchema = new Schema({
    title: String,
    period: String,
    description: String,
    status: { type: String, enum: ['Upcoming', 'Open', 'Closed'] },
});

const alumnusSchema = new Schema({
    name: { type: String, required: true },
    imageUrl: String,
    currentRole: String,
    company: String,
    testimonial: String,
    linkedinUrl: String,
});

const departmentSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    lead: String,
    coLead: String,
    icon: String,
    projects: [String],
    cells: [departmentCellSchema],
});

const projectSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    imageUrl: String,
    tags: [String],
    githubUrl: String,
    videoUrl: String,
});

const teamMemberSchema = new Schema({
    name: { type: String, required: true },
    role: String,
    imageUrl: String,
    description: String,
    linkedinUrl: String,
    githubUrl: String,
    email: String,
    phone: String,
    skills: [String],
    isFaculty: { type: Boolean, default: false },
    isCoreCommittee: { type: Boolean, default: false },
});

const eventSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    imageUrl: String,
    date: String,
    isUpcoming: Boolean,
    googleCalendarUrl: String,
});

const applicantSchema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: String,
    department: String,
    collegeId: String,
    resumeUrl: String,
    status: { type: String, enum: ['Applied', 'Reviewed', 'Shortlisted', 'Interviewed', 'Hired', 'Rejected'], default: 'Applied' },
    notes: [noteSchema],
});

const notificationSchema = new Schema({
    title: String,
    description: String,
    type: { type: String, enum: ['recruitment', 'event', 'announcement', 'general'] },
    timestamp: { type: Date, default: Date.now },
    isRead: { type: Boolean, default: false },
    pinned: Boolean,
    fileLink: String,
});

const recruitmentDateSchema = new Schema({
    startDate: Date,
    endDate: Date,
});

const galleryCategorySchema = new Schema({
    name: String,
    images: [galleryImageSchema],
});

const knowledgeHubPostSchema = new Schema({
    title: String,
    imageUrl: String,
    date: String,
    author: String,
    tags: [String],
    excerpt: String,
    url: String,
});

const achievementSchema = new Schema({
    event: String,
    title: String,
    placing: String,
    date: String,
    members: [String],
});

const partnerSchema = new Schema({
    name: String,
    logoUrl: String,
    description: String,
});

const contactSubmissionSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    submittedAt: { type: Date, default: Date.now }
});

// User Schema with Password Hashing
export interface IUser extends Document {
    username: string;
    password?: string;
    role: AdminRole;
    correctPassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ['FullAccess', 'ViewOnly', 'ContentManager', 'RecruitmentManager'], required: true },
});

// FIX: Correctly type the `next` function in the pre-save hook.
userSchema.pre('save', async function(next: mongoose.CallbackWithoutResultAndOptionalError) {
    if (!this.isModified('password') || !this.password) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.correctPassword = async function(candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password!);
};


// Export Models
export const ResourceCategory = model('ResourceCategory', resourceCategorySchema);
export const RecruitmentEvent = model('RecruitmentEvent', recruitmentEventSchema);
export const Alumnus = model('Alumnus', alumnusSchema);
export const Department = model('Department', departmentSchema);
export const Project = model('Project', projectSchema);
export const TeamMember = model('TeamMember', teamMemberSchema);
export const Event = model('Event', eventSchema);
export const Applicant = model('Applicant', applicantSchema);
export const Notification = model('Notification', notificationSchema);
export const RecruitmentDate = model('RecruitmentDate', recruitmentDateSchema);
export const GalleryCategory = model('GalleryCategory', galleryCategorySchema);
export const KnowledgeHubPost = model('KnowledgeHubPost', knowledgeHubPostSchema);
export const Achievement = model('Achievement', achievementSchema);
export const Partner = model('Partner', partnerSchema);
export const ContactSubmission = model('ContactSubmission', contactSubmissionSchema);
export const User = model<IUser>('User', userSchema);
