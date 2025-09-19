// server/routes/public.ts
import express from 'express';
import * as publicController from '../controllers/publicController.ts';

const router = express.Router();

// Route to get all necessary data for the initial site load
router.get('/initial-data', publicController.getInitialData);

export default router;
