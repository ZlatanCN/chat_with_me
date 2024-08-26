import express from 'express';
import { sendMessage, getMessages } from '../controllers/messageController.js';
import protectRoute from '../middleware/protectRoute.js';
import multer from 'multer';

const router = express.Router();

// Configure multer to handle both image and file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// @desc Get messages route
// @route GET /api/message/:id
router.get('/:id', protectRoute, getMessages);

// @desc Send message route
// @route POST /api/message/send/:id
router.post('/send/:id', protectRoute, upload.fields([{ name: 'imageObj' }, { name: 'file' }]), sendMessage);

export default router;