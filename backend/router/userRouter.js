import express from 'express';
import { loginUser, registerUser, updateUserEmail, deleteUser, userProfile, logoutUser, refreshTokenController } from '../controllers/userController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import pointTransactionRouter from './pointTransactionRouter.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh-token', refreshTokenController);

// Protected 
router.get('/profile', authenticateToken, userProfile);
router.put('/update', authenticateToken, updateUserEmail);
router.delete('/delete', authenticateToken, deleteUser);
router.use('/points',authenticateToken, pointTransactionRouter);
router.post('/logout', authenticateToken, logoutUser);

export default router;