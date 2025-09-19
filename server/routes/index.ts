// server/routes/index.ts
import express from 'express';
import publicRoutes from './public.ts';
import formsRoutes from './forms.ts';
import authRoutes from './auth.ts';
import adminRoutes from './admin.ts';
const router = express.Router();
// Registering all the sub-routers
router.use('/public', publicRoutes);
router.use('/forms', formsRoutes);
router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
export default router;