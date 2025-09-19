// server/controllers/authController.ts
import { Request, Response, NextFunction } from 'express';
import jwt, { SignOptions } from 'jsonwebtoken';
import type { StringValue } from 'ms';
import catchAsync from '../utils/catchAsync.ts';
import AppError from '../utils/AppError.ts';
import { User } from '../models.ts';
import { AdminRole } from '../../types';

// FIX: Change id parameter to string to match MongoDB ObjectId.
const signToken = (id: string, username: string, role: AdminRole) => {
    if (!process.env.JWT_SECRET) {
        throw new AppError('JWT_SECRET is not defined. Cannot sign token.', 500);
    }
    // FIX: Ensure JWT secret is handled correctly.
    const options: SignOptions = {
        expiresIn: (process.env.JWT_EXPIRES_IN || '90d') as StringValue
    };
    return jwt.sign({ id, username, role }, process.env.JWT_SECRET as string, options);
};

const loginHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return next(new AppError('Please provide username and password.', 400));
    }

    // Find user and include the password field for comparison
    const user = await User.findOne({ username }).select('+password');

    if (!user || !(await user.correctPassword(password))) {
        return next(new AppError('Incorrect username or password', 401));
    }

    // FIX: Convert MongoDB ObjectId to string before signing token.
    const token = signToken((user._id as any).toString(), user.username, user.role);
    
    // Prepare user object for the response (without password)
    const userResponse = {
        // FIX: Convert MongoDB ObjectId to string for response.
        id: (user._id as any).toString(),
        username: user.username,
        role: user.role,
    };

    res.status(200).json({
        status: 'success',
        token,
        user: userResponse,
    });
};

export const login = catchAsync(loginHandler);