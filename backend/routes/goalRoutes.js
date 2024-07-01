import express from 'express';
import { deleteGoal, getGoals, setGoals, updateGoal } from '../controllers/goalController.js';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(protect, getGoals).post(protect, setGoals);
router.route('/:id').patch(protect, updateGoal).delete(protect, deleteGoal);

export default router;