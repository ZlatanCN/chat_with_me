import express from 'express';
import {signup, login, logout} from '../controllers/authController.js';

const router = express.Router()

// @desc Signup route
// @route POST /api/auth/signup
router.post('/signup', signup)

// @desc Login route
// @route POST /api/auth/login
router.post('/login', login)

// @desc Logout route
// @route POST /api/auth/logout
router.post('/logout', logout)

export default router;