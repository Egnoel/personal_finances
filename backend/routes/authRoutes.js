import express from 'express';

import { protectRoute } from '../middlewares/authMiddleware.js';
import {
  login,
  logout,
  signup,
  getUserProfile,
} from '../controller/authController.js';

const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);

router.get('/profile', protectRoute, getUserProfile);
export default router;
