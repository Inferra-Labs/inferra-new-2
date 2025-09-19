// server/index.ts
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import './db.ts'; // Added .js extension
import apiRoutes from './routes/index.ts'; // Added .js extension
import { errorHandler } from './middleware/errorHandler.ts'; // Added .js extension
import AppError from './utils/AppError.ts'; // Added .js extension

// Load env vars from .env file
dotenv.config();

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Serve static files from the 'uploads' directory for resume access
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// API routes
app.use('/api', apiRoutes);

// Handle 404 for any routes not found
app.use((req: Request, res: Response, next: NextFunction) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handler
app.use(errorHandler);

app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});