// server/utils/catchAsync.ts
import express from 'express';
const { Request, Response, NextFunction } = express;
// Define a type for our async route handlers
type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;

// This function takes an async function and returns a new function that handles promise rejections
const catchAsync = (fn: AsyncFunction) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export default catchAsync;
