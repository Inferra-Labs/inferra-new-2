// server/middleware/auth.ts
// FIX: Import express namespace to correctly extend Request type.
import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync.ts';
import AppError from '../utils/AppError.ts';
import { User } from '../models.ts'; // Import the User model
import { AdminRole } from '../../types.ts';

// Define the structure of the JWT payload
interface JwtPayload {
    // FIX: Changed id to string to match MongoDB ObjectId.
    id: string;
    username: string;
    role: AdminRole;
}

// Extend Express's Request type to include the authenticated user's data
// This is now an interface for better declaration merging
// FIX: Explicitly extend express.Request to avoid type conflicts.
export interface AuthRequest extends express.Request {
    user?: JwtPayload;
}

export const protect = catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token;
    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new AppError('You are not logged in! Please log in to get access.', 401));
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    
    // Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return next(new AppError('The user belonging to this token no longer exists.', 401));
    }

    // In a real app, you might also check if the user changed their password after the token was issued.

    // Grant access to protected route
    // FIX: Convert MongoDB ObjectId to string for consistency. And cast req to AuthRequest.
    req.user = { id: (currentUser._id as any).toString(), username: currentUser.username, role: currentUser.role };
    next();
});

export const restrictTo = (...roles: AdminRole[]) => {
    // FIX: Cast req to AuthRequest to access user property.
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        // Check if the authenticated user's role is included in the allowed roles
        if (!req.user || !roles.includes(req.user.role)) {
            return next(new AppError('You do not have permission to perform this action', 403));
        }
        next();
    };
};