import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import { getAllUsers } from '../controllers/userController.js';

const router = express.Router();

// @desc Get all users route
// @route GET /api/users
router.get('/', protectRoute, getAllUsers);

export default router;