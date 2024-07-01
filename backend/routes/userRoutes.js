import express from 'express';
import { getMe, loginUser, registerUser } from '../controllers/userController.js';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

export default router;