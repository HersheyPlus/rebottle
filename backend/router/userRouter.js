import express from 'express';
import { loginUser, registerUser, updateUserEmail, deleteUser, userProfile } from '../controllers/userController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import pointTransactionRouter from './pointTransactionRouter.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected 
router.get('/profile', authenticateToken, userProfile);
router.put('/update', authenticateToken, updateUserEmail);
router.delete('/delete', authenticateToken, deleteUser);
router.use('/points',authenticateToken, pointTransactionRouter);

export default router;