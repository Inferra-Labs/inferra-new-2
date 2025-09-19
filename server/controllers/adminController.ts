// server/controllers/adminController.ts
import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync.ts';
import { Applicant } from '../models.ts';
import { AuthRequest } from '../middleware/auth.ts';
import AppError from '../utils/AppError.ts';

export const getDashboardData = catchAsync(async (req: Request, res: Response) => {
    const totalApplicants = await Applicant.countDocuments();
    // Add more stats as needed for the dashboard
    res.status(200).json({
        stats: {
            totalApplicants,
        }
    });
});

export const getRegisteredUsers = catchAsync(async (req: Request, res: Response) => {
    const users = await Applicant.find().sort({ submittedAt: -1 });
    res.status(200).json(users);
});

export const getUserDetails = catchAsync(async (req: Request, res: Response) => {
    const user = await Applicant.findById(req.params.id);
    if (!user) {
        throw new AppError('No applicant found with that ID', 404);
    }
    res.status(200).json(user);
});

export const updateUserStatus = catchAsync(async (req: AuthRequest, res: Response) => {
    const { status, notes } = req.body;
    
    // Using findByIdAndUpdate for atomicity and efficiency
    const updatedApplicant = await Applicant.findByIdAndUpdate(
        req.params.id,
        { 
            status,
            // Add a new note to the notes array
            $push: { 
                notes: { 
                    text: `${notes} (by ${req.user?.username})`, 
                    timestamp: new Date() 
                } 
            }
        },
        { new: true, runValidators: true } // Return the updated document and run schema validators
    );

    if (!updatedApplicant) {
        throw new AppError('No applicant found with that ID', 404);
    }

    res.status(200).json({
        status: 'success',
        data: {
            applicant: updatedApplicant
        }
    });
});
