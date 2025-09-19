// server/routes/forms.ts
import express from 'express';
import multer from 'multer';
import * as formsController from '../controllers/formsController.ts';
import path from 'path';

const router = express.Router();

// Setup multer for file uploads with original filenames
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

router.post('/contact', formsController.handleContactForm);
router.post('/apply', upload.single('resume'), formsController.handleRecruitmentForm);

export default router;
