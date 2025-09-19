// server/routes/admin.ts
import express from 'express';
import * as adminController from '../controllers/adminController.ts';
import { protect, restrictTo } from '../middleware/auth.ts';

const router = express.Router();

// FIX: All routes in this file are protected and require login.
router.use(protect);

// Dashboard routes
router.get('/dashboard-data', restrictTo('FullAccess', 'ViewOnly', 'RecruitmentManager', 'ContentManager'), adminController.getDashboardData);

// User/Applicant Management routes
router.get('/users', restrictTo('FullAccess', 'RecruitmentManager'), adminController.getRegisteredUsers);
router.patch('/users/:id/status', restrictTo('FullAccess', 'RecruitmentManager'), adminController.updateUserStatus);
router.get('/users/:id', restrictTo('FullAccess', 'RecruitmentManager'), adminController.getUserDetails);

// Note: Additional routes for managing other content (Projects, Events, etc.) would be added here.

export default router;
