// server/controllers/formsController.ts
import express from 'express';
const { Request, Response } = express;
import catchAsync from '../utils/catchAsync.ts';
import { ContactSubmission, Applicant } from '../models.ts';
import AppError from '../utils/AppError.ts';

const handleContactFormHandler = async (req: Request, res: Response) => {
    const { name, email, message } = req.body;
    await ContactSubmission.create({ name, email, message });
    res.status(200).json({ message: 'Message received successfully!' });
};

const handleRecruitmentFormHandler = async (req: Request, res: Response) => {
    const formData = req.body;
    const resumeFile = req.file;

    if (!resumeFile) {
        throw new AppError('Resume file is required.', 400);
    }
    
    const newApplicant = await Applicant.create({
        ...formData,
        resumeUrl: `/${resumeFile.path}` // Store the relative path
    });
    
    res.status(201).json({ 
        message: 'Application submitted successfully!',
        applicant: newApplicant
    });
};

export const handleContactForm = catchAsync(handleContactFormHandler);
export const handleRecruitmentForm = catchAsync(handleRecruitmentFormHandler);
