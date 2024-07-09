import express from 'express';
import { 
  loginUser, 
  registerUser, 
  updateUserProfile, 
  deleteUser, 
  userProfile, 
  logoutUser, 
  refreshTokenController 
} from '../controllers/userController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import pointTransactionRouter from './pointTransactionRouter.js';
import { handleUpload } from '../utils/s3.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh-token', refreshTokenController);

// Protected routes
router.get('/profile', authenticateToken, userProfile);
router.put('/update', authenticateToken, handleUpload("profileImage"), updateUserProfile);
router.delete('/delete', authenticateToken, deleteUser);
router.post('/logout', authenticateToken, logoutUser);

// Nested router for point transactions
router.use('/points', authenticateToken, pointTransactionRouter);

export default router;