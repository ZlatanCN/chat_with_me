import express from 'express';
import { sendMessage, getMessages } from '../controllers/messageController.js';
import protectRoute from '../middleware/protectRoute.js';
import multer from 'multer';

const router = express.Router();
const upload = multer();

// @desc Get messages route
// @route GET /api/message/:id
router.get('/:id', protectRoute, getMessages);

// @desc Send message route
// @route POST /api/message/send/:id
router.post('/send/:id', protectRoute, upload.single('imageObj'), sendMessage);

export default router;