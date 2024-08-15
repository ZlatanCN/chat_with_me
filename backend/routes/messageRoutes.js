import express from 'express';
import { sendMessage, getMessages } from '../controllers/messageController.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

// @desc Get messages route
// @route GET /api/message/:id
router.get('/:id', protectRoute, getMessages);

// @desc Send message route
// @route POST /api/message/send/:id
router.post('/send/:id', protectRoute, sendMessage);

export default router;