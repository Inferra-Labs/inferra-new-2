// server/routes/auth.ts
import express from 'express';
import * as authController from '../controllers/authController.ts';

const router = express.Router();

// Route for admin user login
router.post('/login', authController.login);

export default router;
