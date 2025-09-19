// server/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/AppError.ts';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // In development mode, send a detailed error response
    if (process.env.NODE_ENV === 'development') {
        return res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack,
        });
    }

    // In production mode, send a more generic response

    // For operational errors we trust, send the message to the client
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }

    // For programming or other unknown errors, don't leak error details
    console.error('ERROR 💥', err);
    return res.status(500).json({
        status: 'error',
        message: 'Something went very wrong!',
    });
};
